const cloudinary = require('../config/cloudinary');
const prisma = require('../config/prismaClient');
const fs = require('fs');
const AppError = require('../../src/utils/AppError');

class ListingsService {
  /**
   * Create a new property listing with Cloudinary image upload
   */
  async createListing(ownerId, listingData, files = []) {
    const {
      title,
      description,
      propertyType,
      bedrooms,
      bathrooms,
      toilets,
      price,
      currency = 'NGN',
      state,
      city,
      neighborhood,
      address,
      latitude,
      longitude,
      amenities,
      furnished = false,
      serviced = false,
      parkingSpaces = 0,
      onlineViewingEnabled = false,
      onlineViewingType,
      videoTourUrl,
      inspectionAvailable = true,
      inspectionNotes,
      inspectionContact,
    } = listingData;

    // Step 1: Upload images to Cloudinary (if provided)
    const uploadedImages = [];
    if (files && files.length > 0) {
      try {
        for (const file of files) {
          const uploadResult = await cloudinary.uploader.upload(file.path, {
            folder: 'letvana/properties',
          });
          uploadedImages.push({
            mediaUrl: uploadResult.secure_url,
            publicId: uploadResult.public_id, // Optional: store public_id for future reference
          });

          // Remove local temp file
          try {
            fs.unlinkSync(file.path);
          } catch (err) {
            console.warn(`Failed to delete temp file ${file.path}:`, err.message);
          }
        }
      } catch (error) {
        console.error('Cloudinary upload failed:', error);
        throw new AppError('Image upload failed', 500);
      }
    }

    // Step 2: Create property record with associated media
    try {
      const property = await prisma.property.create({
        data: {
          ownerId: BigInt(ownerId),
          title,
          description,
          propertyType,
          bedrooms: bedrooms ? parseInt(bedrooms) : null,
          bathrooms: bathrooms ? parseInt(bathrooms) : null,
          toilets: toilets ? parseInt(toilets) : null,
          price: parseFloat(price),
          currency,
          status: 'draft',
          state,
          city,
          neighborhood,
          address,
          latitude: latitude ? parseFloat(latitude) : null,
          longitude: longitude ? parseFloat(longitude) : null,
          amenities,
          furnished,
          serviced,
          parkingSpaces: parseInt(parkingSpaces) || 0,
          onlineViewingEnabled,
          onlineViewingType,
          videoTourUrl,
          inspectionAvailable,
          inspectionNotes,
          inspectionContact,
          media: {
            create: uploadedImages.map((image, index) => ({
              mediaType: 'photo',
              mediaUrl: image.mediaUrl,
              isPrimary: index === 0, // Mark first image as primary
              displayOrder: index + 1,
            })),
          },
        },
        include: {
          owner: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              phoneNumber: true,
              userType: true,
            },
          },
          media: true,
        },
      });

      // Step 3: Return serialized property
      return this.serializeProperty(property);
    } catch (error) {
      console.error('Property creation failed:', error);
      throw new AppError('Failed to create property listing', 500);
    }
  }

  /**
   * Get a single listing by ID
   */
  async getListingById(propertyId, userId = null) {
    const property = await prisma.property.findUnique({
      where: {
        id: BigInt(propertyId),
        deletedAt: null,
      },
      include: {
        owner: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phoneNumber: true,
            userType: true,
            profilePictureUrl: true,
          },
        },
        media: {
          orderBy: [
            { isPrimary: 'desc' },
            { displayOrder: 'asc' },
          ],
        },
        verifier: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        ...(userId && {
          favorites: {
            where: {
              userId: BigInt(userId),
            },
          },
        }),
      },
    });

    if (!property) {
      throw new AppError('Property not found', 404);
    }

    const serialized = this.serializeProperty(property);
    
    // Add isFavorite flag if user is authenticated
    if (userId) {
      serialized.isFavorite = property.favorites.length > 0;
      delete serialized.favorites;
    }

    return serialized;
  }

  /**
   * Get all listings with filters and pagination
   */
  async getListings(filters = {}, pagination = {}) {
    const {
      propertyType,
      state,
      city,
      minPrice,
      maxPrice,
      bedrooms,
      bathrooms,
      furnished,
      serviced,
      parkingSpaces,
      status = 'available',
      isVerified,
      search,
    } = filters;

    const { page = 1, limit = 20, sortBy = 'createdAt', sortOrder = 'desc' } = pagination;

    const skip = (page - 1) * limit;

    // Build where clause
    const where = {
      deletedAt: null,
      ...(propertyType && { propertyType }),
      ...(state && { state }),
      ...(city && { city }),
      ...(minPrice && { price: { gte: minPrice } }),
      ...(maxPrice && { price: { ...where.price, lte: maxPrice } }),
      ...(bedrooms && { bedrooms: { gte: bedrooms } }),
      ...(bathrooms && { bathrooms: { gte: bathrooms } }),
      ...(furnished !== undefined && { furnished }),
      ...(serviced !== undefined && { serviced }),
      ...(parkingSpaces && { parkingSpaces: { gte: parkingSpaces } }),
      ...(status && { status }),
      ...(isVerified !== undefined && { isVerified }),
      ...(search && {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
          { address: { contains: search, mode: 'insensitive' } },
          { neighborhood: { contains: search, mode: 'insensitive' } },
        ],
      }),
    };

    // Execute query with count
    const [properties, total] = await Promise.all([
      prisma.property.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          [sortBy]: sortOrder,
        },
        include: {
          owner: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              phoneNumber: true,
              userType: true,
            },
          },
          media: {
            where: { isPrimary: true },
            take: 1,
          },
        },
      }),
      prisma.property.count({ where }),
    ]);

    return {
      properties: properties.map(p => this.serializeProperty(p)),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Update a listing
   */
  async updateListing(propertyId, ownerId, updateData) {
    // Check if property exists and belongs to owner
    const existingProperty = await prisma.property.findFirst({
      where: {
        id: BigInt(propertyId),
        ownerId: BigInt(ownerId),
        deletedAt: null,
      },
    });

    if (!existingProperty) {
      throw new AppError('Property not found or you do not have permission to update it', 404);
    }

    // Don't allow updating certain fields directly
    const { ownerId: _, isVerified, verifiedBy, verifiedAt, ...allowedUpdates } = updateData;

    const updatedProperty = await prisma.property.update({
      where: { id: BigInt(propertyId) },
      data: allowedUpdates,
      include: {
        owner: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phoneNumber: true,
          },
        },
        media: true,
      },
    });

    return this.serializeProperty(updatedProperty);
  }

  /**
   * Delete a listing (soft delete)
   */
  async deleteListing(propertyId, ownerId) {
    const property = await prisma.property.findFirst({
      where: {
        id: BigInt(propertyId),
        ownerId: BigInt(ownerId),
        deletedAt: null,
      },
    });

    if (!property) {
      throw new AppError('Property not found or you do not have permission to delete it', 404);
    }

    await prisma.property.update({
      where: { id: BigInt(propertyId) },
      data: { deletedAt: new Date() },
    });

    return { message: 'Property deleted successfully' };
  }

  /**
   * Get listings by owner
   */
  async getOwnerListings(ownerId, pagination = {}) {
    const { page = 1, limit = 20 } = pagination;
    const skip = (page - 1) * limit;

    const [properties, total] = await Promise.all([
      prisma.property.findMany({
        where: {
          ownerId: BigInt(ownerId),
          deletedAt: null,
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          media: {
            where: { isPrimary: true },
            take: 1,
          },
        },
      }),
      prisma.property.count({
        where: {
          ownerId: BigInt(ownerId),
          deletedAt: null,
        },
      }),
    ]);

    return {
      properties: properties.map(p => this.serializeProperty(p)),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Update listing status (draft -> under_review -> available)
   */
  async updateListingStatus(propertyId, ownerId, newStatus) {
    const property = await prisma.property.findFirst({
      where: {
        id: BigInt(propertyId),
        ownerId: BigInt(ownerId),
        deletedAt: null,
      },
    });

    if (!property) {
      throw new AppError('Property not found', 404);
    }

    // Business logic for status transitions
    if (property.status === 'draft' && newStatus === 'under_review') {
      // Submit for review
      const updatedProperty = await prisma.property.update({
        where: { id: BigInt(propertyId) },
        data: { status: 'under_review' },
      });
      return this.serializeProperty(updatedProperty);
    }

    throw new AppError('Invalid status transition', 400);
  }

  /**
   * Helper: Serialize property (convert BigInt to string)
   */
  serializeProperty(property) {
    if (!property) return null;

    return {
      ...property,
      id: property.id.toString(),
      ownerId: property.ownerId.toString(),
      verifiedBy: property.verifiedBy?.toString(),
      owner: property.owner ? {
        ...property.owner,
        id: property.owner.id.toString(),
      } : undefined,
      verifier: property.verifier ? {
        ...property.verifier,
        id: property.verifier.id.toString(),
      } : undefined,
      media: property.media?.map(m => ({
        ...m,
        id: m.id.toString(),
        propertyId: m.propertyId.toString(),
      })),
    };
  }
}

module.exports = new ListingsService();
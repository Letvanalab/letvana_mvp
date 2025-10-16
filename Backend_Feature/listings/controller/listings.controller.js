const listingsService = require('./listings.service');
const ApiResponse = require('../../utils/responses');
class ListingsController {
  /**
   * Create a new listing
   * POST /api/listings
   */
  async createListing(req, res, next) {
  try {
    const ownerId = req.user.id; // from auth middleware
    const files = req.files; // multer passes uploaded files here

    const listing = await listingsService.createListing(ownerId, req.body, files);
    
    return ApiResponse.created(res, listing, 'Listing created successfully');
  } catch (error) {
    next(error);
  }
}
/**
   * Get all listings with filters
   * GET /api/listings
   */
  async getListings(req, res, next) {
    try {
      const {
        page,
        limit,
        sortBy,
        sortOrder,
        ...filters
      } = req.query;

      const result = await listingsService.getListings(
        filters,
        { page, limit, sortBy, sortOrder }
      );

      return ApiResponse.paginated(
        res,
        result.properties,
        result.pagination,
        'Listings retrieved successfully'
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get a single listing by ID
   * GET /api/listings/:id
   */
  async getListingById(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.user?.id; // Optional user ID for favorites
      
      const listing = await listingsService.getListingById(id, userId);
      
      return ApiResponse.success(res, listing, 'Listing retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update a listing
   * PUT /api/listings/:id
   */
  async updateListing(req, res, next) {
    try {
      const { id } = req.params;
      const ownerId = req.user.id;
      
      const updatedListing = await listingsService.updateListing(id, ownerId, req.body);
      
      return ApiResponse.success(res, updatedListing, 'Listing updated successfully');
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete a listing (soft delete)
   * DELETE /api/listings/:id
   */
  async deleteListing(req, res, next) {
    try {
      const { id } = req.params;
      const ownerId = req.user.id;
      
      await listingsService.deleteListing(id, ownerId);
      
      return ApiResponse.success(res, null, 'Listing deleted successfully');
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get listings by current user (owner)
   * GET /api/listings/my-listings
   */
  async getMyListings(req, res, next) {
    try {
      const ownerId = req.user.id;
      const { page, limit } = req.query;
      
      const result = await listingsService.getOwnerListings(ownerId, { page, limit });
      
      return ApiResponse.paginated(
        res,
        result.properties,
        result.pagination,
        'Your listings retrieved successfully'
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * Submit listing for review
   * POST /api/listings/:id/submit
   */
  async submitForReview(req, res, next) {
    try {
      const { id } = req.params;
      const ownerId = req.user.id;
      
      const updatedListing = await listingsService.updateListingStatus(
        id,
        ownerId,
        'under_review'
      );
      
      return ApiResponse.success(res, updatedListing, 'Listing submitted for review');
    } catch (error) {
      next(error);
    }
  }
}

//module.exports = new ListingsController();

module.exports = ListingsController
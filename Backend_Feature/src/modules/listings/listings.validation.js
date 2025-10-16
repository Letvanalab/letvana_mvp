const Joi = require('joi');

const propertyTypes = ['apartment', 'house', 'land', 'office_space', 'shop', 'warehouse'];
const propertyStatuses = ['available', 'rented', 'sold', 'draft', 'under_review'];
const onlineViewingTypes = ['video_tour', 'live_call'];

const createListingSchema = Joi.object({
  title: Joi.string().max(255).required(),
  description: Joi.string().allow('', null),
  propertyType: Joi.string().valid(...propertyTypes).required(),
  bedrooms: Joi.number().integer().min(0).max(100).allow(null),
  bathrooms: Joi.number().integer().min(0).max(100).allow(null),
  toilets: Joi.number().integer().min(0).max(100).allow(null),
  price: Joi.number().positive().required(),
  currency: Joi.string().length(3).default('NGN'),
  state: Joi.string().max(100).required(),
  city: Joi.string().max(100).required(),
  neighborhood: Joi.string().max(100).allow('', null),
  address: Joi.string().required(),
  latitude: Joi.number().min(-90).max(90).allow(null),
  longitude: Joi.number().min(-180).max(180).allow(null),
  amenities: Joi.object().allow(null),
  furnished: Joi.boolean().default(false),
  serviced: Joi.boolean().default(false),
  parkingSpaces: Joi.number().integer().min(0).default(0),
  onlineViewingEnabled: Joi.boolean().default(false),
  onlineViewingType: Joi.string().valid(...onlineViewingTypes).when('onlineViewingEnabled', {
    is: true,
    then: Joi.required(),
    otherwise: Joi.optional(),
  }),
  videoTourUrl: Joi.string().uri().max(500).allow('', null),
  inspectionAvailable: Joi.boolean().default(true),
  inspectionNotes: Joi.string().allow('', null),
  inspectionContact: Joi.string().max(255).allow('', null),
});

const updateListingSchema = Joi.object({
  title: Joi.string().max(255),
  description: Joi.string().allow('', null),
  propertyType: Joi.string().valid(...propertyTypes),
  bedrooms: Joi.number().integer().min(0).max(100).allow(null),
  bathrooms: Joi.number().integer().min(0).max(100).allow(null),
  toilets: Joi.number().integer().min(0).max(100).allow(null),
  price: Joi.number().positive(),
  currency: Joi.string().length(3),
  state: Joi.string().max(100),
  city: Joi.string().max(100),
  neighborhood: Joi.string().max(100).allow('', null),
  address: Joi.string(),
  latitude: Joi.number().min(-90).max(90).allow(null),
  longitude: Joi.number().min(-180).max(180).allow(null),
  amenities: Joi.object().allow(null),
  furnished: Joi.boolean(),
  serviced: Joi.boolean(),
  parkingSpaces: Joi.number().integer().min(0),
  onlineViewingEnabled: Joi.boolean(),
  onlineViewingType: Joi.string().valid(...onlineViewingTypes),
  videoTourUrl: Joi.string().uri().max(500).allow('', null),
  inspectionAvailable: Joi.boolean(),
  inspectionNotes: Joi.string().allow('', null),
  inspectionContact: Joi.string().max(255).allow('', null),
}).min(1); // At least one field must be provided

const getListingsSchema = Joi.object({
  propertyType: Joi.string().valid(...propertyTypes),
  state: Joi.string().max(100),
  city: Joi.string().max(100),
  minPrice: Joi.number().positive(),
  maxPrice: Joi.number().positive().greater(Joi.ref('minPrice')),
  bedrooms: Joi.number().integer().min(0),
  bathrooms: Joi.number().integer().min(0),
  furnished: Joi.boolean(),
  serviced: Joi.boolean(),
  parkingSpaces: Joi.number().integer().min(0),
  status: Joi.string().valid(...propertyStatuses),
  isVerified: Joi.boolean(),
  search: Joi.string().max(255),
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(20),
  sortBy: Joi.string().valid('createdAt', 'price', 'bedrooms', 'title').default('createdAt'),
  sortOrder: Joi.string().valid('asc', 'desc').default('desc'),
});

const updateStatusSchema = Joi.object({
  status: Joi.string().valid('under_review').required(),
});

const idParamSchema = Joi.object({
  id: Joi.string().pattern(/^\d+$/).required(),
});

module.exports = {
  createListingSchema,
  updateListingSchema,
  getListingsSchema,
  updateStatusSchema,
  idParamSchema,
};
const express = require("express");
const router = express.Router();
const listingsController = require("./listings.controller");
const controller = new ListingsController();
const validate = require("../middlewares/validation.middleware");
const {
  createListingSchema,
  updateListingSchema,
  getListingsSchema,
  updateStatusSchema,
  idParamSchema,
} = require("../middlewares/listings.validation");
const { upload } = require("../../utils/upload");

// Single or multiple file uploads depending on your use case
router.post("/create", upload.array("images", 5), controller.createListing);
router.get("/", controller.getAllListings);

const { authenticate, authorize } = require("../middlewares/auth.middleware");
const ListingsController = require("./listings.controller");


// Public routes
router.get(
  "/",
  validate(getListingsSchema, "query"),
  listingsController.getListings
);

router.get(
  "/:id",
  validate(idParamSchema, "params"),
  listingsController.getListingById
);

router.use(authenticate); // All routes below require authentication

router.post(
  "/",
  authorize(["landlord", "agent"]),
  validate(createListingSchema),
  listingsController.createListing
);

router.get("/my-listings", listingsController.getMyListings);

router.put(
  "/:id",
  validate(idParamSchema, "params"),
  validate(updateListingSchema),
  listingsController.updateListing
);

router.delete(
  "/:id",
  validate(idParamSchema, "params"),
  listingsController.deleteListing
);

router.post(
  "/:id/submit",
  validate(idParamSchema, "params"),
  listingsController.submitForReview
);

module.exports = router;

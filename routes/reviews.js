const express = require("express");
const router = express.Router({ mergeParams: true }); // mergeParams to access :id from parent
const Listing = require("../models/listing");
const Review = require("../models/review");

const { wrapAsync } = require("../utils/wrapAsync");
const { isLoggedIn,isAuthor, validateReview } = require("../middleware");
const reviewcontroller = require("../controllers/reviews");

// Create review
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewcontroller.createReview));

// Delete review
router.delete("/:reviewId", isLoggedIn, isAuthor, wrapAsync(reviewcontroller.deleteReview));

module.exports = router;

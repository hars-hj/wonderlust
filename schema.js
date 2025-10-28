const Joi = require("joi");

// Listing schema
const listingSchema = Joi.object({
  title: Joi.string().required().messages({
    "string.empty": "Title is required",
    "any.required": "Title is required"
  }),
  description: Joi.string().required().messages({
    "string.empty": "Description is required",
    "any.required": "Description is required"
  }),
  image: Joi.string().uri().optional().messages({
    "string.empty": "Image URL is required",
    "string.uri": "Image must be a valid URL"
  }),
  price: Joi.number().min(0).required().messages({
    "number.base": "Price must be a number",
    "number.min": "Price cannot be negative",
    "any.required": "Price is required"
  }),
  location: Joi.string().required().messages({
    "string.empty": "Location is required",
    "any.required": "Location is required"
  }),
  country: Joi.string().required().messages({
    "string.empty": "Country is required",
    "any.required": "Country is required"
  })
});

// Review schema
const reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().min(1).max(5).required(),
    comment: Joi.string().required()
  }).required()
});

module.exports = { listingSchema, reviewSchema };
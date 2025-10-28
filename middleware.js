const Listing = require("./models/listing");
const { listingSchema } = require("./schema");
const ExpressError = require("./utils/ExpressError");
const Review = require("./models/review");
const { reviewSchema } = require("./schema");



module.exports.isLoggedIn = (req, res, next) => {
  if(!req.isAuthenticated()){
    req.flash("error","sign in first");
    req.session.redirectUrl = req.originalUrl
   return res.redirect("/login");

  } 
  next();
};

module.exports.saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
      next();  
}

module.exports.isOwner = async(req,res,next)=>{
  const { id } = req.params;
  
  let listing = await Listing.findById(id);
  if (listing.owner.toString() !== req.user._id.toString()) {
  req.flash("error", "you are not the owner of this listing");
  return res.redirect(`/listing/${id}`);
}
next();
};

module.exports.isAuthor = async(req,res,next)=>{
  const { id, reviewId } = req.params;

  let review = await Review.findById(reviewId);
  if (review.author.toString() !== req.user._id.toString()) {
  req.flash("error", "you are not the author of this review");
  return res.redirect(`/listing/${id}`);
}
next();
};

module.exports. validateListing  = (req, res, next)=> {
  const { error } = listingSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const msg = error.details.map(el => el.message).join(", ");
    throw new ExpressError(msg, 400);
  }
  next();
}

module.exports.validateReview = (req, res, next)=>{
  const { error } = reviewSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const msg = error.details.map(el => el.message).join(", ");
    throw new ExpressError(msg, 400);
  }
  next();
}
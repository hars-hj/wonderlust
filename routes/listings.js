const express = require("express");
const router = express.Router();
const { wrapAsync } = require("../utils/wrapAsync");
const { isLoggedIn, isOwner, validateListing }= require("../middleware");

const listingcontroller = require("../controllers/listings");

const multer  = require('multer')
const {storage} = require("../cloudconfig");
const upload = multer({ storage })


// Index route
router
.route("/").get( wrapAsync(listingcontroller.index))
//Create route
  .post(isLoggedIn,
    validateListing,
    upload.single("image"),
    wrapAsync(listingcontroller.creatNewForm));
 

// New form
router.get("/new", isLoggedIn, listingcontroller.renderNewForm);


router
  .route("/:id")
  // Show route
  .get( wrapAsync(listingcontroller.show))
  // Update route
  .put( isLoggedIn, isOwner,upload.single("image"), validateListing, wrapAsync(listingcontroller.update))
   // Delete route
  .delete( isLoggedIn,isOwner, wrapAsync(listingcontroller.delete));




// Edit form
router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(listingcontroller.Edit));


module.exports = router;

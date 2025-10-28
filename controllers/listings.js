const Listing =  require("../models/listing");


module.exports.index = async (req, res) => {
  const alllisting = await Listing.find({});
  res.render("listing/index", { alllisting });
};


module.exports.renderNewForm = (req, res) => {
  res.render("listing/newform");
  
};

module.exports.creatNewForm = async (req, res) => {
  const { title, description, location, country, price } = req.body;
  // Extract Cloudinary image data
  const url = req.file.path;
  const filename = req.file.filename;
  // Create new listing
  const newListing = new Listing({
    title,
    description,
    image: { url, filename }, 
    price,
    location,
    country,
    owner: req.user._id
  });

  await newListing.save();
  req.flash("success", "New listing created!");
  res.redirect("/listing");
};


module.exports.show = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id).populate({path: "reviews", populate: {path: "author"}}).populate("owner");
 
  res.render("listing/show", { listing });
};

module.exports.Edit = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);

  let originalurl = listing.image.url;
  originalurl.replace("/upload", "/upload/h_300,w_250")
  res.render("listing/edit", { listing });
};

module.exports.update = async (req, res) => {
  const { id } = req.params;
  const { title, description, location, country, price } = req.body;

  // Update the text fields
  const listing = await Listing.findByIdAndUpdate(
    id,
    { title, description, price, location, country },
    { new: true }
  );

  // If a new image is uploaded, replace the old one
  if (req.file) {
    const url = req.file.path;
    const filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }

  req.flash("success", "Listing updated successfully!");
  res.redirect(`/listing/${id}`);
};


module.exports.delete = async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndDelete(id);
  
   req.flash("success", "Listing deleted!");
  res.redirect("/listing");
};
const Listing = require("../models/listing");

module.exports.index = async(req, res) => {
   const allListings = await Listing.find({});
   res.render("listings/index.ejs", {allListings});
};

module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
    const { id } = req.params;

    const listing = await Listing.findById(id)
        .populate({
            path: "reviews",
            populate: {
                path: "author",
            },
        })
        .populate("owner");

    res.render("listings/show.ejs", {
        listing,
        mapToken: process.env.MAPTILER_API_KEY
    });
};

module.exports.createListing = async (req, res) => {
  let url = req.file.path;
  let filename = req.file.filename;

  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };

  const query = `${req.body.listing.location} ${req.body.listing.country}`;

const geoRes = await fetch(
  `https://api.maptiler.com/geocoding/${encodeURIComponent(query)}.json?key=${process.env.MAPTILER_API_KEY}`
);

const geoData = await geoRes.json();

let coordinates = [0, 0];

if (geoData.features && geoData.features.length > 0) {
  coordinates = geoData.features[0].geometry.coordinates;
}

newListing.geometry = {
  type: "Point",
  coordinates
};

  await newListing.save();
  req.flash("success", "New Listing Created!");
  res.redirect("/listings");
};



module.exports.renderEditForm = async(req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing) {
        req.flash("error", "Listing you requested for does not exist");
        return res.redirect("/listings");
    }


    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
    res.render("listings/edit.ejs", { listing, originalImageUrl });
};

// module.exports.updateListing = async(req, res) => {
//     let {id} = req.params;
//     let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});
    
//     if(typeof req.file !== "undefined") {
//     let url = req.file.path;
//     let filename = req.file.filename;
//     listing.image = {url, filename};
//     await listing.save();
//     }
//     req.flash("success", "Listing Updated!");
//     res.redirect(`/listings/${id}`);
// };

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;

    let listing = await Listing.findByIdAndUpdate(
        id,
        { ...req.body.listing },
        { new: true }
    );

    
    const query = `${req.body.listing.location} ${req.body.listing.country}`;

    const geoRes = await fetch(
        `https://api.maptiler.com/geocoding/${encodeURIComponent(query)}.json?key=${process.env.MAPTILER_API_KEY}`
    );

    const geoData = await geoRes.json();

    if (geoData.features && geoData.features.length > 0) {
        listing.geometry = {
            type: "Point",
            coordinates: geoData.features[0].geometry.coordinates
        };
    }

    //  update image if new file uploaded
    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };
    }

    await listing.save();

    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async(req, res)=> {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
};
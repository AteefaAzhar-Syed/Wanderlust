// require("dotenv").config();
require("dotenv").config();

// const mongoose = require("mongoose");
// const Listing = require("../models/listing.js");
// const MAPTILER_API_KEY = process.env.MAPTILER_API_KEY;
// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

const mongoose = require("mongoose");
const Listing = require("../models/listing");

const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/wanderlust";
const MAPTILER_API_KEY = process.env.MAPTILER_API_KEY;

async function geocodeListing(location, country) {
  const query = country ? `${location}, ${country}` : location;

  const url = `https://api.maptiler.com/geocoding/${encodeURIComponent(query)}.json?key=${MAPTILER_API_KEY}&language=en`;

  const res = await fetch(url);
  const data = await res.json();

  if (data.features && data.features.length > 0) {
    const best = data.features[0];

    if (best.relevance >= 0.5) {
      return best.geometry.coordinates;
    }
  }

  return null;
}

async function main() {
  await mongoose.connect(MONGO_URL);

  const listings = await Listing.find({});

  for (let listing of listings) {
    const coords = await geocodeListing(listing.location, listing.country);

    if (coords) {
      listing.geometry = {
        type: "Point",
        coordinates: coords,
      };

      await listing.save();
      console.log(`Updated: ${listing.title} → ${coords}`);
    } else {
      console.log(`Could not geocode: ${listing.title}`);
    }
  }

  mongoose.connection.close();
  console.log("Done!");
}

main();
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = process.env.ATLASDB_URL;

async function main() {
  await mongoose.connect(MONGO_URL);
}

main()
  .then(async () => {
    console.log("Connected to Atlas DB");
    await initDB();
    mongoose.connection.close();
  })
  .catch((err) => {
    console.log(err);
  });

// const initDB = async () => {
//   await Listing.deleteMany({});

//   initData.data = initData.data.map((obj) => ({
//     ...obj,
//     owner: "6a1d350f2693b27ad3135491", // demo user ID from Atlas
//   }));

//   await Listing.insertMany(initData.data);

//   console.log("Data was initialized");
// };

const initDB = async () => {
  await Listing.deleteMany({});

  const seededData = await Promise.all(
    initData.data.map(async (obj) => {
      const query = `${obj.location} ${obj.country}`;

      const geoRes = await fetch(
        `https://api.maptiler.com/geocoding/${encodeURIComponent(query)}.json?key=${process.env.MAPTILER_API_KEY}`
      );

      const geoData = await geoRes.json();

      let coordinates = [0, 0];

      if (geoData.features && geoData.features.length > 0) {
        coordinates = geoData.features[0].geometry.coordinates;
      }

      return {
        ...obj,
        owner: "6a1d350f2693b27ad3135491",
        geometry: {
          type: "Point",
          coordinates,
        },
      };
    })
  );

  await Listing.insertMany(seededData);
  console.log("Data was initialized");
};
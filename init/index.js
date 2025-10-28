const mongoose = require("mongoose");
const data = require("./data.js");
const Listing = require("../models/listing.js")
const initData = require("./data.js");

main().then(()=>{
    console.log("database is running");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wonderlust");
}

const initDb = async () => {
  await Listing.deleteMany({});
  
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "68e7b79d7846971e4ec28cf3",
  }));

  await Listing.insertMany(initData.data);
  console.log("Data initialized");
};
initDb();

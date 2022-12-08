const dotenv = require("dotenv");
const fs = require("fs");
const mongoose = require("mongoose");
const UserModel = require("./../Model/userModel");
const HouseModel = require("./../Model/HouseModel");
const ReviewModel = require("./../Model/reviewModel");
dotenv.config({ path: "./../config.env" });
process.argv[2] = "accept";
console.log(process.env, process.argv);
const DB = process.env.DATABASE.replace("<password>", process.env.PASSWORD);

mongoose
  .connect(DB)
  .then(() => {
    console.log("sucesssfully connected to the database");
  })
  .catch((err) => {
    console.log(err);
  });
const venue = JSON.parse(fs.readFileSync(`${__dirname}/venue.json`, "utf-8"));
const user = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, "utf-8"));
const review = JSON.parse(fs.readFileSync(`${__dirname}/review.json`, "utf-8"));
console.log(review);
const sendDataToDatabase = async () => {
  try {
    await HouseModel.create(venue);
    await UserModel.create(user, { validateBeforeSave: false });
    await ReviewModel.create(review);
    console.log("succcessfully sent to the database");
  } catch (err) {
    console.log(err);
  }
};

const deleteFromDatabase = async () => {
  try {
    await HouseModel.deleteMany();
    await UserModel.deleteMany();
    await ReviewModel.deleteMany();
    console.log("deleted from the database");
  } catch (err) {
    console.log(err);
  }
};

(async function () {
  if (process.argv[2] === "accept") {
    await sendDataToDatabase();
  }
  if (process.argv[2] === "delete") {
    await deleteFromDatabase();
  }
})();

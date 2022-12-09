const dotenv = require("dotenv");
const mongoose = require("mongoose");
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message, err.stack);
  process.exit(1);
});

dotenv.config({ path: `${__dirname}/config.env` });
const app = require("./startServer");
// console.log(process.env.PASSWORD);
const DB = process.env.DATABASE.replace("<password>", process.env.PASSWORD);
mongoose
  .connect(DB)
  .then(() => {
    console.log("you are connected to the database");
  })
  .catch((err) => {
    console.log(err);
  });
const PORT = 2000;
const server = app.listen(PORT, "127.0.0.1", () => {
  console.log(`you are listening at port 2000`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.message, err.name, err.stack);
  server.close(() => {
    process.exit(1);
  });
});

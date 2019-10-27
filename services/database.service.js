const mongoose = require("mongoose");
require("dotenv").config();

const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const url = process.env.DB_URL;

mongoose.connect(`mongodb+srv://${user}:${password}@${url}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

module.exports = {
  dbConnect: mongoose.connection
};

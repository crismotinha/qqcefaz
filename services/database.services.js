const mongoose = require("mongoose");

const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const url = process.env.DB_URL;

module.exports = {
    dbConnect: () =>
        mongoose.connect(`mongodb+srv://${user}:${password}@${url}`, {
            useNewUrlParser: true
        })
}
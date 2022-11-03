const mongooseConfig = require("mongoose");

mongoose.connect(process.env.DATABASE_URL);
mongoose.Promise = global.Promise;

module.exports = mongooseConfig;

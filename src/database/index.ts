const mongooseConfig = require("mongoose");

mongooseConfig.connect(process.env.DATABASE_URL);
mongooseConfig.Promise = global.Promise;

module.exports = mongooseConfig;

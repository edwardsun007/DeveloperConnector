// check env
if (process.env.NODE_ENV === "production") {
  module.export = require("./keys_prod");
} else {
  module.export = require("./keys_dev"); // load different file for production and dev env
}

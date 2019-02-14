const Validator = require("validator");
const isEmpty = require("./is_Empty");
// read more about validator.js @ https://www.npmjs.com/package/validator

/*@param data: this will be req.body */
module.exports = function validateLoginInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  // the above use my own isEmpty validator

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  return {
    errors, // same as ES5 errors: errors
    isValid: isEmpty(errors)
  };
};

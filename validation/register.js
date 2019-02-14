const Validator = require("validator");
const isEmpty = require("./is_Empty");
// read more about validator.js @ https://www.npmjs.com/package/validator

/*@param data: this will be req.body */
module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : ""; // problem is that if user leave name empty on frontend, its not gonna be empty string in req.body, so we need to call isEmpty to check and set to '' if it is
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";
  // the above use my own isEmpty validator

  // name field
  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 characters";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be between 6 and 30 characters";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password field is required";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Password not match!";
  }

  return {
    errors, // same as ES5 errors: errors
    isValid: isEmpty(errors)
  };
};

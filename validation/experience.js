const Validator = require("validator");
const isEmpty = require("./is_Empty");
// read more about validator.js @ https://www.npmjs.com/package/validator

module.exports = function validateExperienceInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.company = !isEmpty(data.company) ? data.company : "";
  data.location = !isEmpty(data.location) ? data.location : "";
  data.from = !isEmpty(data.from) ? data.from : "";
  // the above use my own isEmpty validator

  if (Validator.isEmpty(data.title)) {
    errors.title = "Job title is required";
  }

  if (Validator.isEmpty(data.company)) {
    errors.company = "Company name is required";
  }

  if (Validator.isEmpty(data.location)) {
    errors.location = "Company location is required";
  }

  if (Validator.isEmpty(data.from)) {
    errors.from = "From date is required";
  }

  return {
    errors, // same as ES5 errors: errors
    isValid: isEmpty(errors)
  };
};

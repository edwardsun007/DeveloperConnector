const Validator = require("validator");
const isEmpty = require("./is_Empty");
// read more about validator.js @ https://www.npmjs.com/package/validator

/**/
module.exports = function validatePostInput(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : "";

  // the above use my own isEmpty validator
  if (!Validator.isLength(data.text, { min: 10, max: 300 })) {
    errors.text = "Post must be between 10 to 300 characters";
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = "Text field is required";
  }

  return {
    errors, // same as ES5 errors: errors
    isValid: isEmpty(errors)
  };
};

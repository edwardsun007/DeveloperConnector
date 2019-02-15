const Validator = require("validator");
const isEmpty = require("./is_Empty");
// read more about validator.js @ https://www.npmjs.com/package/validator

/*@param data: this will be req.body */
module.exports = function validateProfileInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.status = !isEmpty(data.status) ? data.status : "";
  data.skills = !isEmpty(data.skills) ? data.skills : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  // the above use my own isEmpty validator

  if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = `handle needs to be between 2 and 4 characters`;
  }

  if (Validator.isEmpty(data.handle)) {
    errors.handle = "Profile handle is required";
  }

  if (Validator.isEmpty(data.status)) {
    errors.status = "Status is required";
  }

  if (Validator.isEmpty(data.skills)) {
    errors.skills = "Skills are required";
  }

  if (!isEmpty(data.website)) {
    if (!Validator.isURL(data.website)) {
      errors.website = "Not a valid URL";
    }
  }

  // validate Social
  if (!isEmpty(data.youtube)) {
    if (!Validator.isURL(data.youtube)) {
      errors.youtube = "Not a valid URL";
    }
  }

  if (!isEmpty(data.linkedIn)) {
    if (!Validator.isURL(data.linkedIn)) {
      errors.linkedIn = "Not a valid URL";
    }
  }

  if (!isEmpty(data.twitter)) {
    if (!Validator.isURL(data.twitter)) {
      errors.twitter = "Not a valid URL";
    }
  }

  if (!isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {
      errors.facebook = "Not a valid URL";
    }
  }

  if (!isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram)) {
      errors.instagram = "Not a valid URL";
    }
  }

  return {
    errors, // same as ES5 errors: errors
    isValid: isEmpty(errors)
  };
};

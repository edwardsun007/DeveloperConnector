// this is copied from the app folder validation js file but renamed to is-Empty
// ES6 don't need return statement
const isEmpty = value =>
  value === undefined ||
  value === null ||
  (typeof value === "object" && Object.keys(value).length === 0) ||
  (typeof value === "string" && value.trim().length === 0);
// undefined or null or for object, if there are no keys

export default isEmpty;

const path = require("path");
exports.rootDir = path.dirname(require.main.filename);

exports.throwError = (err, statusCode) => {
  const error = new Error(err);
  error.httpStatusCode = statusCode;
  return error;
};

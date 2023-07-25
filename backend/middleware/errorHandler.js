const { model } = require("mongoose");

const errorCode = {
  NOT_FOUND: 404,
  BAD_REQUEST: 400,
  INTERNAL_SERVER: 500,
};

const errorHandler = (err, req, res, next) => {
  console.log("error handler touched");
  const statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    case errorCode.BAD_REQUEST:
      res.json({
        title: "Validation error",
        message: err.message,
      });

    default:
      res.status(500).json({
        title: "internal server error",
        message: err.message,
      });
  }
  next();
};

module.exports = errorHandler;

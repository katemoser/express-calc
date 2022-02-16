"use strict";
/** Simple demo Express app. */

const express = require("express");
const axios = require("axios");
const { STATUS_CODES } = require("http");
const app = express();


// useful error class to throw
const { NotFoundError } = require("./expressError");

//string array to num array function
const { convertStrNums } = require("./utils")

//import stats functions
const { findMean } = require("./stats")
const { findMedian } = require("./stats")
const { findMode } = require("./stats")


const MISSING = "Expected key `nums` with comma-separated list of numbers.";

/** finds mean, mode, median of nums in qs:
 * returns {
  operation: "all",
  mean: 12
  median: 10,
  mode: 8}

 */
app.get("/all", function (req, res) {

  const nums = convertStrNums(req.query.nums);

  return res.json({
    response:{
      operations: "all",
      mode: findMode(nums),
      mean: findMean(nums),
      median: findMedian(nums),
    }
  });

});

/** Finds mean of nums in qs: returns {operation: "mean", result } */
app.get("/mean", function (req, res) {

  //call function to turn string into array of nums
  const nums = convertStrNums(req.query.nums);

  //call mean function
  const mean = findMean(nums);

  // return res.send(`This is the mean of ${nums}: ${mean}`);
  return res.json({
    response: {
      operation: "mean",
      value: mean,
    }
  });
});


/** Finds median of nums in qs: returns {operation: "median", result } */
app.get("/median", function (req, res) {

  const nums = convertStrNums(req.query.nums);

  //call median function
  const median = findMedian(nums);

  // return res.send(`This is the median of ${nums}: ${median}`);
  return res.json({
    response: {
      operation: "median",
      value: median,
    }
  });
});


/** Finds mode of nums in qs: returns {operation: "mean", result } */
app.get("/mode", function (req, res) {

  const nums = convertStrNums(req.query.nums);

  //call mode function
  const mode = findMode(nums);

  // return res.send(`This is the mode of ${nums}: ${mode}`);
  return res.json({
    response: {
      operation: "mode",
      value: mode,
    }
  });
});


/** 404 handler: matches unmatched routes; raises NotFoundError. */
app.use(function (req, res, next) {
  throw new NotFoundError();
});

/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});

function stringToNumArray(numString) {
  const nums = numString.split(",").map(n => parseInt(n));
  return nums;
}

module.exports = app;
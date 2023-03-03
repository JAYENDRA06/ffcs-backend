const jwt = require("jsonwebtoken");
const pool = require('../config/pool')

require("dotenv").config();

// creating new user
const createUser = async (req, res) => {
  console.log("in createUser");
  
};

module.exports = {
  createUser,
};

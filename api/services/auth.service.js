const jwt = require("jsonwebtoken");
require("dotenv").config();

const { Student, Admin } = require("../models/index");

const userSecret = process.env.USER_SECRET;
const adminSecret = process.env.ADMIN_SECRET;

const authenticateStudentToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Get token from header
  console.log(token);
  if (!token) {
    return res.status(401).json({ message: "Authorization failed" });
  }

  try {
    const decodedToken = jwt.verify(token, userSecret);
    console.log(decodedToken);

    const student = await Student.findOne({
      where: { id: decodedToken },
    });
    if (!student) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    req.userID = decodedToken;

    next();
  } catch(err) {
    return res.status(401).json({ message: "Authorization failed", err });
  }
};

const authenticateAdminToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Get token from header
  console.log(token);
  if (!token) {
    return res.status(401).json({ message: "Authorization failed" });
  }

  try {
    const decodedToken = jwt.verify(token, adminSecret);
    console.log(decodedToken);

    const admin = await Admin.findOne({
      where: { id: decodedToken },
    });
    if (!admin) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    next();
  } catch(err) {
    return res.status(401).json({ message: "Authorization failed", err });
  }
};

module.exports = {
  authenticateStudentToken,
  authenticateAdminToken,
};

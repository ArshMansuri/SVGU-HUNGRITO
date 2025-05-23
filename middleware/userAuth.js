const jwt = require("jsonwebtoken");
const User = require("../model/User");
// const Restaurant = require("../model/Restaurant");
// const Admin = require("../model/Admin");
const DelBoy = require("../model/DelBoy");
const Restaurant = require("../model/Restaurant");
const Admin = require("../model/Admin");

exports.isUserAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ message: "Login First" });
    }

    const decoded = jwt.verify(token, process.env.JWT);
    req.user = await User.findById(decoded._id);
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.isRestuAuth = async (req, res, next) => {
  try {
    const { restoken } = req.cookies;
    if (!restoken) {
      return res.status(401).json({ message: "Login First" });
    }

    const decoded = jwt.verify(restoken, process.env.JWT);
    req.restu = await Restaurant.findById(decoded._id);
    if (req.restu?.isVerify === true) {
      if (req.restu?.active === false) {
        return res.status(401).json({ message: "You Are Inactive" });
      }
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.isAdminAuth = async (req, res, next) => {
  try {
    const { admintoken } = req.cookies;
    if (!admintoken) {
      return res.status(401).json({ message: "Login First" });
    }

    const decoded = jwt.verify(admintoken, process.env.JWT);
    req.admin = await Admin.findById(decoded._id);
    const admin = await Admin.findById(req.admin._id);
    if (!admin.isActive) {
      return res
        .status(401)
        .json({ success: false, message: "Admin is not active" });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.isDbAuth = async (req, res, next) => {
  try {
    const { delboytoken } = req.cookies;
    if (!delboytoken) {
      return res.status(401).json({ message: "Login First" });
    }

    const decoded = jwt.verify(delboytoken, process.env.JWT);
    req.delBoy = await DelBoy.findById(decoded._id);

    if (req.delBoy.isVerify === true) {
      if (req.delBoy.isBanned === true) {
        return res.status(401).json({ message: "You Are Banned" });
      }
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

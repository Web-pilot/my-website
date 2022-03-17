const router = require("express").Router();
const User = require("../model/user");
const { verifyTokenAndAdmin, verifiedToken } = require("./verifiedToken");
const CryptoJS = require("crypto-js");

//DELETE USER
router.delete("/delete/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted successfully");
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET USER
router.get("/", verifiedToken, async (req, res) => {
  try {
    const allUsers = await User.find();
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET A SINGLE USER
router.get("/:id", verifiedToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

//EDIT A USER
router.put("/edit/:id", verifiedToken, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString();
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;

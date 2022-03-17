const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const CryptoJS = require("crypto-js");

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, isAdmin: user.isAdmin },
    process.env.JWT_SEC,
    {
      expiresIn: "3d",
    }
  );
};
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });

  try {
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(404).json("No user found the email and password");

    const hashedPass = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    const originalPassword = hashedPass.toString(CryptoJS.enc.Utf8);
    originalPassword !== req.body.password &&
      res.status(401).json("Email or password is incorrect!");

    const accessToken = generateToken(user);
    const { password, ...other } = user._doc;

    res.status(200).json({ ...other, accessToken });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;

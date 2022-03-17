const router = require("express").Router();

const Language = require("../model/language");
const { verifyTokenAndAdmin } = require("./verifiedToken");

//CREATE A MESSAGE
router.post("/create", verifyTokenAndAdmin, async (req, res) => {
  const newLanguage = new Language({
    name: req.body.name,
    link: req.body.link,
  });
  try {
    const language = await newLanguage.save();
    res.status(200).json(language);
  } catch (error) {
    res.status(500).json(error);
  }
});

//EDIT A LANGUAGE
router.put("/edit/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const newLanguage = await Language.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(newLanguage);
  } catch (error) {
    res.status(500).json(error);
  }
});

//DELETE A LANGUAGE
router.delete("/delete/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Language.findByIdAndDelete(req.params.id);
    res.status(200).json("Language has been deleted succesfully");
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET ALL MESSAGE
router.get("/", async (req, res) => {
  try {
    const language = await Language.find();
    res.status(200).json(language);
  } catch (error) {
    res.status(200).json(error);
  }
});

//GET A SINGLE MESSAGE
router.get("/:id", async (req, res) => {
  try {
    const user = await Language.findById(req.body.params);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

//DELETE ALL LANGUAGE
router.delete("/deleteall", verifyTokenAndAdmin, async (req, res) => {
  try {
    const language = await Language.find({ title: req.body.title });
    res.status(language);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;

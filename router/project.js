const router = require("express").Router();
const Projects = require("../model/project");
const { verifyTokenAndAdmin } = require("./verifiedToken");

//POST A PROJECT
router.post("/create", verifyTokenAndAdmin, async (req, res) => {
  const project = new Projects({
    title: req.body.title,
    desc: req.body.desc,
    link: req.body.link,
    lang: req.body.lang,
    img: req.body.img,
  });

  try {
    const newProject = await project.save();
    res.status(200).json(newProject);
  } catch (error) {
    res.status(500).json(error);
  }
});

//EDIT A PROJECT
router.put("/edit/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedProject = await Projects.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(500).json(error);
  }
});

//DELETE A PROJECT
router.delete("/delete/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const deletedItem = await Projects.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json(
        `Application with the name "${deletedItem.title}" has been deleted`
      );
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET ALL PROJECT
router.get("/", async (req, res) => {
  const query = req.query.new;
  const category = req.query.category;
  try {
    let projects = [];
    if (category) {
      projects = await Projects.find({ lang: category });
    } else if (query) {
      projects = await Projects.find().sort({ _id: -1 }).limit(1);
    } else {
      projects = await Projects.find();
    }
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET A PARTICULAR PROJECT
router.get("/:id", async (req, res) => {
  try {
    const oneProject = await Projects.findById(req.params.id);
    res.status(200).json(oneProject);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;

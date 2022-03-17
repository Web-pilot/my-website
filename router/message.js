const router = require("express").Router();
const Message = require("../model/message");
const { verifyTokenAndAdmin } = require("./verifiedToken");

//CREATE A MESSAGE
router.post("/create", verifyTokenAndAdmin, async (req, res) => {
  const newMessage = new Message({
    title: req.body.title,
    desc: req.body.desc,
  });
  try {
    const message = await newMessage.save();
    res.status(200).json(message);
  } catch (error) {
    res.status(500).json(error);
  }
});

//EDIT A MESSAGE
router.put("/edit/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const newMessage = await Message.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(newMessage);
  } catch (error) {
    res.status(500).json(error);
  }
});

//DELETE A MESSAGE
router.delete("/delete/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.status(200).json("Message has been deleted succesfully");
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET ALL MESSAGE
router.get("/", async (req, res) => {
  try {
    const messages = await Message.find();
    res.status(200).json(messages);
  } catch (error) {
    res.status(200).json(error);
  }
});

//GET A SINGLE MESSAGE
router.get("/:id", async (req, res) => {
  try {
    const user = await Message.findById(req.body.params);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

//DELETE ALL MESSAGE
router.delete("/deleteall", verifyTokenAndAdmin, async (req, res) => {
  try {
    const messages = await Message.find({ title: req.body.title });
    res.status(messages);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;

const express = require("express");
const mongoose = require("mongoose");
const projectRoute = require("./router/project");
const userRoute = require("./router/user");
const messageRoute = require("./router/message");
const authRoute = require("./router/auth");
const languageRoute = require("./router/language");
const cors = require("cors");

const app = express();

const dotenv = require("dotenv");
dotenv.config();

mongoose
  .connect(process.env.MONGOOSE_URI)
  .then(() => {
    console.log("Database is working as expected");
  })
  .catch((err) => console.error(err));

app.use(cors());
app.use(express.json());
app.use("/api/projects", projectRoute);
app.use("/api/account", authRoute);
app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);
app.use("/api/language", languageRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT || 3000, () => {
  console.log(`App is listening at Port ${PORT}`);
});

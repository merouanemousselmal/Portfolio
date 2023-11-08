const express = require("express");
const app = express();
const port = 3000;
const db = require("./firebase");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const axios = require("axios");

app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("<h1>Server...</h1>");
});
app.post("/addUser", async (req, res) => {
  const key = "6LcaCggpAAAAAGQpUTGuuO5ps5dx5vX0NHE3wiq7";
  const { newUser, token } = JSON.parse(Object.keys(req.body)[0]);
  const { data } = await axios.get(
    `https://www.google.com/recaptcha/api/siteverify?secret=${key}&response=${token}`
  );
  if (!data.success && !data["error-codes"] === "timeout-or-duplicate") {
    return res
      .header("Access-Control-Allow-Origin", "*")
      .send(
        "Something went wrong with the captcha verification, please reload the page and try again."
      );
  }
  try {
    if (
      newUser.Firstname &&
      newUser.Lastname &&
      newUser.Email.includes("@") &&
      newUser.PhoneNumber.length === 10 &&
      newUser.Age < 99 &&
      newUser.Age > 16 &&
      newUser.Field &&
      newUser.Level &&
      newUser.Profession &&
      newUser.University &&
      newUser.Skills &&
      newUser.SkillRate > 0 &&
      newUser.SkillRate < 6 &&
      newUser.Motivation &&
      newUser.Expectation
    ) {
      await db
        .collection("users")
        .doc()
        .set({ ...newUser, id: uuidv4(), Status: "Not interviewed" });
      return res
        .header("Access-Control-Allow-Origin", "*")
        .send("Registration was successful");
    } else {
      return res
        .header("Access-Control-Allow-Origin", "*")
        .send("Something went wrong with your inputs");
    }
  } catch (error) {
    return res
      .header("Access-Control-Allow-Origin", "*")
      .send("Something went wrong");
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

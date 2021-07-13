const { json } = require("express");
const express = require("express");
const router = express.Router();
const User = require("../models/auth");
const axios = require("axios");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const axiosi = axios.create({
  baseURL: "http://sgse2.ad.fh-bielefeld.de/api/",
  timeout: 1000,
});

const { check, validationResult } = require("express-validator");

let refreshTokens = [];
const accessTokenSecret = "somerandomaccesstoken";
const refreshTokenSecret = "somerandomstringforrefreshtoken";


router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post(
  "/signup",
  [check("username").isLength({ min: 3 }), check("email").isEmail()],
  SignUp,
  async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;

    const errors = validationResult(req);

    if (errors.isEmpty()) {
      const user = new User({
        username: req.body.username,
        password: req.body.password,
        role: req.body.role,
        email: req.body.email,
      });
      try {
        axiosi
          .get("/email/registerConfirmation", {
            params: {
              email: req.body.email,
              inhalt: "sgse2.ad.fh-bielefeld.de/api/email/confirm",
            },
          })
          .catch(function (error) {
            console.log(error);
          });
        const newUser = await user.save();
        res.sendStatus(201);
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
    } else {
      return res.status(422).json({ errors: errors.array() });
    }
  }
);

router.post("/login", getUser, (req, res) => {
  // read username and password from request body
  const { username, password } = req.body;


  // filter user from the users array by username and password
  const validuser = res.user;


  if (res.user) {
    // generate an access token
    const accessToken = jwt.sign(
      {
        username: res.user.username,
        role: res.user.role,
        id: res.user._id,
        email: res.user.email,
      },
      accessTokenSecret,
      { expiresIn: "60m" }
    );
    const refreshToken = jwt.sign(
      {
        username: res.user.username,
        role: res.user.role,
        id: res.user._id,
        email: res.user.email,
      },
      refreshTokenSecret
    );

    refreshTokens.push(refreshToken);

    res.json({
      accessToken,
      refreshToken,
    });
  } else {
    res.send("Username or password incorrect");
  }
});

router.post("/token", (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.sendStatus(401);
  }

  if (!refreshTokens.includes(token)) {
    return res.sendStatus(403);
  }

  jwt.verify(token, refreshTokenSecret, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }

    const accessToken = jwt.sign(
      {
        username: user.username,
        role: user.role,
        id: user.id,
        email: user.email,
      },
      accessTokenSecret,
      { expiresIn: "1m" }
    );

    res.json({
      accessToken,
    });
  });
});

router.post("/logout", (req, res) => {
  const { token } = req.body;
  refreshTokens = refreshTokens.filter((t) => t !== token);

  res.send("Logout successful");
});

router.delete("/", deleteUser, async (req, res) => {
  try {
    await res.user.remove();
    res.json({ message: "Deleted User" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getUser(req, res, next) {
  try {
    user = await User.findOne({
      username: req.body.username,
      password: req.body.password,
    });

    if (user == null) {
      return res.status(404).json({ message: "Invalid User" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.user = user;
  next();
}

async function SignUp(req, res, next) {
  try {
    user = await User.findOne({
      username: req.body.username,
    });

    if (user != null) {
      return res.status(403).json({ message: "User already exists" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  next();
}

async function deleteUser(req, res, next) {
  try {
    userToDelete = await User.findById(req.params.id);

    if (user == null) {
      return res.status(404).json({ message: "Invalid User" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.userToDelete = userToDelete;
  next();
}

module.exports = router;

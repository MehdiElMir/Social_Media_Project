const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { cloudinary } = require("../cloudinary");

router.post("/register", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.send("User registered successfully");
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
      password: req.body.password,
    });
    if (user) res.status(200).send(user);
    else res.status(401).send("Invalid credentials");
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

router.get("/getallusers", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

router.post("/followuser", async (req, res) => {
  const { currentuserid, receiveruserid } = req.body;
  try {
    let currentuser = await User.findOne({ _id: currentuserid });
    let currentUserFollowing = currentuser.following;
    currentUserFollowing.push(receiveruserid);
    currentuser.following = currentUserFollowing;

    await User.updateOne({ _id: currentuserid }, currentuser);
    let receiveruser = await User.findOne({ _id: receiveruserid });
    let receiverUserFollowers = receiveruser.followers;
    receiverUserFollowers.push(currentuserid);

    receiveruser.followers = receiverUserFollowers;
    await User.updateOne({ _id: receiveruserid }, receiveruser);
    res.send("Followed succesfully");
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

router.post("/unfollowuser", async (req, res) => {
  const { currentuserid, receiveruserid } = req.body;
  try {
    let currentuser = await User.findOne({ _id: currentuserid });
    let currentUserFollowing = currentuser.following;
    const temp1 = currentUserFollowing.filter(
      (obj) => obj.toString() !== receiveruserid
    );
    currentuser.following = temp1;

    await User.updateOne({ _id: currentuserid }, currentuser);
    let receiveruser = await User.findOne({ _id: receiveruserid });
    let receiverUserFollowers = receiveruser.followers;
    const temp2 = receiverUserFollowers.filter(
      (obj) => obj.toString() !== currentuserid
    );

    receiveruser.followers = temp2;
    await User.updateOne({ _id: receiveruserid }, receiveruser);
    res.send("Unfollowed succesfully");
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

router.post("/edit", async (req, res) => {
  try {
    let prevUser = await User.findOne({ _id: req.body._id });
    if (prevUser.profilePicUrl == req.body.profilePicUrl) {
      await User.updateOne({ _id: req.body._id }, req.body);
      const user = await User.findOne({ _id: req.body._id });
      res.send(user);
    } else {
      const uploadResponse = await cloudinary.v2.uploader.upload(
        req.body.profilePicUrl,
        {
          folder: "SocialMundia",
          use_filename: true,
        }
      );

      req.body.profilePicUrl = uploadResponse.url;

      await User.updateOne({ _id: req.body._id }, req.body);
      const user = await User.findOne({ _id: req.body._id });
      res.send(user);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

module.exports = router;

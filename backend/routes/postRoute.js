const express = require("express");
const router = express.Router();
const { cloudinary } = require("../cloudinary");
const Post = require("../models/Post");
const moment = require("moment");

router.post("/addpost", async (req, res) => {
  try {
    const uploadResponse = await cloudinary.v2.uploader.upload(req.body.image, {
      folder: "SocialMundia",
      use_filename: true,
    });

    req.body.image = uploadResponse.url;

    const newpost = new Post(req.body);
    await newpost.save();
    res.status(201).send("Post added Succesfully");
  } catch (error) {
    return res.status(400).json(error);
  }
});
router.get("/getallposts", async (req, res) => {
  try {
    const posts = await Post.find().populate("user");
    res.send(posts);
  } catch (error) {
    return res.status(400).json(error);
  }
});
router.post("/likeorunlike", async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.body.postid });
    let likes = post.likes;

    if (likes.find((obj) => obj.user == req.body.userid)) {
      const temp = likes.filter(
        (obj) => obj.user.toString() != req.body.userid
      );
      post.likes = temp;
      await Post.updateOne({ _id: req.body.postid }, post);
      res.send("Post unliked successfully");
    } else {
      likes.push({
        user: req.body.userid,
        date: moment().format("MMM DD yyyy"),
      });
      post.likes = likes;

      await Post.updateOne({ _id: req.body.postid }, post);
      res.send("Post liked successfully");
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

router.post("/addcomment", async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.body.postid });
    var comments = post.comments;

    comments.push({
      user: req.body.userid,
      date: moment().format("MMM DD yyyy"),
      comment: req.body.comment,
    });
    post.comments = comments;

    await Post.updateOne({ _id: req.body.postid }, post);
    res.send("Comment added successfully");
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});
router.post("/editpost", async (req, res) => {
  try {
    await Post.updateOne({ _id: req.body._id }, req.body);
    res.send("Post updated Succesfully");
  } catch (error) {
    return res.status(400).json(error);
  }
});
router.post("/deletepost", async (req, res) => {
  try {
    await Post.deleteOne({ _id: req.body._id });
    res.send("Post deleted succesfully");
  } catch (error) {
    return res.status(400).json(error);
  }
});
module.exports = router;

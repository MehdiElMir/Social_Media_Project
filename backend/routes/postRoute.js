const express = require("express");
const router = express.Router();
const cloudinary = require("../cloudinary");
const Post = require("../models/Post");

router.post("/addpost", async (req, res) => {
  try {
    const uploadResponse = await cloudinary.v2.uploader.upload(req.body.image, {
      folder: "SocialMundia",
      use_filename: true,
    });

    req.body.image = uploadResponse.url;

    const newpost = new Post(req.body);
    await newpost.save();
    res.status(201).send("Posta added Succesfully");
  } catch (error) {
    return res.status(400).json(error);
  }
});

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
// require the blog model
require("../models/Blog");
// create a Blog model
const Blog = mongoose.model("blogs");

// define a post route
router.post("/", (req, res) => {
  console.log(req.body);
  var newBlog = {
    title: req.body.title,
    description: req.body.description
  };
  // save the new blog to the database
  new Blog(newBlog)
    .save()
    .then(blog => {
      console.log(blog);
    })
    .catch(err => console.log(err));

  res.send("data was sent to post route successfully");
});

module.exports = router;

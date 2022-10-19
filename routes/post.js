const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { isAuth } = require("../middleware/autherization");
const Post = mongoose.model("Post");

router.get("/allpost", (req, res) => {
  Post.find()
    .then((posts) => {
      res.json(posts);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/createpost", isAuth, (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(422).json({ error: "error" });
  }
  req.user.password = undefined;
  const post = new Post({
    title,
    description,
    postedby: req.user,
  });
  post
    .save()
    .then((result) => {
      res.json({ post: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/mypost", isAuth, (req, res) => {
  Post.find({ postedby: req.user._id })
    .then((mypost) => {
      res.json({ mypost });
    })
    .catch((err) => {
      console.log(error);
    });
});

router.put("/like", isAuth, (req, res) => {
  Post.findByIdAndUpdate(
    req.body._id,
    {
      $push: { likes: req.user._id },
    },
    { new: true }
  ).exec((err, result) => {
    if (err) {
      return res.status(422).json({ error: err });
    } else {
      res.json(result);
    }
  });
});

router.put("/unlike", isAuth, (req, res) => {
  Post.findByIdAndUpdate(
    req.body._id,
    {
      $pull: { likes: req.user._id },
    },
    { new: true }
  ).exec((err, result) => {
    if (err) {
      return res.status(422).json({ error: err });
    } else {
      res.json(result);
    }
  });
});

router.put("/comment", isAuth, (req, res) => {
  const comment = {
    text: req.body.text,
    postedby: req.user,
  };
  Post.findByIdAndUpdate(
    req.body._id,
    {
      $push: { comments: comment },
    },
    { new: true }
  )
    .populate("comments.postedby", "_id")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
});

router.put("/uncomment", isAuth, (req, res) => {
  const comment = {
    text: req.body.text,
    postedby: req.user,
  };
  Post.findByIdAndUpdate(
    req.body._id,
    {
      $pull: { comments: comment },
    },
    { new: true }
  )
    .populate("comments.postedby", "_id")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
});

router.delete("/deletepost/:postId", isAuth, (req, res) => {
  Post.findOne({ _id: req.params.postId })
    .populate("postedby", "_id")
    .exec((err, post) => {
      if (err || !post) {
        return res.status(422).json({ error: err });
      }
      if (post.postedby._id.toString() === req.user._id.toString()) {
        post.remove().then((result) => {
          res.json(result);
        });
      }
    });
});

module.exports = router;

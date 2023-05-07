const Post = require('../models/post');
const User = require('../models/user');
const Comment = require('../models/comment');

module.exports = (app) => {
  // CREATE Comment
  app.post('/posts/:postId/comments', async (req, res) => {
    if (req.user) {
      try {
        const comment = new Comment(req.body);
        comment.author = req.user._id;
        await comment.save();

        const user = await User.findById(req.user._id);
        user.comments.unshift(comment);
        await user.save();

        const post = await Post.findById(req.params.postId);
        post.comments.unshift(comment);
        await post.save();

        res.redirect(`/posts/${req.params.postId}`);
      } catch (err) {
        console.log(err.message);
        res.status(500);
      }
    } else {
      return res.status(401); // UNAUTHORIZED
    }
  });
};

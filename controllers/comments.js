const Post = require('../models/post');
const User = require('../models/user');
const Comment = require('../models/comment');
const user = require('../models/user');

module.exports = (app) => {
  // CREATE Comment
  app.post('/posts/:postId/comments', async (req, res) => {
    if (req.user) {
      try {
        const userId = req.user._id;

        // INSTANTIATE INSTANCE OF MODEL
        const comment = new Comment(req.body);
        comment.author = userId;
        // SAVE INSTANCE OF Comment MODEL TO DB
        await comment.save();

        const user = await User.findById(userId);
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

const Post = require('../models/post');

module.exports = (app) => {

  // CREATE
  app.post('/posts/new', async (req, res) => {
    // INSTANTIATE INSTANCE OF POST MODEL
    try {
      const newPost = new Post(req.body);
      // SAVE INSTANCE OF POST MODEL TO DB AND REDIRECT TO THE ROOT
      await newPost.save();
      res.redirect('/')
    } catch (error) {
      console.log(error)
    }
  });

  // LOOK UP THE POST
  app.get('/posts/:id', async (req, res) => {
    try {
      const post = await Post.findById(req.params.id).lean();
      res.render('posts-show', { post })
    } catch (error) {
      console.log(error)
    }
  });

  // SUBREDDIT
  app.get('/n/:subreddit', async (req, res) => {
    try {
      const posts = await Post.find({ subreddit: req.params.subreddit }).lean();
      res.render('posts-index', { posts });
    } catch (err) {
      console.log(err);
    }
  });
};

const Post = require('../models/post');
const User = require('../models/user');

module.exports = (app) => {

  app.get('/', async (req, res) => {
    const currentUser = req.user;

    try {
      const posts = await Post.find({}).lean().populate('author');

      const mappedPosts = posts.map((post) => {
        console.log(post)
        return {
          _id: post._id,
          title: post.title,
          url: post.url,
          author: post.author,
          subreddit: post.subreddit,
        };
      });

      res.render('posts-index', { posts: mappedPosts, currentUser });
    } catch (err) {
      console.log(err.message);
    }
  });

  app.get('/posts/new', (req, res) => {
    res.render('posts-new', { currentUser: req.user });
  })

  // CREATE
  app.post('/posts/new', async (req, res) => {
    if (req.user) {
      // INSTANTIATE INSTANCE OF POST MODEL
      try {
        const userId = req.user._id;
        const post = new Post(req.body);
        post.author = userId;
        // SAVE INSTANCE OF POST MODEL TO DB AND REDIRECT TO THE ROOT
        await post.save();
        const user = await User.findById(userId);
        user.posts.unshift(post);
        await user.save();
        // REDIRECT TO THE NEW POST
        return res.redirect(`/posts/${post._id}`);
      } catch (err) {
        console.log(err.message)
        res.status(500);
      }
    } else {
      return res.status(401); // UNAUTHORIZED
    }
  });

  // LOOK UP THE POST
  app.get('/posts/:id', async (req, res) => {
    try {
      const post = await Post.findById(req.params.id).lean().populate('comments').populate('author');
      res.render('posts-show', { post, currentUser: req.user });
    } catch (err) {
      console.log(err.message);
    }
  });

  // SUBREDDIT
  app.get('/n/:subreddit', async (req, res) => {
    try {
      const currentUser = req.user;
      const { subreddit } = req.params;
      const posts = await Post.find({ subreddit }).lean().populate('author');
      res.render('posts-index', { posts, currentUser });
    } catch (err) {
      console.log(err);
    }
  });
};

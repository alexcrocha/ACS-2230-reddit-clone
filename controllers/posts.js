const Post = require('../models/post');

module.exports = (app) => {

  app.get('/', async (req, res) => {
    const currentUser = req.user;

    try {
      const posts = await Post.find({});

      const mappedPosts = posts.map((post) => {
        return {
          _id: post._id,
          title: post.title,
          url: post.url,
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
        const newPost = new Post(req.body);
        // SAVE INSTANCE OF POST MODEL TO DB AND REDIRECT TO THE ROOT
        await newPost.save();
        res.redirect('/')
      } catch (error) {
        console.log(error)
      }
    } else {
      return res.status(401); // UNAUTHORIZED
    }
  });

  // LOOK UP THE POST
  app.get('/posts/:id', async (req, res) => {
    try {
      const post = await Post.findById(req.params.id).lean().populate('comments');
      res.render('posts-show', { post, currentUser: req.user });
    } catch (err) {
      console.log(err.message);
    }
  });

  // SUBREDDIT
  app.get('/n/:subreddit', async (req, res) => {
    try {
      const posts = await Post.find({ subreddit: req.params.subreddit }).lean();
      res.render('posts-index', { posts, currentUser: req.user });
    } catch (err) {
      console.log(err);
    }
  });
};

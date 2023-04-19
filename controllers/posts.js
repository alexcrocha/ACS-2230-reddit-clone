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
};

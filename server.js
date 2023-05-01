const express = require('express');
const { engine } = require('express-handlebars');

const app = express();

const connectDB = require('./data/reddit-db');
connectDB();

const Post = require('./models/post');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.get('/', async (req, res) => {
  try {
    const posts = await Post.find({}).lean();
    return res.render('posts-index', { posts });
  } catch (err) {
    console.log(err.message);
  }
});

app.get('/posts/new', (req, res) => {
  res.render('posts-new');
})

require('./controllers/posts')(app);


require('./controllers/comments.js')(app);

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});

module.exports = app;

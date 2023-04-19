const express = require('express');
const { engine } = require('express-handlebars');

const app = express();

const connectDB = require('./data/reddit-db');
connectDB();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

require('./controllers/posts')(app);

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/posts/new', (req, res) => {
  res.render('posts-new');
})

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});

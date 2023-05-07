const express = require('express');
const cookieParser = require('cookie-parser');
const checkAuth = require('./middleware/checkAuth');
// const { engine } = require('express-handlebars');
const exphbs = require('express-handlebars');
require('dotenv').config();

const app = express();

app.use(express.static('public'));

const hbs = exphbs.create({
  helpers: {
    allowIdProperty: function (obj) {
      return obj["_id"];
    },
  },
});

app.use(cookieParser());

const connectDB = require('./data/reddit-db');
connectDB();

// const Post = require('./models/post');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', './views');



app.use(checkAuth);
require('./controllers/posts')(app);
require('./controllers/comments.js')(app);
require('./controllers/auth.js')(app);
require('./controllers/replies.js')(app);

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});

module.exports = app;

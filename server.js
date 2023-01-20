const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

//bring in mongoose
const mongoose = require('mongoose');

//bring in method override
const methodOverride = require('method-override');

const blogRouter = require('./routes/blogs');
const Blog = require('./models/Blog');
const app = express();

//connect to mongoose
mongoose.connect(process.env.URI, {useNewUrlParser: true, useUnifiedTopology: true,
  useCreateIndex: true,})
.then(()=>{
  app.listen(process.env.PORT, ()=>{
      console.log('connected to db and server is running on port', process.env.PORT);
  });
})
.catch((error)=>{
  console.log(error);
})


//set template engine
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
//route for the index
app.get('/', async (request, response) => {
  let blogs = await Blog.find().sort({ timeCreated: 'desc' });

  response.render('index', { blogs: blogs });
});

app.use(express.static('public'));
app.use('/blogs', blogRouter);

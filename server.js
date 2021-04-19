const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { result } = require('lodash');
const blogRoutes = require('./routes/blogRoutes');
//express app

const app = express();

// connect to database mongoDb
const dbURI = 'mongodb+srv://nikhil:test1234@cluster0.yzayx.mongodb.net/node-tuts?retryWrites=true&w=majority';
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));


//register view engine
app.set('view engine', 'ejs');
//app.set('views','myviewsfoldername');


//listen for requests
// app.listen(3000);


//middleware & static files

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}));
app.use(morgan('dev'));

// mongoose and mongo sandbox routes aka Testing Routes

// app.get('/add-blog',(req,res) => {
//     const blog = new Blog({
//         title: 'new-blog 2',
//         snippet: 'Abot my New Blog 2',
//         body: 'More about my new blog 2',

//     });
//     blog.save()
//         .then((result) => {
//             res.send(result)
//         })
//         .catch((err) => console.log(err));
// });

// app.get('/all-blogs', (req,res) =>{
//     Blog.find()
//         .then((result) =>{
//             res.send(result)
//         })
//         .catch((err) => console.log(err));
// });

// app.get('/single-blog', (req,res) =>{
//     Blog.findById('601a5a8b3dd09618d17b5339')
//         .then((result) => {
//             res.send(result);
//         })
//         .catch((err) => console.log(err));
// });


// Routes
app.get('/', (req, res) => {
    // res.send('<p> Home Page</p>');
    //res.sendFile('./views/index.html', {root: __dirname});
    
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    //res.send('<p>About Page</p>');
    //res.sendFile('./views/about.html', {root: __dirname});
    res.render('about', {title: "About Us"});
});

//redirects
// app.get('/about-us', (req,res) => {
//     res.redirect('/about');
// });


//blog routes
app.use('/blogs', blogRoutes);

//404 to go at the bottom if nothing matches it fires this code below
app.use((req,res) => {
    res.status(404).render('404', {title: 'Error-404'});
})



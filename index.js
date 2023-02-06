if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}

const mongoose = require("mongoose");
const express = require("express")
const app = express()
const bcrypt = require("bcrypt") 
const passport = require("passport")
const initializePassport = require("./passport-config")
const flash = require("express-flash")
const session = require("express-session")
const methodOverride = require("method-override")
const  User = require("./models/users");
const Post = require("./models/posts");
const Comments = require("./models/comment");

initializePassport(
    passport,
    email => User.findOne({ email }),
    id => User.findById(id)
);

app.use(express.urlencoded({extended: false}))
app.use(flash())
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false, 
    saveUninitialized: false
}))
app.use(passport.initialize()) 
app.use(passport.session())
app.use(methodOverride("_method"))

// Routes for login and register
app.post("/login", checkNotAuthenticated, passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
}))

app.post("/register", checkNotAuthenticated, async (req, res) => {
    const emailExist = await User.findOne({ email: req.body.email });
        if (emailExist) {
            req.flash("emailError", "Email already exists");
            const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
            if (!emailRegex.test(req.body.email)) {
                req.flash("emailRegex", "Email is not valid");
                return res.redirect("/register");
        } 
    }
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
            if (!passwordRegex.test(req.body.password)) {
                req.flash("passwordError", "Password must contain at least eight characters, at least one letter and one number");
            return res.redirect("/register");
        } try {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const user = new User({
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword,
            }); await user.save();
                res.redirect("/login");
            } catch (error) {
        console.log(error);
        res.redirect("/register");
    }
});

// Register main routing for app
// GET POSTS
app.get("/", checkAuthenticated, async (req, res) => {
  const posts = await Post.find({}).populate("author").populate("comments");
  res.render("index.ejs", { posts, username: req.user.username });
});


// GET ALL
app.get('/', checkAuthenticated, (req, res) => {
    res.render("index.ejs", {username: req.user.username})
})

app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render("login.ejs")
})

app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render("register.ejs")
})

app.delete("/logout", (req, res) => {
    req.logout(req.user, err => {
        if (err) return next(err)
        res.redirect("/")
    })
})

// POST ROUTES
app.post("/createpost", checkAuthenticated, async (req, res) => {
    try {
      const post = new Post({
        title: req.body.title,
        description: req.body.description,
        author: req.user._id
      });
      await post.save();
      res.redirect("/");
    } catch (error) {
      console.log(error);
      res.redirect("/createpost");
    }
  });

app.get("/posts", checkAuthenticated, async (req, res) => {
    const posts = await Post.find({}).populate("author");
    res.render("index", { posts: posts, username: req.user.username });
});

app.get("/posts", checkAuthenticated, (req, res) => {
    res.render("index", {username: req.user.username});
});

app.get("/post/:id/comments", checkAuthenticated, async (req, res) => {
  const post = await Post.findById(req.params.id);
  const comments = await Comments.find({ post: post._id }).populate("author");
  res.render("comments.ejs", { comments });
});

 // EDIT POST BY ID
app.get("/edit/:id", checkAuthenticated, async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (req.user._id.toString() !== post.author.toString()) {
      return res.redirect("/");
    }
    res.render("index.ejs", { post, username });
  });
  
  app.post("/edit/:id", checkAuthenticated, async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (req.user._id.toString() !== post.author.toString()) {
      return res.redirect("/");
    }
    post.title = req.body.title;
    post.description = req.body.description;
    await post.save();
    res.redirect("/");
  });
  
  // DELETE POST BY ID
  app.post("/delete/:id", checkAuthenticated, async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (req.user._id.toString() !== post.author.toString()) {
      return res.redirect("/");
    }
    const comments = await Comments.find({ post: req.params.id });
    await post.remove();
    res.redirect("/");
  });
  

 // GET POST BY ID WITH ASSOCIATED COMMENTS
 app.get("/post/:id", checkAuthenticated, async (req, res) => {
  try {
    const currentIndex = req.query.currentIndex ? parseInt(req.query.currentIndex) : 0;
    // Retrieve all posts and sett on all posts currentIndex
    const allPosts = await Post.find({}).populate("comments").populate("author");
    const post = allPosts[currentIndex];
    res.render("comment.ejs", { post: post, username: req.user.username, comments: post.comments, currentIndex: currentIndex, allPosts: allPosts });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

 // CREATE A NEW COMMENT FOR A POST
app.post("/post/:id/comment", checkAuthenticated, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const comment = new Comments({
      content: req.body.content,
      author: req.user._id,
      post: post._id
    });
    await comment.save();
    post.comments.push(comment._id);
    await post.save();

    const currentIndex = req.body.currentIndex ? parseInt(req.body.currentIndex) : 0;
    res.redirect(`/post/${post._id}?currentIndex=${currentIndex}`);
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

// Functions to check if user is authenticated
function checkAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect("/login")
}

function checkNotAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return res.redirect("/")
    }
    next()
}

app.listen(3000)
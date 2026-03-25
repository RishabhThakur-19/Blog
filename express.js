# BLOG SERVER — EXPRESS.JS + MONGOOSE + EJS
# REST API FOR CREATING, READING, AND VIEWING BLOG POSTS
 
// LOAD ENVIRONMENT VARIABLES FROM .env FILE BEFORE ANYTHING ELSE
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
 
// IMPORT CORE DEPENDENCIES
const express  = require("express");
const morgan   = require("morgan");
const mongoose = require("mongoose");
 
// IMPORT BLOG MODEL FOR DATABASE OPERATIONS
const Blog = require("./models/blog.js");
 
// READ ENVIRONMENT VARIABLES FOR DATABASE URL AND SERVER PORT
const url  = process.env.url3;
const PORT = process.env.PORT || 3000;
 
// INITIALIZE EXPRESS APPLICATION
const app = express();
 
// CONNECT TO MONGODB AND START THE SERVER ONLY AFTER A SUCCESSFUL CONNECTION
mongoose
  .connect(url)
  .then(() => {
    console.log("CONNECTED TO MONGODB");
    app.listen(PORT, () => {
      console.log(`SERVER LISTENING ON PORT ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("DATABASE CONNECTION ERROR:", err);
  });
 
// SET EJS AS THE TEMPLATING ENGINE FOR SERVER-SIDE RENDERING
app.set("view engine", "ejs");
 
// LOG INCOMING HTTP REQUESTS IN DEV FORMAT FOR DEBUGGING
app.use(morgan("dev"));
 
// PARSE URL-ENCODED FORM DATA FROM POST REQUESTS
app.use(express.urlencoded({ extended: true }));
 
// SERVE STATIC ASSETS (CSS, IMAGES, JS) FROM THE PUBLIC FOLDER
app.use(express.static("public"));
 
// REDIRECT ROOT URL TO THE ALL BLOGS LISTING PAGE
app.get("/", (req, res) => {
  res.redirect("allblogs");
});
 
// RENDER ALL BLOGS FETCHED FROM THE DATABASE ON THE HOME PAGE
app.get("/allblogs", (req, res) => {
  Blog.find()
    .then((result) => {
      res.render("home", {
        title: "All Blogs",
        blogs: result,
        url: "/allblogs",
      });
    })
    .catch((err) => {
      console.log("ERROR FETCHING BLOGS:", err);
    });
});
 
// FETCH AND SEND ALL BLOG DOCUMENTS AS RAW JSON (UTILITY / DEBUG ROUTE)
app.get("/all-blog", (req, res) => {
  Blog.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log("ERROR FETCHING ALL BLOGS:", err);
    });
});
 
// RENDER THE ABOUT PAGE
app.get("/about", (req, res) => {
  res.render("about", { title: "Blog About" });
});
 
// RENDER THE CREATE BLOG FORM PAGE
app.get("/createblog", (req, res) => {
  res.render("createblog", { title: "Create Blog" });
});
 
// FETCH A SINGLE BLOG BY ITS ID AND RENDER THE DETAILS PAGE
app.get("/blogs/:id", (req, res) => {
  const id = req.params.id;
  console.log("FETCHING BLOG WITH ID:", id);
 
  Blog.findById(id)
    .then((result) => {
      res.render("details", { blog: result, title: "Blog Details" });
    })
    .catch((err) => {
      console.log("ERROR FETCHING BLOG BY ID:", err);
    });
});
 
// HANDLE BLOG CREATION FORM SUBMISSION AND SAVE NEW BLOG TO DATABASE
app.post("/Blogs", (req, res) => {
  const blog = new Blog(req.body);
 
  blog
    .save()
    .then((result) => {
      console.log("NEW BLOG SAVED:", result);
      res.redirect("/allblogs");
    })
    .catch((err) => {
      console.log("ERROR SAVING BLOG:", err);
    });
});
 
// TEST ROUTE — QUICKLY ADD A HARDCODED SAMPLE BLOG TO THE DATABASE
app.get("/addblog", (req, res) => {
  const blog = new Blog({
    title:   "New Blog 2",
    snippet: "About new blog",
    body:    "Anything here",
  });
 
  blog
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log("ERROR ADDING SAMPLE BLOG:", err);
    });
});
 
// REDIRECT /work TO HOME (PLACEHOLDER ROUTE)
app.get("/work", (req, res) => {
  res.redirect("/");
});
 
// CATCH-ALL MIDDLEWARE — RENDER 404 PAGE FOR ANY UNMATCHED ROUTES
app.use((req, res) => {
  res.status(404).render("404", { title: "Page Not Found" });
});

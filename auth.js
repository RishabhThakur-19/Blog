const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const express=require('express');
const mongoose=require('mongoose');
const app=express();
const url=process.env.URL3;
const PORT=process.env.PORT || 3000 ;
console.log(process.env.PORT)
mongoose.connect(url)
  .then((result)=>{
    console.log("connected"),
    app.listen(PORT,()=>{
        console.log('listening')
  })}).catch((err)=>{
    console.log(err);
  });


const authRoutes=require('./routes/authRoutes.js')
app.use(express.json())
app.set('view engine','ejs');
app.get("/hello",(req,res)=>{
    res.send("hello")
console.log("working")})
app.use(authRoutes)


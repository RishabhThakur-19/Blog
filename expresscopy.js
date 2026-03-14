const express=require('express');
const morgan=require('morgan')
const app=express();
const mongoose=require('mongoose');
const Blog=require('./models/blog.js')

const url='mongodb+srv://website:rishabh2005@nodetut.c115x.mongodb.net/node-tuts?retryWrites=true&w=majority&appName=nodetut';

mongoose.connect(url,{userUrlParser:true,useUnifiedTopology:true})
  .then((result)=>{
    console.log("connected"),
    app.listen(3000,'localhost',()=>{
        console.log('listening')

  })
   .catch((err)=>{
    console.log(err)
  });

app.set('view engine','ejs');
app.use(morgan('dev'));
app.use(express.static('path'));

});
app.get('/addblog',(req,res)=>{
    const blog=new Blog({
    title :'new blog',
    snippet:"anout new blog",
    body:"anthing aifnaif"
});

blog.save()
      .then((result)=>{
        res.send(result)
      })
      .catch((err)=>{
        console.log(err)
      });

})
app.get('/about',(req,res)=>{ 

    res.render("about",{title: "blog about"})

    })
app.get('/createblog',(req,res)=>{
        res.render("createblog",{title:"create-blog"})
    })
app.get('/',(req,res)=>{
    const blogs=[
    
        {title: "something is there", snippet:" he was just there when i saw him "},
        {title: "something is there", snippet:" he was just there when i saw him "},
        {title: "something is there", snippet:" he was just there when i saw him "},
    
    ];


    console.log("connected to the server");
  res.render("home",{title: "blog home" ,blogs:blogs });

})
app.use((req,res)=>{
res.status(404).render("404",{title: "blog website"});})


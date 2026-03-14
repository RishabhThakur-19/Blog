const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const express=require('express');
const morgan=require('morgan')
const app=express();
const mongoose=require('mongoose');
const Blog=require('./models/blog.js')

const url=process.env.url3;

const PORT=process.env.PORT || 3000 ;

mongoose.connect(url)
  .then((result)=>{
    console.log("connected"),
    app.listen(PORT,()=>{
        console.log('listening')
  })}).catch((err)=>{
    console.log(err);
  });

app.set('view engine','ejs');
app.use(morgan('dev'));
app.use(express.urlencoded({extended:true}));
app.use(express.static('path'));
app.use(express.static('public'));



app.get('/addblog',(req,res)=>{
    const blog= new Blog({
    title :'new blog 2',
    snippet:"anout new blog",
    body:"anthing aifnaif"
});

blog.save()
      .then((result)=>{
        res.send(result)
      }).catch((err)=>{
        console.log(err)
      });

})
app.get('/all-blog',(req,res)=>{
    Blog.find()
    .then((result)=>{
        res.send(result)
    }).catch((err)=>{
        console.log("error occured ",err)
    })
})

app.get('/about',(req,res)=>{ 

    res.render("about",{title: "blog about",})

    })
    
app.get('/allblogs',(req,res)=>{
  
    Blog.find().then((result)=>{res.render('home',{title:"All blogs",blogs:result, url:'/allblogs'})

    }).catch((err)=>{console.log(err)})
})



    app.get('/createblog',(req,res)=>{
        res.render("createblog",{title:"create-blog"})
    })



app.get('/',(req,res)=>{
  //   const blogs=[
    
  //       {title: "something is there", snippet:" he was just there when i saw him "},
  //       {title: "something is there", snippet:" he was just there when i saw him "},
  //       {title: "something is there", snippet:" he was just there when i saw him "},
    
  //   ];
  //   console.log("connected to the server");
  // res.render("home",{title: "blog home" ,blogs:blogs });
res.redirect('allblogs')
})



app.post('/Blogs',(req, res)=>{
 const blog=new Blog(req.body);
 blog.save()
    .then((result)=>{
      console.log(result)
         res.redirect('/allblogs');

    }).catch((err)=>{
      console.log(err)
    })
}
)

app.get('/blogs/:id',(req,res)=>{
  const id=req.params.id;
    console.log(id);
Blog.findById(id)
     .then(result=>{
      res.render('details',{blog:result,title:'Blog Details'})
     }).catch(err=>{
      console.log(err)
     })
})
// app.delete("/blogs/:id",(req,res)=>{
//   const id=req.params.id;
//   Blog.findByIdAndDelete(id)
//   .then(result=>{
// res.json({redirect :'/'})
//   }).catch(err=>{console.log(err)})
// })







app.get('/work',(req,res)=>{
  // res.send("hello ji")
  res.redirect('/')
})


app.use((req,res)=>{
res.status(404).render("404",{title: "blog website"});})


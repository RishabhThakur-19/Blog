const express=require('express');
const morgan=require('morgan');
const app=express();


app.listen(3000,()=>{
    console.log('listening ti requets ');
}); 


app.set('view engine','ejs');



app.get('/about',(req,res)=>{
    console.log('request made');
    // apppres.send("home")
    res.render("check")
})
app.get('',()=>{

})
app.use((req,res)=>{
    res.send("ERrOR 401");
})

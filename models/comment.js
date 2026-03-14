const mongoose=require('mongoose');
const schema=mongoose.Schema;
const commentSchema=new schema(
    {
        // title:{
        //     type:String,
        //     required:true
        // }, 
        // snippet:{
        //     type:String,
        //     required:true
        // },
        body:{
            type:String,
            required:true
        }
    },{timestamps:true}
);
const Comment=mongoose.model("Comment",commentSchema)
module.exports=Comment;
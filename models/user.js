const mongoose=require("mongoose");
const {isEmail}=require("validator")
const bcrypt=require('bcrypt')

const userSchema= new mongoose.Schema({
    email:{
        type:String,
        required:[true,'Please enter an Email'],
        unique:[true],
        lowercase:true,
        validate:[isEmail,"Please enter an Valid Email"]    
    },

    password:{
        type:String,
        required:true,
        minlength:[6,"minimum password length is 6 characters"]
    }

    }
);





//hasing and crypting the password


userSchema.pre('save',async function(next){
const salt=await bcrypt.genSalt();
this.password=await bcrypt.hash(this.password,salt);
next()
});



const User=mongoose.model('user',userSchema);

module.exports=User;
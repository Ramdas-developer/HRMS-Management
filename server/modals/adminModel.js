const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    phone:{
        type:Number,
        required : true,
    },
    password:{
        type:String,
        required : true,
    },
})

const Admin = mongoose.model("adminData",schema);
module.exports = Admin;




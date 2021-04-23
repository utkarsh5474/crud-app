const mongoose=require('mongoose');

var schema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    contact: {
        type: Number,
        required: true,
    }
})

const Userdb=mongoose.model('userdb',schema);

module.exports=Userdb
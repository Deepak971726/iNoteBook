const mongoose  = require('mongoose');
const mongoURI = "mongodb+srv://deepak:deepak@inotebook.ra9airv.mongodb.net/"

const connectTOMongo =async()=>{

   await mongoose.connect(mongoURI)
   console.log("mongo connected successfully")

}


module.exports = connectTOMongo;

 

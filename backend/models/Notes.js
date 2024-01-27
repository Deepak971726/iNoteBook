const mongoose  = require('mongoose');

const { Schema } = mongoose;

const NotesSchema = new Schema({
   title:{
    type:String,
    require:true
   },
   discription:{
    tyep:String,
    require:true,
    // unique:true
   },
   tag:{
    tyep:String,
    // require:true
    default:"General"
   },
   data:{
    tyep:Date,
    // require:true
    default:Date.now
   }
   
});

module.exports = mongoose.model('notes',NotesSchema);
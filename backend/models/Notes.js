const mongoose  = require('mongoose');
const { Schema } = mongoose;

const NotesSchema = new Schema({
   user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'user'

   },
   title:{
    type:String,
    require:true
   },
   discription:{
    type:String,
    require:true,
    // unique:true
   },
   tag:{
    type:String,
    // require:true
    default:"General"
   },
   data:{
    type:Date,
    // require:true
    default:Date.now
   }
   
});

module.exports = mongoose.model('notes',NotesSchema);
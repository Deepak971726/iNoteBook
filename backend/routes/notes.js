const express = require("express");
const router = express.Router();
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchUser");
const { findById, findByIdAndUpdate } = require("../models/User");

// ROUTE 1: Get all the notes : GET "api/auth/fetchallnotes". login require
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const note = await Notes.find({ user: req.user.id });
    res.json(note);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Error occured");
  }
});

// ROUTE 2: Add a new note : POST "api/auth/addnote". login require
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "enter a valid title").isLength({ min: 3 }),
    body("discription", "enter valid email").isLength({ min: 5 }),
  ],
  async (req, res) => {
    // const note = await Notes.find({user:req.user.id});

    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { title, discription, tag } = req.body;
      const note = new Notes({
        title,
        discription,
        tag,
        user: req.user.id,
      });
      const data = await note.save();

      res.json(data);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Internal Error occured");
    }
  }
);


// ROUTE 3: update an existing note : POST "api/auth/updatenote". login require
router.put("/updatenote/:id",fetchuser,async (req, res) => {
    // const note = await Notes.find({user:req.user.id});

    try {
       
      const { title, discription, tag } = req.body;
       const newNote = {};
       if(title){newNote.title = title}
       if(discription){newNote.discription = discription}
       if(tag){newNote.tag=tag}

       //find the note to updated update it
      //  const note = Notes.findByIdAndUpdate()
      let note =await Notes.findById(req.params.id);
      if(!note){return res.status(404).send('Not Found')}
      if(note.user.toString()!==req.user.id){return res.status(401).send('Not Allowed')};

      note = await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true});
      res.json(note);


    } catch (err) {
      console.error(err.message);
      res.status(500).send("Internal Error occured");
      // const note =
    }
  }
);

// ROUTE 4: Delete an existing note : DELETE "api/auth/deletenote". login require
router.delete("/deletenote/:id",fetchuser,async (req, res) => {
  // const note = await Notes.find({user:req.user.id});

  try {
     
 
    const {titel , discription,tag} = req.body;

     //find the note to deleted deleted it
    //  const note = Notes.findByIdAndUpdate()
    let note =await Notes.findById(req.params.id);
    if(!note){return res.status(404).send('Not Found')}

    // allow to deltetion only user owns this note
    if(note.user.toString()!==req.user.id){return res.status(401).send('Not Allowed')};

    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({"success":"Note has been deleted",note:note});


  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Error occured");
    // const note =
  }
}
);






module.exports = router;

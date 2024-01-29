const express = require("express");
const router = express.Router();
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchUser");

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

module.exports = router;

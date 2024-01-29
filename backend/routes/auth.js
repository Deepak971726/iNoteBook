const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchUser')

const JWT_SECRET ="deepakisgoodboy"

//Route 1: create user using POST "api/auth/createuser" Dosen't require auth No login require

router.post(
  "/createuser",
  [
    //validate the information send by user
    body("name", "enter a valid name").isLength({ min: 3 }),
    body("email", "enter valid email").isEmail(),
    body("password", "password should be  atlest 5 character").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // send the error in if information is not correct return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // check whether the user with this email is already exist
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry a user with this email already exist" });
      }
      const salt  = await bcrypt.genSalt(10);
      const secPas =await bcrypt.hash(req.body.password,salt);
      // create user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPas,
      });
      const data = {
        user:{
          id:user.id
        } 
      }
      const authToken = jwt.sign(data,JWT_SECRET);
      // console.log(authToken)
      // res.json(user)
      res.json(authToken);

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Internal Error occured')
    }

    //    .then(user=>res.json(user))
    //    .catch(err=>{console.log(err)
    //     res.json({error:'please enter the valid email',message:err.message})})
  }
);


//Route 2:  authenticate a user: login
router.post("/login",
  [
    //validate the information send by user
    body("email", "enter valid email").isEmail(),
    body("password", "password can not be blank").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {email,password} = req.body
    try {

      let user =await User.findOne({email})
      if(!user){
        return res.status(400).json({error:"Please try to correct credential"})
      }
      const passwordCompare =await bcrypt.compare(password,user.password);
      if(!passwordCompare){
        return res.status(400).json({error:"Please try to correct credential"})
      }
      const data = {
        user:{
          id:user.id
        } 
      }
      const authToken = jwt.sign(data,JWT_SECRET);
      res.json(authToken);
      
    } catch (err) {

      console.error(err.message);
      res.status(500).send('Internal Error occured')
      
    }
  


  });



// Route 3: get loggedin user details using "/api/auth/getuser" , login require

router.post("/getuser", fetchuser, async (req, res) => {
    try{

      const userId = req.user.id;
      const user = await User.findById(userId).select('-password')
      res.send(user)
      
    } catch (err) {

      console.error(err.message);
      res.status(500).send('Internal Error occured')
      
    }
  


  });


module.exports = router;

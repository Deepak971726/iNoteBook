const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");

//create user using POST "api/auth/createuser" Dosen't require auth No login require

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

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      res.json(user);

    } catch (err) {
      console.error(err.message);
      res.status(500).send('some Error occured')
    }

    //    .then(user=>res.json(user))
    //    .catch(err=>{console.log(err)
    //     res.json({error:'please enter the valid email',message:err.message})})
  }
);

module.exports = router;

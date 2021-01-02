const express = require('express');
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');

//@route GET api/auth
//@desc Test api
//@access public
router.get("/",auth,async(req,res)=>{
    const user = await  User.findById(req.user.id).select("-password");
    if(!user){
        return res
        .status(400)
        .json({ erros: [{ message: "User does not exists" }] });   
    }
    else{
        res.send(user);
    }

});

//@route GET api/auth
//@desc Authenticate Users and get token
//@access public
router.post(
    "/",
    [
      check("email", "Enter email address or password").isEmail(),
      check(
        "password",
        "Enter email address or password"
      ).exists()
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { email, password } = req.body;
  
      try {
        //See if User Exists
        let user = await User.findOne({ email });
        if (!user) {
          return res
            .status(400)
            .json({ erros: [{ message: "Invalid Credentials" }] }); // this is done to keep the consistency in the errors
        }
        //Return Json Web Token
        const payload = {
          user: {
            id: user.id,
          },
        };
  
        jwt.sign(
          payload,
          config.get("jwtSecret"),
          { expiresIn: 360000 },
          (err, token) => {
            if (err) {
              console.log(err);
            } else {
              res.json({ token });
            }
          }
        );

          const isMatch = await bcrypt.compare(password, user.password);
          if(!isMatch){
            return res
            .status(400)
            .json({ erros: [{ message: "Invalid Credentials" }] });
          } 


      } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
      }
    }
  );
  
module.exports = router;
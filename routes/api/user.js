const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../../models/user");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
//@route GET api/routes
//@desc Regiter User
//@access public
router.post(
  "/",
  [
    check("name", "Name is Required").not().isEmpty(),
    check("email", "PLease Enter a valid email address").isEmail(),
    check(
      "password",
      "Please Enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    console.log(req.body);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      //See if User Exists
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ erros: [{ message: "User already Exists" }] }); // this is done to keep the consistency in the errors
      }

      //Get User's Gravatar
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        default: "mm",
      });

      user = new User({
        name,
        email,
        avatar,
        password,
      });
      //Encrypt Password
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();
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
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;

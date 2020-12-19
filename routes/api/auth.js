const express = require('express');
const router = express.Router();

//@route GET api/routes
//@desc Test route
//@aaccess public
router.get("/", (req,res)=>{res.send("auth route works")});

module.exports = router;
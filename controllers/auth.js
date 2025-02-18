const express = require("express");
const router = express.Router();

const User = require("../models/user.js"); //bringing in user model
const bcrypt = require("bcrypt");


module.exports = router;


router.get('/sign-up', async (req,res) => {
    res.render('auth/sign-up.ejs')
})

router.post('/sign-up' , async (req,res) => {
    const userInDatabase = await User.findOne({username: req.body.username});
// making sure the user name entered is not already in our database
    if (userInDatabase) {
        return res.send('Username already taken');
    
    }
    if (req.body.password !== req.body.confirmPassword) {
        return res.send('Password and Confirm password must match')
    }

    const hashedPassword = bcrypt.hashSync(req.body.password, 10); //the number is amount of salting, the higher the number the higher security, the longer the process
    req.body.password = hashedPassword;

    const user = await User.create(req.body); //creates the user in the database
    res.send(`Thanks for signing up ${user.username}`);
})
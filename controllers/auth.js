const express = require("express");
const router = express.Router();



module.exports = router;


router.get('/sign-up', async (req,res) => {
    res.render('auth/sign-up.ejs')
})
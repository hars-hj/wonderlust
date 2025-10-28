const express = require('express');
const router = express.Router();
const User = require("../models/user");
const { wrapAsync } = require('../utils/wrapAsync');
const passport = require("passport");
const { saveRedirectUrl } = require('../middleware');
const usercontroller = require("../controllers/user");

router.get("/signup",usercontroller.renderSignUp);

router.post("/signup", wrapAsync(usercontroller.SignUp));

router.get("/login", usercontroller.renderLogIn);

router.post("/login",saveRedirectUrl, passport.authenticate("local", { failureFlash: true, failureRedirect: "/login" }),usercontroller.login);

router.get('/logout',usercontroller.logout);

module.exports = router;

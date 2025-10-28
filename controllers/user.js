const User = require("../models/user");

module.exports.renderSignUp =  (req, res) => {
    res.render("users/signup");
};

module.exports.SignUp = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, (err) => {
            if (err) return next(err);
            req.flash("success", "Welcome to Wonderlust");
            res.redirect("/listing");
        });
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/listing");
    }
};

module.exports.renderLogIn = (req, res) => {
    res.render("users/login.ejs");
};

module.exports.login = (req, res) => {
  req.flash("success", "Welcome back!");
  let redirectUrl = res.locals.redirectUrl || "/listing";
  res.redirect(redirectUrl);
};

module.exports.logout = (req,res)=>{
    req.logout((err=>{
        if(err) return next(err);
        req.flash("success","you are logged out");
        res.redirect("/listing");
    }))
};
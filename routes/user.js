const router = require("express").Router();


router.get("/signup", (req, res, next) => {
  res.render("users/signup");
});

router.post("/sign-up", (req, res, next) => {
    let errors = [];
    
    if (!req.body.username) {
      errors.push("You need a username");
    }
    if (!req.body.password) {
      errors.push("you need a password");
    }
    if (!req.body.name) {
        errors.push("You need a name");
      }
    if (errors.length > 0) {
      res.json(errors);
    }
  
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPass = bcrypt.hashSync(req.body.password, salt);
  
    User.create({
      username: req.body.username,
      username: req.body.name,
      password: hashedPass,
    })
      .then((createdUser) => {
        console.log("Users was created", createdUser);
  
        console.log(req.session);
  
        req.session.user = createdUser;
  
        console.log(req.session.user);
        res.json(createdUser);
      })
      .catch((err) => {
        console.log("Something went wrong", err.errors);
      });
  });

module.exports = router;

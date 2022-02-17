const User = require("../models/User.model");
const router = require("express").Router();
const bcrypt = require("bcrypt")
saltRounds = 10


router.get("/signup", (req, res, next) => {
  res.render("users/signup");
});

router.post("/signup", (req, res, next) => {
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
      name: req.body.name,
      password: hashedPass,
    })
      .then((createdUser) => {
        console.log("User was created", createdUser);
  
        console.log(req.session);
  
        req.session.user = createdUser;
  
        console.log(req.session.user);
        res.render("users/successSignin");
      })
      .catch((err) => {
        console.log("Something went wrong", err.errors);
      });
  });

  router.get("/login", (req, res) => {
    res.render("users/login");
  });

router.post("/login", (req, res) => {
  let errors = [];

  if (!req.body.username) {
    errors.push("You did not include a username!");
  }
  if (!req.body.password) {
    errors.push("You need a password");
  }

  if (errors.length > 0) {
    res.json(errors);
  }


  User.findOne({username: req.body.username})
  .then((foundUser)=>{
    //   CASE 1 User is non existent
    // HAVE TO SEND MESSAGE BACK TO USER

    if(!foundUser){
        return res.json("username not found");
    }

    // CASE 2 USERNAME IS FOUND 
    // HAVE TO CHECK PASSWORD

    const match = bcrypt.compareSync(req.body.password, foundUser.password)

    //CASE 2.5 PASSWORDS DONT MATCH
    // SEND MESSAGE TO USERS : PASSWORD DOESN'T MATCH

    if(!match){
        return res.json("Password Incorrect")
    }

    // CASE 3 EVERYTHING IS CORRECT 
    // CREATE A SESSION FOR THE LOGGED USER

    req.session.user = foundUser;

    console.log(req.session.user);
    res.render("users/home",foundUser)
  })
  .catch((err)=>{
      console.log("Something went wrong", err);
      res.json(err);
  });
});

// router.get("user/home",(req, res)=>{
//   res.render("users/home")
// });

router.get("/logout", (req, res)=>{
    req.session.destroy();
    console.log("This session is over", req.session)
    res.json("You have logged out");
})

module.exports = router;

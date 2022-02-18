const router = require("express").Router();
const Scoresheet = require("../models/Scoresheet.model");
const isLoggedIn = require("../middleware/isLoggedIn");
const par = [4, 4, 4, 4, 3, 5, 3, 4, 4, 4, 4, 3, 4, 5, 4, 3, 4, 4];
const holes = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]

router.get("/record", (req, res, next) => {
  
  Scoresheet.find({ playerID: req.session.user._id })
  .populate("playerID")
  .then((allSheets) => {
    console.log(allSheets);
    for (let i = 0; i < allSheets.length; i++) {
      allSheets [i].total = allSheets[i].strokes.reduce((a,b)=> a + b, 0)
      allSheets [i].parTotal = allSheets[i].par.reduce((a,b)=> a + b, 0)
      allSheets[i].overPar = allSheets[i].total - allSheets[i].parTotal
    }

      res.render("scoreSheet/list", { scoresheets: allSheets});
    })
    .catch((err) => {
      console.error(err);
    });
});

router.get("/create", (req, res, next) => {
  res.render("scoreSheet/create");
});
router.post("/create", isLoggedIn, (req, res, next) => {
  const strokes = [
    req.body.strokes1,
    req.body.strokes2,
    req.body.strokes3,
    req.body.strokes4,
    req.body.strokes5,
    req.body.strokes6,
    req.body.strokes7,
    req.body.strokes8,
    req.body.strokes9,
    req.body.strokes10,
    req.body.strokes11,
    req.body.strokes12,
    req.body.strokes13,
    req.body.strokes14,
    req.body.strokes15,
    req.body.strokes16,
    req.body.strokes17,
    req.body.strokes18,
  ];
  console.log(req.body);

  Scoresheet.create({
    playerID: req.session.user._id,
    strokes: strokes,
    par: par,
    holes:holes
  })
    .then(() => {
      res.redirect("/scoresheet/record");
    })
    .catch((err) => {
      console.log("Something went wrong", err);
    });
});

router.get("/:id/edit", (req, res, next) => {
  const strokes = [
    req.body.strokes1,
    req.body.strokes2,
    req.body.strokes3,
    req.body.strokes4,
    req.body.strokes5,
    req.body.strokes6,
    req.body.strokes7,
    req.body.strokes8,
    req.body.strokes9,
    req.body.strokes10,
    req.body.strokes11,
    req.body.strokes12,
    req.body.strokes13,
    req.body.strokes14,
    req.body.strokes15,
    req.body.strokes16,
    req.body.strokes17,
    req.body.strokes18,
  ];
  Scoresheet.findById( req.params.id)
    .then((results) => {
      console.log("We found this Scoresheet", results);
      res.render("scoreSheet/update", {
        strokes: strokes,
        par: par,
        holes: holes,
        playerID: req.session.user._id,
        scoreSheetID: results._id
      });
    })
    .catch((err) => {
      console.log("Something went wrong", err);
    });
});

router.post("/:id/edit", (req, res, next) => {
  console.log(req.params.id)
  const strokes = [
    req.body.strokes0,
    req.body.strokes1,
    req.body.strokes2,
    req.body.strokes3,
    req.body.strokes4,
    req.body.strokes5,
    req.body.strokes6,
    req.body.strokes7,
    req.body.strokes8,
    req.body.strokes9,
    req.body.strokes10,
    req.body.strokes11,
    req.body.strokes12,
    req.body.strokes13,
    req.body.strokes14,
    req.body.strokes15,
    req.body.strokes16,
    req.body.strokes17,
  ];
  Scoresheet.findByIdAndUpdate(req.params.id,
    {
      strokes: strokes,
      par: par,
      holes:holes,
      playerID: req.session.user._id,
    },{new: true})
      .then((updatedScoresheet) => {
        console.log(updatedScoresheet)
        res.redirect("/scoresheet/record");
      })
      .catch((err) => {
        console.log("Something went wrong", err);
      });
});
router.post("/:id/remove", (req, res, next) => {
  Scoresheet.findByIdAndRemove(req.params.id)
    .then((results) => {
      console.log("Scoresheet", results);
      res.redirect("/scoresheet/record");
    })
    .catch((err) => {
      console.log("Something went wrong:", err);
    });
});


module.exports = router;

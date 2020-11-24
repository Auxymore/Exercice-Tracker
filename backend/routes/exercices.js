
const router = require("express").Router()
let Exercise = require("../models/exercise.model")

router.route('/').get((req, res) =>{
    Exercise.find()
    .then(exercices => res.json(exercices))
    .catch(err => res.status(404).json("Error:" + err))
})

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newExercise = new Exercise({username, description, duration, date})

    newExercise.save()
    .then(() => res.json("Exercise added!"))
    .catch(err => res.status(404).json("Error:" + err))
})

router.route("/:id").get((req,res) => {
    Exercise.findById(req.params.id)
    .then(exercices =>res.json(exercices))
    .catch(err => res.status(404).json("Error:" + err))
})

router.route("/:id").delete((req, res) =>{
    Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json("Exercise deleted"))
    .catch(err => res.status(404).json("Error:" + err))
    console.log("Exercise deleted")
})

router.route("/update/:id").post((req, res) =>{
    Exercise.findById(req.params.id)
    .then(exercices => {
        exercices.username = req.body.username;
        exercices.description = req.body.description;
        exercices.duration = Number(req.body.duration);
        exercices.date = Date.parse(req.body.date);

        exercices.save()
        .then(() =>res.json("Exercise updated"))
        .catch(err => res.status(404).json("Error:" + err))
    })
    .catch(err => res.status(404).json("Error:" + err))
})

module.exports = router

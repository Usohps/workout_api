const express = require("express")
const router = express.Router()
// const Workout = require("../models/Workout")
const {
    createWorkout,
    getAllWorkout,
    getSingleWorkout,
    deleteWorkout,
    updateWorkout
} = require("../controllers/workoutControllers")

// get all workouts
router.get("/",getAllWorkout)

//  add new workout from client
router.post("/",createWorkout);

//  get single workout
router.get("/:id",getSingleWorkout)

// delete workout
router.delete("/:id",deleteWorkout)
// update workout
router.patch("/:id",updateWorkout)
 module.exports = router;
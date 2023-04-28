const Workout = require("../models/Workout");
const mongoose = require("mongoose");
// create a new workout
const createWorkout = async (request, response) => {
  const { title, load, reps } = request.body;

  const emptyField = [];

  if (!title) {
    emptyField.push("title");
  }
  if (!load) {
    emptyField.push("load");
  }
  if (!reps) {
    emptyField.push("reps");
  }
  if (emptyField.length > 0) {
    return response
      .status(400)
      .json({ error: "Please fill in all the fields", emptyField });
  }

  try {
    const workout = await Workout.create({ title, load, reps });
    response.status(200).json(workout);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const getAllWorkout = async (request, response) => {
  const workout = await Workout.find({}).sort({ createdAt: -1 });
  response.status(200).json(workout);
};

const getSingleWorkout = async (request, response) => {
  const { id } = request.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(404).json({ error: "No Such Workout" });
  }
  const workout = await Workout.findById(id);
  if (!workout) {
    return response.status(404).json({ error: "No Such Workout" });
  } else {
    return response.status(200).json(workout);
  }
};
const deleteWorkout = async (request, response) => {
  const { id } = request.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(404).json({ error: "Wrong Identity" });
  }
  const workout = await Workout.findByIdAndDelete({ _id: id });
  if (!workout) {
    return response.status(400).json({ error: "No Id of such" });
  } else {
    return response.status(200).json(workout);
  }
};

const updateWorkout = async (request, response) => {
  const { id } = request.params;
  console.log(id);
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(404).json({ error: "Wrong Identity" });
  }
  const workout = await Workout.findOneAndUpdate(
    { _id: id },
    { ...request.body }
  );

  if (!workout) {
    return response
      .status(400)
      .json({ error: "No such Workout available for update" });
  }
  response.status(200).json(workout);
};

module.exports = {
  createWorkout,
  getAllWorkout,
  getSingleWorkout,
  deleteWorkout,
  updateWorkout
};

const express = require("express");
const { default: mongoose } = require("mongoose");
require("dotenv").config();
// require("mongoose");
// express app initialization
const app = express();
const cors = require('cors')
app.use(cors());
const workoutRoutes = require("../backend/routes/workouts");
app.use(express.json());
// middlewear
app.use((request, response, next) => {
  console.log(request.path, request.method);
  next();
});

app.use("/api/workouts", workoutRoutes);
// routes
const start = async () => {
  try {
    await mongoose.connect(`${process.env.DB_URL}/workouts_details`);
    await app.listen(process.env.PORT, () => {
      console.log("I am connected to db and listening on port", process.env.PORT);
    });
  } catch (err) {}
};
start().catch((err) => {
  console.log(err);
});

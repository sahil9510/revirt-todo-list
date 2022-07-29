const HttpsError = require("../models/http-error");
const { validationResult } = require("express-validator");
const Task = require("../models/task");

const getAllTasks = async (req, res, next) => {
  let tasks;
  try {
    tasks = await Task.find({}).exec();
    console.log(tasks)
  } catch (err) {
    return next(new HttpsError("Couldnt load tasks", 500));
  }
  res.status(200);
  res.json({ tasks: tasks.map((task) => task.toObject({ getters: true })) });
};

const addNewTask = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpsError("Invalid Input", 422));
  }
  const { userId, id, title, completed } = req.body;
  const createdTask = new Task({
    userId,
    title,
    completed: false,
  });
  await createdTask.save();
  res.status(201);
  res.json({ userId, id, title, completed, isCreated: true });
};

const deleteTask = async (req, res, next) => {
  const id = req.params.id;
  let task;
  try {
    task = await Task.findById(id);
  } catch (err) {
    return next(new HttpsError("Could'nt find the task", 500));
  }

  try {
    await task.remove();
  } catch (err) {
    return next(new HttpsError("Could'nt delete the task", 500));
  }
  res.status(202);
  res.json({ message: "Successfully deleted " + id });
};

const updateTask = async (req, res, next) => {
  const givenId = req.params.id;
  const { userId, id, title, completed } = req.body;
  if (givenId !== id) {
    return next(new HttpsError("Id provided does'nt match any task", 404));
  }
  let task;
  try {
    task = await Task.findById(givenId);
  } catch (err) {
    return next(new HttpsError("Could'nt find the task", 500));
  }
  task.completed = completed;

  try {
    await task.save();
  } catch (err) {
    return next(new HttpsError("Could'nt update the task", 500));
  }
  res.status(200);
  res.json({ message: "Successfully changed" });
};

exports.getAllTasks = getAllTasks;
exports.addNewTask = addNewTask;
exports.deleteTask = deleteTask;
exports.updateTask = updateTask;

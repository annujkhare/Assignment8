const Task = require("../models/Task");

const getAllTasks = async () => {
  return await Task.find().sort({ createdAt: -1 });
};

const getTaskById = async (id) => {
  return await Task.findById(id);
};

const createTask = async (taskData) => {
  return await Task.create(taskData);
};

const updateTask = async (id, taskData) => {
  return await Task.findByIdAndUpdate(id, taskData, {
    returnDocument: "after",
    runValidators: true,
  });
};

const updateTaskStatus = async (id, completed) => {
  return await Task.findByIdAndUpdate(
    id,
    { completed },
    { returnDocument: "after", runValidators: true },
  );
};

const deleteTask = async (id) => {
  return await Task.findByIdAndDelete(id);
};

const searchTasks = async (keyword) => {
  return await Task.find({
    title: { $regex: keyword, $options: "i" },
  });
};

const filterTasksByStatus = async (completed) => {
  return await Task.find({ completed });
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  updateTaskStatus,
  deleteTask,
  searchTasks,
  filterTasksByStatus,
};

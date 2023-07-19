const tasksModel = require("../models/tasksModel");

const getAll = async (req, res) => {
  const [tasks] = await tasksModel.getAll();
  return res.status(200).json(tasks);
};

const getTask = async (req, res) => {
  const { id } = req.params;

  const task = await tasksModel.getTask(id);

  return res.status(200).json(task);
};

const getRecentTasks = async (req, res) => {
  const [recent] = await tasksModel.getRecentTasks();

  return res.status(200).json(recent);
};

const createTask = async (req, res) => {
  const createdTask = await tasksModel.createTask(req.body);
  return res.status(201).json(createdTask);
};

const deleteTask = async (req, res) => {
  const { id } = req.params;

  await tasksModel.deleteTask(id);

  return res.status(204).json();
};

const updateTask = async (req, res) => {
  const { id } = req.params;

  await tasksModel.updateTask(id, req.body);

  return res.status(204).json();
};

module.exports = {
  getAll,
  getTask,
  getRecentTasks,
  createTask,
  deleteTask,
  updateTask,
};

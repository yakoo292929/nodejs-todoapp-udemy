const Task = require('../models/Task');

// 全てのタスク取得
const getAllTasks = async (req, res) => {
  try {
    const allTasks = await Task.find({});
    res.status(200).json(allTasks);
  } catch (err) {
    res.status(500).json(err);
  }

};

// タスク新規作成
const createTask = async (req, res) => {
  try {
    const createTask = await Task.create(req.body);
    res.status(200).json(createTask);
  } catch (err) {
    res.status(500).json(err);
  }
};

// 特定のタスクを取得
const getSingleTask = async (req, res) => {
  try {
    const getSingleTask = await Task.findOne( {_id : req.params.id });
    if (!getSingleTask) {
        return res.status(404).json(`id:${req.params.id}は存在しません`);
    }
    res.status(200).json(getSingleTask);
  } catch (err) {
    res.status(500).json(err);
  }
};

// 特定のタスクを更新
const updateTask = async (req, res) => {
  try {
    const updateTask = await Task.findOneAndUpdate(
      { _id : req.params.id },
      req.body,
      {
        new: true,
      }
      );
    if (!updateTask) {
        return res.status(404).json(`id:${req.params.id}は存在しません`);
    }
    res.status(200).json(updateTask);
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteTask = async (req, res) => {
  try {
    const deleteTask = await Task.findOneAndDelete({ _id : req.params.id });
    if (!deleteTask) {
        return res.status(404).json(`id:${req.params.id}は存在しません`);
    }
    res.status(200).json(deleteTask);
  } catch (err) {
    res.status(500).json(err);
  }

};

module.exports = {
  getAllTasks,
  createTask,
  getSingleTask,
  updateTask,
  deleteTask,
}

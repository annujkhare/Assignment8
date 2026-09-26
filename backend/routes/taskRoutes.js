const express = require("express");

const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  updateTaskStatus,
  deleteTask,
  searchTasks,
  filterTasksByStatus,
} = require("../controllers/taskController");

const router = express.Router();

router.get("/search", searchTasks);

router.get("/search", searchTasks);

router.get("/", (req, res, next) => {
  if (req.query.status) {
    return filterTasksByStatus(req, res);
  }

  return getAllTasks(req, res);
});

router.get("/:id", getTaskById);

router.get("/", getAllTasks);

router.get("/:id", getTaskById);

router.post("/", createTask);

router.put("/:id", updateTask);

router.patch("/:id/status", updateTaskStatus);

router.delete("/:id", deleteTask);

module.exports = router;

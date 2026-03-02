const express = require("express");
const db = require("../db");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

module.exports = router;

router.post("/", auth, (req, res) => {
  const { task_text } = req.body;

  db.query(
    "INSERT INTO tasks (user_id, task_text) VALUES (?, ?)",
    [req.user.id, task_text],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Task added successfully" });
    }
  );
});

router.get("/", auth, (req, res) => {
  db.query(
    "SELECT * FROM tasks WHERE user_id = ?",
    [req.user.id],
    (err, results) => {
      if (err) return res.status(500).json(err);
      res.json(results);
    }
  );
});

router.delete("/:id", auth, (req, res) => {
  const taskId = req.params.id;

  db.query(
    "DELETE FROM tasks WHERE id = ? AND user_id = ?",
    [taskId, req.user.id],
    (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Task not found" });
      }

      res.json({ message: "Task deleted successfully" });
    }
  );
});


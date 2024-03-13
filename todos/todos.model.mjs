import { pool } from "../db/index.mjs";

export async function getAllTodos() {
  const response = await pool.query("SELECT * FROM todos;");
  return response.rows;
}

export async function createTodo(todo) {
  const response = await pool.query(
    "INSERT INTO todos (task, completed) VALUES ($1, $2) RETURNING *;",
    [todo.task, todo.completed]
  );
  return response.rows[0];
}

export async function replaceTodoById(id, todo) {
  const response = await pool.query(
    "UPDATE todos SET task = $1, completed = $2 WHERE id = $3 RETURNING *;",
    [todo.task, todo.completed, id]
  );
  return response.rows[0];
}

export async function deleteTodoById(id) {
  const response = await pool.query("DELETE FROM todos WHERE id = $1", [id]);
  return response.rows[0];
}

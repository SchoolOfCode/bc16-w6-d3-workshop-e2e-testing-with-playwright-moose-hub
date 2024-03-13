import * as todosModel from "./todos.model.mjs";

export async function getAllTodos(req, res) {
  const todos = await todosModel.getAllTodos();

  res.json({
    success: true,
    payload: todos,
  });
}

export async function createTodo(req, res) {
  const created = await todosModel.createTodo({
    task: req.body.task,
    completed: req.body.completed,
  });

  res.status(201).json({
    success: true,
    payload: created,
  });
}

export async function replaceTodoById(req, res) {
  const updated = await todosModel.replaceTodoById(req.params.id, {
    task: req.body.task,
    completed: req.body.completed,
  });

  res.json({
    success: true,
    payload: updated,
  });
}

export async function deleteTodoById(req, res) {
  const deleted = await todosModel.deleteTodoById(req.params.id);

  res.json({
    success: true,
    payload: deleted,
  });
}

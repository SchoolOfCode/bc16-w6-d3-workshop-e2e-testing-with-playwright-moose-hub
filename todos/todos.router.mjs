import { Router } from "express";
import * as todosController from "./todos.controller.mjs";

export const router = Router();

router
  .get("/", todosController.getAllTodos)
  .post("/", todosController.createTodo)
  .put("/:id", todosController.replaceTodoById)
  .delete("/:id", todosController.deleteTodoById);

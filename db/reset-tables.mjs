import { resetTodosTable } from "./helpers.mjs";
import { pool } from "./index.mjs";

try {
  const insertedRows = await resetTodosTable([
    { task: "Walk the dog", completed: false },
    { task: "Wash the car", completed: true },
    { task: "Get groceries", completed: false },
  ]);
  console.log("Reset todos table", insertedRows);
} catch (e) {
  console.error(e);
  console.error("Failed to reset tables");
} finally {
  await pool.end();
}

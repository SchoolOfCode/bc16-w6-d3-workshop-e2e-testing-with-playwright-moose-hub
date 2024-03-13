import { pool } from "./index.mjs";

/**
 * @param {{ task: string; completed: boolean; }[]} data - An array of todo objects without ids
 */
export async function resetTodosTable(data) {
  await pool.query(`
    DROP TABLE IF EXISTS todos;
    CREATE TABLE todos (
      id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      completed BOOLEAN NOT NULL,
      task TEXT NOT NULL
    );`);

  const inserted = await pool.query(
    `INSERT INTO todos (
      completed, task
    ) (
      SELECT completed, task
      FROM json_populate_recordset(NULL::todos, $1::JSON)
    )
    RETURNING *;`,
    [JSON.stringify(data)]
  );

  return inserted.rows;
}

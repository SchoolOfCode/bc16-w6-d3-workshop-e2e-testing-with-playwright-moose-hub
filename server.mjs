import app from "./app.mjs";

const PORT = process.env.PORT ?? 10001;

app.listen(PORT, () => {
  console.log(`Server is now listening on http://localhost:${PORT}`);
});

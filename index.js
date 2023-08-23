import express, { json } from "express";
import { wrestlerRouter } from "./routes/wrestler.js";
import { corsMiddleware } from "./middlewares/cors.js";

const app = express();
// Middleware
app.use(json());
app.use(corsMiddleware);
app.disable("x-powered-by");

app.get("/", (req, res) => {
  res.json({ message: "Welcome page" });
});

app.use("/wrestlers", wrestlerRouter);

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => console.log("Server listening."));

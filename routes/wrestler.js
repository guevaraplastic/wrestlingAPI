import { Router } from "express";
import { WrestlerController } from "../controllers/wrestlers.js";

export const wrestlerRouter = Router();

wrestlerRouter.get("/", WrestlerController.getAll);
wrestlerRouter.get("/:id", WrestlerController.getById);

wrestlerRouter.post("/", WrestlerController.create);
wrestlerRouter.delete("/:id", WrestlerController.delete);
wrestlerRouter.patch("/:id", WrestlerController.update);

import { Router, Request, Response } from "express";
import user from "./user";

const routes = Router();

routes.use("/user", user);

routes.use((req: Request, res: Response) =>
  res.status(404).json({ error: "Unknown request" })
);

export default routes;
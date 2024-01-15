import { Router } from "express";
import { UserController } from "../controllers";
import { AuthorizationService } from "../services";

const routes = Router();

const userController = new UserController();
const auth = new AuthorizationService();

routes.get(
  "/",
  [auth.checkRole.bind(auth), auth.authenticateToken.bind(auth)],
  userController.getAll.bind(userController)
);
routes.post("/signup", userController.signUp.bind(userController));
routes.post("/login", userController.login.bind(userController));

export default routes;

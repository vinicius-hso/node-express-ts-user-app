import { Router } from "express";

// todo* > importar controller
import { UserController } from "../controllers";

import { AuthorizationService } from "../services";

const routes = Router();

// todo* > instanciar controller
const userController = new UserController();
const authorizationService = new AuthorizationService();

routes.get(
  "/",
  authorizationService.authenticateToken.bind(authorizationService),
  userController.getAll.bind(userController)
);
routes.post("/signup", userController.signUp.bind(userController));
routes.post("/login", userController.login.bind(userController));

export default routes;

import { Request, Response } from "express";
import { UserService, AuthorizationService } from "../services";
import { IUser } from "../ts";

const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;
// const myPlaintextPassword = "s0//P4$$w0rD";
// const someOtherPlaintextPassword = "not_bacon";

export class UserController {
  userService: UserService;
  authService: AuthorizationService;

  constructor(
    userService = new UserService(),
    authService = new AuthorizationService()
  ) {
    this.userService = userService;
    this.authService = authService;
  }

  public async signUp(request: Request, response: Response): Promise<Response> {
    const user: IUser | any = request.body;

    if (!user.name)
      return response
        .status(400)
        .json({ message: "Bad request: name required!" });

    if (!user.password)
      return response
        .status(400)
        .json({ message: "Bad request: password required!" });

    if (!user.email)
      return response
        .status(400)
        .json({ message: "Bad request: emil required!" });

    // * verificar se o usário já existe...
    const existindUser = await this.userService.getByEmail(user.email);

    if (existindUser) {
      return response
        .status(409)
        .json({ message: "A User is already signUp with this email" });
    }

    // * hash password
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    // hashsync is a function that can hasing the password
    const hashedpassword = await bcrypt.hash(user.password, salt);
    user.password = hashedpassword;

    // * setando role padrão
    if (!user.role) user.role = "customer";

    // * usar bind no controller handler da rota
    const result = await this.userService.create(user);
    // console.log(result);

    return response.status(200).json({ message: "User created" });
  }

  public async login(request: Request, response: Response): Promise<Response> {
    const user: IUser | any = request.body;

    // * verificar payload
    if (!user.email || !user.password) {
      return response
        .status(422)
        .json({ message: "All feilds should be filled" });
    }

    // * buscar usuário por email
    const loggedUser = await this.userService.getByEmail(user.email);

    if (!loggedUser) {
      return response
        .status(400)
        .json({ message: "Email is not found, Check it and try again" });
    }

    // * checar password
    const isPasswordCorrect = bcrypt.compareSync(
      user.password,
      loggedUser.password
    );

    if (!isPasswordCorrect) {
      return response
        .status(400)
        .json({ message: "Invalid password, Check it and try again" });
    }

    // * criar token
    const token = this.authService.generateToken(loggedUser.id);

    // * criar e setar cookie com o ID do usuário e token
    response.cookie(String(loggedUser.id), token, {
      path: "/",
      expires: new Date(Date.now() + 1000 * 59),
      httpOnly: true, // if this option isn't here cookie will be visible to the frontend
      sameSite: "lax",
    });

    // * send this message along with logged user details
    return response
      .status(200)
      .json({ message: "Successfully logged in", User: loggedUser });
  }

  public async getAll(request: Request, response: Response): Promise<Response> {
    // * usar bind no controller handler da rota
    const users: IUser[] = await this.userService.listAll();

    return response.status(200).json(users);
  }
}

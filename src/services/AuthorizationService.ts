import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserService } from "./UserService";

export class AuthorizationService {
  private readonly secretKey: any;
  private readonly requiredRoles: String[];
  private userService: UserService;

  constructor(secretKey = process.env.SECRET_KEY) {
    this.secretKey = secretKey;
    this.requiredRoles = ["admin", "manager"];
    this.userService = new UserService();
  }

  public generateToken(data: any): string {
    return jwt.sign({ data }, this.secretKey, { expiresIn: "60s" });
  }

  public authenticateToken(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response> | any {
    // * token in header
    // const token = request.header("Authorization");
    // if (!token) {
    //   return response
    //     .status(401)
    //     .json({ message: "Unauthorized - Missing token" });
    // }
    // jwt.verify(token, this.secretKey, (error: any, user: any) => {
    //   if (error) {
    //     return response
    //       .status(403)
    //       .json({ message: "Forbidden - Invalid token" });
    //   }
    //   // Attach the user data to the request for further handling
    //   (request as any).body = user;
    //   next();
    // });

    // * token in cookies
    const cookies = request.headers.cookie;

    if (!cookies) {
      return response.status(403).json({ message: "Login first" });
    }
    const token = cookies.split("=")[1];

    if (!token) {
      return response.status(403).json({ message: "A token is required" });
    } else {
      const decode: any = jwt.verify(token, this.secretKey);
      request.body = decode.data;
      next();
    }
  }

  public async checkRole(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const convertedRoles = this.requiredRoles.map((role) =>
        role.toLowerCase()
      );

      // * id do usuário
      const { userId } = request.body;

      // * buscar usuario
      const user = await this.userService.getById(userId);

      // * verificando roles do usuário
      if (
        !user ||
        !user.role ||
        !convertedRoles.includes(user.role.toLowerCase())
      ) {
        return response
          .status(403)
          .json({ message: "You are unauthorized ..." });
      }

      // * próximo handler
      next();
    } catch (error) {
      return response
        .status(500)
        .json({ message: "Authorization error occurred" });
    }
  }
}

// TODO: continuar... checkRole e logout
// https://enlear.academy/how-to-securely-authenticate-and-authorize-users-with-node-js-express-mongodb-b57373731efc

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export class AuthorizationService {
  private readonly secretKey: any = process.env.SECRET_KEY;

  constructor(secretKey = process.env.SECRET_KEY) {
    this.secretKey = secretKey;
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
}

// TODO: continuar... checkRole e logout
// https://enlear.academy/how-to-securely-authenticate-and-authorize-users-with-node-js-express-mongodb-b57373731efc

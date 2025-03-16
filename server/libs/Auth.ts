import bcrypt from "bcrypt";
import httpErrors from "http-errors";
import httpStatus from "http-status";
import _ from "lodash";

/// * libs
import Logger from "./Logger";
import User from "./User";
import JWT from "./JWT";

/// * types
import { IUser, IUserWithoutPassword } from "../../types/User.types";

const logger = new Logger("auth");

class Auth {
  /// y ***************************************************
  static cookieName = "tape-escape-jwt";

  /// o ***************************************************
  static async login(username: string, password: string): Promise<User> {
    const user = await User.getUser(username);

    if (user) {
      const isPasswordCorrect = await this.comparePasswords(user, password);

      if (isPasswordCorrect) {
        return user;
      } else {
        throw httpErrors(httpStatus.UNAUTHORIZED, "Invalid password");
      }
    } else {
      throw httpErrors(httpStatus.UNAUTHORIZED, "User not found");
    }
  }

  /// o ***************************************************
  static async verifyJWT(jwt: string): Promise<User> {
    const decoded = await JWT.verify(jwt);
    const user = await User.getUser(decoded.username);

    if (user) {
      return user;
    } else {
      throw httpErrors(httpStatus.UNAUTHORIZED, "User not found");
    }
  }

  /// o ***************************************************
  static async comparePasswords(user: IUser, password: string) {
    return await bcrypt.compare(password, user.password);
  }
}

export default Auth;

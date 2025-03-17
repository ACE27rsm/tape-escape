import _ from "lodash";
import jsonwebtoken from "jsonwebtoken";

/// * types
import { IUser, IUserWithoutPassword } from "../../types/User.types";

/// * static
import config from "../config";

class JWT {
  static sign(user: IUserWithoutPassword): string {
    return jsonwebtoken.sign(user, config.jwt.secret);
  }

  static verify(jwt: string): IUserWithoutPassword {
    const decoded = jsonwebtoken.verify(
      jwt,
      config.jwt.secret
    ) as IUserWithoutPassword

    return decoded;
  }
}

export default JWT;

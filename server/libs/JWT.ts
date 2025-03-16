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

  static verify(jwt: string): Promise<any> {
    const decoded = jsonwebtoken.verify(jwt, config.jwt.secret);
    debugger
    return {
      _jwt: jwt,
      ..._.omit(decoded, ["iat", "exp"]),
    };
  }
}

export default JWT;

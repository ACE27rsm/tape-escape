import fs from "fs";
import path from "path";

import Logger from "./Logger";
import { IUserWithoutPassword, IUser } from "../../types/User.types";
import { Socket } from "socket.io";

const logger = new Logger("user");

class User {
  private static usersWithCredentials: IUser[] = [];
  static users: User[] = [];
  static userFilePath = path.join(process.cwd(), "db/users.db.txt");
  static userWithCredentialFilePath = path.join(
    process.cwd(),
    "db/users-with-credentials.db.tsx"
  );

  /// o ***************************************************
  static getUsersWithCredentials(): IUser[] {
    return this.usersWithCredentials;
  }

  /// o ***************************************************
  static async init() {
    try {
      /// * Read user from file in sync mode to make sure the data is available
      this.users = JSON.parse(
        await fs.readFileSync(this.userFilePath, "utf-8")
      );
      this.usersWithCredentials = JSON.parse(
        await fs.readFileSync(this.userWithCredentialFilePath, "utf-8")
      );
    } catch (error) {
      logger.error({ error });
    }
  }

  /// o ***************************************************
  static async getUser(username: string): Promise<User | undefined> {
    try {
      if (this.users.length === 0) {
        await this.init();
      }

      const user = this.users.find((user) => user.username === username);

      if (user) {
        return new this(user);
      }
    } catch (error) {
      logger.error({ error });
    }
  }

  /// b ***************************************************
  /// b ***************************************************
  /// b ***************************************************
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  avatar: string;

  constructor({
    username,
    firstName,
    lastName,
    password,
    avatar,
  }: {
    username: string;
    firstName: string;
    lastName: string;
    password: string;
    avatar: string;
  }) {
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
    this.avatar = avatar;
  }

  /// y ***************************************************
  get data(): IUserWithoutPassword {
    return {
      username: this.username,
      firstName: this.firstName,
      lastName: this.lastName,
      avatar: this.avatar,
    };
  }

  /// y ***************************************************
  get getSocketIoUserRoom() {
    return `user-${this.username}`;
  }

  /// y ***************************************************
  subscribeToSocketIoRooms(clientSocket: Socket): void {
    clientSocket.join(this.getSocketIoUserRoom);
    logger.debug(
      `L'utente ${this.username} è entrato nella stanza socket.io ${this.getSocketIoUserRoom}`
    );
  }
}

User.init();

export default User;

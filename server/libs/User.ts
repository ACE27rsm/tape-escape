import fs from "fs/promises";

import Logger from "./Logger";
import { IUserWithoutPassword } from "../../types/User.types";
import { Socket } from "socket.io";

const logger = new Logger("user");

class User {
  static users: User[] = [];

  /// o ***************************************************
  static async init() {
    try {
      this.users = JSON.parse(await fs.readFile("db/users.db.txt", "utf-8"));
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

export default User;

import fs from "fs/promises";

import Logger from "./Logger";

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
}

export default User;

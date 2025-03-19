
/// * libs
import Logger from "./Logger";
import { Socket } from "socket.io";

/// * static data
import usersWithCredentials from "../db/users-with-credentials.db.json";
import users from "../db/users.db.json";

/// * types
import { IUserWithoutPassword, IUser } from "../../types/User.types";

const logger = new Logger("user");

class User {
  private static usersWithCredentials: IUser[] = usersWithCredentials;
  static users: IUser[] = users;

  /// o ***************************************************
  static async getUsersWithCredentials(): Promise<IUser[]> {
    return this.usersWithCredentials;
  }

  /// o ***************************************************
  static async getUser(username: string): Promise<User | undefined> {
    try {
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

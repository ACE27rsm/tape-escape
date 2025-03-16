export interface IUser {
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  avatar: string;
}

export interface IUserWithoutPassword extends Omit<IUser, "password"> {}

export interface IUserLoginPayload {
  username: string;
  password: string;
}

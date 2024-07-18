export interface IUser {
  token: string;
  username: string;
  user_id: number;
}

export interface UserDto {
  email: string;
  password: string;
}

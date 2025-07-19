export type TUser = {
  email: string;
  hashedPassword: string;
  salt: string;
};

export type TUserDetails = TUser & {
  id: number;
  password: string;
};

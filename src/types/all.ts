export type ContactsType = {
  user_id: UserType;
  name: string;
  email: string;
  phone: string;
};

export type UserType = {
  username: string;
  email: string;
  password: string;
};

export type JwtToken = {
  accessToken: string;
};

export type JwtData = {
  id: string;
  username: string;
  email: string;
};

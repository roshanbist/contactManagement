export type ContactsType = {
  user_id: UserType;
  name: String;
  email: String;
  phone: String;
};

export type UserType = {
  username: String;
  email: String;
  password: String;
};

export type JwtToken = {
  accessToken: String;
};

export type JwtData = {
  id: String;
  username: String;
  email: String;
};

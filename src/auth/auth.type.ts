export type JwtPayload = {
  id: string;
  email: string;
};

export type JwtResponse = {
  access_token: string;
  refresh_token: string;
};

export type JwtRequest = {
  user: JwtPayload;
};

export interface LoginResponse {
  userName: string;
  token: string;
  authorized: boolean; // TODO: Replace this with JWT token and add roles and what not here.
}
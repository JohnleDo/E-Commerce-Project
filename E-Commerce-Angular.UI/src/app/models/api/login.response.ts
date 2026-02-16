export interface LoginResponse {
  userName: string;
  authorized: boolean; // TODO: Replace this with JWT token and add roles and what not here.
}
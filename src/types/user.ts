export interface User {
  _id: string;
  name?: string;
  avatar?: string;
  email?: string;

  [key: string]: unknown;
}

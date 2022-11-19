export interface User {
  id: string;
  email: string;
  roles: string[];
  state: string;
  createdAt: Date;
  emailConfirmed: boolean;
}

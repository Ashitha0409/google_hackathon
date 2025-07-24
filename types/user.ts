// types/user.ts

export type UserRole = 'admin' | 'responder' | 'user';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
  zone?: string;
  uid?: string;        // For Firebase auth
  displayName?: string; // For Firebase auth
}

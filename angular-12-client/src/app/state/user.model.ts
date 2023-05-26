export class User {
    id?: number;
    username?: string;
    password?: string;
    token?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    authdata?: string;
}


export interface State {
    // is a user authenticated?
    isAuthenticated: boolean;
    // if authenticated, there should be a user object
    user: User | null;
    // error message
    errorMessage: string | null;
  }

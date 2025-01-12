import { nhost } from './nhost';

export const authService = {
  signUp: async (email: string, password: string) => {
    return await nhost.auth.signUp({
      email,
      password,
    });
  },

  signIn: async (email: string, password: string) => {
    return await nhost.auth.signIn({
      email,
      password,
    });
  },

  signOut: async () => {
    return await nhost.auth.signOut();
  },

  resetPassword: async (email: string) => {
    return await nhost.auth.resetPassword({ email });
  },

  isAuthenticated: () => {
    return nhost.auth.isAuthenticated();
  }
}; 
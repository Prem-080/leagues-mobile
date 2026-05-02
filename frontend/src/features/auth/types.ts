export type AuthContextType = {
    token: string | null;
    loginUser: (token: string) => void;
    logout: () => void;
  };
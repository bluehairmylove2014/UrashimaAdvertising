export interface AuthState {
  token: string | null;
  refreshToken: string | null;
}

export type AuthAction =
  | {
    type: "SET_ACTION";
    payload: string;
  }
  | {
    type: "SET_REFRESH_ACTION";
    payload: number;
  }
  | {
    type: "SET_ALL_ACTION";
    payload: AuthState;
  };

export type AuthContextType = {
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
};

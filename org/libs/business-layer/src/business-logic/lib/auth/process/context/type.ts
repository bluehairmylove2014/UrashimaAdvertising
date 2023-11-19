export interface AuthState {
  token: string | null;
  refreshToken: string | null;
}

export type AuthAction =
  | {
      type: "SET_ACTION";
      payload: AuthState["token"];
    }
  | {
      type: "SET_REFRESH_ACTION";
      payload: AuthState["refreshToken"];
    }
  | {
      type: "SET_ALL_ACTION";
      payload: AuthState;
    };

export type AuthContextType = {
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
};

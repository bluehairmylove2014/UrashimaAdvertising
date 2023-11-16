import { UserAction, UserState } from ".";

export const userReducer = (
  state: UserState,
  action: UserAction
): UserState => {
  try {
    switch (action.type) {
      case "SET_USER_ACTION":
        return {
          ...state,
          userData: action.payload,
        };
      case "SET_TOKEN_ACTION":
        return {
          ...state,
          accessToken: action.payload,
        };

      default:
        return state;
    }
  } catch (error) {
    console.error("Error in userReducer: ", error);
    return state;
  }
};

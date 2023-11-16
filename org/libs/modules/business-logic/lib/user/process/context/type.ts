import { IUser } from '@modules/services/entities';

export interface UserState {
  userData: IUser | undefined;
  accessToken: string | null;
}

export type UserAction =
  | {
      type: 'SET_USER_ACTION';
      payload: UserState['userData'];
    }
  | {
      type: 'SET_TOKEN_ACTION';
      payload: UserState['accessToken'];
    };

export type UserContextType = {
  state: UserState;
  dispatch: React.Dispatch<UserAction>;
};

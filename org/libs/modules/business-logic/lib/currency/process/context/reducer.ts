import { CurrencyAction, CurrencyState } from ".";

export const currencyReducer = (
  state: CurrencyState,
  action: CurrencyAction
): CurrencyState => {
  try {
    switch (action.type) {
      case "SET_CURRENCY_RATE":
        return {
          ...state,
          rate: action.payload,
        };
      case "SET_CURRENCY_FORMAT":
        return {
          ...state,
          format: action.payload,
        };
      default:
        return state;
    }
  } catch (error) {
    console.error("Error in currencyReducer: ", error);
    return state;
  }
};

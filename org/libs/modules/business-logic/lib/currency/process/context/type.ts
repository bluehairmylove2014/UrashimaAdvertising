export type currencyFormatType = "VND" | "USD";
export interface CurrencyState {
  rate: number;
  format: currencyFormatType;
}

export type CurrencyAction =
  | {
      type: "SET_CURRENCY_RATE";
      payload: CurrencyState["rate"];
    }
  | {
      type: "SET_CURRENCY_FORMAT";
      payload: CurrencyState["format"];
    };

export type CurrencyContextType = {
  state: CurrencyState;
  dispatch: React.Dispatch<CurrencyAction>;
};

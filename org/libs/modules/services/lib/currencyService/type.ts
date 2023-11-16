export type GetCurrencyRateServerResponse = {
  base: string;
  date: string;
  rates: {
    USD: number;
    VND: number;
  };
  success: boolean;
  timestamp: number;
};
export type GetCurrencyRateServiceResponse = {
  date: string;
  rates: {
    USD: number;
    VND: number;
  };
};

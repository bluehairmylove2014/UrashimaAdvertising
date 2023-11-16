import axios, { AxiosResponse } from "axios";
import { getAxiosNormalInstance } from "../../config/axios";
import { Services } from "../../service";
import {
  exchangeratesGetLatestPath,
  exchangeratesapi,
} from "../../config/apis";
import {
  GetCurrencyRateServerResponse,
  GetCurrencyRateServiceResponse,
} from "./type";

export class CurrencyService extends Services {
  abortController?: AbortController;
  exAccessKey = process.env.NEXT_PUBLIC_CURRENCY_ACCESS_KEY;
  axiosInstance = axios.create({
    baseURL: exchangeratesapi,
  });

  getCurrencyRate = async ({
    format,
  }: {
    format: string;
  }): Promise<GetCurrencyRateServiceResponse> => {
    this.abortController = new AbortController();
    try {
      const response: AxiosResponse<GetCurrencyRateServerResponse> =
        await this.axiosInstance.get(exchangeratesGetLatestPath, {
          signal: this.abortController.signal,
          params: {
            access_key: this.exAccessKey,
            symbols: `${format},VND`,
            base: "EUR",
          },
        });
      if (response.data.success) {
        return {
          date: response.data.date,
          rates: response.data.rates,
        };
      } else {
        throw new Error("Error getCurrencyRate success false");
      }
    } catch (error) {
      throw this.handleError(error);
    }
  };
}

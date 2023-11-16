import { axiosMockAdapterInstance } from "../../config/axios";
import cartsData from "../data/cart.json";
import { getApiUrl } from "../../config/url";
import { getCartUrl } from "../../config/apis";

axiosMockAdapterInstance
  .onGet(getApiUrl(false) + getCartUrl)
  .reply((config: any) => {
    const token = config.headers?.Authorization.replace("Bearer ", "");
    if (token) {
      return cartsData[0]
        ? [200, cartsData[0]]
        : [
            404,
            {
              message: `Cannot find cart`,
            },
          ];
    } else {
      return [
        401,
        {
          message: "Invalid credential",
        },
      ];
    }
  });

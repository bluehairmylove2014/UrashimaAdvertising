import { axiosMockAdapterInstance } from "../../config/axios";
import cartsData from "../data/cart.json";
import { getApiUrl } from "../../config/url";
import { clearCartUrl } from "../../config/apis";

const cartDataTest = cartsData[0];
axiosMockAdapterInstance
  .onDelete(getApiUrl(false) + clearCartUrl)
  .reply((config: any) => {
    const token = config.headers?.Authorization.replace("Bearer ", "");
    if (token) {
      if (cartDataTest) {
        cartDataTest.items = [];
        return [
          200,
          {
            message: `Clear cart successfully`,
          },
        ];
      } else {
        return [
          404,
          {
            message: `Cannot find cart`,
          },
        ];
      }
    } else {
      return [
        401,
        {
          message: `Invalid credential`,
        },
      ];
    }
  });

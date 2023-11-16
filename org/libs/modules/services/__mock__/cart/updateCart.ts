import { axiosMockAdapterInstance } from "../../config/axios";
import cartsData from "../data/cart.json";
import { getApiUrl } from "../../config/url";
import { updateCartUrl } from "../../config/apis";

const cartDataTest = cartsData[0];
axiosMockAdapterInstance
  .onPut(getApiUrl(false) + updateCartUrl)
  .reply((config: any) => {
    const token = config.headers?.Authorization.replace("Bearer ", "");
    const data = JSON.parse(config.data);
    if (token) {
      if (!data.cart) {
        return [
          401,
          {
            message: `Cart data is invalid or not exist!`,
          },
        ];
      } else if (cartDataTest) {
        cartDataTest.items = data.cart.items;
        return [
          200,
          {
            message: `Update cart with ${data.cart.items?.length} products successfully`,
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
          message: "Invalid credential",
        },
      ];
    }
  });

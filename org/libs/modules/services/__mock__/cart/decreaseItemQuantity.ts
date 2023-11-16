import { axiosMockAdapterInstance } from "../../config/axios";
import cartsData from "../data/cart.json";
import { getApiUrl } from "../../config/url";
import { decreaseItemQuantityUrl } from "../../config/apis";

axiosMockAdapterInstance
  .onDelete(getApiUrl(false) + decreaseItemQuantityUrl)
  .reply((config: any) => {
    const token = config.headers?.Authorization.replace("Bearer ", "");
    if (token) {
      const productID = config.params.productId;
      const quantity = config.params.quantity;
      const cartDataTest = cartsData[0];
      if (cartDataTest?.items) {
        cartDataTest.items = cartDataTest.items.filter((p) => {
          if (p.item.id === productID) {
            if (p.quantity > quantity) {
              p.quantity -= quantity;
              return true;
            } else {
              return false;
            }
          }
          return true;
        });
        return [
          200,
          {
            message: `Delete product with ID: ${productID} from cart successfully`,
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

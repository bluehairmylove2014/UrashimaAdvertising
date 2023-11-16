import { axiosMockAdapterInstance } from "../../config/axios";
import cartsData from "../data/cart.json";
import { getApiUrl } from "../../config/url";
import { deleteFromCartUrl } from "../../config/apis";

axiosMockAdapterInstance
  .onDelete(getApiUrl(false) + deleteFromCartUrl)
  .reply((config: any) => {
    const token = config.headers?.Authorization.replace("Bearer ", "");
    if (token) {
      const productID = config.params.productId;
      const cartDataTest = cartsData[0];
      if (cartDataTest?.items) {
        cartDataTest.items = cartDataTest.items.filter(
          (p) => p.item.id !== productID
        );
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

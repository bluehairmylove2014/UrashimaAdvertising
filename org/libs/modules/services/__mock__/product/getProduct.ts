import { axiosMockAdapterInstance } from "../../config/axios";
import productsRawData from "../data/products.json";
import { getApiUrl } from "../../config/url";
import { getProductUrl } from "../../config/apis";
import { IProductDetail } from "../../entities";
import { getProductParams } from "../..";

const productsTypeData: IProductDetail[] = productsRawData;
axiosMockAdapterInstance
  .onGet(getApiUrl(false) + getProductUrl)
  .reply((config: any) => {
    const params: getProductParams = config.params;
    const product = productsTypeData.find((p) => p.id === params.productId);
    if (product) {
      return [200, product];
    } else {
      return [404, "Không tìm thấy sản phẩm"];
    }
  });

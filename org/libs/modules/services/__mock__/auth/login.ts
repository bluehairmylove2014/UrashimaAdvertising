import { axiosMockAdapterInstance } from "../../config/axios";
import accountsData from "../data/accounts.json";
import { getApiUrl } from "../../config/url";
import { loginUrl } from "../../config/apis";

const accounts = accountsData;

axiosMockAdapterInstance
  .onPost(getApiUrl(false) + loginUrl)
  .reply((config: any) => {
    const data = JSON.parse(config.data);
    const isValidLogin = accounts.some(
      (account) =>
        account.email === data.email && account.password === data.password
    );
    if (isValidLogin) {
      return [
        200,
        {
          message: "Login success",
          token: "This is new login access token :>",
        },
      ];
    } else {
      return [
        /**
         * 401 Unauthorized: Mã lỗi này thường được
         * sử dụng khi người dùng không có quyền truy cập
         * vào tài nguyên hoặc yêu cầu không được xác thực.
         * Trong trường hợp này, email hoặc password không đúng.
         */
        401,
        {
          message: "Wrong email or password",
        },
      ];
    }
  });

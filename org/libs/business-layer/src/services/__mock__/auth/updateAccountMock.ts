import { axiosMockAdapterInstance } from "../../config/axios";
import { getApiUrl } from "../../config/url";
import { updateAccountUrl } from "../../config/apis";

axiosMockAdapterInstance
  .onPost(getApiUrl(false) + updateAccountUrl)
  .reply((config: any) => {
    return [
      200,
      {
        message: "Login success",
        token: "This is new login access token :>",
      },
    ];
  });

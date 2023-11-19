import { axiosMockAdapterInstance } from "../../config/axios";
import { getApiUrl } from "../../config/url";
import { refreshTokenUrl } from "../../config/apis";

axiosMockAdapterInstance
  .onPost(getApiUrl(false) + refreshTokenUrl)
  .reply((config: any) => {
    // const token = config.headers?.Authorization.replace("Bearer ", "");
    return [
      200,
      {
        message: "Token verified",
        token: "This is refresh token",
      },
    ];
  });

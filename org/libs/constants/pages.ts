export const PAGE_URLS = {
  HOME: "/",
  SHOP: "/shop",
  PRODUCT: "/product",
  CART: "/cart",
  ABOUT: "/about",
  ME: "/me",
  PRICING: "/pricing",
  GUIDE: "/guide",
  ACTIVATE_DEVICE: "/active",
  APPLICATION: "/app",
  AUTH: "/auth",
  PROVIDE_INFO: "checkout-info",
};

export const CRUMBS_TEMPLATE = [
  {
    pathname: PAGE_URLS.HOME,
    name: "Trang chủ",
  },
  {
    pathname: PAGE_URLS.SHOP,
    name: "Cửa hàng",
  },
  {
    pathname: PAGE_URLS.PRODUCT,
    name: "Sản phẩm",
  },
  {
    pathname: PAGE_URLS.ABOUT,
    name: "Về chúng tôi",
  },
  {
    pathname: PAGE_URLS.ME,
    name: "Cá nhân",
  },
  {
    pathname: PAGE_URLS.PRICING,
    name: "Bảng giá dịch vụ",
  },
  {
    pathname: PAGE_URLS.GUIDE,
    name: "Hướng dẫn",
  },
  {
    pathname: PAGE_URLS.ACTIVATE_DEVICE,
    name: "Kích hoạt thiết bị",
  },
];

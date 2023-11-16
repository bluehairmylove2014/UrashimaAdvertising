'use client';
import Image, { StaticImageData } from 'next/image';
import './styles.scss';
import Logo from '@assets/logos/the_new_dawn_white.png';
import Link from 'next/link';
import { PAGE_URLS } from '@constants/pages';
import { CommonButton } from '@presentational/atoms/CommonButton/CommonButton';
import { NavDropdown } from '@presentational/atoms/NavDropdown/NavDropdown';
import { SimpleLoader } from '@presentational/atoms/SimpleLoader/SimpleLoader';
import { languageOptions, moneyOptions } from './StaticData';
import { useEffect, useState } from 'react';
import currencyIcon from '@assets/icons/dollar.png';
import { useIsLogged } from '@modules/business-logic/lib/auth';
import { RANK } from '@constants/ranks';
import { useDispatch } from 'react-redux';
import { setLanguage, useCrumb } from '@storages/redux';
import { languageType } from '@storages/redux';
import { useChangeCurrencyFormat } from '@modules/business-logic/lib/currency';
import { useNotification } from '@presentational/molecules/Notification/Notification';
import { useFullscreenLoaderController } from '@presentational/molecules/FullScreenLoader/FullScreenLoader';
import Icon from '@presentational/atoms/Icon/Icon';
import { currencyFormatType } from '@modules/business-logic/lib/currency/process/context';
import { usePathname } from 'next/navigation';
import { useGetCartItems } from '@modules/business-logic/lib/cart';
import { useRouter } from 'next/navigation';
import { useGetUser } from '@modules/business-logic/lib/user';

const Header = () => {
  const router = useRouter();
  const cartData = useGetCartItems();
  const isLoggedIn = useIsLogged();

  const pathname = usePathname();
  const { addNewCrumb } = useCrumb();
  // const [selectedCurrency, setSelectedCurrency] = useState(moneyOptions[0]);
  // const [selectedLanguage, setSelectedLanguage] = useState(languageOptions[0]);
  const userData = useGetUser();
  const dispatch = useDispatch();
  const { onChangeCurrencyFormat } = useChangeCurrencyFormat();
  const { showSuccess, showError } = useNotification();
  const { showLoader, hideLoader } = useFullscreenLoaderController();

  // Methods
  // const handleChangeLanguage = (value: languageType): void => {
  //   const selectLang = languageOptions.find((lo) => lo.value === value);
  //   selectLang && setSelectedLanguage(selectLang);
  //   dispatch(setLanguage(value));
  // };
  // const handleChangeCurrency = (value: currencyFormatType): void => {
  //   const selectCur = moneyOptions.find((mo) => mo.value === value);
  //   selectCur && setSelectedCurrency(selectCur);

  //   showLoader();
  //   onChangeCurrencyFormat(value)
  //     .then((data) => {
  //       showSuccess("Thành công");
  //     })
  //     .catch((error) => {
  //       console.error("OUT ERROR: ", error);
  //       showError("Thất bại! Xin hãy thử lại sau...");
  //     })
  //     .finally(() => {
  //       hideLoader();
  //     });
  // };
  const getRankIcon = (rank: string): StaticImageData => {
    return RANK[
      `${
        (Object.keys(RANK).find(
          (r) => RANK[r as keyof typeof RANK].id === rank
        ) || 'FREE') as keyof typeof RANK
      }`
    ].icon;
  };

  // Hooks
  useEffect(() => {
    addNewCrumb(pathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <header className="header__wrapper">
      <div className="header container">
        <Link href={PAGE_URLS.HOME} className="logo">
          <Image src={Logo} alt="the new dawn" />
        </Link>
        <nav>
          <ul>
            {/* <li>
            <NavDropdown
              options={languageOptions}
              onClick={handleChangeLanguage}
            >
              <p>
                <Image
                  src={selectedLanguage.flag}
                  alt="vietnam"
                  width={18}
                  height={18}
                />
                {selectedLanguage.name}
                <i className="fi fi-sr-caret-down"></i>
              </p>
            </NavDropdown>
          </li> */}
            {/* <li>
              <NavDropdown
                options={moneyOptions}
                onClick={handleChangeCurrency}
              >
                <p>
                  <Icon
                    media={currencyIcon}
                    alt="money"
                    customWidth={18}
                    customHeight={18}
                  />
                  {selectedCurrency.name}
                  <i className="fi fi-sr-caret-down"></i>
                </p>
              </NavDropdown>
            </li> */}
            {/* <li className="nav__item--link">
              <Link href={PAGE_URLS.GUIDE}>
                <i className="fi fi-ss-box-open"></i>
                Hướng dẫn
              </Link>
            </li>
            <li className="nav__item--link">
              <Link href={PAGE_URLS.ACTIVATE_DEVICE}>
                <i className="fi fi-ss-box-open"></i>
                Kích hoạt thiết bị
              </Link>
            </li> */}
            <li className="nav__item--link">
              <Link href={PAGE_URLS.SHOP} prefetch={true}>
                <i className="fi fi-ss-shop"></i>
                Cửa hàng
              </Link>
            </li>
            <li className="nav__item--link">
              <Link href={PAGE_URLS.CART} className="cart-item" prefetch={true}>
                <i className="fi fi-sr-shopping-bag"></i>
                <span>Giỏ hàng</span>
                <div className="cart-item__badge">
                  {Array.isArray(cartData) ? cartData.length : 0}
                </div>
              </Link>
            </li>
            {isLoggedIn && userData ? (
              <li className="user">
                <Link href={PAGE_URLS.PRICING} className="user__rank">
                  <Icon
                    media={getRankIcon(userData.rankName)}
                    alt="rank"
                    customWidth={30}
                    customHeight={30}
                  />
                </Link>
                <Link
                  href={PAGE_URLS.ME}
                  className="user__avatar"
                  prefetch={true}
                >
                  <Icon
                    media={userData.avatar}
                    alt="avatar"
                    customWidth={40}
                    customHeight={40}
                  />
                </Link>
              </li>
            ) : userData === null ? (
              <li className="user">
                <Link href={PAGE_URLS.ME} className="user__avatar">
                  <SimpleLoader />
                </Link>
              </li>
            ) : (
              <li className="login-button">
                <CommonButton
                  style="fill"
                  onClick={() => router.push(PAGE_URLS.AUTH)}
                >
                  Đăng nhập
                </CommonButton>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

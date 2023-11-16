'use client';

import CustomLink from '@presentational/atoms/CustomLink/CustomLink';
import { crumbsType, stateType } from '@storages/redux';
import { useSelector } from 'react-redux';
import './styles.scss';
import { PAGE_URLS } from '@constants/pages';

const Breadcrumb = () => {
  // const crumbsData = useSelector((state: stateType) => state.crumbs);
  const crumbsData: crumbsType = [
    {
      pathname: PAGE_URLS.HOME,
      name: 'Trang chủ',
    },
    {
      pathname: PAGE_URLS.SHOP,
      name: 'Cửa hàng',
    },
    {
      pathname: PAGE_URLS.SHOP,
      name: 'Đồng hồ Helios',
    },
  ];
  return (
    // <></>
    <div className="breadcrumbs" aria-label="breadcrumbs">
      {crumbsData.map((crumb) => (
        <CustomLink href={crumb.pathname} key={Math.random()}>
          {crumb.name}
        </CustomLink>
      ))}
    </div>
  );
};

export default Breadcrumb;

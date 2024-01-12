import AdLocationsTable from '@presentational/organisms/AdLocationsTable';
import { IBreadcrumb } from '@business-layer/services/entities';
import Breadcrumbs from '@presentational/molecules/Breadcrumbs';
import { OFFICER_PAGES } from '@constants/officerPages';
import LocationTableFilterSelect from '@presentational/molecules/LocationTableFilterSelect';
import { ADS_FORM } from '../../../constants/adsForm';
import { LOCATION_TYPES } from '../../../constants/locationTypes';
import LocationTableSearchBox from '@presentational/molecules/LocationTableSearchBox';

const breadcrumbsData: IBreadcrumb[] = [
  {
    href: OFFICER_PAGES.DASHBOARD,
    label: 'Trang chủ',
    isCurrent: false,
  },
  {
    href: OFFICER_PAGES.ADS_LOCATION,
    label: 'Danh sách điểm quảng cáo',
    isCurrent: true,
  },
];

function AdLocations() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-start justify-start mb-8">
        <h1 className="w-full font-bold !text-base">
          DANH SÁCH ĐIỂM ĐẶT QUẢNG CÁO
        </h1>
        <Breadcrumbs bcList={breadcrumbsData} />
      </div>
      <div className="flex flex-row gap-4 justify-between mb-8 w-full">
        <LocationTableSearchBox />
        <div className="flex flex-row justify-end flex-grow gap-2">
          <LocationTableFilterSelect type="adsForm" options={ADS_FORM} />
          <LocationTableFilterSelect
            type="locationType"
            options={LOCATION_TYPES}
          />
        </div>
      </div>
      <AdLocationsTable />
    </div>
  );
}

export default AdLocations;

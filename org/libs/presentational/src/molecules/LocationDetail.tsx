'use client';
import {
  useGetReportForm,
  useSetReportForm,
} from '@business-layer/business-logic/non-service-lib/reportForm';
import { ILocation } from '@business-layer/services/entities';
import CommonLoader from '@presentational/atoms/CommonLoader';
import ReportForm from './ReportForm';

function LocationDetail({
  locationData,
  isActive,
  handleClose,
}: {
  locationData: ILocation | undefined;
  isActive: boolean;
  handleClose: () => void;
}) {
  const {
    isReportFormActive,
    reportTarget,
    reportData,
    reportIdentificationData,
  } = useGetReportForm();
  const { setForm } = useSetReportForm();
  const handleActivateReport = (lat: number, long: number) => {
    setForm({
      isReportFormActive: true,
      reportTarget: 'LOCATION',
      reportData: null,
      reportIdentificationData: { latitude: lat, longitude: long },
    });
  };
  const iconSize = 21;

  return (
    <>
      <div
        className={`fixed ${isActive ? 'bottom-6' : '-bottom-full'
          } bg-white left-1/2 transform -translate-x-1/2 rounded shadow-sm transition-transform w-4/12 h-fit p-3`}
        style={{ minHeight: '120px' }}
      >
        {locationData ? (
          <>
            <p
              className="text-ellipsis line-clamp-2 font-semibold text-xs"
              style={{ lineHeight: '0.75rem' }}
            >
              {`${locationData.display_name}`}
            </p>
            <p className="mt-2 text-[0.65rem]">
              Postal code: {locationData.postcode}
            </p>
            <p className="text-[0.65rem]">{locationData.country}</p>
            <hr className=" mt-4 mb-2" />
            <div className="flex flex-row gap-4 justify-between items-center flex-nowrap">
              <p className=" text-blue-700 text-[0.6rem] flex-shrink overflow-hidden line-clamp-1">
                {' '}
                <span>{locationData.latt}</span>,{' '}
                <span>{locationData.longt}</span>
              </p>
              <button
                onClick={() =>
                  handleActivateReport(locationData.latt, locationData.longt)
                }
                className="flex flex-nowrap justify-center py-1 px-3 rounded text-[0.6rem] text-red-500 border-solid border-[1px] border-red-500"
              >
                <i className="fi fi-ss-triangle-warning"></i>
                <span className="ml-2 whitespace-nowrap">Báo cáo vi phạm</span>
              </button>
            </div>
          </>
        ) : (
          <div className="absolute top-0 left-0 w-full h-full z-10">
            <CommonLoader />
          </div>
        )}
        <button
          className=" rounded-full bg-black/60 text-white text-[0.6rem] absolute z-20"
          style={{
            width: `${iconSize}px`,
            height: `${iconSize}px`,
            top: `-${iconSize / 3}px`,
            right: `-${iconSize / 3}px`,
          }}
          onClick={handleClose}
        >
          x
        </button>
      </div>
      <ReportForm
        isActive={isReportFormActive}
        reportTarget={reportTarget}
        reportData={reportData}
        reportIdentificationData={reportIdentificationData}
      />
    </>
  );
}

export default LocationDetail;

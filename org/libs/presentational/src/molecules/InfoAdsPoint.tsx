// import CustomButtonIcon from '@presentational/atoms/CustomButtonIcon';
import { IAds } from '@business-layer/services/entities/ads';
// import { useSetReportForm } from '@business-layer/business-logic/lib/reportForm';

function InfoAds({
  info,
  isReported,
  onClick,
}: {
  info: IAds;
  isReported: boolean;
  onClick: (id: number) => void;
}) {
  // const { setForm } = useSetReportForm();
  return (
    <>
      <div className="flex justify-between">
        <p className="text-sm font-bold">{info.adsForm}</p>
        {/* <CustomButtonIcon
          widthIcon="1.1rem"
          heightIcon="1.1rem"
          type="button"
          pathImage="/assets/save.png"
          alt=""
        >
          <></>
        </CustomButtonIcon> */}
      </div>
      <p className="text-[0.7rem] font-medium mb-1 text-neutral-600">
        {info.locationType}
      </p>
      <p className="text-[0.7rem] font-medium mb-1 text-neutral-600">
        {info.address}
      </p>
      <p className="text-[0.75rem] font-extrabold italic text-neutral-600">
        {' '}
        {info.planned ? 'ĐÃ QUY HOẠCH' : 'CHƯA QUY HOẠCH'}
      </p>
      {isReported ? (
        <p className="font-bold text-rose-600 text-sm">
          Bạn đã báo cáo điểm này
        </p>
      ) : (
        <></>
      )}

      {/* <div className="flex justify-between mt-2">
        <CustomButtonIcon
          widthIcon="0.9rem"
          heightIcon="0.9rem"
          type="button"
          pathImage="/assets/detail.png"
          alt=""
          onClick={() => onClick(info.id)}
        >
          <></>
        </CustomButtonIcon>

        {isReported ? (
          <CustomButtonIcon
            widthIcon="0.7rem"
            heightIcon="0.7rem"
            round={2}
            type="button"
            border={1}
            colorBorder="green"
            pathImage="/assets/detailReport.png"
            alt=""
          >
            <span className="text-green-600 text-[0.65rem] text-medium ml-1">
              CHI TIẾT BÁO CÁO
            </span>
          </CustomButtonIcon>
        ) : (
          <CustomButtonIcon
            widthIcon="0.9rem"
            heightIcon="0.9rem"
            round={2}
            type="button"
            border={1}
            colorBorder="rose"
            pathImage="/assets/report.png"
            alt=""
            onClick={() => {
              setForm({
                isReportFormActive: true,
                reportTarget: 'LOCATION',
                reportData: info,
                reportIdentificationData: {
                  latitude: info.latitude,
                  longitude: info.longitude,
                },
              });
            }}
          >
            <span className="text-rose-600 text-[0.65rem] text-medium ml-1">
              BÁO CÁO VI PHẠM
            </span>
          </CustomButtonIcon>
        )}
      </div> */}
    </>
  );
}

export default InfoAds;

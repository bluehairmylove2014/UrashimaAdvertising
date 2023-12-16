import { IAdLocationDetail } from '@business-layer/services/entities';
import { OFFICER_PAGES } from '@constants/officerPages';
import Link from 'next/link';
import Thumbnail from '@presentational/atoms/Thumbnail';

const DEFAULT_THUMBNAIL_WIDTH = 120;
const DEFAULT_THUMBNAIL_HEIGHT = 120;

function DisplayAdDetail({ adData }: { adData: IAdLocationDetail }) {
  return (
    <>
      <div className="flex flex-row justify-between items-center mb-8 ">
        <Link
          href={OFFICER_PAGES.ADS_LOCATION}
          className="overflow-hidden rounded-full bg-sky-700 text-white w-6 h-6 grid place-items-center text-[0.66rem]"
        >
          <i className="fi fi-sr-left"></i>
        </Link>
        <h1 className="w-full text-center font-bold !text-base">
          THÔNG TIN ĐIỂM ĐẶT QUẢNG CÁO
        </h1>
        <div></div>
      </div>
      <div className="grid grid-cols-[80% 1fr] grid-rows-2 gap-5">
        <div className="col-span-1 row-start-1">
          <div className="flex flex-row justify-start items-center mb-2">
            <h5>
              <i className="fi fi-sr-map-marker-home mr-2"></i>
              Địa điểm:
            </h5>
            <p className="pl-3">{adData.address}</p>
          </div>

          <div className="flex flex-row justify-start items-center mb-2">
            <h5>
              <i className="fi fi-sr-layers mr-2"></i>
              Phân loại:
            </h5>

            <p className="pl-3">{adData.locationType}</p>
          </div>

          <div className="flex flex-row justify-start items-center mb-2">
            <h5>
              <i className="fi fi-sr-ad mr-2"></i>
              Hình thức:
            </h5>

            <p className="pl-3">{adData.adsForm}</p>
          </div>

          <div className="flex flex-row justify-start items-center mb-2">
            <h5>
              <i className="fi fi-sr-megaphone mr-2"></i>
              Tình trạng:
            </h5>

            {adData.planned ? (
              <p className="pl-3 font-bold text-green-600">Đã quy hoạch</p>
            ) : (
              <p className="pl-3 font-bold text-red-600">Chưa quy hoạch</p>
            )}
          </div>
        </div>
        <div className="col-span-2 row-start-1">
          <h5 className=" mb-2">
            <i className="fi fi-sr-graphic-style mr-2"></i>
            Hình ảnh địa điểm:
          </h5>
          <div className="flex flex-row justify-start items-center gap-4 mb-2">
            {adData.images.map((img, index) => (
              <Thumbnail
                width={DEFAULT_THUMBNAIL_WIDTH}
                height={DEFAULT_THUMBNAIL_HEIGHT}
                src={img.image}
                key={`${img.image}@${index}`}
              />
            ))}
          </div>
        </div>
        <div className="col-start-1 col-end-3 row-start-2">
          <h5>
            <i className="fi fi-sr-note mr-2"></i>
            Danh sách bảng quảng cáo:
          </h5>
        </div>
      </div>
    </>
  );
}

export default DisplayAdDetail;

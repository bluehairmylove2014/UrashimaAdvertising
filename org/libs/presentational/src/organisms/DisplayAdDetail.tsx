import { IAdLocationDetail } from '@business-layer/services/entities';
import Thumbnail from '@presentational/atoms/Thumbnail';
import TableRow from '@presentational/molecules/TableRow';
import RowLoader from '@presentational/atoms/RowLoader';
import EmptyIcon from '@presentational/atoms/EmptyIcon';
import { formatDate } from '@utils/helpers';

const DEFAULT_THUMBNAIL_WIDTH = 120;
const DEFAULT_THUMBNAIL_HEIGHT = 120;
function DisplayAdDetail({ adData }: { adData: IAdLocationDetail }) {
  return (
    <>
      <div className="grid gap-6 border-solid border-b-[1px] border-b-zinc-300 pb-5 mb-5">
        <div className="col-span-1 col-start-1 row-start-1 w-full overflow-hidden">
          <div className="flex flex-row justify-start items-center mb-2 w-full">
            <h5 className="font-semibold text-sm whitespace-nowrap">
              <i className="fi fi-sr-map-marker-home mr-2"></i>
              Địa điểm:
            </h5>
            <p className="pl-3 w-full whitespace-normal line-clamp-2 relative -bottom-[0.1rem]">
              {adData.address}
            </p>
          </div>

          <div className="flex flex-row justify-start items-center mb-2">
            <h5 className="font-semibold text-sm whitespace-nowrap">
              <i className="fi fi-sr-layers mr-2"></i>
              Phân loại:
            </h5>

            <p className="pl-3 w-full whitespace-normal line-clamp-2 relative -bottom-[0.1rem]">
              {adData.locationType}
            </p>
          </div>

          <div className="flex flex-row justify-start items-center mb-2">
            <h5 className="font-semibold text-sm whitespace-nowrap">
              <i className="fi fi-sr-ad mr-2"></i>
              Hình thức:
            </h5>

            <p className="pl-3 w-full whitespace-normal line-clamp-2 relative -bottom-[0.1rem]">
              {adData.adsForm}
            </p>
          </div>

          <div className="flex flex-row justify-start items-center mb-2">
            <h5 className="font-semibold text-sm whitespace-nowrap">
              <i className="fi fi-sr-megaphone mr-2"></i>
              Tình trạng:
            </h5>

            {adData.planned ? (
              <p className="pl-3 font-bold text-green-600 relative -bottom-[0.1rem]">
                Đã quy hoạch
              </p>
            ) : (
              <p className="pl-3 font-bold text-red-600 relative -bottom-[0.1rem]">
                Chưa quy hoạch
              </p>
            )}
          </div>
        </div>
        <div className="col-span-1 col-start-2 row-start-1">
          <h5 className=" mb-2 font-semibold text-sm">
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
      </div>
      <div className="">
        <h5 className="font-semibold text-sm whitespace-nowrap mb-8">
          <i className="fi fi-sr-note mr-2"></i>
          Danh sách bảng quảng cáo:
        </h5>
        <table className="w-full table-auto text-xs text-center">
          <thead className="bg-indigo-950 text-white font-semibold">
            <tr>
              <th scope="col" className="px-2 py-3">
                STT
              </th>
              <th scope="col" className="px-2 py-3">
                Hình ảnh bảng quảng cáo
              </th>
              <th scope="col" className="px-2 py-3">
                Kích thước
                <br />
                <small>( Rộng x Cao )</small>
              </th>
              <th scope="col" className="px-2 py-3">
                Loại bảng
              </th>
              <th scope="col" className="px-2 py-3">
                Ngày hết hạn
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(adData.adsBoard) ? (
              adData.adsBoard.length > 0 ? (
                adData.adsBoard.map((ad, adIndex) => (
                  <tr
                    className="py-4 even:bg-gray-100"
                    key={`adLocation@${ad.id}`}
                  >
                    <TableRow
                      listData={[
                        ad.id.toString(),
                        <span className="w-full grid place-items-center">
                          <Thumbnail width={200} height={200} src={ad.image} />
                        </span>,
                        <span>
                          {ad.width}m x {ad.height}m
                        </span>,
                        ad.adsType,
                        <>
                          {formatDate(new Date(ad.expiredDate)).dateMonthYear}{' '}
                          <br />
                          {formatDate(new Date(ad.expiredDate)).time24}
                        </>,
                      ]}
                    />
                  </tr>
                ))
              ) : (
                <tr className="py-4">
                  <td colSpan={5} className="py-12">
                    <EmptyIcon label="Không có quảng cáo nào" />
                  </td>
                </tr>
              )
            ) : (
              <RowLoader colNumber={5} />
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default DisplayAdDetail;

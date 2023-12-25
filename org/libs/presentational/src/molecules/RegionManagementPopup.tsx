import CustomButton from '@presentational/atoms/CustomButton';

type regionManagementPopup = {
  isActive: boolean;
  handleClose: () => void;
};

function RegionManagementPopup({
  isActive,
  handleClose,
}: regionManagementPopup) {
  const availableRegion = [
    {
      id: 1,
      ward: 'Phường Tân Định',
      district: 'Quận 1',
    },
    {
      id: 2,
      ward: 'Phường Đa Kao',
      district: 'Quận 1',
    },
    {
      id: 3,
      ward: 'Phường Bến Nghé',
      district: 'Quận 1',
    },
    {
      id: 4,
      ward: 'Phường Bến Thành',
      district: 'Quận 1',
    },
    {
      id: 5,
      ward: 'Phường Nguyễn Thái Bình',
      district: 'Quận 1',
    },
    {
      id: 6,
      ward: 'Phường Phạm Ngũ Lão',
      district: 'Quận 1',
    },
  ];
  const savedOptions = [1, 2];
  const selectedRegionId = [];
  const display = [1, 2];

  const applyChange = () => {};

  return (
    <div
      style={{ display: isActive ? 'block' : 'none' }}
      className="fixed top-0 left-0 w-screen h-screen bg-black/60"
    >
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2/3 h-fit bg-white overflow-hidden rounded p-6">
        <div className="flex flex-row justify-between items-center mb-5">
          <div className="w-5 h-5"></div>
          <div className="text-center">
            <h4>TUỲ CHỈNH KHU VỰC XEM</h4>
            <p>
              Lưu ý: Bạn chỉ có thể chọn xem các khu vực bạn hiện tại đang được
              phép quản lý
            </p>
          </div>
          <button
            className="w-5 h-5 bg-black/50 text-white text-[0.65rem] rounded-full hover:bg-black"
            onClick={handleClose}
          >
            x
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {availableRegion.map((region) => (
            <button
              className={`w-full py-3 text-xs font-semibold  whitespace-normal rounded hover:bg-cyan-300 hover:text-black transition-colors ${
                display.includes(region.id)
                  ? 'bg-cyan-200 text-black'
                  : 'bg-zinc-100 text-black/60'
              }  shadow-md`}
            >{`${region.district}, ${region.ward}`}</button>
          ))}
        </div>
        <div className="w-full grid place-items-center mt-5">
          <div className="w-40">
            <CustomButton
              style="fill-green"
              type="button"
              onClick={applyChange}
              disabled={selectedRegionId.length === 0}
            >
              Xác nhận thay đổi
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegionManagementPopup;

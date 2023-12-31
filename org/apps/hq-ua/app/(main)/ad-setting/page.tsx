import HQPageTitle from '@presentational/molecules/HQPageTitle';
import HQFormsBox from '@presentational/molecules/HQFormsBox';

function AdSetting() {
  const locationTypes = [
    { id: 1, name: 'Đất công/Công viên/Hành lang an toàn giao thông' },
    { id: 2, name: 'Đất tư nhân/Nhà ở riêng lẻ' },
    { id: 3, name: 'Trung tâm thương mại' },
    { id: 4, name: 'Chợ' },
    { id: 5, name: 'Cây xăng' },
    { id: 6, name: 'Nhà chờ xe buýt' },
  ];
  const adForms = [
    { id: 1, name: 'Cổ động chính trị' },
    { id: 2, name: 'Quảng cáo thương mại' },
    { id: 3, name: 'Xã hội hoá' },
  ];
  const adBoardTypes = [
    { id: 1, name: 'Trụ bảng hiflex' },
    { id: 2, name: 'Trụ màn hình điện tử LED' },
    { id: 3, name: 'Trụ hộp đèn' },
    { id: 4, name: 'Bảng hiflex ốp tường' },
    { id: 5, name: 'Màn hình điện tử ốp tường' },
    { id: 6, name: 'Trụ treo băng rôn dọc' },
    { id: 7, name: 'Trụ treo băng rôn ngang' },
    { id: 8, name: 'Trụ/Cụm pano' },
    { id: 9, name: 'Cổng chào' },
    { id: 10, name: 'Trung tâm thương mại' },
  ];

  const reportTypes = [
    { id: 1, name: 'Tố giác sai phạm' },
    { id: 2, name: 'Đăng ký nội dung' },
    { id: 3, name: 'Đóng góp ý kiến' },
    { id: 4, name: 'Giải đáp thắc mắc' },
  ];
  return (
    <div className="py-6 w-full h-screen overflow-y-auto">
      <HQPageTitle title="thiết lập chung" />
      <div className="grid grid-cols-2 grid-rows-1 w-full h-fit gap-6">
        <div className="col-span-1 col-start-1 flex flex-col justify-start items-start gap-6">
          <div className="flex-shrink w-full">
            <HQFormsBox formType="location" data={locationTypes} />
          </div>
          <div className="flex-shrink w-full">
            <HQFormsBox formType="report" data={reportTypes} />
          </div>
        </div>
        <div className="col-span-1 col-start-2 flex flex-col justify-start items-start gap-6">
          <div className="flex-shrink w-full">
            <HQFormsBox formType="ad" data={adForms} />
          </div>
          <div className="flex-shrink w-full">
            <HQFormsBox formType="adBoard" data={adBoardTypes} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdSetting;

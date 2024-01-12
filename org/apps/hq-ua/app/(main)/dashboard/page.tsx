'use client';

import CustomButton from '@presentational/atoms/CustomButton';
import { useViewLocationMap } from '@presentational/organisms/ViewLocationMap';
import Image from 'next/image';

function Dashboard() {
  const { openMap } = useViewLocationMap();

  return (
    <div className="w-full h-screen grid place-items-center">
      <div className="w-fit h-fit flex flex-col justify-center items-center">
        <Image
          src={'/assets/images/icons/hq.jpg'}
          alt="Headquarter"
          width={150}
          height={150}
        />
        <h4 className="text-center">
          Chào mừng sếp đến với đài chỉ huy của
          <br />
          Urashima Advertisement
        </h4>
        <div className="h-fit w-44 mt-4">
          <CustomButton style="fill-primary" type="button" onClick={openMap}>
            <i className="fi fi-ss-earth-americas mr-2"></i>Mở bản đồ
          </CustomButton>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

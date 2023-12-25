import { COOKIE_KEYS } from '@business-layer/business-logic/configs/constants';
import { AccountService } from '@business-layer/services';
import { cookies } from 'next/headers';
import OfficerPersonalDetail from '@presentational/molecules/OfficerPersonalDetail';

const accountService = new AccountService();

async function getAccountDetail() {
  try {
    const token = cookies().get(COOKIE_KEYS.ACCESS_TOKEN)?.value ?? null;
    if (token) {
      return await accountService.getAccountInfo(token);
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}

async function PersonalInformation() {
  const accountInfoData = await getAccountDetail();
  return (
    <div className="w-3/4 p-4">
      <h2 className="font-bold mb-4">Thông tin cá nhân</h2>
      <p>
        Quản lý thông tin cá nhân của bạn, bao gồm số điện thoại, họ tên, email
        và ngày sinh. Vai trò và đơn vị quản lý là thông tin không thể thay đổi.
      </p>
      <OfficerPersonalDetail data={accountInfoData} />
    </div>
  );
}

export default PersonalInformation;

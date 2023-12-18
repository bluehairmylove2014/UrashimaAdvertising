import { OFFICER_PAGES } from '@constants/officerPages';
import LogoutButton from '@presentational/atoms/LogoutButton';
import OfficerMeNavLi from '@presentational/atoms/OfficerMeNavLi';

function Me({ children }: { children: React.ReactNode }) {
  return (
    <main className="container mx-auto px-4 py-12">
      <div className="flex flex-row justify-between items-center border-solid border-b-[1px] border-zinc-200 h-fit w-full pb-5">
        <h3>Tài khoản</h3>
        <div className="h-6 w-28">
          <LogoutButton />
        </div>
      </div>
      <div className="flex flex-row gap-4 mt-3">
        <div className="w-1/4 flex flex-col justify-between px-4 border-solid border-r-[1px] border-gray-100">
          <nav className="w-full py-4">
            <ul className="flex flex-col justify-start items-center w-full gap-3">
              <OfficerMeNavLi
                label="Thông tin cá nhân"
                href={OFFICER_PAGES.PERSONAL_INFORMATION}
              />
              <OfficerMeNavLi
                label="Đổi mật khẩu"
                href={OFFICER_PAGES.CHANGE_PASSWORD}
              />
            </ul>
          </nav>
        </div>
        {children}
      </div>
    </main>
  );
}

export default Me;

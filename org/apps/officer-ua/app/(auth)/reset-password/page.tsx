import ResetPasswordForm from '@presentational/molecules/ResetPasswordForm';

function ResetPassword() {
  return (
    <div className="container mx-auto max-w-lg relative z-20">
      <div className="w-full h-fit bg-white overflow-hidden rounded">
        <div className="text-center mt-6 px-5">
          <h4 className="text-center font-extrabold">QUÊN MẬT KHẨU</h4>
          <p>Nhập email tài khoản để gửi mã xác thực</p>
        </div>

        <div className="mb-6">
          <ResetPasswordForm />
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;

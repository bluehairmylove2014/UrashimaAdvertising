import OTPForm from '@presentational/molecules/OTPForm';

function PasswordOTP() {
  return (
    <div className="container mx-auto max-w-lg relative z-20">
      <div className="w-full h-fit bg-white overflow-hidden rounded">
        <div className="text-center mt-6 px-5">
          <h4 className="text-center font-extrabold">NHẬP MÃ OTP</h4>
          <p>
            Chúng tôi đã gửi mã OTP đến email của bạn. Hãy kiểm tra mã otp và
            nhập bên dưới nhé.
          </p>
        </div>

        <div className="mb-6">
          <OTPForm />
        </div>
      </div>
    </div>
  );
}

export default PasswordOTP;

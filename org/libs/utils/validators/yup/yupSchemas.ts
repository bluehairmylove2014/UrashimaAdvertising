import * as y from 'yup';
import { vietnamPhoneNumber } from './../regex/phoneNumber';

// DEFAULT
const y_email = y
  .string()
  .email('Email không hợp lệ')
  .required('Cần điền email');
const y_fullName = y.string().max(255, 'Không để tên quá 255 ký tự');
const y_dateOfBirth = y.string().required('Không được để trống ngày sinh');
const y_phone = y
  .string()
  .matches(vietnamPhoneNumber, 'Số điện thoại không hợp lệ');
const y_password = y
  .string()
  .required('Không được để trống mật khẩu')
  .max(255, 'Mật khẩu tối đa 255 ký tự')
  .min(6, 'Mật khẩu tối thiểu 6 ký tự');
const y_textArea = y
  .string()
  .required('Không được để trống nội dung')
  .max(1000, 'Nội dung tối đa 1000 ký tự');

// CUSTOM

export const loginSchema = y.object({
  email: y_email,
  password: y_password,
});

export const userReportSchema = y.object({
  name: y_fullName,
  email: y_email,
  phone: y_phone,
});

export const editLocationDetailSchema = y.object({
  address: y
    .string()
    .required('Địa chỉ không được để trống')
    .max(255, 'Địa chỉ tối đa 255 ký tự'),
  id: y.number(),
  latitude: y.number(),
  longitude: y.number(),
  locationType: y.string().required('Không được để trống loại địa điểm'),
  adsForm: y.string().required('Không được để trống hình thức'),
  planned: y.boolean(),
  images: y.array(
    y.object({
      image: y.string(),
    })
  ),
  adsBoard: y.array(
    y.object({
      id: y.number(),
      adsType: y
        .string()
        .required('Không được để trống hình thức bảng quáng cáo'),
      height: y.number().min(1, 'Chiều cao tối thiểu 1m'),
      width: y.number().min(1, 'Chiều rộng tối thiểu 1m'),
      image: y.string(),
      expiredDate: y.string(),
    })
  ),
});
export const newLocationSchema = y.object({
  address: y
    .string()
    .required('Địa chỉ không được để trống')
    .max(255, 'Địa chỉ tối đa 255 ký tự'),
  latitude: y.string().required('Không được để trống kinh độ và vĩ độ'),
  longitude: y.string().required('Không được để trống kinh độ và vĩ độ'),
  locationType: y.string().required('Không được để trống loại địa điểm'),
  adsForm: y.string().required('Không được để trống hình thức'),
  planned: y.boolean(),
  images: y.array(
    y.object({
      image: y.string(),
    })
  ),
});

export const reasonsInputSchema = y.object({
  reasons: y_textArea,
});

export const responseInputSchema = y.object({
  response: y_textArea,
});

export const accountModifyFormSchema = y.object({
  email: y_email,
  fullName: y_fullName,
  dateOfBirth: y_dateOfBirth,
  phone: y_phone,
});

export const changePasswordSchema = y.object({
  oldPassword: y
    .string()
    .required('Không được để trống mật khẩu cũ')
    .max(255, 'Mật khẩu tối đa 255 ký tự')
    .min(6, 'Mật khẩu tối thiểu 6 ký tự'),
  newPassword: y
    .string()
    .required('Không được để trống mật khẩu cũ')
    .max(255, 'Mật khẩu tối đa 255 ký tự')
    .min(6, 'Mật khẩu tối thiểu 6 ký tự'),
});

export const approveRequestFormSchema = y.object({
  companyName: y
    .string()
    .required('Hãy nhập tên công ty')
    .max(255, 'Tên công ty tối đa 255 ký tự'),
  email: y_email,
  phone: y_phone,
  address: y
    .string()
    .required('Hãy nhập địa chỉ công ty')
    .max(500, 'Địa chỉ công ty tối đa 500 ký tự'),
  contractStart: y.string().required('Hãy chọn ngày bắt đầu'),
  // .min(new Date(), 'Ngày bắt đầu hợp đồng tối thiểu là ngày hôm nay'),
  contractEnd: y.string().required('Hãy chọn ngày bắt đầu'),
  // .min(
  //   nMonthsFromToday(1),
  //   'Ngày kết thúc hợp đồng tối thiểu là 1 tháng kể từ hôm nay'
  // ),
  adsContent: y
    .string()
    .required('Hãy nhập nội dung mô tả quảng cáo')
    .max(500, 'Tối đa 500 ký tự'),
});

export const resetPasswordFormSchema = y.object({
  email: y_email,
});

export const passwordOtpFormSchema = y.object({
  otp: y
    .string()
    .required('Không được để trống mã otp')
    .length(6, 'Phải nhập đủ mã otp'),
});

export const newPasswordFormSchema = y.object({
  password: y_password,
  commitPassword: y_password,
});

export const newAccountFormSchema = y.object({
  fullName: y_fullName,
  password: y_password,
  email: y_email,
  dateOfBirth: y_dateOfBirth,
  phone: y_phone,
  role: y.string().required('Bạn chưa chọn vai trò'),
  unitUnderManagement: y
    .string()
    .required('Bạn chưa phân công khu vực quản lý'),
});

export const newRegionSchema = y.object({
  ward: y.string().required('Bạn chưa nhập tên phường'),
  district: y.string().required('Bạn chưa nhập tên quận'),
});

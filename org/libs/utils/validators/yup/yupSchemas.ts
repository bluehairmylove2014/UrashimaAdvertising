import * as y from 'yup';
import { vietnamPhoneNumber } from './../regex/phoneNumber';
import { nMonthsFromToday } from '@utils/helpers';

export const loginSchema = y.object({
  email: y.string().email('Invalid email').required('Email is required'),
  password: y
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

export const userReportSchema = y.object({
  name: y.string().required('Cần bổ sung họ và tên').max(255),
  email: y.string().email('Email không hợp lệ').required('Cần điền email'),
  phone: y.string().matches(vietnamPhoneNumber, 'Số điện thoại không hợp lệ'),
  content: y.string().required('Cần điền nội dung báo cáo').max(1000),
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

export const reasonsInputSchema = y.object({
  reasons: y
    .string()
    .required('Không được để trống nội dung')
    .max(1000, 'Nội dung tối đa 1000 ký tự'),
});

export const accountModifyFormSchema = y.object({
  email: y
    .string()
    .required('Không được để trống nội dung')
    .max(1000, 'Nội dung tối đa 1000 ký tự'),
  fullName: y.string().max(255, 'Không để tên quá 255 ký tự'),
  dateOfBirth: y.string(),
  phone: y.string().matches(vietnamPhoneNumber, 'Số điện thoại không hợp lệ'),
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
  email: y
    .string()
    .required('Hãy nhập email công ty')
    .email('Email không hợp lệ'),
  phone: y
    .string()
    .required('Hãy nhập số điện thoại liên lạc')
    .matches(vietnamPhoneNumber, 'Số điện thoại không hợp lệ'),
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
  email: y
    .string()
    .required('Không được để trống nội dung')
    .max(500, 'Nội dung tối đa 500 ký tự'),
});

export const passwordOtpFormSchema = y.object({
  otp: y
    .string()
    .required('Không được để trống mã otp')
    .length(6, 'Phải nhập đủ mã otp'),
});

export const newPasswordFormSchema = y.object({
  password: y
    .string()
    .required('Không được để trống mật khẩu')
    .max(255, 'Mật khẩu tối đa 255 ký tự')
    .min(6, 'Mật khẩu tối thiểu 6 ký tự'),
  commitPassword: y
    .string()
    .required('Không được để trống mật khẩu')
    .max(255, 'Mật khẩu tối đa 255 ký tự')
    .min(6, 'Mật khẩu tối thiểu 6 ký tự'),
});

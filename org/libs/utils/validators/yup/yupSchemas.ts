import * as yup from 'yup';
import { vietnamPhoneNumber } from './../regex/phoneNumber';

export const loginSchema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

export const userReportSchema = yup.object({
  name: yup.string().required('Cần bổ sung họ và tên').max(255),
  email: yup.string().email('Email không hợp lệ').required('Cần điền email'),
  phone: yup.string().matches(vietnamPhoneNumber, 'Số điện thoại không hợp lệ'),
  content: yup.string().required('Cần điền nội dung báo cáo').max(1000),
});

export const editLocationDetailSchema = yup.object({
  address: yup
    .string()
    .required('Địa chỉ không được để trống')
    .max(255, 'Địa chỉ tối đa 255 ký tự'),
  id: yup.number(),
  latitude: yup.number(),
  longitude: yup.number(),
  locationType: yup.string().required('Không được để trống loại địa điểm'),
  adsForm: yup.string().required('Không được để trống hình thức'),
  planned: yup.boolean(),
  images: yup.array(
    yup.object({
      image: yup.string(),
    })
  ),
  adsBoard: yup.array(
    yup.object({
      id: yup.number(),
      adsType: yup
        .string()
        .required('Không được để trống hình thức bảng quáng cáo'),
      height: yup.number().min(1, 'Chiều cao tối thiểu 1m'),
      width: yup.number().min(1, 'Chiều rộng tối thiểu 1m'),
      image: yup.string(),
      expiredDate: yup.string(),
    })
  ),
});

export const reasonsInputSchema = yup.object({
  reasons: yup
    .string()
    .required('Không được để trống nội dung')
    .max(1000, 'Nội dung tối đa 1000 ký tự'),
});

export const accountModifyFormSchema = yup.object({
  email: yup
    .string()
    .required('Không được để trống nội dung')
    .max(1000, 'Nội dung tối đa 1000 ký tự'),
  fullName: yup.string().max(255, 'Không để tên quá 255 ký tự'),
  dateOfBirth: yup.string(),
  phone: yup.string().matches(vietnamPhoneNumber, 'Số điện thoại không hợp lệ'),
});

export const changePasswordSchema = yup.object({
  oldPassword: yup
    .string()
    .required('Không được để trống mật khẩu cũ')
    .max(255, 'Mật khẩu tối đa 255 ký tự')
    .min(6, 'Mật khẩu tối thiểu 6 ký tự'),
  newPassword: yup
    .string()
    .required('Không được để trống mật khẩu cũ')
    .max(255, 'Mật khẩu tối đa 255 ký tự')
    .min(6, 'Mật khẩu tối thiểu 6 ký tự'),
});

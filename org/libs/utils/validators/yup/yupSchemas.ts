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

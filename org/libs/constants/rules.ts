import { ValidateRegex } from '@utils/validators/config';

export const AUTH_INPUT_RULES = {
  EMAIL: {
    inputType: 'email',
    validationRules: {
      required: 'Email không được để trống',
      pattern: {
        value: ValidateRegex.email,
        message: 'Email không hợp lệ',
      },
    },
  },
  PASSWORD: {
    inputType: 'password',
    validationRules: {
      required: 'Mật khẩu không được để trống',
      minLength: {
        value: 6,
        message: 'Mật khẩu ít nhất 6 ký tự',
      },
      maxLength: {
        value: 300,
        message: 'Mật khẩu tối đa 300 ký tự',
      },
      pattern: {
        value: ValidateRegex.password,
        message: 'Mật khẩu phải có ít nhất 1 chữ in hoa',
      },
    },
  },
  PHONE_NUMBER: {
    inputType: 'text',
    validationRules: {
      pattern: {
        value: ValidateRegex.phoneNumber,
        message: 'Số điện thoại không hợp lệ',
      },
    },
  },
  FULL_NAME: {
    inputType: 'text',
    validationRules: {
      required: 'Tên không được để trống',
      maxLength: {
        value: 125,
        message: 'Họ tên không được quá 125 ký tự',
      },
    },
  },
};

type ValidateRegexType = {
  [key: string]: RegExp;
};

const ValidateRegex: ValidateRegexType = {
  email:
    /^[a-z0-9!#$%&'*+/=?^_‘{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_‘{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
  password: /^(?=.*[A-Z]).{6,}$/,
  // /^(?=.*[A-Z]).{7,300}$/,
  phoneNumber: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
};

export { ValidateRegex };

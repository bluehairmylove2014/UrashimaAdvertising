import { ValidateRegex } from "./config";

export function isValidPhoneNumber(phoneNumber: string): boolean {
  return typeof phoneNumber === "string" && phoneNumber.length > 0
    ? ValidateRegex.phoneNumber.test(phoneNumber)
    : false;
}

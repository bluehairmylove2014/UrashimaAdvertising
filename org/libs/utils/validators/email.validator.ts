import { ValidateRegex } from "./config";

export function isValidEmail(email: string): boolean {
  return typeof email === "string" && email.length > 0
    ? ValidateRegex.email.test(email)
    : false;
}

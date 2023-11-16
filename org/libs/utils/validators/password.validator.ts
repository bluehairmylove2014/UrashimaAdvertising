import { ValidateRegex } from "./config";

export function isValidPassword(password: string): boolean {
  return typeof password === "string" && password.length > 0
    ? ValidateRegex.password.test(password)
    : false;
}

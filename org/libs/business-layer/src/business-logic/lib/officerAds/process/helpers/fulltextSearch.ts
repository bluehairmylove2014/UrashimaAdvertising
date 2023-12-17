export function fulltextLowercaseMatch(
  stringA: string,
  stringB: string
): boolean {
  const strALowercase = stringA.toLowerCase();
  const strBLowercase = stringB.toLowerCase();
  return (
    strALowercase.includes(strBLowercase) ||
    strBLowercase.includes(strALowercase)
  );
}
export function fulltextMatch(stringA: string, stringB: string): boolean {
  return stringA.includes(stringB) || stringB.includes(stringA);
}

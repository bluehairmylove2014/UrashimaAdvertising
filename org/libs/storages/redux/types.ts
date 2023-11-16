export type crumbType = {
  pathname: string;
  name: string;
};
export type crumbsType = crumbType[];
export type languageType = "vi" | "en";

export type stateType = {
  crumbs: crumbsType;
  language: languageType;
};

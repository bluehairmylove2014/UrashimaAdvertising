export type buttonType = "button" | "submit";
export type commonButtonStyle =
  | "fill" // White
  | "onlyChildren" // White no border, background
  | "onlyBorder" // White, no background
  | "modern-fill" // soft yellow
  | "modern-onlyBorder" // no background, dark => soft yellow
  | "soft-fill" // Green button ( Checkout )
  | "soft-peach" // --soft-peach
  | "square" // circle, dat ten nham T.T
  | "none"; // no border, no background, color inherit
export type commonButtonType = {
  children: React.ReactNode | string | number;
  style: commonButtonStyle;
  disabled?: boolean;
  type?: buttonType;
  loading?: boolean;
  onClick?: (arg0: any) => void;
};

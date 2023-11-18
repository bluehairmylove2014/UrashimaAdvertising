// "use client";
// // import ButtonLoader from "../ButtonLoader/ButtonLoader";

// type buttonType = "button" | "submit";
// type buttonStyle =
//   | "fill-primary"
//   | "fill"
// type commonButtonType = {
//   children: React.ReactNode | string | number;
//   style: buttonStyle;
//   disabled?: boolean;
//   type?: buttonType;
//   loading?: boolean;
//   onClick?: (arg0: any) => void;
// };

// const defaultType = "button";
// function CustomButton ({
//   children,
//   style,
//   disabled,
//   loading,
//   type,
//   onClick,
// }: commonButtonType): JSX.Element => {
//   return (
//     <button
//       className={`common-button ${style} ${loading ? "loading" : ""}`}
//       onClick={onClick}
//       disabled={disabled || loading}
//       type={type || defaultType}
//     >
//       <div className="loader">{loading ? <ButtonLoader /> : <></>}</div>
//       {children}
//     </button>
//   );
// };

// export default CustomButton;

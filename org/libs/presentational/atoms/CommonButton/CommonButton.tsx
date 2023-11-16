"use client";
import ButtonLoader from "../ButtonLoader/ButtonLoader";
import "./styles.scss";
import { commonButtonType } from "./type";

const defaultType = "button";
export const CommonButton = ({
  children,
  style,
  disabled,
  loading,
  type,
  onClick,
}: commonButtonType): JSX.Element => {
  return (
    <button
      className={`common-button ${style} ${loading ? "loading" : ""}`}
      onClick={onClick}
      disabled={disabled || loading}
      type={type || defaultType}
    >
      <div className="loader">{loading ? <ButtonLoader /> : <></>}</div>
      {children}
    </button>
  );
};

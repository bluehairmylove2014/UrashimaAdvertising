import { useEffect, useRef, useState } from "react";
import "./styles.scss";

type checkboxType = {
  label: string;
  name: string;
  defaultChecked?: boolean;
  radio?: boolean;
  radioName?: string;
  onCheck: (name: string, value: boolean) => void;
};
const Checkbox = ({
  label,
  name,
  defaultChecked,
  radio,
  radioName,
  onCheck,
}: checkboxType) => {
  const checkboxRef = useRef<HTMLDivElement>(null);
  const [checkboxValue, setCheckboxValue] = useState<boolean | undefined>(
    defaultChecked
  );

  // Methods
  const handleCheckboxClick = () => {
    if (!checkboxRef.current) return;
    const input = document.getElementById(name) as HTMLInputElement | null;
    if (!input) return;

    const newValue = !input.checked;
    input.checked = newValue;
    setCheckboxValue(newValue);
    onCheck(name, newValue);
  };

  // Hooks
  useEffect(() => {
    if (!radio) {
      if (checkboxValue) {
        checkboxRef.current &&
          !checkboxRef.current.classList.contains("active") &&
          checkboxRef.current.classList.add("active");
      } else if (checkboxValue === false) {
        checkboxRef.current && checkboxRef.current.classList.remove("active");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkboxValue]);

  useEffect(() => {
    if (defaultChecked !== checkboxValue) {
      setCheckboxValue(defaultChecked);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultChecked]);

  return (
    <div className="checkbox" onClick={handleCheckboxClick} ref={checkboxRef}>
      <input type={radio ? "radio" : "checkbox"} name={radioName} id={name} />
      {radio ? (
        <></>
      ) : (
        <div className="checkbox__mark">
          <i className="fi fi-bs-check"></i>
        </div>
      )}
      <label htmlFor={name}>{label}</label>
    </div>
  );
};

export default Checkbox;

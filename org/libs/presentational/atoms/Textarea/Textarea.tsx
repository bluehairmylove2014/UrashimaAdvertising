import "./styles.scss";
import { useState } from "react";

const Textarea = ({
  name,
  id,
  label,
  onChange,
}: {
  name: string;
  id: string;
  label: string;
  onChange: (value: string) => void;
}) => {
  const [isLabelShow, setIsLabelShow] = useState<boolean>(true);
  return (
    <div className="textarea">
      <label htmlFor={id} className={isLabelShow ? "active" : ""}>
        {label}
      </label>
      <textarea
        name={name}
        id={id}
        cols={30}
        rows={10}
        onChange={(e) => {
          onChange(e.target.value);
          if (e.target.value.trim().length === 0) {
            setIsLabelShow(true);
          } else {
            setIsLabelShow(false);
          }
        }}
      ></textarea>
    </div>
  );
};

export default Textarea;

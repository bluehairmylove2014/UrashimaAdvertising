import { useRef } from 'react';
import './styles.scss';
import { toggleClass } from '@utils/helpers';

type optionType = {
  value: any;
  name: React.ReactNode | string | number;
};

type navDropdownType = {
  children: React.ReactNode | string | number;
  style?: string;
  options: optionType[];
  onClick?: (value: any) => void;
};

export const NavDropdown = ({
  children,
  style,
  options,
  onClick,
}: navDropdownType): JSX.Element => {
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    if (dropdownRef.current) {
      toggleClass(dropdownRef.current, 'active');
    }
  };

  return (
    <div className={`nav-dropdown ${style}`} ref={dropdownRef}>
      <button
        className={`nav-dropdown__trigger`}
        onClick={() => toggleDropdown()}
      >
        {children}
      </button>
      <div className="nav-dropdown__content">
        {Array.isArray(options) && options.length > 0 ? (
          options.map((op) => (
            <button
              key={op.value}
              onClick={() => {
                onClick && onClick(op.value);
                toggleDropdown();
              }}
            >
              {op.name}
            </button>
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

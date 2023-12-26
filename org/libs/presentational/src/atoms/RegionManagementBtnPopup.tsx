'use client';

import RegionManagementPopup from '@presentational/molecules/RegionManagementPopup';
import { useState } from 'react';

function RegionManagementBtnPopup() {
  const [isPopupActive, setIsPopupActive] = useState<boolean>(false);
  return (
    <>
      <button
        className="text-xs text-white hover:text-orange-400 transition-colors"
        onClick={() => setIsPopupActive(true)}
      >
        Xem khu vực&nbsp;<i className="fi fi-sr-caret-down"></i>
      </button>
      <RegionManagementPopup
        isActive={isPopupActive}
        handleClose={() => setIsPopupActive(false)}
      />
    </>
  );
}

export default RegionManagementBtnPopup;

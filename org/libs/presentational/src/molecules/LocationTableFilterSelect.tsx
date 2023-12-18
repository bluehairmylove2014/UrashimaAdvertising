'use client';

import {
  useFilterAdLocationByAdForm,
  useFilterAdLocationByLocationType,
} from '@business-layer/business-logic/lib/officerAds/process/hooks';
import ModernSelect, {
  modernSelectOptionType,
} from '@presentational/atoms/ModernSelect';

type locationTableFilterSelectParamsType = {
  options: modernSelectOptionType[];
  type: 'adsForm' | 'locationType';
  defaultValue?: any;
};

function LocationTableFilterSelect({
  options,
  type,
  defaultValue,
}: locationTableFilterSelectParamsType) {
  const { onSetAdForm } = useFilterAdLocationByAdForm();
  const { onSetLocationType } = useFilterAdLocationByLocationType();

  const handleFilter = (option: modernSelectOptionType) => {
    if (type === 'adsForm') {
      onSetAdForm(option.value);
    } else if (type === 'locationType') {
      onSetLocationType(option.value);
    }
  };

  return (
    <ModernSelect
      onOptionSelect={handleFilter}
      options={options}
      defaultValue={defaultValue}
    />
  );
}

export default LocationTableFilterSelect;

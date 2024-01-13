import LocationTableFilterSelect from '@presentational/molecules/LocationTableFilterSelect';
import LocationTableSearchBox from '@presentational/molecules/LocationTableSearchBox';
import AdLocationsTable from './AdLocationsTable';
import { IAdLocation } from '@business-layer/services/entities';
import { modernSelectOptionType } from '@presentational/atoms/ModernSelect';
import CustomButton from '@presentational/atoms/CustomButton';

type selectAdLocationPopupParamsType = {
  isActive: boolean;
  handleClose: () => void;
  adsFormOptions: modernSelectOptionType[] | null;
  locationTypeOptions: modernSelectOptionType[] | null;
  handleSelect: (adLocationData: IAdLocation) => void;
};
function SelectAdLocationPopup({
  isActive,
  handleClose,
  adsFormOptions,
  locationTypeOptions,
  handleSelect,
}: selectAdLocationPopupParamsType) {
  const handleChoosingAdLocation = (adLocationData: IAdLocation) => {
    handleClose();
    handleSelect(adLocationData);
  };

  return (
    <div
      style={{ display: isActive ? 'grid' : 'none' }}
      className="fixed top-0 left-0 w-screen h-screen bg-black/60 place-items-center"
    >
      <div className="relative w-3/4 h-fit bg-white rounded overflow-hidden p-8">
        <div className="flex flex-row gap-4 justify-between mb-8 w-full">
          <LocationTableSearchBox />
          <div className="flex flex-row justify-end flex-grow gap-2">
            <LocationTableFilterSelect
              type="adsForm"
              options={adsFormOptions}
            />
            <LocationTableFilterSelect
              type="locationType"
              options={locationTypeOptions}
            />
          </div>
        </div>
        <AdLocationsTable
          isChoosing={true}
          onChoosing={handleChoosingAdLocation}
        />
        <div className="w-full h-fit grid place-items-center mt-6">
          <div className="w-40">
            <CustomButton
              style="fill-secondary"
              type="button"
              onClick={() => handleClose && handleClose()}
            >
              Huỷ chọn
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectAdLocationPopup;

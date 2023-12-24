import CustomButton from '@presentational/atoms/CustomButton';

type yesNoPopupParamsType = {
  isActive: boolean;
  onResult: (result: boolean) => void;
  message: string;
};

function YesNoPopup({ isActive, onResult, message }: yesNoPopupParamsType) {
  return (
    <div
      style={{ display: isActive ? 'grid' : '' }}
      className="hidden place-items-center fixed top-0 left-0 w-screen h-screen bg-black/60"
    >
      <div className="bg-white p-4 rounded overflow-hidden w-56 flex flex-col justify-between items-center">
        <div className="flex flex-row items-center justify-center gap-3 mb-4">
          <i className="fi fi-ss-interrogation text-orange-400 text-2xl"></i>
          <p>{message}</p>
        </div>
        <div className="flex flex-row justify-between items-end gap-4 w-full">
          <div className="w-16">
            <CustomButton
              style="fill-secondary"
              type="button"
              onClick={() => onResult(false)}
            >
              Không
            </CustomButton>
          </div>
          <div className="w-14">
            <CustomButton
              style="fill-primary"
              type="button"
              onClick={() => onResult(true)}
            >
              Có
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default YesNoPopup;

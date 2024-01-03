'use client';

import { debounce } from '@business-layer/business-logic/helper';
import { useSearchAdLocation } from '@business-layer/business-logic/lib/officerAds/process/hooks';

function LocationTableSearchBox() {
  const { onSetSearchKey } = useSearchAdLocation();
  const onSearch = debounce((e: any) => {
    const value = e.target.value.trim();
    onSetSearchKey(value && value.length > 0 ? value : null);
  }, 500);

  return (
    <form className="flex-shrink w-96 relative border-solid border-[1px] border-zinc-400 rounded overflow-hidden">
      <i className="fi fi-rr-search absolute top-1/2 left-4 transform -translate-y-1/2 bottom-[4px] text-[0.65rem]"></i>
      <input
        name="searchBox"
        type="text"
        className="px-8 py-2 w-full text-[0.65rem] outline-none"
        placeholder="Tìm kiếm theo địa chỉ..."
        onChange={onSearch}
      />
    </form>
  );
}

export default LocationTableSearchBox;

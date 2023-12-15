// import { useRouter } from 'next/router';
import 'tailwindcss/tailwind.css';
import AdLocationsTable from '@presentational/organisms/AdLocationsTable';

function AdLocations() {
  // const router = useRouter();
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-12 w-full text-center font-bold">
        DANH SÁCH ĐIỂM ĐẶT QUẢNG CÁO
      </h1>
      <div className="flex flex-row gap-4 justify-start mb-8 w-full">
        <button className="flex-shrink bg-amber-500 hover:bg-amber-600 transition-colors text-black font-semibold px-4 py-2 rounded text-xs">
          Tất cả hình thức
        </button>
        <button className="flex-shrink bg-amber-500 hover:bg-amber-600 transition-colors text-black font-semibold px-4 py-2 rounded text-xs">
          Thông tin quy hoạch
        </button>
        <div className="flex-grow w-2/5 relative">
          <i className="fi fi-rr-search absolute top-1/2 left-4 transform -translate-y-1/2 bottom-[2px]"></i>
          <input
            className="border px-9 py-2 rounded w-full"
            placeholder="Search..."
          />
        </div>
      </div>
      <AdLocationsTable />
    </div>
  );
}

export default AdLocations;

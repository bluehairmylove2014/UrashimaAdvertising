'use client';

function ReportForm() {
  return (
    <div className=" fixed w-1/2 h-fit top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-md z-30 hidden">
      <h3 className=" text-center mb-3">BÁO CÁO</h3>
      <div className="relative flex flex-row justify-start items-center border-[1px] border-solid border-zinc-200 rounded px-4 h-9 mb-3">
        <label
          htmlFor="name"
          className="text-xs font-semibold whitespace-nowrap opacity-60 relative z-20"
        >
          Họ tên
        </label>
        <input
          type="text"
          id="name"
          className="outline-none absolute top-0 left-0 w-full h-full z-10 bg-transparent px-4"
        />
      </div>

      <div className="relative flex flex-row justify-start items-center border-[1px] border-solid border-zinc-200 rounded px-4 h-9 mb-3">
        <label
          htmlFor="email"
          className="text-xs font-semibold whitespace-nowrap opacity-60 relative z-20"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          className="outline-none absolute top-0 left-0 w-full h-full z-10 bg-transparent px-4"
        />
      </div>

      <div className="relative flex flex-row justify-start items-center border-[1px] border-solid border-zinc-200 rounded px-4 h-9 mb-3">
        <label
          htmlFor="phone"
          className="text-xs font-semibold whitespace-nowrap opacity-60 relative z-20"
        >
          Điện thoại liên lạc
        </label>
        <input
          type="email"
          id="phone"
          className="outline-none absolute top-0 left-0 w-full h-full z-10 bg-transparent px-4"
        />
      </div>

      <div className="relative flex flex-row justify-start items-start border-[1px] border-solid border-zinc-200 rounded px-4 py-2 h-16 mb-3">
        <label
          htmlFor="content"
          className="text-xs font-semibold whitespace-nowrap opacity-60 relative z-20"
        >
          Nội dung báo cáo
        </label>
        <textarea
          name="content"
          id="content"
          className="outline-none absolute top-0 left-0 w-full h-full z-10 bg-transparent px-4 resize-none"
        ></textarea>
      </div>

      <div>
        <label htmlFor="report-type" className="text-sm font-semibold">
          Hình thức báo cáo
        </label>
        <select
          name="reportType"
          id="report-type"
          className=" outline-none ml-2"
        >
          <option value="" defaultChecked>
            Tố giác sai phạm
          </option>
          <option value="" defaultChecked>
            Đăng ký nội dung
          </option>
          <option value="" defaultChecked>
            Đóng góp ý kiến
          </option>
          <option value="" defaultChecked>
            Giải đáp thắc mắc
          </option>
        </select>
      </div>
    </div>
  );
}

export default ReportForm;

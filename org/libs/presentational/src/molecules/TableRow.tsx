import TableData from '@presentational/atoms/TableData';

const defaultHeight = 70;
function TableRow({ listData }: { listData: React.ReactNode[] }) {
  return listData.map((children, index) => (
    <td className="px-2 py-3" height={defaultHeight}>
      <TableData key={`tableData@${children}index@${index}`}>
        {children}
      </TableData>
    </td>
  ));
}

export default TableRow;

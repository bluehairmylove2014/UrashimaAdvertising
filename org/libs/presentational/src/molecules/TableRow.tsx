import TableData from '@presentational/atoms/TableData';

const defaultHeight = 70;
function TableRow({
  listData,
  multiRowColumn,
}: {
  listData: React.ReactNode[];
  multiRowColumn?: number;
}) {
  return listData.map((children, index) => (
    <td
      className="px-2 py-3"
      height={defaultHeight}
      key={`tableData@${children}index@${index}`}
    >
      <TableData
        isMultiRow={
          typeof multiRowColumn === 'number' && multiRowColumn === index
        }
      >
        {children}
      </TableData>
    </td>
  ));
}

export default TableRow;

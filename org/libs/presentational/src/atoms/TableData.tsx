function TableData({
  children,
  isMultiRow,
}: {
  children: React.ReactNode;
  isMultiRow?: boolean;
}) {
  return <p className={`${isMultiRow ? 'line-clamp-2' : ''}`}>{children}</p>;
}

export default TableData;

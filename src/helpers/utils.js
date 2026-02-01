/* eslint-disable import/prefer-default-export */
export const calculateColumnWidths = (visibleColumns) => {
  const columnWidth = 95 / visibleColumns?.length;
  const columnWidthsObj = { rowIndex: '5%' };
  visibleColumns.forEach((col) => {
    columnWidthsObj[col] = `${columnWidth}%`;
  });
  return columnWidthsObj;
};

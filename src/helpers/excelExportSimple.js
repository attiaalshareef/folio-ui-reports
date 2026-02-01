import ExcelJS from 'exceljs';
import cube from '@cubejs-client/core';
import { okapi } from 'stripes-config';
import { formatColumnName, formatCellValue, getColumnAlignment, getNumberFormat } from './excelFormatters';

export const exportToExcel = async (query, filename = 'report') => {
  try {
    // Create CubeJS API instance
    const cubejsApi = cube(
      '1ef06b123908163668dcc89c6cf947265114a0bd26c496b9c9a7197c691710ce323534afee282dda37e04b8b2b3b39b361876571460528ee4c97dd706667f97e',
      {
        apiUrl: `${okapi.cubeURL}/cubejs-api/v1`,
      },
    );

    // Function to get all data using pagination
    const getAllData = async () => {
      let allData = [];
      let offset = 0;
      const batchSize = 50000;
      let hasMoreData = true;

      while (hasMoreData) {
        const batchQuery = {
          ...query,
          limit: batchSize,
          offset: offset,
        };

        const resultSet = await cubejsApi.load(batchQuery);
        
        let batchData = null;
        if (resultSet?.rawData && resultSet.rawData.length > 0) {
          batchData = resultSet.rawData;
        } else if (resultSet?.tablePivot && resultSet.tablePivot().length > 0) {
          batchData = resultSet.tablePivot();
        } else if (resultSet?.loadResponses?.[0]?.data && resultSet.loadResponses[0].data.length > 0) {
          batchData = resultSet.loadResponses[0].data;
        }

        if (!batchData || batchData.length === 0) {
          hasMoreData = false;
        } else {
          allData = allData.concat(batchData);
          offset += batchSize;
          
          if (batchData.length < batchSize) {
            hasMoreData = false;
          }
        }
      }

      return allData;
    };

    // Get all data
    const data = await getAllData();
    
    if (!data || data.length === 0) {
      throw new Error('No data to export');
    }
    
    console.log(`Exporting ${data.length} records to Excel`);

    // Create workbook
    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'FOLIO Reports System';
    workbook.created = new Date();
    
    // Add simple cover sheet
    const coverSheet = workbook.addWorksheet('Report Info');
    
    coverSheet.getCell('A1').value = 'FOLIO REPORTS SYSTEM';
    coverSheet.getCell('A1').font = { size: 20, bold: true, color: { argb: 'FF106BA3' } };
    
    coverSheet.getCell('A3').value = `Report: ${filename}`;
    coverSheet.getCell('A3').font = { size: 16, bold: true };
    
    const now = new Date();
    coverSheet.getCell('A5').value = 'Generated:';
    coverSheet.getCell('B5').value = now.toLocaleString();
    coverSheet.getCell('A6').value = 'Total Records:';
    coverSheet.getCell('B6').value = data.length;
    coverSheet.getCell('A7').value = 'System:';
    coverSheet.getCell('B7').value = 'FOLIO Library Management';
    
    ['A5', 'A6', 'A7'].forEach(cell => {
      coverSheet.getCell(cell).font = { bold: true };
    });
    
    // Add main data sheet
    const worksheet = workbook.addWorksheet('Data');
    
    // Get headers and format them
    const headers = Object.keys(data[0]);
    const formattedHeaders = headers.map(header => formatColumnName(header));
    
    // Add headers with row numbers
    const finalHeaders = ['#', ...formattedHeaders];
    worksheet.addRow(finalHeaders);
    
    // Style header row
    const headerRow = worksheet.getRow(1);
    headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' } };
    headerRow.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF106BA3' }
    };
    headerRow.alignment = { horizontal: 'center', vertical: 'middle' };
    headerRow.height = 25;
    
    // Add data rows
    data.forEach((row, index) => {
      const rowData = headers.map(header => formatCellValue(row[header], header));
      const finalRowData = [index + 1, ...rowData];
      const dataRow = worksheet.addRow(finalRowData);
      
      // Simple alternating colors
      if (index % 2 === 1) {
        dataRow.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFF8F9FA' }
        };
      }
      
      // Simple cell styling
      dataRow.eachCell((cell, colNumber) => {
        if (colNumber === 1) {
          // Row number
          cell.font = { bold: true, color: { argb: 'FF666666' } };
          cell.alignment = { horizontal: 'center' };
        } else {
          const header = headers[colNumber - 2];
          
          // Basic alignment
          cell.alignment = { horizontal: getColumnAlignment(cell.value, header) };
          
          // Number format
          const numFormat = getNumberFormat(cell.value, header);
          if (numFormat) {
            cell.numFmt = numFormat;
          }
          
          // Simple status colors
          if (header && header.toLowerCase().includes('status') && cell.value) {
            const value = String(cell.value).toLowerCase();
            if (value.includes('active')) {
              cell.font = { color: { argb: 'FF28A745' }, bold: true };
            } else if (value.includes('inactive')) {
              cell.font = { color: { argb: 'FFDC3545' }, bold: true };
            }
          }
          
          // ID highlighting
          if (header && header.toLowerCase().includes('id') && colNumber <= 3) {
            cell.font = { bold: true, color: { argb: 'FF106BA3' } };
          }
        }
      });
    });
    
    // Auto-fit columns
    worksheet.columns.forEach((column, index) => {
      if (index === 0) {
        column.width = 6;
      } else {
        column.width = 15;
      }
    });
    
    // Freeze header
    worksheet.views = [{ state: 'frozen', ySplit: 1 }];
    
    // Add filters
    worksheet.autoFilter = {
      from: 'A1',
      to: `${String.fromCharCode(65 + headers.length)}1`
    };
    
    // Generate filename
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
    const finalFilename = `FOLIO_${filename}_${timestamp}.xlsx`;
    
    // Save file
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = finalFilename;
    link.click();
    window.URL.revokeObjectURL(url);

    return {
      success: true,
      filename: finalFilename,
      recordCount: data.length
    };
  } catch (error) {
    console.error('Excel export error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};
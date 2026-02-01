import ExcelJS from 'exceljs';
import cube from '@cubejs-client/core';
import { okapi } from 'stripes-config';
import {
  formatColumnName,
  formatCellValue,
  getColumnAlignment,
  getNumberFormat,
} from './excelFormatters';

export const exportToExcel = async (query, filename = 'report', options = {}) => {
  try {
    // Extract intl from options if provided
    const { intl, ...restOptions } = options;
    
    // Handle different modes
    if (restOptions.triggerDownload && restOptions.data) {
      // Mode: Trigger download with prepared data
      return await triggerFileDownload(restOptions.data, filename, { ...restOptions, intl });
    }

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
        } else if (
          resultSet?.loadResponses?.[0]?.data &&
          resultSet.loadResponses[0].data.length > 0
        ) {
          batchData = resultSet.loadResponses[0].data;
        }

        if (!batchData || batchData.length === 0) {
          hasMoreData = false;
        } else {
          allData = allData.concat(batchData);
          offset += batchSize;

          // If we got less than batchSize, we've reached the end
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

    // If prepareOnly mode, return data without creating file
    if (options.prepareOnly) {
      return {
        success: true,
        data: data,
        recordCount: data.length,
      };
    }

    // Create workbook
    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'FOLIO Reports System';
    workbook.created = new Date();

    // Add professional cover sheet - centered and larger
    const coverSheet = workbook.addWorksheet('Cover Page');

    // Set column widths for full page centered layout
    coverSheet.columns = [
      { width: 8 },
      { width: 15 },
      { width: 20 },
      { width: 25 },
      { width: 25 },
      { width: 20 },
      { width: 15 },
      { width: 8 },
    ];

    // Header section with blue background - perfectly centered
    for (let row = 12; row <= 20; row++) {
      for (let col = 3; col <= 6; col++) {
        const cell = coverSheet.getCell(row, col);
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FF106BA3' },
        };
      }
    }

    // Main title - FOLIO (perfectly centered)
    const titleCell = coverSheet.getCell('D14');
    titleCell.value = 'FOLIO';
    titleCell.font = { size: 48, bold: true, color: { argb: 'FFFFFFFF' } };
    titleCell.alignment = { horizontal: 'center', vertical: 'middle' };

    // Subtitle (perfectly centered)
    const subtitleCell = coverSheet.getCell('D16');
    subtitleCell.value = 'Library Management System';
    subtitleCell.font = { size: 18, color: { argb: 'FFFFFFFF' } };
    subtitleCell.alignment = { horizontal: 'center', vertical: 'middle' };

    // Reports module (perfectly centered)
    const moduleCell = coverSheet.getCell('D18');
    moduleCell.value = 'Reports Module';
    moduleCell.font = { size: 16, color: { argb: 'FFE8F4FD' } };
    moduleCell.alignment = { horizontal: 'center', vertical: 'middle' };

    // Report title section (perfectly centered)
    const reportTitleCell = coverSheet.getCell('D24');
    reportTitleCell.value = filename;
    reportTitleCell.font = {
      size: 28,
      bold: true,
      color: { argb: 'FF106BA3' },
    };
    reportTitleCell.alignment = { horizontal: 'center', vertical: 'middle' };
    reportTitleCell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFF8F9FA' },
    };

    // Information section (centered with larger fonts)
    const now = new Date();
    const infoData = [
      ['Generated Date:', now.toLocaleDateString()],
      ['Generated Time:', now.toLocaleTimeString()],
      ['Total Records:', data.length.toLocaleString()],
      ['Report Type:', 'Data Export Report'],
      ['System Version:', 'FOLIO 2024.1'],
      ['Generated By:', 'Reports System'],
    ];

    infoData.forEach((info, index) => {
      const row = 28 + index;

      // Label (centered)
      const labelCell = coverSheet.getCell(`C${row}`);
      labelCell.value = info[0];
      labelCell.font = { size: 14, bold: true, color: { argb: 'FF333333' } };
      labelCell.alignment = { horizontal: 'right', vertical: 'middle' };
      labelCell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFE8F4FD' },
      };

      // Value (centered)
      const valueCell = coverSheet.getCell(`E${row}`);
      valueCell.value = info[1];
      valueCell.font = { size: 14, color: { argb: 'FF333333' } };
      valueCell.alignment = { horizontal: 'left', vertical: 'middle' };
      valueCell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFFFFFF' },
      };
    });

    // Footer disclaimer (perfectly centered)
    const disclaimerCell = coverSheet.getCell('D36');
    disclaimerCell.value =
      'Confidential Report - Handle according to institutional policies';
    disclaimerCell.font = {
      size: 12,
      italic: true,
      color: { argb: 'FF666666' },
    };
    disclaimerCell.alignment = { horizontal: 'center', vertical: 'middle' };

    // Copyright (perfectly centered)
    const copyrightCell = coverSheet.getCell('D39');
    copyrightCell.value = '© 2024 FOLIO Library Management System';
    copyrightCell.font = { size: 11, color: { argb: 'FF999999' } };
    copyrightCell.alignment = { horizontal: 'center', vertical: 'middle' };

    // Set row heights for perfect vertical centering
    coverSheet.getRow(14).height = 60; // Main title
    coverSheet.getRow(16).height = 30; // Subtitle
    coverSheet.getRow(18).height = 25; // Module
    coverSheet.getRow(24).height = 45; // Report title

    // Info section rows
    for (let i = 28; i <= 33; i++) {
      coverSheet.getRow(i).height = 30;
    }

    // Footer rows
    coverSheet.getRow(36).height = 25;
    coverSheet.getRow(39).height = 20;

    // Add main data sheet
    const worksheet = workbook.addWorksheet('Data', {
      pageSetup: { paperSize: 9, orientation: 'landscape' },
    });

    // Get headers and format them
    const headers = Object.keys(data[0]);
    const formattedHeaders = headers.map((header) => formatColumnName(header, intl));

    // Add headers
    worksheet.addRow(formattedHeaders);

    // Style header row
    const headerRow = worksheet.getRow(1);
    headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' } };
    headerRow.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF106BA3' },
    };
    headerRow.alignment = { horizontal: 'center', vertical: 'middle' };
    headerRow.height = 25;

    // Add borders to header
    headerRow.eachCell((cell) => {
      cell.border = {
        top: { style: 'thin', color: { argb: 'FFFFFFFF' } },
        left: { style: 'thin', color: { argb: 'FFFFFFFF' } },
        bottom: { style: 'thin', color: { argb: 'FFFFFFFF' } },
        right: { style: 'thin', color: { argb: 'FFFFFFFF' } },
      };
    });

    // Add data rows
    data.forEach((row, index) => {
      const rowData = headers.map((header) =>
        formatCellValue(row[header], header, intl),
      );
      const dataRow = worksheet.addRow(rowData);

      // Alternate row colors (zebra striping)
      if (index % 2 === 1) {
        dataRow.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFF8F9FA' },
        };
      }

      // Style each cell
      dataRow.eachCell((cell, colNumber) => {
        const header = headers[colNumber - 1];

        // Add borders
        cell.border = {
          top: { style: 'thin', color: { argb: 'FFE0E0E0' } },
          left: { style: 'thin', color: { argb: 'FFE0E0E0' } },
          bottom: { style: 'thin', color: { argb: 'FFE0E0E0' } },
          right: { style: 'thin', color: { argb: 'FFE0E0E0' } },
        };

        // Set alignment
        cell.alignment = { horizontal: getColumnAlignment(cell.value, header) };

        // Set number format
        const numFormat = getNumberFormat(cell.value, header);
        if (numFormat) {
          cell.numFmt = numFormat;
        }

        // Conditional formatting for status fields
        if (header.toLowerCase().includes('status')) {
          const value = String(cell.value).toLowerCase();
          if (
            value.includes('active') ||
            value.includes('available') ||
            value.includes('open')
          ) {
            cell.font = { color: { argb: 'FF28A745' } }; // Green
          } else if (
            value.includes('inactive') ||
            value.includes('unavailable') ||
            value.includes('closed')
          ) {
            cell.font = { color: { argb: 'FFDC3545' } }; // Red
          } else if (
            value.includes('pending') ||
            value.includes('processing')
          ) {
            cell.font = { color: { argb: 'FFFFC107' } }; // Yellow
          }
        }
      });
    });

    // Auto-fit columns with better sizing
    worksheet.columns.forEach((column, index) => {
      let maxLength = formattedHeaders[index].length;

      // Check data length (sample first 100 rows for performance)
      data.slice(0, 100).forEach((row) => {
        const value = row[headers[index]];
        if (value) {
          let displayLength = value.toString().length;

          // Adjust for different data types
          if (value instanceof Date) {
            displayLength = 16; // Standard date format length
          } else if (typeof value === 'number') {
            displayLength = Math.max(displayLength, 12); // Min width for numbers
          }

          if (displayLength > maxLength) {
            maxLength = displayLength;
          }
        }
      });

      // Set column width with reasonable limits
      column.width = Math.min(Math.max(maxLength + 3, 12), 60);

      // Special handling for common column types
      const headerLower = headers[index].toLowerCase();
      if (headerLower.includes('id') || headerLower.includes('uuid')) {
        column.width = Math.min(column.width, 25);
      } else if (
        headerLower.includes('description') ||
        headerLower.includes('note')
      ) {
        column.width = Math.min(Math.max(column.width, 30), 80);
      } else if (
        headerLower.includes('name') ||
        headerLower.includes('title')
      ) {
        column.width = Math.min(Math.max(column.width, 20), 50);
      }
    });

    // Freeze header row
    worksheet.views = [{ state: 'frozen', ySplit: 1 }];

    // Add auto filter
    worksheet.autoFilter = {
      from: 'A1',
      to: `${String.fromCharCode(64 + headers.length)}1`,
    };

    // Add summary section
    const summaryStartRow = data.length + 3;
    worksheet.getCell(`A${summaryStartRow}`).value = 'SUMMARY';
    worksheet.getCell(`A${summaryStartRow}`).font = {
      bold: true,
      size: 14,
      color: { argb: 'FF106BA3' },
    };

    worksheet.getCell(`A${summaryStartRow + 1}`).value = 'Total Records:';
    worksheet.getCell(`B${summaryStartRow + 1}`).value = data.length;
    worksheet.getCell(`A${summaryStartRow + 1}`).font = { bold: true };

    // Add numeric summaries for numeric columns
    let summaryRow = summaryStartRow + 2;
    headers.forEach((header, index) => {
      const headerLower = header.toLowerCase();
      if (
        headerLower.includes('count') ||
        headerLower.includes('total') ||
        headerLower.includes('amount') ||
        headerLower.includes('price')
      ) {
        const numericValues = data
          .map((row) => row[header])
          .filter((val) => typeof val === 'number' && !isNaN(val));

        if (numericValues.length > 0) {
          const sum = numericValues.reduce((a, b) => a + b, 0);
          const avg = sum / numericValues.length;

          worksheet.getCell(`A${summaryRow}`).value =
            `${formattedHeaders[index]} - Total:`;
          worksheet.getCell(`B${summaryRow}`).value = sum;
          worksheet.getCell(`B${summaryRow}`).numFmt =
            getNumberFormat(sum, header) || '#,##0.##';

          worksheet.getCell(`A${summaryRow + 1}`).value =
            `${formattedHeaders[index]} - Average:`;
          worksheet.getCell(`B${summaryRow + 1}`).value = avg;
          worksheet.getCell(`B${summaryRow + 1}`).numFmt =
            getNumberFormat(avg, header) || '#,##0.##';

          summaryRow += 2;
        }
      }
    });

    // Add footer with system info
    worksheet.headerFooter.oddFooter =
      '&CGenerated by FOLIO Reports System - &D &T';

    // Generate filename with timestamp
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
    const finalFilename = `FOLIO_${filename}_${timestamp}.xlsx`;

    // Save file
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = finalFilename;
    link.click();
    window.URL.revokeObjectURL(url);

    return {
      success: true,
      filename: finalFilename,
      recordCount: data.length,
    };
  } catch (error) {
    console.error('Excel export error:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};

// Helper function to trigger file download with prepared data
const triggerFileDownload = async (data, filename, options = {}) => {
  try {
    const { intl } = options;
    
    // Create workbook with the prepared data
    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'FOLIO Reports System';
    workbook.created = new Date();

    // Add main data sheet
    const worksheet = workbook.addWorksheet('Data', {
      pageSetup: { paperSize: 9, orientation: 'landscape' },
    });

    // Get headers and format them
    const headers = Object.keys(data[0]);
    const formattedHeaders = headers.map((header) => formatColumnName(header, intl));

    // Add headers
    worksheet.addRow(formattedHeaders);

    // Style header row
    const headerRow = worksheet.getRow(1);
    headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' } };
    headerRow.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF106BA3' },
    };
    headerRow.alignment = { horizontal: 'center', vertical: 'middle' };
    headerRow.height = 25;

    // Add data rows
    data.forEach((row, index) => {
      const rowData = headers.map((header) =>
        formatCellValue(row[header], header, intl),
      );
      const dataRow = worksheet.addRow(rowData);

      // Alternate row colors
      if (index % 2 === 1) {
        dataRow.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFF8F9FA' },
        };
      }
    });

    // Auto-fit columns
    worksheet.columns.forEach((column, index) => {
      let maxLength = formattedHeaders[index].length;
      data.slice(0, 100).forEach((row) => {
        const value = row[headers[index]];
        if (value) {
          const displayLength = value.toString().length;
          if (displayLength > maxLength) {
            maxLength = displayLength;
          }
        }
      });
      column.width = Math.min(Math.max(maxLength + 3, 12), 60);
    });

    // Use custom filename or generate with timestamp
    const finalFilename = filename.includes('.xlsx') ? filename : `${filename}.xlsx`;

    // Direct download to Downloads folder
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    
    // Create download link for direct download
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = finalFilename;
    
    // Hide the link and trigger download
    link.style.display = 'none';
    document.body.appendChild(link);
    
    // Use setTimeout to ensure the link is in DOM before clicking
    setTimeout(() => {
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    }, 100);

    return {
      success: true,
      filename: finalFilename,
      recordCount: data.length,
    };
  } catch (error) {
    console.error('File download error:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};

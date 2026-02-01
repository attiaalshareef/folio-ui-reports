// Export utilities for different formats

// Prepare data for Excel export
export const prepareExcelData = (resultSet) => {
  if (!resultSet || !resultSet.loadResponses?.[0]?.data) {
    return [];
  }
  
  return resultSet.loadResponses[0].data.map(row => {
    const cleanRow = {};
    Object.keys(row).forEach(key => {
      // Clean column names for Excel
      const cleanKey = key.replace(/\./g, '_').replace(/[^a-zA-Z0-9_]/g, '');
      cleanRow[cleanKey] = row[key];
    });
    return cleanRow;
  });
};

// Prepare data for PDF export
export const preparePDFData = (resultSet, options = {}) => {
  const data = prepareExcelData(resultSet);
  
  return {
    data,
    title: options.title || 'Report',
    columns: data.length > 0 ? Object.keys(data[0]) : [],
    totalRows: data.length,
    generatedAt: new Date().toLocaleString(),
    ...options
  };
};

// Generate filename with timestamp
export const generateFilename = (baseName, format, includeTimestamp = true) => {
  const cleanName = baseName.replace(/[^a-zA-Z0-9_-]/g, '_');
  const timestamp = includeTimestamp ? `_${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}` : '';
  return `${cleanName}${timestamp}.${format}`;
};

// Validate export data
export const validateExportData = (resultSet) => {
  if (!resultSet) {
    return { valid: false, error: 'No result set provided' };
  }
  
  if (!resultSet.loadResponses?.[0]?.data?.length) {
    return { valid: false, error: 'No data available for export' };
  }
  
  return { valid: true };
};

export default {
  prepareExcelData,
  preparePDFData,
  generateFilename,
  validateExportData,
};
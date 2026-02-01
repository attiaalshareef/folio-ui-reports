// Excel formatting utilities
import { translateReferenceValue, REFERENCE_TABLE_TRANSLATION_MAP } from './referenceTableTranslations';

// Helper to get field label from catalogingFieldLabels
const getFieldLabel = (columnName, intl) => {
  if (!intl) return null;
  
  // Try to get translation from catalogingFieldLabels pattern
  // Column format: cataloging_view.field_name or just field_name
  const fieldKey = columnName.includes('.') ? columnName : `cataloging_view.${columnName}`;
  
  // Common field mappings
  const fieldMappings = {
    'cataloging_view.title': 'ui-reports.catalogingReports.instanceFields.title',
    'cataloging_view.instance_hrid': 'ui-reports.catalogingReports.instanceFields.hrid',
    'cataloging_view.material_type': 'ui-reports.catalogingReports.itemFields.materialTypeName',
    'cataloging_view.loan_type': 'ui-reports.catalogingReports.itemFields.loanType',
    'cataloging_view.location_name': 'ui-reports.catalogingReports.holdingsFields.locationName',
    'cataloging_view.library_name': 'ui-reports.catalogingReports.holdingsFields.libraryName',
    'cataloging_view.campus_name': 'ui-reports.catalogingReports.holdingsFields.campusName',
    'cataloging_view.institution_name': 'ui-reports.catalogingReports.holdingsFields.institutionName',
    'cataloging_view.call_number': 'ui-reports.catalogingReports.holdingsFields.callNumber',
    'cataloging_view.call_number_type': 'ui-reports.catalogingReports.holdingsFields.callNumberType',
    'cataloging_view.barcode': 'ui-reports.catalogingReports.itemFields.barcode',
    'cataloging_view.item_status': 'ui-reports.catalogingReports.itemFields.statusName',
    'cataloging_view.item_hrid': 'ui-reports.catalogingReports.itemFields.hrid',
    'cataloging_view.holdings_hrid': 'ui-reports.catalogingReports.holdingsFields.hrid',
    'cataloging_view.catalogeddate': 'ui-reports.catalogingReports.instanceFields.catalogedDate',
    'cataloging_view.instance_created_date': 'ui-reports.catalogingReports.instanceFields.metadataCreatedDate',
    'cataloging_view.instance_updated_date': 'ui-reports.catalogingReports.instanceFields.metadataUpdatedDate',
    'cataloging_view.holdings_created_date': 'ui-reports.catalogingReports.holdingsFields.createdDate',
    'cataloging_view.holdings_updated_date': 'ui-reports.catalogingReports.holdingsFields.updatedDate',
    'cataloging_view.item_created_date': 'ui-reports.catalogingReports.itemFields.createdDate',
    'cataloging_view.item_updated_date': 'ui-reports.catalogingReports.itemFields.updatedDate',
    'cataloging_view.status_date': 'ui-reports.catalogingReports.itemFields.statusDate',
    'cataloging_view.copy_number': 'ui-reports.catalogingReports.itemFields.copyNumber',
    'cataloging_view.total_instances': 'ui-reports.catalogingReports.measures.instanceCount',
    'cataloging_view.total_holdings': 'ui-reports.catalogingReports.measures.holdingsCount',
    'cataloging_view.total_items': 'ui-reports.catalogingReports.measures.itemCount',
  };
  
  const translationKey = fieldMappings[fieldKey];
  if (translationKey) {
    try {
      return intl.formatMessage({ id: translationKey, defaultMessage: columnName });
    } catch (e) {
      return null;
    }
  }
  
  return null;
};

// Helper to check if column is a reference field
const isReferenceColumn = (columnName) => {
  // Handle cataloging_view fields
  if (columnName.startsWith('cataloging_view.')) {
    const fieldPart = columnName.replace('cataloging_view.', '');
    for (const cubeName in REFERENCE_TABLE_TRANSLATION_MAP) {
      if (fieldPart === cubeName || fieldPart.startsWith(cubeName + '_')) {
        return { cubeName, fieldName: REFERENCE_TABLE_TRANSLATION_MAP[cubeName].field };
      }
    }
  }
  
  // Check direct reference fields
  for (const cubeName in REFERENCE_TABLE_TRANSLATION_MAP) {
    const mapping = REFERENCE_TABLE_TRANSLATION_MAP[cubeName];
    if (columnName === `${cubeName}.${mapping.field}`) {
      return { cubeName, fieldName: mapping.field };
    }
  }
  
  return null;
};

export const formatColumnName = (columnName, intl) => {
  // Try to get translated label first
  const translatedLabel = getFieldLabel(columnName, intl);
  if (translatedLabel) {
    return translatedLabel;
  }
  
  // Convert database column names to readable format
  const columnMappings = {
    'id': 'ID',
    'uuid': 'UUID',
    'hrid': 'HRID',
    'isbn': 'ISBN',
    'issn': 'ISSN',
    'oclc': 'OCLC',
    'lccn': 'LCCN',
    'doi': 'DOI',
    'uri': 'URI',
    'url': 'URL',
    'json': 'JSON',
    'jsonb': 'JSONB',
    'created_date': 'Created Date',
    'updated_date': 'Updated Date',
    'creation_date': 'Creation Date',
    'created_by': 'Created By',
    'updated_by': 'Updated By',
    'instance_id': 'Instance ID',
    'holdings_id': 'Holdings ID',
    'item_id': 'Item ID',
    'user_id': 'User ID',
    'patron_id': 'Patron ID',
    'barcode': 'Barcode',
    'call_number': 'Call Number',
    'location_id': 'Location ID',
    'location_name': 'Location Name',
    'library_id': 'Library ID',
    'library_name': 'Library Name',
    'material_type': 'Material Type',
    'loan_type': 'Loan Type',
    'item_status': 'Item Status',
    'instance_status': 'Instance Status',
    'holdings_status': 'Holdings Status',
    'effective_location': 'Effective Location',
    'permanent_location': 'Permanent Location',
    'temporary_location': 'Temporary Location',
    'service_point': 'Service Point',
    'circulation_note': 'Circulation Note',
    'public_note': 'Public Note',
    'staff_note': 'Staff Note',
    'check_in_note': 'Check In Note',
    'check_out_note': 'Check Out Note',
    'due_date': 'Due Date',
    'loan_date': 'Loan Date',
    'return_date': 'Return Date',
    'renewal_count': 'Renewal Count',
    'fine_amount': 'Fine Amount',
    'fee_amount': 'Fee Amount',
    'payment_amount': 'Payment Amount',
    'outstanding_amount': 'Outstanding Amount',
  };

  // Check if we have a specific mapping
  if (columnMappings[columnName.toLowerCase()]) {
    return columnMappings[columnName.toLowerCase()];
  }

  // Generic formatting: split by underscore/dot and capitalize
  return columnName
    .split(/[_.]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

export const formatCellValue = (value, columnName, intl) => {
  if (value === null || value === undefined || value === '') {
    return '';
  }

  // Check if this is a reference field value that needs translation
  const refInfo = isReferenceColumn(columnName);
  if (refInfo && intl) {
    const translatedValue = translateReferenceValue(intl, refInfo.cubeName, refInfo.fieldName, value);
    if (translatedValue !== value) {
      return translatedValue;
    }
  }

  // Format based on column type
  const lowerColumnName = columnName.toLowerCase();

  // Date fields
  if (lowerColumnName.includes('date') || lowerColumnName.includes('time')) {
    if (typeof value === 'string' && value.match(/^\d{4}-\d{2}-\d{2}/)) {
      try {
        return new Date(value);
      } catch (e) {
        return value;
      }
    }
  }

  // Currency/Amount fields
  if (lowerColumnName.includes('amount') || lowerColumnName.includes('price') || 
      lowerColumnName.includes('cost') || lowerColumnName.includes('fee') || 
      lowerColumnName.includes('fine')) {
    if (typeof value === 'number') {
      return value;
    }
    // Try to parse as number
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      return numValue;
    }
  }

  // Count fields
  if (lowerColumnName.includes('count') || lowerColumnName.includes('total') || 
      lowerColumnName.includes('number') || lowerColumnName.includes('qty') ||
      lowerColumnName.includes('quantity')) {
    if (typeof value === 'number') {
      return value;
    }
    const numValue = parseInt(value);
    if (!isNaN(numValue)) {
      return numValue;
    }
  }

  // Boolean fields
  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No';
  }

  // JSON fields - format as readable text
  if (typeof value === 'object') {
    try {
      return JSON.stringify(value, null, 2);
    } catch (e) {
      return String(value);
    }
  }

  return value;
};

export const getColumnAlignment = (value, columnName) => {
  const lowerColumnName = columnName.toLowerCase();

  // Numbers align right
  if (typeof value === 'number' || 
      lowerColumnName.includes('amount') || 
      lowerColumnName.includes('count') || 
      lowerColumnName.includes('total') ||
      lowerColumnName.includes('price') ||
      lowerColumnName.includes('cost')) {
    return 'right';
  }

  // Dates align center
  if (value instanceof Date || lowerColumnName.includes('date')) {
    return 'center';
  }

  // IDs and codes align center
  if (lowerColumnName.includes('id') || 
      lowerColumnName.includes('code') || 
      lowerColumnName.includes('barcode') ||
      lowerColumnName.includes('hrid')) {
    return 'center';
  }

  // Default to left
  return 'left';
};

export const getNumberFormat = (value, columnName) => {
  const lowerColumnName = columnName.toLowerCase();

  // Currency format
  if (lowerColumnName.includes('amount') || 
      lowerColumnName.includes('price') || 
      lowerColumnName.includes('cost') ||
      lowerColumnName.includes('fee') ||
      lowerColumnName.includes('fine')) {
    return '$#,##0.00';
  }

  // Integer format for counts
  if (lowerColumnName.includes('count') || 
      lowerColumnName.includes('total') ||
      lowerColumnName.includes('quantity')) {
    return '#,##0';
  }

  // Date format
  if (value instanceof Date) {
    return 'dd/mm/yyyy hh:mm';
  }

  // Default number format
  if (typeof value === 'number') {
    return '#,##0.##';
  }

  return null;
};
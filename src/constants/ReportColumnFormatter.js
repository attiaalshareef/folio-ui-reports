import { FormattedMessage, FormattedNumber, useIntl } from 'react-intl';
import { translateReferenceValue, REFERENCE_TABLE_TRANSLATION_MAP } from '../helpers/referenceTableTranslations';

// Helper function to check if a column is a reference table field
const isReferenceTableField = (columnName) => {
  // Handle cataloging_view fields (e.g., cataloging_view_material_type)
  if (columnName.startsWith('cataloging_view_')) {
    const fieldPart = columnName.replace('cataloging_view_', '');
    
    // Check if this matches a reference table
    for (const cubeName in REFERENCE_TABLE_TRANSLATION_MAP) {
      if (fieldPart === cubeName || fieldPart.startsWith(cubeName + '_')) {
        const mapping = REFERENCE_TABLE_TRANSLATION_MAP[cubeName];
        return { cubeName, fieldName: mapping.field };
      }
    }
  }
  
  // Check direct reference table fields (e.g., material_type_name)
  for (const cubeName in REFERENCE_TABLE_TRANSLATION_MAP) {
    const mapping = REFERENCE_TABLE_TRANSLATION_MAP[cubeName];
    const expectedColumnName = `${cubeName}_${mapping.field}`;
    
    if (columnName === expectedColumnName) {
      return { cubeName, fieldName: mapping.field };
    }
  }
  
  return null;
};

// Helper function to check if a value is a valid ISO date string
const isISODateString = (value) => {
  if (typeof value !== 'string') return false;
  
  // Check if it matches ISO 8601 format (YYYY-MM-DDTHH:mm:ss.sssZ or similar)
  const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/;
  return isoDateRegex.test(value);
};

// Helper function to format date fields (remove time)
const formatDateOnly = (value) => {
  if (!value) return '';
  
  try {
    // Check if it's an ISO date string
    if (isISODateString(value)) {
      return value.split('T')[0]; // Returns YYYY-MM-DD
    }
    
    return value;
  } catch (e) {
    return value;
  }
};

export const ReportColumnFormatter = {
  rowIndex: (item) => item.rowIndex + 1,
  
  // Generic formatter for any column - auto-detects dates
  formatColumn: (columnName) => (item) => {
    const value = item[columnName];
    
    // Auto-detect and format ISO date strings
    if (isISODateString(value)) {
      return formatDateOnly(value);
    }
    
    return value;
  },
  
  // Create a formatter for reference table fields with intl support
  createReferenceFormatter: (columnName, intl) => {
    const refInfo = isReferenceTableField(columnName);
    if (!refInfo) return null;
    
    return (item) => {
      const value = item[columnName];
      if (!value) return value;
      
      return translateReferenceValue(intl, refInfo.cubeName, refInfo.fieldName, value);
    };
  },
  
  instance_count: (item) => {
    return <FormattedNumber value={item.instance_count} />;
  },
  item_count: (item) => {
    return <FormattedNumber value={item.item_count} />;
  },
  holdings_record_count: (item) => {
    return <FormattedNumber value={item.holdings_record_count} />;
  },
};

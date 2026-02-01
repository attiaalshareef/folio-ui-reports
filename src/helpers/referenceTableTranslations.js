/**
 * Translation mapping for reference table values
 * Based on TranslationScheme.json from stripes-smart-components
 */

export const REFERENCE_TABLE_TRANSLATION_MAP = {
  // Material Types
  material_type: {
    appName: 'ui-inventory',
    tableName: 'materialTypes',
    field: 'name',
  },
  // Loan Types
  loan_type: {
    appName: 'ui-inventory',
    tableName: 'loantypes',
    field: 'name',
  },
  // Call Number Types
  call_number_type: {
    appName: 'ui-inventory',
    tableName: 'callNumberTypes',
    field: 'name',
  },
  // Instance Types
  instance_type: {
    appName: 'ui-inventory',
    tableName: 'instanceTypes',
    field: 'name',
  },
  // Instance Statuses
  instance_status: {
    appName: 'ui-inventory',
    tableName: 'instanceStatuses',
    field: 'name',
  },
  // Mode of Issuance
  mode_of_issuance: {
    appName: 'ui-inventory',
    tableName: 'issuanceModes',
    field: 'name',
  },
  // Contributor Types
  contributor_type: {
    appName: 'ui-inventory',
    tableName: 'contributorTypes',
    field: 'name',
  },
  // Identifier Types
  identifier_type: {
    appName: 'ui-inventory',
    tableName: 'identifierTypes',
    field: 'name',
  },
  // Classification Types
  classification_type: {
    appName: 'ui-inventory',
    tableName: 'classificationTypes',
    field: 'name',
  },
  // Instance Note Types
  instance_note_type: {
    appName: 'ui-inventory',
    tableName: 'instanceNoteTypes',
    field: 'name',
  },
  // Alternative Title Types
  alternative_title_type: {
    appName: 'ui-inventory',
    tableName: 'alternativeTitleTypes',
    field: 'name',
  },
  // Statistical Codes
  statistical_code: {
    appName: 'ui-inventory',
    tableName: 'statisticalCodes',
    field: 'name',
  },
  // Statistical Code Types
  statistical_code_type: {
    appName: 'ui-inventory',
    tableName: 'statisticalCodeTypes',
    field: 'name',
  },
  // Instance Formats
  instance_format: {
    appName: 'ui-inventory',
    tableName: 'instanceFormats',
    field: 'name',
  },
  // Nature of Content Terms
  nature_of_content_term: {
    appName: 'ui-inventory',
    tableName: 'natureOfContentTerms',
    field: 'name',
  },
  // Holdings Types
  holdings_type: {
    appName: 'ui-inventory',
    tableName: 'holdingsTypes',
    field: 'name',
  },
  // Holdings Note Types
  holdings_note_type: {
    appName: 'ui-inventory',
    tableName: 'holdingsNoteTypes',
    field: 'name',
  },
  // Item Note Types
  item_note_type: {
    appName: 'ui-inventory',
    tableName: 'itemNoteTypes',
    field: 'name',
  },
  // Locations
  location: {
    appName: 'ui-tenant-settings',
    tableName: 'locations',
    field: 'name',
  },
  // Libraries
  loclibrary: {
    appName: 'ui-tenant-settings',
    tableName: 'loclibs',
    field: 'name',
  },
  // Campuses
  loccampus: {
    appName: 'ui-tenant-settings',
    tableName: 'loccamps',
    field: 'name',
  },
  // Institutions
  locinstitution: {
    appName: 'ui-tenant-settings',
    tableName: 'locinsts',
    field: 'name',
  },
};

/**
 * Get translation key for a reference table value
 * @param {string} cubeName - The cube/table name (e.g., 'material_type')
 * @param {string} fieldName - The field name (e.g., 'name')
 * @param {string} value - The actual value (e.g., 'BOOK')
 * @returns {string|null} - Translation key or null if not translatable
 */
export const getReferenceValueTranslationKey = (cubeName, fieldName, value) => {
  const mapping = REFERENCE_TABLE_TRANSLATION_MAP[cubeName];
  
  if (!mapping || !value) {
    return null;
  }
  
  // Check if this field is translatable
  if (mapping.field !== fieldName) {
    return null;
  }
  
  // Build translation key: ui-{appName}.{tableName}.{field}.{VALUE}
  return `${mapping.appName}.${mapping.tableName}.${fieldName}.${value}`;
};

/**
 * Translate a reference value using intl
 * @param {object} intl - react-intl intl object
 * @param {string} cubeName - The cube/table name
 * @param {string} fieldName - The field name
 * @param {string} value - The actual value
 * @returns {string} - Translated value or original value if no translation found
 */
export const translateReferenceValue = (intl, cubeName, fieldName, value) => {
  const translationKey = getReferenceValueTranslationKey(cubeName, fieldName, value);
  
  if (!translationKey) {
    return value;
  }
  
  // Try to get translation, fallback to original value
  try {
    return intl.formatMessage({
      id: translationKey,
      defaultMessage: value,
    });
  } catch (error) {
    console.warn(`Translation not found for key: ${translationKey}`);
    return value;
  }
};

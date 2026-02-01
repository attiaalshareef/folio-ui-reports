import { useIntl } from 'react-intl';

/**
 * Hook to get field labels for cataloging reports
 * @returns {Object} Field labels mapping
 */
export const useCatalogingFieldLabels = () => {
  const intl = useIntl();

  return {
    // Instance fields
    'cataloging_view.title': intl.formatMessage({
      id: 'ui-reports.catalogingReports.instanceFields.title',
      defaultMessage: 'Title',
    }),
    'cataloging_view.instance_hrid': intl.formatMessage({
      id: 'ui-reports.catalogingReports.instanceFields.hrid',
      defaultMessage: 'Instance HRID',
    }),
    'cataloging_view.contributors': intl.formatMessage({
      id: 'ui-reports.catalogingReports.instanceFields.contributors',
      defaultMessage: 'Contributors',
    }),
    'cataloging_view.subjects': intl.formatMessage({
      id: 'ui-reports.catalogingReports.instanceFields.subjects',
      defaultMessage: 'Subjects',
    }),
    'cataloging_view.identifiers': intl.formatMessage({
      id: 'ui-reports.catalogingReports.instanceFields.identifiers',
      defaultMessage: 'Identifiers',
    }),
    'cataloging_view.languages': intl.formatMessage({
      id: 'ui-reports.catalogingReports.instanceFields.languages',
      defaultMessage: 'Languages',
    }),
    'cataloging_view.resource_type': intl.formatMessage({
      id: 'ui-reports.catalogingReports.instanceFields.resourceType',
      defaultMessage: 'Resource Type',
    }),
    'cataloging_view.resource_status': intl.formatMessage({
      id: 'ui-reports.catalogingReports.instanceFields.instanceStatus',
      defaultMessage: 'Instance Status',
    }),
    'cataloging_view.mode_of_issuance_name': intl.formatMessage({
      id: 'ui-reports.catalogingReports.instanceFields.modeOfIssuance',
      defaultMessage: 'Mode of Issuance',
    }),
    'cataloging_view.instance_created_date': intl.formatMessage({
      id: 'ui-reports.catalogingReports.instanceFields.metadataCreatedDate',
      defaultMessage: 'Created Date',
    }),
    'cataloging_view.instance_updated_date': intl.formatMessage({
      id: 'ui-reports.catalogingReports.instanceFields.metadataUpdatedDate',
      defaultMessage: 'Updated Date',
    }),
    'cataloging_view.catalogeddate': intl.formatMessage({
      id: 'ui-reports.catalogingReports.instanceFields.catalogedDate',
      defaultMessage: 'Cataloged Date',
    }),
    'cataloging_view.instance_type_name': intl.formatMessage({
      id: 'ui-reports.catalogingReports.instanceFields.instanceTypeName',
      defaultMessage: 'Instance Type Name',
    }),
    'cataloging_view.instance_status_name': intl.formatMessage({
      id: 'ui-reports.catalogingReports.instanceFields.instanceStatusName',
      defaultMessage: 'Instance Status Name',
    }),
    'cataloging_view.series_list': intl.formatMessage({
      id: 'ui-reports.catalogingReports.instanceFields.seriesList',
      defaultMessage: 'Series',
    }),
    'cataloging_view.editions_list': intl.formatMessage({
      id: 'ui-reports.catalogingReports.instanceFields.editionsList',
      defaultMessage: 'Editions',
    }),
    'cataloging_view.publication_info': intl.formatMessage({
      id: 'ui-reports.catalogingReports.instanceFields.publicationInfo',
      defaultMessage: 'Publication Info',
    }),
    'cataloging_view.publicationrange': intl.formatMessage({
      id: 'ui-reports.catalogingReports.instanceFields.publicationRange',
      defaultMessage: 'Publication Range',
    }),
    'cataloging_view.classifications': intl.formatMessage({
      id: 'ui-reports.catalogingReports.instanceFields.classifications',
      defaultMessage: 'Classifications',
    }),
    'cataloging_view.nature_of_content_list': intl.formatMessage({
      id: 'ui-reports.catalogingReports.instanceFields.natureOfContent',
      defaultMessage: 'Nature of Content',
    }),
    'cataloging_view.physicaldescriptions': intl.formatMessage({
      id: 'ui-reports.catalogingReports.instanceFields.physicalDescriptions',
      defaultMessage: 'Physical Descriptions',
    }),
    'cataloging_view.instance_formats_list': intl.formatMessage({
      id: 'ui-reports.catalogingReports.instanceFields.instanceFormatsList',
      defaultMessage: 'Instance Formats',
    }),
    'cataloging_view.electronic_access_urls': intl.formatMessage({
      id: 'ui-reports.catalogingReports.instanceFields.electronicAccessUrls',
      defaultMessage: 'Electronic Access URLs',
    }),
    'cataloging_view.alternative_titles_list': intl.formatMessage({
      id: 'ui-reports.catalogingReports.instanceFields.alternativeTitlesList',
      defaultMessage: 'Alternative Titles',
    }),
    'cataloging_view.statistical_codes_list': intl.formatMessage({
      id: 'ui-reports.catalogingReports.instanceFields.statisticalCodesList',
      defaultMessage: 'Statistical Codes',
    }),
    'cataloging_view.instance_notes': intl.formatMessage({
      id: 'ui-reports.catalogingReports.instanceFields.notes',
      defaultMessage: 'Notes',
    }),
    'cataloging_view.instance_admin_notes': intl.formatMessage({
      id: 'ui-reports.catalogingReports.instanceFields.administrativeNotes',
      defaultMessage: 'Administrative Notes',
    }),
    'cataloging_view.indextitle': intl.formatMessage({
      id: 'ui-reports.catalogingReports.instanceFields.indexTitle',
      defaultMessage: 'Index Title',
    }),
    'cataloging_view.publicationfrequency': intl.formatMessage({
      id: 'ui-reports.catalogingReports.instanceFields.publicationFrequency',
      defaultMessage: 'Publication Frequency',
    }),
    'cataloging_view.source': intl.formatMessage({
      id: 'ui-reports.catalogingReports.instanceFields.source',
      defaultMessage: 'Source',
    }),
    'cataloging_view.tags': intl.formatMessage({
      id: 'ui-reports.catalogingReports.instanceFields.tags',
      defaultMessage: 'Tags',
    }),
    'cataloging_view.suppression_status': intl.formatMessage({
      id: 'ui-reports.catalogingReports.instanceFields.suppressionStatus',
      defaultMessage: 'Suppression Status',
    }),
    'cataloging_view.discoverysuppress': intl.formatMessage({
      id: 'ui-reports.catalogingReports.instanceFields.discoverySuppress',
      defaultMessage: 'Discovery Suppress',
    }),
    'cataloging_view.staffsuppress': intl.formatMessage({
      id: 'ui-reports.catalogingReports.instanceFields.staffSuppress',
      defaultMessage: 'Staff Suppress',
    }),

    // Complex fields - Contributors
    'cataloging_view.name': intl.formatMessage({
      id: 'ui-reports.catalogingReports.contributorFields.name',
      defaultMessage: 'Contributor Name',
    }),
    'cataloging_view.contributorTypeText': intl.formatMessage({
      id: 'ui-reports.catalogingReports.contributorFields.contributorTypeText',
      defaultMessage: 'Contributor Type Text',
    }),
    'cataloging_view.contributor_type_name': intl.formatMessage({
      id: 'ui-reports.catalogingReports.contributorFields.contributorTypeName',
      defaultMessage: 'Contributor Type',
    }),
    'cataloging_view.contributor_name_type_name': intl.formatMessage({
      id: 'ui-reports.catalogingReports.contributorFields.contributorNameTypeName',
      defaultMessage: 'Contributor Name Type',
    }),
    'cataloging_view.primary': intl.formatMessage({
      id: 'ui-reports.catalogingReports.contributorFields.primary',
      defaultMessage: 'Primary Contributor',
    }),

    // Complex fields - Identifiers
    'cataloging_view.value': intl.formatMessage({
      id: 'ui-reports.catalogingReports.identifierFields.value',
      defaultMessage: 'Identifier Value',
    }),
    'cataloging_view.identifier_type_name': intl.formatMessage({
      id: 'ui-reports.catalogingReports.identifierFields.identifierTypeName',
      defaultMessage: 'Identifier Type',
    }),

    // Complex fields - Classifications
    'cataloging_view.classificationNumber': intl.formatMessage({
      id: 'ui-reports.catalogingReports.classificationFields.classificationNumber',
      defaultMessage: 'Classification Number',
    }),
    'cataloging_view.classification_type_name': intl.formatMessage({
      id: 'ui-reports.catalogingReports.classificationFields.classificationTypeName',
      defaultMessage: 'Classification Type',
    }),

    // Complex fields - Notes
    'cataloging_view.note': intl.formatMessage({
      id: 'ui-reports.catalogingReports.noteFields.note',
      defaultMessage: 'Note Text',
    }),
    'cataloging_view.note_type_name': intl.formatMessage({
      id: 'ui-reports.catalogingReports.noteFields.noteTypeName',
      defaultMessage: 'Note Type',
    }),
    'cataloging_view.staffOnly': intl.formatMessage({
      id: 'ui-reports.catalogingReports.noteFields.staffOnly',
      defaultMessage: 'Staff Only',
    }),

    // Complex fields - Alternative Titles
    'cataloging_view.alternativeTitle': intl.formatMessage({
      id: 'ui-reports.catalogingReports.alternativeTitleFields.alternativeTitle',
      defaultMessage: 'Alternative Title',
    }),
    'cataloging_view.alternative_title_type_name': intl.formatMessage({
      id: 'ui-reports.catalogingReports.alternativeTitleFields.alternativeTitleTypeName',
      defaultMessage: 'Alternative Title Type',
    }),

    // Additional reference fields
    'cataloging_view.instance_format_name': intl.formatMessage({
      id: 'ui-reports.catalogingReports.referenceFields.instanceFormatName',
      defaultMessage: 'Instance Format Name',
    }),
    'cataloging_view.nature_of_content_name': intl.formatMessage({
      id: 'ui-reports.catalogingReports.referenceFields.natureOfContentName',
      defaultMessage: 'Nature of Content Name',
    }),
    'cataloging_view.mode_of_issuance_name_ref': intl.formatMessage({
      id: 'ui-reports.catalogingReports.referenceFields.modeOfIssuanceNameRef',
      defaultMessage: 'Mode of Issuance Name (Reference)',
    }),

    // Reference fields
    'cataloging_view.contributor_type_ref': intl.formatMessage({
      id: 'ui-reports.catalogingReports.referenceFields.contributorType',
      defaultMessage: 'Contributor Type (Reference)',
    }),
    'cataloging_view.identifier_type_ref': intl.formatMessage({
      id: 'ui-reports.catalogingReports.referenceFields.identifierType',
      defaultMessage: 'Identifier Type (Reference)',
    }),
    'cataloging_view.classification_type_ref': intl.formatMessage({
      id: 'ui-reports.catalogingReports.referenceFields.classificationType',
      defaultMessage: 'Classification Type (Reference)',
    }),
    'cataloging_view.note_type_ref': intl.formatMessage({
      id: 'ui-reports.catalogingReports.referenceFields.noteType',
      defaultMessage: 'Note Type (Reference)',
    }),
    'cataloging_view.statistical_code_name': intl.formatMessage({
      id: 'ui-reports.catalogingReports.referenceFields.statisticalCode',
      defaultMessage: 'Statistical Code',
    }),
    'cataloging_view.statistical_code_type_name': intl.formatMessage({
      id: 'ui-reports.catalogingReports.referenceFields.statisticalCodeType',
      defaultMessage: 'Statistical Code Type',
    }),

    // Holdings fields
    'cataloging_view.holdings_hrid': intl.formatMessage({
      id: 'ui-reports.catalogingReports.holdingsFields.hrid',
      defaultMessage: 'Holdings HRID',
    }),
    'cataloging_view.call_number': intl.formatMessage({
      id: 'ui-reports.catalogingReports.holdingsFields.callNumber',
      defaultMessage: 'Call Number',
    }),
    'cataloging_view.call_number_type': intl.formatMessage({
      id: 'ui-reports.catalogingReports.holdingsFields.callNumberType',
      defaultMessage: 'Call Number Type',
    }),
    'cataloging_view.location_name': intl.formatMessage({
      id: 'ui-reports.catalogingReports.holdingsFields.locationName',
      defaultMessage: 'Location Name',
    }),
    'cataloging_view.library_name': intl.formatMessage({
      id: 'ui-reports.catalogingReports.holdingsFields.libraryName',
      defaultMessage: 'Library Name',
    }),
    'cataloging_view.campus_name': intl.formatMessage({
      id: 'ui-reports.catalogingReports.holdingsFields.campusName',
      defaultMessage: 'Campus Name',
    }),
    'cataloging_view.institution_name': intl.formatMessage({
      id: 'ui-reports.catalogingReports.holdingsFields.institutionName',
      defaultMessage: 'Institution Name',
    }),
    'cataloging_view.holdings_created_date': intl.formatMessage({
      id: 'ui-reports.catalogingReports.holdingsFields.createdDate',
      defaultMessage: 'Holdings Created Date',
    }),
    'cataloging_view.holdings_updated_date': intl.formatMessage({
      id: 'ui-reports.catalogingReports.holdingsFields.updatedDate',
      defaultMessage: 'Holdings Updated Date',
    }),

    // Item fields
    'cataloging_view.item_hrid': intl.formatMessage({
      id: 'ui-reports.catalogingReports.itemFields.hrid',
      defaultMessage: 'Item HRID',
    }),
    'cataloging_view.barcode': intl.formatMessage({
      id: 'ui-reports.catalogingReports.itemFields.barcode',
      defaultMessage: 'Barcode',
    }),
    'cataloging_view.item_status': intl.formatMessage({
      id: 'ui-reports.catalogingReports.itemFields.statusName',
      defaultMessage: 'Status',
    }),
    'cataloging_view.material_type': intl.formatMessage({
      id: 'ui-reports.catalogingReports.itemFields.materialTypeName',
      defaultMessage: 'Material Type',
    }),
    'cataloging_view.loan_type': intl.formatMessage({
      id: 'ui-reports.catalogingReports.itemFields.loanType',
      defaultMessage: 'Loan Type',
    }),
    'cataloging_view.copy_number': intl.formatMessage({
      id: 'ui-reports.catalogingReports.itemFields.copyNumber',
      defaultMessage: 'Copy Number',
    }),
    'cataloging_view.item_created_date': intl.formatMessage({
      id: 'ui-reports.catalogingReports.itemFields.createdDate',
      defaultMessage: 'Item Created Date',
    }),
    'cataloging_view.item_updated_date': intl.formatMessage({
      id: 'ui-reports.catalogingReports.itemFields.updatedDate',
      defaultMessage: 'Item Updated Date',
    }),
    'cataloging_view.status_date': intl.formatMessage({
      id: 'ui-reports.catalogingReports.itemFields.statusDate',
      defaultMessage: 'Status Date',
    }),

    // Reference tables - Holdings
    'call_number_type.id': intl.formatMessage({
      id: 'ui-reports.catalogingReports.referenceTables.callNumberType.id',
      defaultMessage: 'Call Number Type ID',
    }),
    'call_number_type.name': intl.formatMessage({
      id: 'ui-reports.catalogingReports.referenceTables.callNumberType.name',
      defaultMessage: 'Call Number Type Name',
    }),
    'location.id': intl.formatMessage({
      id: 'ui-reports.catalogingReports.referenceTables.location.id',
      defaultMessage: 'Location ID',
    }),
    'location.name': intl.formatMessage({
      id: 'ui-reports.catalogingReports.referenceTables.location.name',
      defaultMessage: 'Location Name',
    }),
    'location.code': intl.formatMessage({
      id: 'ui-reports.catalogingReports.referenceTables.location.code',
      defaultMessage: 'Location Code',
    }),
    'loclibrary.id': intl.formatMessage({
      id: 'ui-reports.catalogingReports.referenceTables.library.id',
      defaultMessage: 'Library ID',
    }),
    'loclibrary.name': intl.formatMessage({
      id: 'ui-reports.catalogingReports.referenceTables.library.name',
      defaultMessage: 'Library Name',
    }),
    'loclibrary.code': intl.formatMessage({
      id: 'ui-reports.catalogingReports.referenceTables.library.code',
      defaultMessage: 'Library Code',
    }),
    'loccampus.id': intl.formatMessage({
      id: 'ui-reports.catalogingReports.referenceTables.campus.id',
      defaultMessage: 'Campus ID',
    }),
    'loccampus.name': intl.formatMessage({
      id: 'ui-reports.catalogingReports.referenceTables.campus.name',
      defaultMessage: 'Campus Name',
    }),
    'loccampus.code': intl.formatMessage({
      id: 'ui-reports.catalogingReports.referenceTables.campus.code',
      defaultMessage: 'Campus Code',
    }),
    'locinstitution.id': intl.formatMessage({
      id: 'ui-reports.catalogingReports.referenceTables.institution.id',
      defaultMessage: 'Institution ID',
    }),
    'locinstitution.name': intl.formatMessage({
      id: 'ui-reports.catalogingReports.referenceTables.institution.name',
      defaultMessage: 'Institution Name',
    }),
    'locinstitution.code': intl.formatMessage({
      id: 'ui-reports.catalogingReports.referenceTables.institution.code',
      defaultMessage: 'Institution Code',
    }),

    // Reference tables - Items
    'material_type.id': intl.formatMessage({
      id: 'ui-reports.catalogingReports.referenceTables.materialType.id',
      defaultMessage: 'Material Type ID',
    }),
    'material_type.name': intl.formatMessage({
      id: 'ui-reports.catalogingReports.referenceTables.materialType.name',
      defaultMessage: 'Material Type Name',
    }),
    'loan_type.id': intl.formatMessage({
      id: 'ui-reports.catalogingReports.referenceTables.loanType.id',
      defaultMessage: 'Loan Type ID',
    }),
    'loan_type.name': intl.formatMessage({
      id: 'ui-reports.catalogingReports.referenceTables.loanType.name',
      defaultMessage: 'Loan Type Name',
    }),

    // Reference tables - Instance
    'instance_type.id': intl.formatMessage({
      id: 'ui-reports.catalogingReports.referenceTables.instanceType.id',
      defaultMessage: 'Instance Type ID',
    }),
    'instance_type.name': intl.formatMessage({
      id: 'ui-reports.catalogingReports.referenceTables.instanceType.name',
      defaultMessage: 'Instance Type',
    }),
    'instance_status.id': intl.formatMessage({
      id: 'ui-reports.catalogingReports.referenceTables.instanceStatus.id',
      defaultMessage: 'Instance Status ID',
    }),
    'instance_status.name': intl.formatMessage({
      id: 'ui-reports.catalogingReports.referenceTables.instanceStatus.name',
      defaultMessage: 'Instance Status',
    }),
    'mode_of_issuance.id': intl.formatMessage({
      id: 'ui-reports.catalogingReports.referenceTables.modeOfIssuance.id',
      defaultMessage: 'Mode of Issuance ID',
    }),
    'mode_of_issuance.name': intl.formatMessage({
      id: 'ui-reports.catalogingReports.referenceTables.modeOfIssuance.name',
      defaultMessage: 'Mode of Issuance',
    }),
    'contributor_type.id': intl.formatMessage({
      id: 'ui-reports.catalogingReports.referenceTables.contributorType.id',
      defaultMessage: 'Contributor Type ID',
    }),
    'contributor_type.name': intl.formatMessage({
      id: 'ui-reports.catalogingReports.referenceTables.contributorType.name',
      defaultMessage: 'Contributor Type',
    }),
    'contributor_name_type.id': intl.formatMessage({
      id: 'ui-reports.catalogingReports.referenceTables.contributorNameType.id',
      defaultMessage: 'Contributor Name Type ID',
    }),
    'contributor_name_type.name': intl.formatMessage({
      id: 'ui-reports.catalogingReports.referenceTables.contributorNameType.name',
      defaultMessage: 'Contributor Name Type',
    }),
    'identifier_type.id': intl.formatMessage({
      id: 'ui-reports.catalogingReports.referenceTables.identifierType.id',
      defaultMessage: 'Identifier Type ID',
    }),
    'identifier_type.name': intl.formatMessage({
      id: 'ui-reports.catalogingReports.referenceTables.identifierType.name',
      defaultMessage: 'Identifier Type',
    }),
    'classification_type.id': intl.formatMessage({
      id: 'ui-reports.catalogingReports.referenceTables.classificationType.id',
      defaultMessage: 'Classification Type ID',
    }),
    'classification_type.name': intl.formatMessage({
      id: 'ui-reports.catalogingReports.referenceTables.classificationType.name',
      defaultMessage: 'Classification Type',
    }),
    'instance_note_type.id': intl.formatMessage({
      id: 'ui-reports.catalogingReports.referenceTables.instanceNoteType.id',
      defaultMessage: 'Note Type ID',
    }),
    'instance_note_type.name': intl.formatMessage({
      id: 'ui-reports.catalogingReports.referenceTables.instanceNoteType.name',
      defaultMessage: 'Note Type',
    }),
    'alternative_title_type.id': intl.formatMessage({
      id: 'ui-reports.catalogingReports.referenceTables.alternativeTitleType.id',
      defaultMessage: 'Alternative Title Type ID',
    }),
    'alternative_title_type.name': intl.formatMessage({
      id: 'ui-reports.catalogingReports.referenceTables.alternativeTitleType.name',
      defaultMessage: 'Alternative Title Type',
    }),
    'instance_format.id': intl.formatMessage({
      id: 'ui-reports.catalogingReports.referenceTables.instanceFormat.id',
      defaultMessage: 'Instance Format ID',
    }),
    'instance_format.name': intl.formatMessage({
      id: 'ui-reports.catalogingReports.referenceTables.instanceFormat.name',
      defaultMessage: 'Instance Format',
    }),
    'nature_of_content_term.id': intl.formatMessage({
      id: 'ui-reports.catalogingReports.referenceTables.natureOfContentTerm.id',
      defaultMessage: 'Nature of Content ID',
    }),
    'nature_of_content_term.name': intl.formatMessage({
      id: 'ui-reports.catalogingReports.referenceTables.natureOfContentTerm.name',
      defaultMessage: 'Nature of Content',
    }),
    'statistical_code.id': intl.formatMessage({
      id: 'ui-reports.catalogingReports.referenceTables.statisticalCode.id',
      defaultMessage: 'Statistical Code ID',
    }),
    'statistical_code.name': intl.formatMessage({
      id: 'ui-reports.catalogingReports.referenceTables.statisticalCode.name',
      defaultMessage: 'Statistical Code',
    }),
    'statistical_code_type.id': intl.formatMessage({
      id: 'ui-reports.catalogingReports.referenceTables.statisticalCodeType.id',
      defaultMessage: 'Statistical Code Type ID',
    }),
    'statistical_code_type.name': intl.formatMessage({
      id: 'ui-reports.catalogingReports.referenceTables.statisticalCodeType.name',
      defaultMessage: 'Statistical Code Type',
    }),

    // Measures
    'cataloging_view.total_instances': intl.formatMessage({
      id: 'ui-reports.catalogingReports.measures.instanceCount',
      defaultMessage: 'Instance Count',
    }),
    'cataloging_view.total_holdings': intl.formatMessage({
      id: 'ui-reports.catalogingReports.measures.holdingsCount',
      defaultMessage: 'Holdings Count',
    }),
    'cataloging_view.total_items': intl.formatMessage({
      id: 'ui-reports.catalogingReports.measures.itemCount',
      defaultMessage: 'Item Count',
    }),
  };
};

/**
 * Get column mapping for MultiColumnList based on actual column names
 * @param {Array} actualColumns - Actual column names from data
 * @param {Object} fieldLabels - Field labels mapping
 * @returns {Object} Column mapping for MultiColumnList
 */
export const createColumnMapping = (actualColumns, fieldLabels) => {
  const mapping = { rowIndex: '#' };

  if (!actualColumns || !fieldLabels) return mapping;

  actualColumns.forEach((columnName) => {
    // Try to find matching field label
    const fieldKey = Object.keys(fieldLabels).find(
      (key) => key.replace('.', '_') === columnName || key === columnName,
    );

    if (fieldKey) {
      mapping[columnName] = fieldLabels[fieldKey];
    } else {
      // Fallback to column name
      mapping[columnName] = columnName;
    }
  });

  return mapping;
};

/**
 * Hook to get operator labels for filters
 * @returns {Object} Operator labels mapping
 */
export const useOperatorLabels = () => {
  const intl = useIntl();

  return {
    equals: intl.formatMessage({
      id: 'ui-reports.filters.operators.equals',
      defaultMessage: 'Equals',
    }),
    notEquals: intl.formatMessage({
      id: 'ui-reports.filters.operators.notEquals',
      defaultMessage: 'Not Equals',
    }),
    contains: intl.formatMessage({
      id: 'ui-reports.filters.operators.contains',
      defaultMessage: 'Contains',
    }),
    notContains: intl.formatMessage({
      id: 'ui-reports.filters.operators.notContains',
      defaultMessage: 'Not Contains',
    }),
    startsWith: intl.formatMessage({
      id: 'ui-reports.filters.operators.startsWith',
      defaultMessage: 'Starts With',
    }),
    endsWith: intl.formatMessage({
      id: 'ui-reports.filters.operators.endsWith',
      defaultMessage: 'Ends With',
    }),
    gt: intl.formatMessage({
      id: 'ui-reports.filters.operators.gt',
      defaultMessage: 'Greater Than',
    }),
    gte: intl.formatMessage({
      id: 'ui-reports.filters.operators.gte',
      defaultMessage: 'Greater Than or Equal',
    }),
    lt: intl.formatMessage({
      id: 'ui-reports.filters.operators.lt',
      defaultMessage: 'Less Than',
    }),
    lte: intl.formatMessage({
      id: 'ui-reports.filters.operators.lte',
      defaultMessage: 'Less Than or Equal',
    }),
    set: intl.formatMessage({
      id: 'ui-reports.filters.operators.set',
      defaultMessage: 'Is Set',
    }),
    notSet: intl.formatMessage({
      id: 'ui-reports.filters.operators.notSet',
      defaultMessage: 'Is Not Set',
    }),
    inDateRange: intl.formatMessage({
      id: 'ui-reports.filters.operators.inDateRange',
      defaultMessage: 'In Date Range',
    }),
    notInDateRange: intl.formatMessage({
      id: 'ui-reports.filters.operators.notInDateRange',
      defaultMessage: 'Not In Date Range',
    }),
    beforeDate: intl.formatMessage({
      id: 'ui-reports.filters.operators.beforeDate',
      defaultMessage: 'Before Date',
    }),
    afterDate: intl.formatMessage({
      id: 'ui-reports.filters.operators.afterDate',
      defaultMessage: 'After Date',
    }),
  };
};

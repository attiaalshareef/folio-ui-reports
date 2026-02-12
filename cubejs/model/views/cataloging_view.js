view(`cataloging_view`, {
  cubes: [
    // Instance data (primary)
    {
      joinPath: instance,
      includes: [
        'title',
        { name: 'hrid', alias: 'instance_hrid' },
        'contributors',
        'subjects',
        'identifiers',
        'languages',
        'classifications',
        { name: 'notes', alias: 'instance_notes' },
        'series_list',
        'editions_list',
        'publication_info',
        'publicationrange',
        'publicationfrequency',
        'physicaldescriptions',
        'electronic_access_urls',
        'alternative_titles_list',
        'instance_formats_list',
        'statistical_codes_list',
        'nature_of_content_list',
        { name: 'administrativenotes', alias: 'instance_admin_notes' },
        'indextitle',
        'source',
        'tags',
        'suppression_status',
        'discoverysuppress',
        'staffsuppress',
        { name: 'metadata_createddate', alias: 'instance_created_date' },
        { name: 'metadata_updateddate', alias: 'instance_updated_date' },
        'catalogeddate',
        { name: 'count', alias: 'total_instances' },
        { name: 'created_count', alias: 'instances_created' },
        { name: 'updated_count', alias: 'instances_updated' },
        { name: 'suppressed_count', alias: 'instances_suppressed' },
      ],
    },
    // Instance type and status
    {
      joinPath: instance.instance_type,
      includes: [{ name: 'name', alias: 'resource_type' }],
    },
    {
      joinPath: instance.instance_status,
      includes: [{ name: 'name', alias: 'resource_status' }],
    },
    {
      joinPath: instance.mode_of_issuance,
      includes: [{ name: 'name', alias: 'mode_of_issuance_name' }],
    },
    // Holdings data
    {
      joinPath: holdings_record,
      includes: [
        { name: 'hrid', alias: 'holdings_hrid' },
        { name: 'callnumber', alias: 'call_number' },
        { name: 'notes', alias: 'holdings_notes' },
        { name: 'administrativenotes', alias: 'holdings_admin_notes' },
        { name: 'metadata_createddate', alias: 'holdings_created_date' },
        { name: 'metadata_updateddate', alias: 'holdings_updated_date' },
        { name: 'count', alias: 'total_holdings' },
        { name: 'created_count', alias: 'holdings_created' },
        { name: 'updated_count', alias: 'holdings_updated' },
      ],
    },
    {
      joinPath: holdings_record.call_number_type,
      includes: [{ name: 'name', alias: 'call_number_type' }],
    },
    // Location hierarchy
    {
      joinPath: holdings_record.location,
      includes: [{ name: 'name', alias: 'location_name' }],
    },
    {
      joinPath: holdings_record.location.loclibrary,
      includes: [{ name: 'name', alias: 'library_name' }],
    },
    {
      joinPath: holdings_record.location.loccampus,
      includes: [{ name: 'name', alias: 'campus_name' }],
    },
    {
      joinPath: holdings_record.location.locinstitution,
      includes: [{ name: 'name', alias: 'institution_name' }],
    },
    // Item data
    {
      joinPath: item,
      includes: [
        { name: 'hrid', alias: 'item_hrid' },
        'barcode',
        { name: 'copynumber', alias: 'copy_number' },
        { name: 'status_name', alias: 'item_status' },
        'status_date',
        { name: 'notes', alias: 'item_notes' },
        { name: 'administrativenotes', alias: 'item_admin_notes' },
        { name: 'metadata_createddate', alias: 'item_created_date' },
        { name: 'metadata_updateddate', alias: 'item_updated_date' },
        { name: 'count', alias: 'total_items' },
        { name: 'created_count', alias: 'items_created' },
        { name: 'updated_count', alias: 'items_updated' },
      ],
    },
    {
      joinPath: item.material_type,
      includes: [{ name: 'name', alias: 'material_type' }],
    },
    {
      joinPath: item.loan_type,
      includes: [{ name: 'name', alias: 'loan_type' }],
    },
    // Complex fields for filtering only (not for display)
    {
      joinPath: instance_contributors,
      includes: [
        'name',
        'contributorTypeText',
        'primary',
      ],
    },
    {
      joinPath: instance_contributors.contributor_type,
      includes: [{ name: 'name', alias: 'contributor_type_name' }],
    },
    {
      joinPath: instance_contributors.contributor_name_type,
      includes: [{ name: 'name', alias: 'contributor_name_type_name' }],
    },
    {
      joinPath: instance_identifiers,
      includes: [
        'value',
      ],
    },
    {
      joinPath: instance_identifiers.identifier_type,
      includes: [{ name: 'name', alias: 'identifier_type_name' }],
    },
    {
      joinPath: instance_classifications,
      includes: [
        'classificationNumber',
      ],
    },
    {
      joinPath: instance_classifications.classification_type,
      includes: [{ name: 'name', alias: 'classification_type_name' }],
    },
    {
      joinPath: instance_notes,
      includes: [
        'note',
        'staffOnly',
      ],
    },
    {
      joinPath: instance_notes.instance_note_type,
      includes: [{ name: 'name', alias: 'note_type_name' }],
    },
    // Alternative titles
    {
      joinPath: instance_alternativetitles,
      includes: [
        'alternativeTitle',
      ],
    },
    {
      joinPath: instance_alternativetitles.alternative_title_type,
      includes: [{ name: 'name', alias: 'alternative_title_type_name' }],
    },
    // Reference tables for filtering
    {
      joinPath: instance_type,
      includes: [{ name: 'name', alias: 'instance_type_name' }],
    },
    {
      joinPath: contributor_type,
      includes: [{ name: 'name', alias: 'contributor_type_ref' }],
    },
    {
      joinPath: identifier_type,
      includes: [{ name: 'name', alias: 'identifier_type_ref' }],
    },
    {
      joinPath: classification_type,
      includes: [{ name: 'name', alias: 'classification_type_ref' }],
    },
    {
      joinPath: instance_note_type,
      includes: [{ name: 'name', alias: 'note_type_ref' }],
    },
    {
      joinPath: statistical_code,
      includes: [{ name: 'name', alias: 'statistical_code_name' }],
    },
    {
      joinPath: statistical_code_type,
      includes: [{ name: 'name', alias: 'statistical_code_type_name' }],
    },
    {
      joinPath: instance_format,
      includes: [{ name: 'name', alias: 'instance_format_name' }],
    },
    {
      joinPath: nature_of_content_term,
      includes: [{ name: 'name', alias: 'nature_of_content_name' }],
    },
    {
      joinPath: alternative_title_type,
      includes: [{ name: 'name', alias: 'alternative_title_type_ref' }],
    },
    {
      joinPath: instance_status,
      includes: [{ name: 'name', alias: 'instance_status_name' }],
    },
    {
      joinPath: mode_of_issuance,
      includes: [{ name: 'name', alias: 'mode_of_issuance_name_ref' }],
    },
    {
      joinPath: material_type,
      includes: [{ name: 'name', alias: 'material_type_name' }],
    },
    {
      joinPath: loan_type,
      includes: [{ name: 'name', alias: 'loan_type_name' }],
    },
    {
      joinPath: call_number_type,
      includes: [{ name: 'name', alias: 'call_number_type_name' }],
    },
    {
      joinPath: location,
      includes: [{ name: 'name', alias: 'location_name_ref' }],
    },
    {
      joinPath: loclibrary,
      includes: [{ name: 'name', alias: 'loclibrary_name' }],
    },
    {
      joinPath: loccampus,
      includes: [{ name: 'name', alias: 'loccampus_name' }],
    },
    {
      joinPath: locinstitution,
      includes: [{ name: 'name', alias: 'locinstitution_name' }],
    },
  ],
});

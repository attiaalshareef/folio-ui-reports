view(`circulation_view`, {
  cubes: [
    // Loan data (primary)
    {
      joinPath: loan,
      includes: [
        { name: 'id', alias: 'loan_id' },
        { name: 'loandate', alias: 'loan_date' },
        { name: 'duedate', alias: 'due_date' },
        { name: 'returndate', alias: 'return_date' },
        { name: 'status_name', alias: 'loan_status' },
        { name: 'action', alias: 'loan_action' },
        { name: 'renewalcount', alias: 'renewal_count' },
        { name: 'itemstatus', alias: 'item_status_at_checkout' },
        { name: 'metadata_createddate', alias: 'loan_created_date' },
        { name: 'metadata_updateddate', alias: 'loan_updated_date' },
        { name: 'count', alias: 'total_loans' },
        { name: 'created_count', alias: 'loans_created' },
        { name: 'updated_count', alias: 'loans_updated' },
        { name: 'renewalcount_sum', alias: 'total_renewals' },
      ],
    },
    // Borrower (User) data
    {
      joinPath: loan.users,
      includes: [
        { name: 'id', alias: 'borrower_id' },
        { name: 'username', alias: 'borrower_username' },
        { name: 'personal_firstname', alias: 'borrower_first_name' },
        { name: 'personal_lastname', alias: 'borrower_last_name' },
        { name: 'personal_email', alias: 'borrower_email' },
        { name: 'personal_phone', alias: 'borrower_phone' },
        { name: 'barcode', alias: 'borrower_barcode' },
        { name: 'active', alias: 'borrower_active' },
        { name: 'type', alias: 'borrower_type' },
        { name: 'enrollmentdate', alias: 'borrower_enrollment_date' },
        { name: 'expirationdate', alias: 'borrower_expiration_date' },
        { name: 'count', alias: 'total_borrowers' },
      ],
    },
    // Patron Group
    {
      joinPath: loan.users.groups,
      includes: [
        { name: 'group', alias: 'patron_group_name' },
        { name: 'desc', alias: 'patron_group_description' },
      ],
    },
    // Item data
    {
      joinPath: loan.item,
      includes: [
        { name: 'id', alias: 'item_id' },
        { name: 'hrid', alias: 'item_hrid' },
        { name: 'barcode', alias: 'item_barcode' },
        { name: 'status_name', alias: 'item_status' },
        { name: 'copynumber', alias: 'copy_number' },
        { name: 'metadata_createddate', alias: 'item_created_date' },
        { name: 'count', alias: 'total_items' },
      ],
    },
    // Material Type
    {
      joinPath: loan.item.material_type,
      includes: [{ name: 'name', alias: 'material_type' }],
    },
    // Loan Type
    {
      joinPath: loan.item.loan_type,
      includes: [{ name: 'name', alias: 'loan_type' }],
    },
    // Holdings data
    {
      joinPath: loan.item.holdings_record,
      includes: [
        { name: 'hrid', alias: 'holdings_hrid' },
        { name: 'callnumber', alias: 'call_number' },
      ],
    },
    // Call Number Type
    {
      joinPath: loan.item.holdings_record.call_number_type,
      includes: [{ name: 'name', alias: 'call_number_type' }],
    },
    // Location hierarchy
    {
      joinPath: loan.item.holdings_record.location,
      includes: [{ name: 'name', alias: 'location_name' }],
    },
    {
      joinPath: loan.item.holdings_record.location.loclibrary,
      includes: [{ name: 'name', alias: 'library_name' }],
    },
    {
      joinPath: loan.item.holdings_record.location.loccampus,
      includes: [{ name: 'name', alias: 'campus_name' }],
    },
    {
      joinPath: loan.item.holdings_record.location.locinstitution,
      includes: [{ name: 'name', alias: 'institution_name' }],
    },
    // Instance data
    {
      joinPath: loan.item.holdings_record.instance,
      includes: [
        { name: 'title', alias: 'title' },
        { name: 'hrid', alias: 'instance_hrid' },
        { name: 'contributors', alias: 'contributors' },
        { name: 'identifiers', alias: 'identifiers' },
        { name: 'subjects', alias: 'subjects' },
        { name: 'languages', alias: 'languages' },
      ],
    },
    // Instance Type
    {
      joinPath: loan.item.holdings_record.instance.instance_type,
      includes: [{ name: 'name', alias: 'resource_type' }],
    },
    // Instance Status
    {
      joinPath: loan.item.holdings_record.instance.instance_status,
      includes: [{ name: 'name', alias: 'resource_status' }],
    },
    // Service Points (for filtering and reference)
    {
      joinPath: service_point,
      includes: [
        { name: 'name', alias: 'service_point_name' },
        { name: 'code', alias: 'service_point_code' },
        { name: 'pickuplocation', alias: 'is_pickup_location' },
      ],
    },
    // Reference tables for filtering
    {
      joinPath: groups,
      includes: [
        { name: 'group', alias: 'patron_group_ref' },
        { name: 'desc', alias: 'patron_group_desc_ref' },
      ],
    },
    {
      joinPath: material_type,
      includes: [{ name: 'name', alias: 'material_type_ref' }],
    },
    {
      joinPath: loan_type,
      includes: [{ name: 'name', alias: 'loan_type_ref' }],
    },
    {
      joinPath: location,
      includes: [{ name: 'name', alias: 'location_ref' }],
    },
    {
      joinPath: loclibrary,
      includes: [{ name: 'name', alias: 'library_ref' }],
    },
  ],
});
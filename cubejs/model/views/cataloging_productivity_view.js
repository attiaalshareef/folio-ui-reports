view(`cataloging_productivity_view`, {
  cubes: [
    {
      joinPath: instance,
      includes: [
        'title',
        { name: 'hrid', alias: 'instance_hrid' },
        { name: 'creation_date', alias: 'instance_created_date' },
        { name: 'metadata_updateddate', alias: 'instance_updated_date' },
        { name: 'created_by', alias: 'instance_created_by' },
        { name: 'count', alias: 'instances_created' },
        { name: 'updated_count', alias: 'instances_updated' },
        { name: 'suppressed_count', alias: 'instances_suppressed' },
        { name: 'discovery_suppressed_count', alias: 'instances_discovery_suppressed' },
        { name: 'staff_suppressed_count', alias: 'instances_staff_suppressed' },
        'suppression_status',
        'discoverysuppress',
        'staffsuppress'
      ],
    },
    {
      joinPath: instance.users,
      includes: [
        { name: 'id', alias: 'staff_user_id' },
        { name: 'username', alias: 'staff_username' },
        { name: 'personal_firstname', alias: 'first_name' },
        { name: 'personal_lastname', alias: 'last_name' },
        { name: 'personal_email', alias: 'email' },
        { name: 'personal_phone', alias: 'phone' },
        { name: 'barcode', alias: 'staff_barcode' },
        'departments',
        'active',
        'type',
        { name: 'creation_date', alias: 'staff_created_date' },
        { name: 'count', alias: 'total_staff' },
      ],
    },
    {
      joinPath: holdings_record,
      includes: [
        { name: 'hrid', alias: 'holdings_hrid' },
        { name: 'count', alias: 'holdings_created' },
        { name: 'updated_count', alias: 'holdings_updated' },
      ],
    },
    {
      joinPath: holdings_record.users,
      includes: [{ name: 'username', alias: 'holdings_staff_username' }],
    },
    {
      joinPath: item,
      includes: [
        { name: 'hrid', alias: 'item_hrid' },
        'barcode',
        { name: 'count', alias: 'items_created' },
        { name: 'updated_count', alias: 'items_updated' },
      ],
    },
    {
      joinPath: item.users,
      includes: [{ name: 'username', alias: 'item_staff_username' }],
    },
  ],
});

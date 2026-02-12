cube(`cataloging_productivity`, {
  sql: `
    SELECT 
      u.jsonb->>'username' as staff_username,
      u.jsonb->'personal'->>'firstName' as first_name,
      u.jsonb->'personal'->>'lastName' as last_name,
      'instances' as record_type,
      i.jsonb->>'id' as record_id,
      i.jsonb->>'title' as title,
      i.jsonb->>'hrid' as hrid,
      i.creation_date,
      i.created_by
    FROM kware_mod_inventory_storage.instance i
    JOIN kware_mod_users.users u ON i.created_by::uuid = u.id
    WHERE i.created_by IS NOT NULL
    
    UNION ALL
    
    SELECT 
      u.jsonb->>'username' as staff_username,
      u.jsonb->'personal'->>'firstName' as first_name,
      u.jsonb->'personal'->>'lastName' as last_name,
      'holdings' as record_type,
      h.jsonb->>'id' as record_id,
      h.jsonb->>'hrid' as title,
      h.jsonb->>'hrid' as hrid,
      h.creation_date,
      h.created_by
    FROM kware_mod_inventory_storage.holdings_record h
    JOIN kware_mod_users.users u ON h.created_by::uuid = u.id
    WHERE h.created_by IS NOT NULL
    
    UNION ALL
    
    SELECT 
      u.jsonb->>'username' as staff_username,
      u.jsonb->'personal'->>'firstName' as first_name,
      u.jsonb->'personal'->>'lastName' as last_name,
      'items' as record_type,
      i.jsonb->>'id' as record_id,
      i.jsonb->>'barcode' as title,
      i.jsonb->>'hrid' as hrid,
      i.creation_date,
      i.created_by
    FROM kware_mod_inventory_storage.item i
    JOIN kware_mod_users.users u ON i.created_by::uuid = u.id
    WHERE i.created_by IS NOT NULL
  `,

  data_source: 'default',

  dimensions: {
    staff_username: {
      sql: 'staff_username',
      type: 'string',
      primary_key: true
    },
    first_name: {
      sql: 'first_name',
      type: 'string'
    },
    last_name: {
      sql: 'last_name',
      type: 'string'
    },
    record_type: {
      sql: 'record_type',
      type: 'string'
    },
    title: {
      sql: 'title',
      type: 'string'
    },
    hrid: {
      sql: 'hrid',
      type: 'string'
    },
    creation_date: {
      sql: 'DATE(creation_date)',
      type: 'time'
    }
  },

  measures: {
    instances_created: {
      sql: `CASE WHEN record_type = 'instances' THEN record_id END`,
      type: 'countDistinct',
      drillMembers: [title, hrid, creation_date]
    },
    holdings_created: {
      sql: `CASE WHEN record_type = 'holdings' THEN record_id END`,
      type: 'countDistinct',
      drillMembers: [title, hrid, creation_date]
    },
    items_created: {
      sql: `CASE WHEN record_type = 'items' THEN record_id END`,
      type: 'countDistinct',
      drillMembers: [title, hrid, creation_date]
    },
    total_records: {
      sql: 'record_id',
      type: 'countDistinct',
      drillMembers: [record_type, title, hrid, creation_date]
    }
  },

  pre_aggregations: {
    main: {
      measures: [instances_created, holdings_created, items_created, total_records],
      dimensions: [staff_username, first_name, last_name],
      timeDimension: creation_date,
      granularity: 'day',
      refreshKey: {
        every: '1 hour'
      }
    }
  }
});
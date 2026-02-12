cube(`hrid_settings`, {
  sql_table: `kware_mod_inventory_storage.hrid_settings`,

  data_source: `default`,

  joins: {
    users: {
      sql: `${CUBE}.created_by::uuid = ${users}.id OR (${CUBE}.jsonb->'metadata'->>'updatedByUserId')::uuid = ${users}.id`,
      relationship: `belongsTo`,
    },
  
  },

  dimensions: {
    id: {
      sql: `${CUBE}.jsonb->>'id'`,
      type: `string`,
      primary_key: true,
    },
    creation_date: {
      sql: `DATE(${CUBE}.creation_date)`,
      type: `time`,
    },
    created_by: {
      sql: `created_by`,
      type: `string`,
    },
    lock: {
      sql: `lock`,
      type: `boolean`,
    },
    items: {
      sql: `${CUBE}.jsonb->>'items'`,
      type: `string`,
    },
    items_prefix: {
      sql: `${CUBE}.jsonb->'items'->>'prefix'`,
      type: `string`,
    },
    items_startnumber: {
      sql: `${CUBE}.jsonb->'items'->>'startNumber'`,
      type: `number`,
    },
    holdings: {
      sql: `${CUBE}.jsonb->>'holdings'`,
      type: `string`,
    },
    holdings_prefix: {
      sql: `${CUBE}.jsonb->'holdings'->>'prefix'`,
      type: `string`,
    },
    holdings_startnumber: {
      sql: `${CUBE}.jsonb->'holdings'->>'startNumber'`,
      type: `number`,
    },
    metadata: {
      sql: `${CUBE}.jsonb->>'metadata'`,
      type: `string`,
    },
    metadata_createddate: {
      sql: `DATE((${CUBE}.jsonb->'metadata'->>'createdDate')::timestamp)`,
      type: `time`,
    },
    metadata_updateddate: {
      sql: `DATE((${CUBE}.jsonb->'metadata'->>'updatedDate')::timestamp)`,
      type: `time`,
    },
    metadata_createdbyuserid: {
      sql: `${CUBE}.jsonb->'metadata'->>'createdByUserId'`,
      type: `string`,
    },
    metadata_updatedbyuserid: {
      sql: `${CUBE}.jsonb->'metadata'->>'updatedByUserId'`,
      type: `string`,
    },
    instances: {
      sql: `${CUBE}.jsonb->>'instances'`,
      type: `string`,
    },
    instances_prefix: {
      sql: `${CUBE}.jsonb->'instances'->>'prefix'`,
      type: `string`,
    },
    instances_startnumber: {
      sql: `${CUBE}.jsonb->'instances'->>'startNumber'`,
      type: `number`,
    },
    commonretainleadingzeroes: {
      sql: `${CUBE}.jsonb->>'commonRetainLeadingZeroes'`,
      type: `boolean`,
    },
  
  },

  measures: {
    count: {
      type: `count`,
    },
    created_count: {
      sql: `CASE WHEN ${CUBE}.created_by IS NOT NULL THEN ${CUBE}.id END`,
      type: `countDistinct`,
    },
    updated_count: {
      sql: `CASE WHEN ${CUBE}.jsonb->'metadata'->>'updatedByUserId' IS NOT NULL THEN ${CUBE}.id END`,
      type: `countDistinct`,
    },
    items_startnumber_sum: {
      sql: `${CUBE}.jsonb->'items'->>'startNumber'`,
      type: `sum`,
    },
    holdings_startnumber_sum: {
      sql: `${CUBE}.jsonb->'holdings'->>'startNumber'`,
      type: `sum`,
    },
    instances_startnumber_sum: {
      sql: `${CUBE}.jsonb->'instances'->>'startNumber'`,
      type: `sum`,
    },
  
  },

  meta: {
    isReferenceTable: true,
    referenceType: `lookup`,
  
  },

  pre_aggregations: {
    // Pre-aggregation definitions go here.
    // Learn more in the documentation: https://cube.dev/docs/caching/pre-aggregations/getting-started
  },
});

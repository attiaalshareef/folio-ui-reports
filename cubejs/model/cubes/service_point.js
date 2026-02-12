cube(`service_point`, {
  sql_table: `kware_mod_inventory_storage.service_point`,

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
    code: {
      sql: `${CUBE}.jsonb->>'code'`,
      type: `string`,
    },
    name: {
      sql: `${CUBE}.jsonb->>'name'`,
      type: `string`,
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
    staffslips: {
      sql: `${CUBE}.jsonb->>'staffSlips'`,
      type: `string`,
    },
    pickuplocation: {
      sql: `${CUBE}.jsonb->>'pickupLocation'`,
      type: `boolean`,
    },
    discoverydisplayname: {
      sql: `${CUBE}.jsonb->>'discoveryDisplayName'`,
      type: `string`,
    },
    holdshelfexpiryperiod: {
      sql: `${CUBE}.jsonb->>'holdShelfExpiryPeriod'`,
      type: `string`,
    },
    holdshelfexpiryperiod_duration: {
      sql: `${CUBE}.jsonb->'holdShelfExpiryPeriod'->>'duration'`,
      type: `number`,
    },
    holdshelfexpiryperiod_intervalid: {
      sql: `${CUBE}.jsonb->'holdShelfExpiryPeriod'->>'intervalId'`,
      type: `string`,
    },
    holdshelfclosedlibrarydatemanagement: {
      sql: `${CUBE}.jsonb->>'holdShelfClosedLibraryDateManagement'`,
      type: `string`,
    },
    metadata_updatedbyuserid: {
      sql: `${CUBE}.jsonb->'metadata'->>'updatedByUserId'`,
      type: `string`,
    },
    shelvinglagtime: {
      sql: `${CUBE}.jsonb->>'shelvingLagTime'`,
      type: `number`,
      description: `Optional field (25% populated)`,
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
    holdshelfexpiryperiod_duration_sum: {
      sql: `${CUBE}.jsonb->'holdShelfExpiryPeriod'->>'duration'`,
      type: `sum`,
    },
    shelvinglagtime_sum: {
      sql: `${CUBE}.jsonb->>'shelvingLagTime'`,
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

cube(`groups`, {
  sql_table: `kware_mod_users.groups`,

  data_source: `default`,

  joins: {
    users: {
      sql: `${CUBE}.created_by::uuid = ${users}.id`,
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
    desc: {
      sql: `${CUBE}.jsonb->>'desc'`,
      type: `string`,
    },
    group: {
      sql: `${CUBE}.jsonb->>'group'`,
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
    expirationoffsetindays: {
      sql: `${CUBE}.jsonb->>'expirationOffsetInDays'`,
      type: `number`,
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
    expirationoffsetindays_sum: {
      sql: `${CUBE}.jsonb->>'expirationOffsetInDays'`,
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

cube(`loccampus`, {
  sql_table: `kware_mod_inventory_storage.loccampus`,

  data_source: `default`,

  joins: {
    locinstitution: {
      sql: `${CUBE}.institutionid = ${locinstitution}.id`,
      relationship: `belongsTo`,
    },
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
    institutionid: {
      sql: `${CUBE}.jsonb->>'institutionId'`,
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
    metadata_updatedbyuserid: {
      sql: `${CUBE}.jsonb->'metadata'->>'updatedByUserId'`,
      type: `string`,
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

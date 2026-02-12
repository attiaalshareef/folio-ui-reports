cube(`instance_format`, {
  sql_table: `kware_mod_inventory_storage.instance_format`,

  data_source: `default`,

  joins: {
    // No joins defined
  
  },

  dimensions: {
    id: {
      sql: `${CUBE}.jsonb->>'id'`,
      type: `string`,
      primary_key: true,
    },
    code: {
      sql: `${CUBE}.jsonb->>'code'`,
      type: `string`,
    },
    name: {
      sql: `${CUBE}.jsonb->>'name'`,
      type: `string`,
    },
    source: {
      sql: `${CUBE}.jsonb->>'source'`,
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
    readonly: {
      sql: `${CUBE}.jsonb->>'readOnly'`,
      type: `boolean`,
      description: `Optional field (2% populated)`,
    },
    metadata_createdbyuserid: {
      sql: `${CUBE}.jsonb->'metadata'->>'createdByUserId'`,
      type: `string`,
      description: `Optional field (3% populated)`,
    },
    metadata_updatedbyuserid: {
      sql: `${CUBE}.jsonb->'metadata'->>'updatedByUserId'`,
      type: `string`,
      description: `Optional field (3% populated)`,
    },
  
  },

  measures: {
    count: {
      type: `count`,
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

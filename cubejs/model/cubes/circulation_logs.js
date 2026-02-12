cube(`circulation_logs`, {
  sql_table: `kware_mod_audit.circulation_logs`,

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
    date: {
      sql: `DATE((${CUBE}.jsonb->>'date')::timestamp)`,
      type: `time`,
    },
    items: {
      sql: `${CUBE}.jsonb->>'items'`,
      type: `string`,
    },
    action: {
      sql: `${CUBE}.jsonb->>'action'`,
      type: `string`,
    },
    object: {
      sql: `${CUBE}.jsonb->>'object'`,
      type: `string`,
    },
    source: {
      sql: `${CUBE}.jsonb->>'source'`,
      type: `string`,
    },
    linktoids: {
      sql: `${CUBE}.jsonb->>'linkToIds'`,
      type: `string`,
    },
    linktoids_userid: {
      sql: `${CUBE}.jsonb->'linkToIds'->>'userId'`,
      type: `string`,
    },
    description: {
      sql: `${CUBE}.jsonb->>'description'`,
      type: `string`,
    },
    userbarcode: {
      sql: `${CUBE}.jsonb->>'userBarcode'`,
      type: `string`,
    },
    servicepointid: {
      sql: `${CUBE}.jsonb->>'servicePointId'`,
      type: `string`,
    },
    linktoids_requestid: {
      sql: `${CUBE}.jsonb->'linkToIds'->>'requestId'`,
      type: `string`,
      description: `Optional field (40% populated)`,
    },
  
  },

  measures: {
    count: {
      type: `count`,
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

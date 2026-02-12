cube(`internal_lock`, {
  sql_table: `kware_mod_users.internal_lock`,

  data_source: `default`,

  joins: {
    // No joins defined
  
  },

  dimensions: {
    lock_name: {
      sql: `lock_name`,
      type: `string`,
    },
    id: {
      sql: `${CUBE}.jsonb->>'id'`,
      type: `string`,
      primary_key: true,
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

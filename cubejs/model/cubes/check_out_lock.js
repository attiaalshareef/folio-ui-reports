cube(`check_out_lock`, {
  sql_table: `kware_mod_circulation_storage.check_out_lock`,

  data_source: `default`,

  joins: {
    // No joins defined
  
  },

  dimensions: {
    id: {
      sql: `id`,
      type: `string`,
      primary_key: true,
    },
    user_id: {
      sql: `user_id`,
      type: `string`,
    },
    creation_date: {
      sql: `DATE(${CUBE}.creation_date)`,
      type: `time`,
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

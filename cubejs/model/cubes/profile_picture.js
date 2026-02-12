cube(`profile_picture`, {
  sql_table: `kware_mod_users.profile_picture`,

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
    profile_picture_blob: {
      sql: `profile_picture_blob`,
      type: `string`,
    },
    hmac: {
      sql: `hmac`,
      type: `string`,
    },
    picture_details: {
      sql: `picture_details`,
      type: `string`,
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

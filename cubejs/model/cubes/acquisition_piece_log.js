cube(`acquisition_piece_log`, {
  sql_table: `kware_mod_audit.acquisition_piece_log`,

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
    action: {
      sql: `action`,
      type: `string`,
    },
    piece_id: {
      sql: `piece_id`,
      type: `string`,
    },
    user_id: {
      sql: `user_id`,
      type: `string`,
    },
    event_date: {
      sql: `DATE(${CUBE}.event_date)`,
      type: `time`,
    },
    action_date: {
      sql: `DATE(${CUBE}.action_date)`,
      type: `time`,
    },
    modified_content_snapshot: {
      sql: `modified_content_snapshot`,
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

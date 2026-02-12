cube(`outbox_event_log`, {
  sql_table: `kware_mod_users.outbox_event_log`,

  data_source: `default`,

  joins: {
    // No joins defined
  
  },

  dimensions: {
    event_id: {
      sql: `event_id`,
      type: `string`,
    },
    entity_type: {
      sql: `entity_type`,
      type: `string`,
    },
    action: {
      sql: `action`,
      type: `string`,
    },
    action_date: {
      sql: `DATE(${CUBE}.action_date)`,
      type: `time`,
    },
    payload: {
      sql: `payload`,
      type: `string`,
    },
    is_personal_data_changed: {
      sql: `is_personal_data_changed`,
      type: `boolean`,
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

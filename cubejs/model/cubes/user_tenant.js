cube(`user_tenant`, {
  sql_table: `kware_mod_users.user_tenant`,

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
    username: {
      sql: `username`,
      type: `string`,
    },
    tenant_id: {
      sql: `tenant_id`,
      type: `string`,
    },
    creation_date: {
      sql: `DATE(${CUBE}.creation_date)`,
      type: `time`,
    },
    central_tenant_id: {
      sql: `central_tenant_id`,
      type: `string`,
    },
    email: {
      sql: `email`,
      type: `string`,
    },
    mobile_phone_number: {
      sql: `mobile_phone_number`,
      type: `string`,
    },
    phone_number: {
      sql: `phone_number`,
      type: `string`,
    },
    barcode: {
      sql: `barcode`,
      type: `string`,
    },
    external_system_id: {
      sql: `external_system_id`,
      type: `string`,
    },
    consortium_id: {
      sql: `consortium_id`,
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

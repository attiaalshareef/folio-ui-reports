cube(`configuration`, {
  sql_table: `kware_mod_users.configuration`,

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
    configname: {
      sql: `${CUBE}.jsonb->>'configName'`,
      type: `string`,
    },
    creation_date: {
      sql: `DATE(${CUBE}.creation_date)`,
      type: `time`,
    },
    enabled: {
      sql: `${CUBE}.jsonb->>'enabled'`,
      type: `boolean`,
    },
    maxfilesize: {
      sql: `${CUBE}.jsonb->>'maxFileSize'`,
      type: `number`,
    },
    encryptionkey: {
      sql: `${CUBE}.jsonb->>'encryptionKey'`,
      type: `string`,
    },
    enabledobjectstorage: {
      sql: `${CUBE}.jsonb->>'enabledObjectStorage'`,
      type: `boolean`,
    },
  
  },

  measures: {
    count: {
      type: `count`,
    },
    maxfilesize_sum: {
      sql: `${CUBE}.jsonb->>'maxFileSize'`,
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

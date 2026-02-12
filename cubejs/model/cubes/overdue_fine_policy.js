cube(`overdue_fine_policy`, {
  sql_table: `kware_mod_feesfines.overdue_fine_policy`,

  data_source: `default`,

  joins: {
    users: {
      sql: `${CUBE}.created_by::uuid = ${users}.id`,
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
    countclosed: {
      sql: `${CUBE}.jsonb->>'countClosed'`,
      type: `boolean`,
    },
    description: {
      sql: `${CUBE}.jsonb->>'description'`,
      type: `string`,
    },
    maxoverduefine: {
      sql: `${CUBE}.jsonb->>'maxOverdueFine'`,
      type: `number`,
    },
    graceperiodrecall: {
      sql: `${CUBE}.jsonb->>'gracePeriodRecall'`,
      type: `boolean`,
    },
    forgiveoverduefine: {
      sql: `${CUBE}.jsonb->>'forgiveOverdueFine'`,
      type: `boolean`,
    },
    maxoverduerecallfine: {
      sql: `${CUBE}.jsonb->>'maxOverdueRecallFine'`,
      type: `number`,
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
    maxoverduefine_sum: {
      sql: `${CUBE}.jsonb->>'maxOverdueFine'`,
      type: `sum`,
    },
    maxoverduerecallfine_sum: {
      sql: `${CUBE}.jsonb->>'maxOverdueRecallFine'`,
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

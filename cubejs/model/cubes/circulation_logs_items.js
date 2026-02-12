cube(`circulation_logs_items`, {
  sql: `
    SELECT 
      (t.jsonb->>'id')::uuid as circulation_logs_id,
      elem->>'itemId' as itemId,
      elem->>'loanId' as loanId,
      elem->>'holdingId' as holdingId,
      elem->>'instanceId' as instanceId,
      elem->>'itemBarcode' as itemBarcode,
      elem_index as position
    FROM kware_mod_audit.circulation_logs t,
    jsonb_array_elements(t.jsonb->'items') WITH ORDINALITY AS arr(elem, elem_index)
    WHERE t.jsonb->'items' IS NOT NULL
      AND jsonb_array_length(t.jsonb->'items') > 0
  `,

  data_source: `default`,

  joins: {
    circulation_logs: {
      sql: `${CUBE}.circulation_logs_id = ${circulation_logs}.id`,
      relationship: `belongsTo`,
    },
  
  },

  dimensions: {
    circulation_logs_id: {
      sql: `circulation_logs_id`,
      type: `string`,
      primary_key: true,
    },
    position: {
      sql: `position`,
      type: `number`,
    },
    itemId: {
      sql: `itemId`,
      type: `string`,
    },
    loanId: {
      sql: `loanId`,
      type: `string`,
    },
    holdingId: {
      sql: `holdingId`,
      type: `string`,
    },
    instanceId: {
      sql: `instanceId`,
      type: `string`,
    },
    itemBarcode: {
      sql: `itemBarcode`,
      type: `string`,
    },
  
  },

  measures: {
    count: {
      type: `count`,
    },
    unique_circulation_logss: {
      sql: `circulation_logs_id`,
      type: `countDistinct`,
    },
  
  },

  pre_aggregations: {
    // Pre-aggregation definitions go here.
    // Learn more in the documentation: https://cube.dev/docs/caching/pre-aggregations/getting-started
  },
});

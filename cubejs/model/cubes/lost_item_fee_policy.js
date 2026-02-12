cube(`lost_item_fee_policy`, {
  sql_table: `kware_mod_feesfines.lost_item_fee_policy`,

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
    description: {
      sql: `${CUBE}.jsonb->>'description'`,
      type: `string`,
    },
    chargeamountitem: {
      sql: `${CUBE}.jsonb->>'chargeAmountItem'`,
      type: `string`,
    },
    chargeamountitem_amount: {
      sql: `${CUBE}.jsonb->'chargeAmountItem'->>'amount'`,
      type: `number`,
    },
    chargeamountitem_chargetype: {
      sql: `${CUBE}.jsonb->'chargeAmountItem'->>'chargeType'`,
      type: `string`,
    },
    lostitemreturned: {
      sql: `${CUBE}.jsonb->>'lostItemReturned'`,
      type: `string`,
    },
    replacementallowed: {
      sql: `${CUBE}.jsonb->>'replacementAllowed'`,
      type: `boolean`,
    },
    lostitemchargefeefine: {
      sql: `${CUBE}.jsonb->>'lostItemChargeFeeFine'`,
      type: `string`,
    },
    lostitemchargefeefine_duration: {
      sql: `${CUBE}.jsonb->'lostItemChargeFeeFine'->>'duration'`,
      type: `number`,
    },
    lostitemchargefeefine_intervalid: {
      sql: `${CUBE}.jsonb->'lostItemChargeFeeFine'->>'intervalId'`,
      type: `string`,
    },
    lostitemprocessingfee: {
      sql: `${CUBE}.jsonb->>'lostItemProcessingFee'`,
      type: `number`,
    },
    chargeamountitempatron: {
      sql: `${CUBE}.jsonb->>'chargeAmountItemPatron'`,
      type: `boolean`,
    },
    chargeamountitemsystem: {
      sql: `${CUBE}.jsonb->>'chargeAmountItemSystem'`,
      type: `boolean`,
    },
    replacementprocessingfee: {
      sql: `${CUBE}.jsonb->>'replacementProcessingFee'`,
      type: `number`,
    },
    replacedlostitemprocessingfee: {
      sql: `${CUBE}.jsonb->>'replacedLostItemProcessingFee'`,
      type: `boolean`,
    },
    returnedlostitemprocessingfee: {
      sql: `${CUBE}.jsonb->>'returnedLostItemProcessingFee'`,
      type: `boolean`,
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
    chargeamountitem_amount_sum: {
      sql: `${CUBE}.jsonb->'chargeAmountItem'->>'amount'`,
      type: `sum`,
    },
    lostitemchargefeefine_duration_sum: {
      sql: `${CUBE}.jsonb->'lostItemChargeFeeFine'->>'duration'`,
      type: `sum`,
    },
    lostitemprocessingfee_sum: {
      sql: `${CUBE}.jsonb->>'lostItemProcessingFee'`,
      type: `sum`,
    },
    replacementprocessingfee_sum: {
      sql: `${CUBE}.jsonb->>'replacementProcessingFee'`,
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

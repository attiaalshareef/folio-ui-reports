cube(`loan`, {
  sql_table: `kware_mod_circulation_storage.loan`,

  data_source: `default`,

  joins: {
    users: {
      sql: `${CUBE}.jsonb->>'userId' = ${users}.jsonb->>'id'`,
      relationship: `belongsTo`,
    },

    item: {
      sql: `${CUBE}.jsonb->>'itemId' = ${item}.jsonb->>'id'`,
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
    action: {
      sql: `${CUBE}.jsonb->>'action'`,
      type: `string`,
    },
    itemid: {
      sql: `${CUBE}.jsonb->>'itemId'`,
      type: `string`,
    },
    status: {
      sql: `${CUBE}.jsonb->>'status'`,
      type: `string`,
    },
    status_name: {
      sql: `${CUBE}.jsonb->'status'->>'name'`,
      type: `string`,
    },
    userid: {
      sql: `${CUBE}.jsonb->>'userId'`,
      type: `string`,
    },
    duedate: {
      sql: `DATE((${CUBE}.jsonb->>'dueDate')::timestamp)`,
      type: `time`,
    },
    loandate: {
      sql: `DATE((${CUBE}.jsonb->>'loanDate')::timestamp)`,
      type: `time`,
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
    itemstatus: {
      sql: `${CUBE}.jsonb->>'itemStatus'`,
      type: `string`,
    },
    renewalcount: {
      sql: `${CUBE}.jsonb->>'renewalCount'`,
      type: `number`,
    },
    returndate: {
      sql: `DATE((${CUBE}.jsonb->>'returnDate')::timestamp)`,
      type: `time`,
      description: `Optional field (33% populated)`,
    },
    proxyuserid: {
      sql: `${CUBE}.jsonb->>'proxyUserId'`,
      type: `string`,
      description: `Optional field (17% populated)`,
    },
    metadata_createdbyuserid: {
      sql: `${CUBE}.jsonb->'metadata'->>'createdByUserId'`,
      type: `string`,
      description: `Optional field (33% populated)`,
    },
    metadata_updatedbyuserid: {
      sql: `${CUBE}.jsonb->'metadata'->>'updatedByUserId'`,
      type: `string`,
      description: `Optional field (33% populated)`,
    },
    loanpolicyid: {
      sql: `${CUBE}.jsonb->>'loanPolicyId'`,
      type: `string`,
      description: `Optional field (17% populated)`,
    },
    lostitempolicyid: {
      sql: `${CUBE}.jsonb->>'lostItemPolicyId'`,
      type: `string`,
      description: `Optional field (17% populated)`,
    },
    systemreturndate: {
      sql: `DATE((${CUBE}.jsonb->>'systemReturnDate')::timestamp)`,
      type: `time`,
      description: `Optional field (17% populated)`,
    },
    overduefinepolicyid: {
      sql: `${CUBE}.jsonb->>'overdueFinePolicyId'`,
      type: `string`,
      description: `Optional field (17% populated)`,
    },
    checkinservicepointid: {
      sql: `${CUBE}.jsonb->>'checkinServicePointId'`,
      type: `string`,
      description: `Optional field (17% populated)`,
    },
    checkoutservicepointid: {
      sql: `${CUBE}.jsonb->>'checkoutServicePointId'`,
      type: `string`,
      description: `Optional field (17% populated)`,
    },
    patrongroupidatcheckout: {
      sql: `${CUBE}.jsonb->>'patronGroupIdAtCheckout'`,
      type: `string`,
      description: `Optional field (17% populated)`,
    },
    itemeffectivelocationidatcheckout: {
      sql: `${CUBE}.jsonb->>'itemEffectiveLocationIdAtCheckOut'`,
      type: `string`,
      description: `Optional field (17% populated)`,
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
    updated_count: {
      sql: `CASE WHEN ${CUBE}.jsonb->'metadata'->>'updatedByUserId' IS NOT NULL THEN ${CUBE}.id END`,
      type: `countDistinct`,
    },
    renewalcount_sum: {
      sql: `${CUBE}.jsonb->>'renewalCount'`,
      type: `sum`,
    },
  },

  pre_aggregations: {
    // Pre-aggregation definitions go here.
    // Learn more in the documentation: https://cube.dev/docs/caching/pre-aggregations/getting-started
  },
});

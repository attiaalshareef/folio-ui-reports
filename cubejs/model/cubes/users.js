cube(`users`, {
  sql_table: `kware_mod_users.users`,

  data_source: `default`,

  joins: {
    groups: {
      sql: `${CUBE}.patrongroup = ${groups}.id`,
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
    patrongroup: {
      sql: `${CUBE}.jsonb->>'patronGroup'`,
      type: `string`,
    },
    type: {
      sql: `${CUBE}.jsonb->>'type'`,
      type: `string`,
    },
    active: {
      sql: `${CUBE}.jsonb->>'active'`,
      type: `boolean`,
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
    personal: {
      sql: `${CUBE}.jsonb->>'personal'`,
      type: `string`,
    },
    personal_lastname: {
      sql: `${CUBE}.jsonb->'personal'->>'lastName'`,
      type: `string`,
    },
    personal_addresses: {
      sql: `${CUBE}.jsonb->'personal'->>'addresses'`,
      type: `string`,
    },
    proxyfor: {
      sql: `${CUBE}.jsonb->>'proxyFor'`,
      type: `string`,
    },
    username: {
      sql: `${CUBE}.jsonb->>'username'`,
      type: `string`,
    },
    createddate: {
      sql: `DATE((${CUBE}.jsonb->>'createdDate')::timestamp)`,
      type: `time`,
    },
    departments: {
      sql: `${CUBE}.jsonb->>'departments'`,
      type: `string`,
    },
    updateddate: {
      sql: `DATE((${CUBE}.jsonb->>'updatedDate')::timestamp)`,
      type: `time`,
    },
    barcode: {
      sql: `${CUBE}.jsonb->>'barcode'`,
      type: `string`,
    },
    personal_email: {
      sql: `${CUBE}.jsonb->'personal'->>'email'`,
      type: `string`,
    },
    personal_phone: {
      sql: `${CUBE}.jsonb->'personal'->>'phone'`,
      type: `string`,
    },
    personal_firstname: {
      sql: `${CUBE}.jsonb->'personal'->>'firstName'`,
      type: `string`,
    },
    personal_middlename: {
      sql: `${CUBE}.jsonb->'personal'->>'middleName'`,
      type: `string`,
    },
    personal_dateofbirth: {
      sql: `DATE((${CUBE}.jsonb->'personal'->>'dateOfBirth')::timestamp)`,
      type: `time`,
    },
    personal_mobilephone: {
      sql: `${CUBE}.jsonb->'personal'->>'mobilePhone'`,
      type: `string`,
    },
    personal_preferredcontacttypeid: {
      sql: `${CUBE}.jsonb->'personal'->>'preferredContactTypeId'`,
      type: `string`,
    },
    enrollmentdate: {
      sql: `DATE((${CUBE}.jsonb->>'enrollmentDate')::timestamp)`,
      type: `time`,
    },
    expirationdate: {
      sql: `DATE((${CUBE}.jsonb->>'expirationDate')::timestamp)`,
      type: `time`,
    },
    metadata_updatedbyuserid: {
      sql: `${CUBE}.jsonb->'metadata'->>'updatedByUserId'`,
      type: `string`,
      description: `Optional field (4% populated)`,
    },
    customfields: {
      sql: `${CUBE}.jsonb->>'customFields'`,
      type: `string`,
      description: `Optional field (2% populated)`,
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
  
  },

  pre_aggregations: {
    // Pre-aggregation definitions go here.
    // Learn more in the documentation: https://cube.dev/docs/caching/pre-aggregations/getting-started
  },
});

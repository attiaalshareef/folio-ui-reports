cube(`users_personal_addresses`, {
  sql: `
    SELECT 
      (t.jsonb->>'id')::uuid as users_id,
      elem->>'city' as city,
      elem->>'region' as region,
      elem->>'countryId' as countryId,
      elem->>'postalCode' as postalCode,
      elem->>'addressLine1' as addressLine1,
      elem->>'addressTypeId' as addressTypeId,
      elem->>'primaryAddress' as primaryAddress,
      elem_index as position
    FROM kware_mod_users.users t,
    jsonb_array_elements(t.jsonb->'personal_addresses') WITH ORDINALITY AS arr(elem, elem_index)
    WHERE t.jsonb->'personal_addresses' IS NOT NULL
      AND jsonb_array_length(t.jsonb->'personal_addresses') > 0
  `,

  data_source: `default`,

  joins: {
    users: {
      sql: `${CUBE}.users_id = ${users}.id`,
      relationship: `belongsTo`,
    },
  
  },

  dimensions: {
    users_id: {
      sql: `users_id`,
      type: `string`,
      primary_key: true,
    },
    position: {
      sql: `position`,
      type: `number`,
    },
    city: {
      sql: `city`,
      type: `string`,
    },
    region: {
      sql: `region`,
      type: `string`,
    },
    countryId: {
      sql: `countryId`,
      type: `string`,
    },
    postalCode: {
      sql: `postalCode`,
      type: `string`,
    },
    addressLine1: {
      sql: `addressLine1`,
      type: `string`,
    },
    addressTypeId: {
      sql: `addressTypeId`,
      type: `string`,
    },
    primaryAddress: {
      sql: `primaryAddress`,
      type: `boolean`,
    },
  
  },

  measures: {
    count: {
      type: `count`,
    },
    unique_userss: {
      sql: `users_id`,
      type: `countDistinct`,
    },
  
  },

  pre_aggregations: {
    // Pre-aggregation definitions go here.
    // Learn more in the documentation: https://cube.dev/docs/caching/pre-aggregations/getting-started
  },
});

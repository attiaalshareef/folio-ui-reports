cube(`instance_identifiers`, {
  sql: `
    SELECT 
      (t.jsonb->>'id')::uuid as instance_id,
      elem->>'value' as value,
      elem->>'identifierTypeId' as identifierTypeId,
      elem_index as position
    FROM kware_mod_inventory_storage.instance t,
    jsonb_array_elements(t.jsonb->'identifiers') WITH ORDINALITY AS arr(elem, elem_index)
    WHERE t.jsonb->'identifiers' IS NOT NULL
      AND jsonb_array_length(t.jsonb->'identifiers') > 0
  `,

  data_source: `default`,

  joins: {
    instance: {
      sql: `${CUBE}.instance_id = ${instance}.id`,
      relationship: `belongsTo`,
    },
    identifier_type: {
      sql: `${CUBE}.identifierTypeId::uuid = ${identifier_type}.id`,
      relationship: `belongsTo`,
    },
  
  },

  dimensions: {
    instance_id: {
      sql: `instance_id`,
      type: `string`,
      primary_key: true,
    },
    position: {
      sql: `position`,
      type: `number`,
    },
    value: {
      sql: `value`,
      type: `string`,
    },
    identifierTypeId: {
      sql: `identifierTypeId`,
      type: `string`,
    },
  
  },

  measures: {
    count: {
      type: `count`,
    },
    unique_instances: {
      sql: `instance_id`,
      type: `countDistinct`,
    },
  
  },

  pre_aggregations: {
    // Pre-aggregation definitions go here.
    // Learn more in the documentation: https://cube.dev/docs/caching/pre-aggregations/getting-started
  },
});

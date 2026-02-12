cube(`instance_classifications`, {
  sql: `
    SELECT 
      (t.jsonb->>'id')::uuid as instance_id,
      elem->>'classificationNumber' as classificationNumber,
      elem->>'classificationTypeId' as classificationTypeId,
      elem_index as position
    FROM kware_mod_inventory_storage.instance t,
    jsonb_array_elements(t.jsonb->'classifications') WITH ORDINALITY AS arr(elem, elem_index)
    WHERE t.jsonb->'classifications' IS NOT NULL
      AND jsonb_array_length(t.jsonb->'classifications') > 0
  `,

  data_source: `default`,

  joins: {
    instance: {
      sql: `${CUBE}.instance_id = ${instance}.id`,
      relationship: `belongsTo`,
    },
    classification_type: {
      sql: `${CUBE}.classificationTypeId::uuid = ${classification_type}.id`,
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
    classificationNumber: {
      sql: `classificationNumber`,
      type: `string`,
    },
    classificationTypeId: {
      sql: `classificationTypeId`,
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

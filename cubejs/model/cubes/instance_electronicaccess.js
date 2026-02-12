cube(`instance_electronicaccess`, {
  sql: `
    SELECT 
      (t.jsonb->>'id')::uuid as instance_id,
      elem->>'uri' as uri,
      elem->>'linkText' as linkText,
      elem->>'publicNote' as publicNote,
      elem->>'materialsSpecification' as materialsSpecification,
      elem_index as position
    FROM kware_mod_inventory_storage.instance t,
    jsonb_array_elements(t.jsonb->'electronicaccess') WITH ORDINALITY AS arr(elem, elem_index)
    WHERE t.jsonb->'electronicaccess' IS NOT NULL
      AND jsonb_array_length(t.jsonb->'electronicaccess') > 0
  `,

  data_source: `default`,

  joins: {
    instance: {
      sql: `${CUBE}.instance_id = ${instance}.id`,
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
    uri: {
      sql: `uri`,
      type: `string`,
    },
    linkText: {
      sql: `linkText`,
      type: `string`,
    },
    publicNote: {
      sql: `publicNote`,
      type: `string`,
    },
    materialsSpecification: {
      sql: `materialsSpecification`,
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

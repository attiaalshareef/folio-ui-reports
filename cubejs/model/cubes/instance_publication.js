cube(`instance_publication`, {
  sql: `
    SELECT 
      (t.jsonb->>'id')::uuid as instance_id,
      elem->>'place' as place,
      elem->>'publisher' as publisher,
      elem->>'dateOfPublication' as dateOfPublication,
      elem->>'role' as role,
      elem_index as position
    FROM kware_mod_inventory_storage.instance t,
    jsonb_array_elements(t.jsonb->'publication') WITH ORDINALITY AS arr(elem, elem_index)
    WHERE t.jsonb->'publication' IS NOT NULL
      AND jsonb_array_length(t.jsonb->'publication') > 0
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
    place: {
      sql: `place`,
      type: `string`,
    },
    publisher: {
      sql: `publisher`,
      type: `string`,
    },
    dateOfPublication: {
      sql: `dateOfPublication`,
      type: `string`,
    },
    role: {
      sql: `role`,
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

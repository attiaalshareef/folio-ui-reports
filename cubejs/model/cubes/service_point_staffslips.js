cube(`service_point_staffslips`, {
  sql: `
    SELECT 
      (t.jsonb->>'id')::uuid as service_point_id,
      elem->>'id' as id,
      elem->>'printByDefault' as printByDefault,
      elem_index as position
    FROM kware_mod_inventory_storage.service_point t,
    jsonb_array_elements(t.jsonb->'staffslips') WITH ORDINALITY AS arr(elem, elem_index)
    WHERE t.jsonb->'staffslips' IS NOT NULL
      AND jsonb_array_length(t.jsonb->'staffslips') > 0
  `,

  data_source: `default`,

  joins: {
    service_point: {
      sql: `${CUBE}.service_point_id = ${service_point}.id`,
      relationship: `belongsTo`,
    },
  
  },

  dimensions: {
    service_point_id: {
      sql: `service_point_id`,
      type: `string`,
      primary_key: true,
    },
    position: {
      sql: `position`,
      type: `number`,
    },
    id: {
      sql: `id`,
      type: `string`,
    },
    printByDefault: {
      sql: `printByDefault`,
      type: `boolean`,
    },
  
  },

  measures: {
    count: {
      type: `count`,
    },
    unique_service_points: {
      sql: `service_point_id`,
      type: `countDistinct`,
    },
  
  },

  pre_aggregations: {
    // Pre-aggregation definitions go here.
    // Learn more in the documentation: https://cube.dev/docs/caching/pre-aggregations/getting-started
  },
});

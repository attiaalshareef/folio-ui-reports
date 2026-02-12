cube(`item_electronicaccess`, {
  sql: `
    SELECT 
      (t.jsonb->>'id')::uuid as item_id,
      elem->>'uri' as uri,
      elem->>'linkText' as linkText,
      elem->>'publicNote' as publicNote,
      elem->>'relationshipId' as relationshipId,
      elem->>'materialsSpecification' as materialsSpecification,
      elem_index as position
    FROM kware_mod_inventory_storage.item t,
    jsonb_array_elements(t.jsonb->'electronicaccess') WITH ORDINALITY AS arr(elem, elem_index)
    WHERE t.jsonb->'electronicaccess' IS NOT NULL
      AND jsonb_array_length(t.jsonb->'electronicaccess') > 0
  `,

  data_source: `default`,

  joins: {
    item: {
      sql: `${CUBE}.item_id = ${item}.id`,
      relationship: `belongsTo`,
    },
  
  },

  dimensions: {
    item_id: {
      sql: `item_id`,
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
    relationshipId: {
      sql: `relationshipId`,
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
    unique_items: {
      sql: `item_id`,
      type: `countDistinct`,
    },
  
  },

  pre_aggregations: {
    // Pre-aggregation definitions go here.
    // Learn more in the documentation: https://cube.dev/docs/caching/pre-aggregations/getting-started
  },
});

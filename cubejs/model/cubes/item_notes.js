cube(`item_notes`, {
  sql: `
    SELECT 
      (t.jsonb->>'id')::uuid as item_id,
      elem->>'note' as note,
      elem->>'staffOnly' as staffOnly,
      elem->>'itemNoteTypeId' as itemNoteTypeId,
      elem_index as position
    FROM kware_mod_inventory_storage.item t,
    jsonb_array_elements(t.jsonb->'notes') WITH ORDINALITY AS arr(elem, elem_index)
    WHERE t.jsonb->'notes' IS NOT NULL
      AND jsonb_array_length(t.jsonb->'notes') > 0
  `,

  data_source: `default`,

  joins: {
    item: {
      sql: `${CUBE}.item_id = ${item}.id`,
      relationship: `belongsTo`,
    },
    item_note_type: {
      sql: `${CUBE}.itemNoteTypeId::uuid = ${item_note_type}.id`,
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
    note: {
      sql: `note`,
      type: `string`,
    },
    staffOnly: {
      sql: `staffOnly`,
      type: `boolean`,
    },
    itemNoteTypeId: {
      sql: `itemNoteTypeId`,
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

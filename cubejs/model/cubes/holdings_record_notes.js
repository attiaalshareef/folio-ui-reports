cube(`holdings_record_notes`, {
  sql: `
    SELECT 
      (t.jsonb->>'id')::uuid as holdings_record_id,
      elem->>'note' as note,
      elem->>'staffOnly' as staffOnly,
      elem->>'holdingsNoteTypeId' as holdingsNoteTypeId,
      elem_index as position
    FROM kware_mod_inventory_storage.holdings_record t,
    jsonb_array_elements(t.jsonb->'notes') WITH ORDINALITY AS arr(elem, elem_index)
    WHERE t.jsonb->'notes' IS NOT NULL
      AND jsonb_array_length(t.jsonb->'notes') > 0
  `,

  data_source: `default`,

  joins: {
    holdings_record: {
      sql: `${CUBE}.holdings_record_id = ${holdings_record}.id`,
      relationship: `belongsTo`,
    },
    holdings_note_type: {
      sql: `${CUBE}.holdingsNoteTypeId::uuid = ${holdings_note_type}.id`,
      relationship: `belongsTo`,
    },
  
  },

  dimensions: {
    holdings_record_id: {
      sql: `holdings_record_id`,
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
    holdingsNoteTypeId: {
      sql: `holdingsNoteTypeId`,
      type: `string`,
    },
  
  },

  measures: {
    count: {
      type: `count`,
    },
    unique_holdings_records: {
      sql: `holdings_record_id`,
      type: `countDistinct`,
    },
  
  },

  pre_aggregations: {
    // Pre-aggregation definitions go here.
    // Learn more in the documentation: https://cube.dev/docs/caching/pre-aggregations/getting-started
  },
});

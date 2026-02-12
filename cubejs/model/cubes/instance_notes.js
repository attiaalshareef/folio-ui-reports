cube(`instance_notes`, {
  sql: `
    SELECT 
      (t.jsonb->>'id')::uuid as instance_id,
      elem->>'note' as note,
      elem->>'staffOnly' as staffOnly,
      elem->>'instanceNoteTypeId' as instanceNoteTypeId,
      elem_index as position
    FROM kware_mod_inventory_storage.instance t,
    jsonb_array_elements(t.jsonb->'notes') WITH ORDINALITY AS arr(elem, elem_index)
    WHERE t.jsonb->'notes' IS NOT NULL
      AND jsonb_array_length(t.jsonb->'notes') > 0
  `,

  data_source: `default`,

  joins: {
    instance: {
      sql: `${CUBE}.instance_id = ${instance}.id`,
      relationship: `belongsTo`,
    },
    instance_note_type: {
      sql: `${CUBE}.instanceNoteTypeId::uuid = ${instance_note_type}.id`,
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
    note: {
      sql: `note`,
      type: `string`,
    },
    staffOnly: {
      sql: `staffOnly`,
      type: `boolean`,
    },
    instanceNoteTypeId: {
      sql: `instanceNoteTypeId`,
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

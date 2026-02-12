cube(`holdings_record_electronicaccess`, {
  sql: `
    SELECT 
      (t.jsonb->>'id')::uuid as holdings_record_id,
      elem->>'uri' as uri,
      elem->>'relationshipId' as relationshipId,
      elem->>'materialsSpecification' as materialsSpecification,
      elem->>'publicNote' as publicNote,
      elem_index as position
    FROM kware_mod_inventory_storage.holdings_record t,
    jsonb_array_elements(t.jsonb->'electronicaccess') WITH ORDINALITY AS arr(elem, elem_index)
    WHERE t.jsonb->'electronicaccess' IS NOT NULL
      AND jsonb_array_length(t.jsonb->'electronicaccess') > 0
  `,

  data_source: `default`,

  joins: {
    holdings_record: {
      sql: `${CUBE}.holdings_record_id = ${holdings_record}.id`,
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
    uri: {
      sql: `uri`,
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
    publicNote: {
      sql: `publicNote`,
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

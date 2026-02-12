cube(`instance_contributors`, {
  sql: `
    SELECT 
      (t.jsonb->>'id')::uuid as instance_id,
      elem->>'name' as name,
      elem->>'contributorNameTypeId' as contributorNameTypeId,
      elem->>'contributorTypeId' as contributorTypeId,
      elem->>'contributorTypeText' as contributorTypeText,
      elem->>'primary' as primary,
      elem_index as position
    FROM kware_mod_inventory_storage.instance t,
    jsonb_array_elements(t.jsonb->'contributors') WITH ORDINALITY AS arr(elem, elem_index)
    WHERE t.jsonb->'contributors' IS NOT NULL
      AND jsonb_array_length(t.jsonb->'contributors') > 0
  `,

  data_source: `default`,

  joins: {
    instance: {
      sql: `${CUBE}.instance_id = ${instance}.id`,
      relationship: `belongsTo`,
    },
    contributor_name_type: {
      sql: `${CUBE}.contributorNameTypeId::uuid = ${contributor_name_type}.id`,
      relationship: `belongsTo`,
    },
    contributor_type: {
      sql: `${CUBE}.contributorTypeId::uuid = ${contributor_type}.id`,
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
    name: {
      sql: `name`,
      type: `string`,
    },
    contributorNameTypeId: {
      sql: `contributorNameTypeId`,
      type: `string`,
    },
    contributorTypeId: {
      sql: `contributorTypeId`,
      type: `string`,
    },
    contributorTypeText: {
      sql: `contributorTypeText`,
      type: `string`,
    },
    primary: {
      sql: `primary`,
      type: `boolean`,
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

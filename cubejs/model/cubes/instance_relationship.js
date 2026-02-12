cube(`instance_relationship`, {
  sql_table: `kware_mod_inventory_storage.instance_relationship`,

  data_source: `default`,

  joins: {
    instance_relationship_type: {
      sql: `${CUBE}.instancerelationshiptypeid = ${instance_relationship_type}.id`,
      relationship: `belongsTo`,
    },
    instance: {
      sql: `${CUBE}.superinstanceid = ${instance}.id`,
      relationship: `belongsTo`,
    },
    users: {
      sql: `${CUBE}.created_by::uuid = ${users}.id`,
      relationship: `belongsTo`,
    },
  
  },

  dimensions: {
    id: {
      sql: `${CUBE}.jsonb->>'id'`,
      type: `string`,
      primary_key: true,
    },
    creation_date: {
      sql: `DATE(${CUBE}.creation_date)`,
      type: `time`,
    },
    created_by: {
      sql: `created_by`,
      type: `string`,
    },
    superinstanceid: {
      sql: `${CUBE}.jsonb->>'superInstanceId'`,
      type: `string`,
    },
    subinstanceid: {
      sql: `${CUBE}.jsonb->>'subInstanceId'`,
      type: `string`,
    },
    instancerelationshiptypeid: {
      sql: `${CUBE}.jsonb->>'instanceRelationshipTypeId'`,
      type: `string`,
    },
    metadata: {
      sql: `${CUBE}.jsonb->>'metadata'`,
      type: `string`,
    },
    metadata_createddate: {
      sql: `DATE((${CUBE}.jsonb->'metadata'->>'createdDate')::timestamp)`,
      type: `time`,
    },
    metadata_updateddate: {
      sql: `DATE((${CUBE}.jsonb->'metadata'->>'updatedDate')::timestamp)`,
      type: `time`,
    },
  
  },

  measures: {
    count: {
      type: `count`,
    },
    created_count: {
      sql: `CASE WHEN ${CUBE}.created_by IS NOT NULL THEN ${CUBE}.id END`,
      type: `countDistinct`,
    },
  
  },

  meta: {
    isReferenceTable: true,
    referenceType: `lookup`,
  
  },

  pre_aggregations: {
    // Pre-aggregation definitions go here.
    // Learn more in the documentation: https://cube.dev/docs/caching/pre-aggregations/getting-started
  },
});

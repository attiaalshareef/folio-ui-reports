cube(`location`, {
  sql_table: `kware_mod_inventory_storage.location`,

  data_source: `default`,

  joins: {
    locinstitution: {
      sql: `${CUBE}.institutionid = ${locinstitution}.id`,
      relationship: `belongsTo`,
    },
    loccampus: {
      sql: `${CUBE}.campusid = ${loccampus}.id`,
      relationship: `belongsTo`,
    },
    loclibrary: {
      sql: `${CUBE}.libraryid = ${loclibrary}.id`,
      relationship: `belongsTo`,
    },
    users: {
      sql: `${CUBE}.created_by::uuid = ${users}.id`,
      relationship: `belongsTo`,
    },
    service_point: {
      sql: `EXISTS (
        SELECT 1 FROM jsonb_array_elements_text(${CUBE}.jsonb->'servicePointIds') AS elem 
        WHERE elem IS NOT NULL 
          AND elem != '' 
          AND elem::uuid = ${service_point}.id
      )`,
      relationship: `hasMany`,
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
    institutionid: {
      sql: `${CUBE}.jsonb->>'institutionId'`,
      type: `string`,
    },
    campusid: {
      sql: `${CUBE}.jsonb->>'campusId'`,
      type: `string`,
    },
    libraryid: {
      sql: `${CUBE}.jsonb->>'libraryId'`,
      type: `string`,
    },
    code: {
      sql: `${CUBE}.jsonb->>'code'`,
      type: `string`,
    },
    name: {
      sql: `${CUBE}.jsonb->>'name'`,
      type: `string`,
    },
    isactive: {
      sql: `${CUBE}.jsonb->>'isActive'`,
      type: `boolean`,
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
    servicepoints: {
      sql: `${CUBE}.jsonb->>'servicePoints'`,
      type: `string`,
    },
    servicepointids: {
      sql: `${CUBE}.jsonb->>'servicePointIds'`,
      type: `string`,
    },
    primaryservicepoint: {
      sql: `${CUBE}.jsonb->>'primaryServicePoint'`,
      type: `string`,
    },
    description: {
      sql: `${CUBE}.jsonb->>'description'`,
      type: `string`,
      description: `Optional field (14% populated)`,
    },
    discoverydisplayname: {
      sql: `${CUBE}.jsonb->>'discoveryDisplayName'`,
      type: `string`,
      description: `Optional field (14% populated)`,
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

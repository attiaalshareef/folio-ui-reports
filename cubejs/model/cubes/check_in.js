cube(`check_in`, {
  sql_table: `kware_mod_circulation_storage.check_in`,

  data_source: `default`,

  joins: {
    // Join for item to access item details
    item: {
      sql: `${CUBE}.jsonb->>'itemId' = ${item}.jsonb->>'id'`,
      relationship: `belongsTo`,
    },

    // Join for service point
    service_point: {
      sql: `${CUBE}.jsonb->>'servicePointId' = ${service_point}.jsonb->>'id'`,
      relationship: `belongsTo`,
    },

    // Join for location
    location: {
      sql: `${CUBE}.jsonb->>'itemLocationId' = ${location}.jsonb->>'id'`,
      relationship: `belongsTo`,
    },

    // Join for staff user (performedByUserId) to access user details
    users: {
      sql: `${CUBE}.jsonb->>'performedByUserId' = ${users}.jsonb->>'id'`,
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
    itemid: {
      sql: `${CUBE}.jsonb->>'itemId'`,
      type: `string`,
    },
    itemlocationid: {
      sql: `${CUBE}.jsonb->>'itemLocationId'`,
      type: `string`,
    },
    servicepointid: {
      sql: `${CUBE}.jsonb->>'servicePointId'`,
      type: `string`,
    },
    occurreddatetime: {
      sql: `DATE((${CUBE}.jsonb->>'occurredDateTime')::timestamp)`,
      type: `time`,
    },
    requestqueuesize: {
      sql: `${CUBE}.jsonb->>'requestQueueSize'`,
      type: `number`,
    },
    performedbyuserid: {
      sql: `${CUBE}.jsonb->>'performedByUserId'`,
      type: `string`,
    },
    itemstatuspriortocheckin: {
      sql: `${CUBE}.jsonb->>'itemStatusPriorToCheckIn'`,
      type: `string`,
    },

    // Staff information (from created_by only)
    created_by_staff_name: {
      sql: `(SELECT CONCAT(jsonb->>'personal_firstName', ' ', jsonb->>'personal_lastName') FROM kware_mod_users.users WHERE id = ${CUBE}.created_by)`,
      type: `string`,
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
    requestqueuesize_sum: {
      sql: `(${CUBE}.jsonb->>'requestQueueSize')::integer`,
      type: `sum`,
    },
  },

  pre_aggregations: {
    // Pre-aggregation definitions go here.
    // Learn more in the documentation: https://cube.dev/docs/caching/pre-aggregations/getting-started
  },
});

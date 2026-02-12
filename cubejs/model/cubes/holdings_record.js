cube(`holdings_record`, {
  sql_table: `kware_mod_inventory_storage.holdings_record`,

  data_source: `default`,

  joins: {
    call_number_type: {
      sql: `${CUBE}.callnumbertypeid = ${call_number_type}.id`,
      relationship: `belongsTo`,
    },
    location: {
      sql: `${CUBE}.temporarylocationid = ${location}.id`,
      relationship: `belongsTo`,
    },
    holdings_type: {
      sql: `${CUBE}.holdingstypeid = ${holdings_type}.id`,
      relationship: `belongsTo`,
    },
    instance: {
      sql: `${CUBE}.instanceid = ${instance}.id`,
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
    instanceid: {
      sql: `${CUBE}.jsonb->>'instanceId'`,
      type: `string`,
    },
    permanentlocationid: {
      sql: `${CUBE}.jsonb->>'permanentLocationId'`,
      type: `string`,
    },
    temporarylocationid: {
      sql: `temporarylocationid`,
      type: `string`,
    },
    effectivelocationid: {
      sql: `${CUBE}.jsonb->>'effectiveLocationId'`,
      type: `string`,
    },
    holdingstypeid: {
      sql: `${CUBE}.jsonb->>'holdingsTypeId'`,
      type: `string`,
      description: `Optional field (24% populated)`,
    },
    callnumbertypeid: {
      sql: `${CUBE}.jsonb->>'callNumberTypeId'`,
      type: `string`,
      description: `Optional field (19% populated)`,
    },
    illpolicyid: {
      sql: `${CUBE}.jsonb->>'illPolicyId'`,
      type: `string`,
      description: `Optional field (5% populated)`,
    },
    sourceid: {
      sql: `${CUBE}.jsonb->>'sourceId'`,
      type: `string`,
      description: `Optional field (38% populated)`,
    },
    hrid: {
      sql: `${CUBE}.jsonb->>'hrid'`,
      type: `string`,
    },
    notes: {
      sql: `${CUBE}.jsonb->>'notes'`,
      type: `string`,
    },
    version: {
      sql: `${CUBE}.jsonb->>'_version'`,
      type: `number`,
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
    formerids: {
      sql: `${CUBE}.jsonb->>'formerIds'`,
      type: `string`,
    },
    electronicaccess: {
      sql: `${CUBE}.jsonb->>'electronicAccess'`,
      type: `string`,
    },
    holdingsstatements: {
      sql: `${CUBE}.jsonb->>'holdingsStatements'`,
      type: `string`,
    },
    statisticalcodeids: {
      sql: `${CUBE}.jsonb->>'statisticalCodeIds'`,
      type: `string`,
    },
    administrativenotes: {
      sql: `${CUBE}.jsonb->>'administrativeNotes'`,
      type: `string`,
    },
    holdingsstatementsforindexes: {
      sql: `${CUBE}.jsonb->>'holdingsStatementsForIndexes'`,
      type: `string`,
    },
    holdingsstatementsforsupplements: {
      sql: `${CUBE}.jsonb->>'holdingsStatementsForSupplements'`,
      type: `string`,
    },
    callnumber: {
      sql: `${CUBE}.jsonb->>'callNumber'`,
      type: `string`,
    },
    shelvingtitle: {
      sql: `${CUBE}.jsonb->>'shelvingTitle'`,
      type: `string`,
      description: `Optional field (5% populated)`,
    },
    copynumber: {
      sql: `${CUBE}.jsonb->>'copyNumber'`,
      type: `string`,
      description: `Optional field (5% populated)`,
    },
    receiptstatus: {
      sql: `${CUBE}.jsonb->>'receiptStatus'`,
      type: `string`,
      description: `Optional field (5% populated)`,
    },
    retentionpolicy: {
      sql: `${CUBE}.jsonb->>'retentionPolicy'`,
      type: `string`,
      description: `Optional field (5% populated)`,
    },
    acquisitionmethod: {
      sql: `${CUBE}.jsonb->>'acquisitionMethod'`,
      type: `string`,
      description: `Optional field (5% populated)`,
    },
    callnumberprefix: {
      sql: `${CUBE}.jsonb->>'callNumberPrefix'`,
      type: `string`,
      description: `Optional field (14% populated)`,
    },
  
  },

  measures: {
    count: {
      type: `count`,
      drillMembers: [hrid, callnumber, creation_date, metadata_createddate]
    },
    created_count: {
      sql: `CASE WHEN ${CUBE}.created_by IS NOT NULL THEN ${CUBE}.id END`,
      type: `countDistinct`,
      drillMembers: [hrid, callnumber, creation_date, metadata_createddate, location.name, call_number_type.name]
    },
    updated_count: {
      sql: `CASE WHEN ${CUBE}.jsonb->'metadata'->>'updatedByUserId' IS NOT NULL THEN ${CUBE}.id END`,
      type: `countDistinct`,
      drillMembers: [hrid, callnumber, metadata_updateddate, location.name, call_number_type.name]
    },
    version_sum: {
      sql: `${CUBE}.jsonb->>'_version'`,
      type: `sum`,
    },
  
  },

  pre_aggregations: {
    main: {
      measures: [count, created_count, updated_count],
      dimensions: [created_by],
      timeDimension: creation_date,
      granularity: 'day',
      refreshKey: {
        every: '2 hours'
      }
    },
    by_location: {
      measures: [count],
      dimensions: [location.name, call_number_type.name],
      refreshKey: {
        every: '4 hours'
      }
    }
  },
});

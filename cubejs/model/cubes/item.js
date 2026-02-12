cube(`item`, {
  sql_table: `kware_mod_inventory_storage.item`,

  data_source: `default`,

  joins: {
    location: {
      sql: `${CUBE}.temporarylocationid = ${location}.id`,
      relationship: `belongsTo`,
    },
    holdings_record: {
      sql: `${CUBE}.holdingsrecordid = ${holdings_record}.id`,
      relationship: `belongsTo`,
    },
    material_type: {
      sql: `${CUBE}.materialtypeid = ${material_type}.id`,
      relationship: `belongsTo`,
    },
    loan_type: {
      sql: `${CUBE}.temporaryloantypeid = ${loan_type}.id`,
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
    holdingsrecordid: {
      sql: `${CUBE}.jsonb->>'holdingsRecordId'`,
      type: `string`,
    },
    permanentloantypeid: {
      sql: `${CUBE}.jsonb->>'permanentLoanTypeId'`,
      type: `string`,
    },
    temporaryloantypeid: {
      sql: `${CUBE}.jsonb->>'temporaryLoanTypeId'`,
      type: `string`,
      description: `Optional field (16% populated)`,
    },
    materialtypeid: {
      sql: `${CUBE}.jsonb->>'materialTypeId'`,
      type: `string`,
    },
    permanentlocationid: {
      sql: `${CUBE}.jsonb->>'permanentLocationId'`,
      type: `string`,
      description: `Optional field (8% populated)`,
    },
    temporarylocationid: {
      sql: `${CUBE}.jsonb->>'temporaryLocationId'`,
      type: `string`,
      description: `Optional field (12% populated)`,
    },
    effectivelocationid: {
      sql: `${CUBE}.jsonb->>'effectiveLocationId'`,
      type: `string`,
    },
    hrid: {
      sql: `${CUBE}.jsonb->>'hrid'`,
      type: `string`,
    },
    notes: {
      sql: `${CUBE}.jsonb->>'notes'`,
      type: `string`,
    },
    status: {
      sql: `${CUBE}.jsonb->>'status'`,
      type: `string`,
    },
    status_date: {
      sql: `DATE((${CUBE}.jsonb->'status'->>'date')::timestamp)`,
      type: `time`,
    },
    status_name: {
      sql: `${CUBE}.jsonb->'status'->>'name'`,
      type: `string`,
    },
    barcode: {
      sql: `${CUBE}.jsonb->>'barcode'`,
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
    yearcaption: {
      sql: `${CUBE}.jsonb->>'yearCaption'`,
      type: `string`,
    },
    circulationnotes: {
      sql: `${CUBE}.jsonb->>'circulationNotes'`,
      type: `string`,
    },
    electronicaccess: {
      sql: `${CUBE}.jsonb->>'electronicAccess'`,
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
    effectiveshelvingorder: {
      sql: `${CUBE}.jsonb->>'effectiveShelvingOrder'`,
      type: `string`,
    },
    effectivecallnumbercomponents: {
      sql: `${CUBE}.jsonb->>'effectiveCallNumberComponents'`,
      type: `string`,
    },
    effectivecallnumbercomponents_callnumber: {
      sql: `${CUBE}.jsonb->'effectiveCallNumberComponents'->>'callNumber'`,
      type: `string`,
    },
    chronology: {
      sql: `${CUBE}.jsonb->>'chronology'`,
      type: `string`,
      description: `Optional field (32% populated)`,
    },
    enumeration: {
      sql: `${CUBE}.jsonb->>'enumeration'`,
      type: `string`,
      description: `Optional field (36% populated)`,
    },
    copynumber: {
      sql: `${CUBE}.jsonb->>'copyNumber'`,
      type: `string`,
      description: `Optional field (48% populated)`,
    },
    numberofpieces: {
      sql: `${CUBE}.jsonb->>'numberOfPieces'`,
      type: `string`,
      description: `Optional field (12% populated)`,
    },
    itemlevelcallnumber: {
      sql: `${CUBE}.jsonb->>'itemLevelCallNumber'`,
      type: `string`,
      description: `Optional field (8% populated)`,
    },
    effectivecallnumbercomponents_typeid: {
      sql: `${CUBE}.jsonb->'effectiveCallNumberComponents'->>'typeId'`,
      type: `string`,
      description: `Optional field (12% populated)`,
    },
    tags: {
      sql: `${CUBE}.jsonb->>'tags'`,
      type: `string`,
      description: `Optional field (8% populated)`,
    },
    tags_taglist: {
      sql: `${CUBE}.jsonb->'tags'->>'tagList'`,
      type: `string`,
      description: `Optional field (8% populated)`,
    },
    effectivecallnumbercomponents_prefix: {
      sql: `${CUBE}.jsonb->'effectiveCallNumberComponents'->>'prefix'`,
      type: `string`,
      description: `Optional field (4% populated)`,
    },
    metadata_updatedbyuserid: {
      sql: `${CUBE}.jsonb->'metadata'->>'updatedByUserId'`,
      type: `string`,
      description: `Optional field (16% populated)`,
    },
    lastcheckin: {
      sql: `${CUBE}.jsonb->>'lastCheckIn'`,
      type: `string`,
      description: `Optional field (4% populated)`,
    },
    lastcheckin_datetime: {
      sql: `DATE((${CUBE}.jsonb->'lastCheckIn'->>'dateTime')::timestamp)`,
      type: `time`,
      description: `Optional field (4% populated)`,
    },
    lastcheckin_staffmemberid: {
      sql: `${CUBE}.jsonb->'lastCheckIn'->>'staffMemberId'`,
      type: `string`,
      description: `Optional field (4% populated)`,
    },
    lastcheckin_servicepointid: {
      sql: `${CUBE}.jsonb->'lastCheckIn'->>'servicePointId'`,
      type: `string`,
      description: `Optional field (4% populated)`,
    },
    intransitdestinationservicepointid: {
      sql: `${CUBE}.jsonb->>'inTransitDestinationServicePointId'`,
      type: `string`,
      description: `Optional field (4% populated)`,
    },
  
  },

  measures: {
    count: {
      type: `count`,
      drillMembers: [hrid, barcode, creation_date, metadata_createddate]
    },
    created_count: {
      sql: `CASE WHEN ${CUBE}.created_by IS NOT NULL THEN ${CUBE}.id END`,
      type: `countDistinct`,
      drillMembers: [hrid, barcode, creation_date, metadata_createddate, status_name, material_type.name, loan_type.name]
    },
    updated_count: {
      sql: `CASE WHEN ${CUBE}.jsonb->'metadata'->>'updatedByUserId' IS NOT NULL THEN ${CUBE}.id END`,
      type: `countDistinct`,
      drillMembers: [hrid, barcode, metadata_updateddate, status_name, material_type.name, loan_type.name]
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
    by_status_type: {
      measures: [count],
      dimensions: [status_name, material_type.name],
      refreshKey: {
        every: '4 hours'
      }
    }
  },
});

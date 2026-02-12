cube(`instance`, {
  sql_table: `kware_mod_inventory_storage.instance`,

  data_source: `default`,

  joins: {
    instance_status: {
      sql: `${CUBE}.instancestatusid = ${instance_status}.id AND ${CUBE}.instancestatusid IS NOT NULL AND ${CUBE}.instancestatusid != ''`,
      relationship: `belongsTo`,
    },
    instance_type: {
      sql: `(${CUBE}.jsonb->>'instanceTypeId')::uuid = ${instance_type}.id AND ${CUBE}.jsonb->>'instanceTypeId' IS NOT NULL AND ${CUBE}.jsonb->>'instanceTypeId' != ''`,
      relationship: `belongsTo`,
    },
    mode_of_issuance: {
      sql: `(${CUBE}.jsonb->>'modeOfIssuanceId')::uuid = ${mode_of_issuance}.id AND ${CUBE}.jsonb->>'modeOfIssuanceId' IS NOT NULL AND ${CUBE}.jsonb->>'modeOfIssuanceId' != ''`,
      relationship: `belongsTo`,
    },
    users: {
      sql: `${CUBE}.created_by::uuid = ${users}.id AND ${CUBE}.created_by IS NOT NULL AND ${CUBE}.created_by != ''`,
      relationship: `belongsTo`,
    },
  },

  dimensions: {
    // Primary key
    id: {
      sql: `${CUBE}.jsonb->>'id'`,
      type: `string`,
      primary_key: true,
    },

    // Foreign keys for joins
    instancestatusid: {
      sql: `instancestatusid`,
      type: `string`,
    },
    instancetypeid: {
      sql: `${CUBE}.jsonb->>'instanceTypeId'`,
      type: `string`,
    },
    modeofissuanceid: {
      sql: `${CUBE}.jsonb->>'modeOfIssuanceId'`,
      type: `string`,
    },
    created_by: {
      sql: `created_by`,
      type: `string`,
    },

    // Basic bibliographic information
    title: {
      sql: `${CUBE}.jsonb->>'title'`,
      type: `string`,
    },
    hrid: {
      sql: `${CUBE}.jsonb->>'hrid'`,
      type: `string`,
    },
    indextitle: {
      sql: `${CUBE}.jsonb->>'indexTitle'`,
      type: `string`,
    },
    source: {
      sql: `${CUBE}.jsonb->>'source'`,
      type: `string`,
    },

    // Contributors and identifiers
    contributors: {
      sql: `(SELECT string_agg(value->>'name', ', ') FROM jsonb_array_elements(${CUBE}.jsonb->'contributors') AS value)`,
      type: `string`,
    },
    identifiers: {
      sql: `(SELECT string_agg(value->>'value', ', ') FROM jsonb_array_elements(${CUBE}.jsonb->'identifiers') AS value)`,
      type: `string`,
    },

    // Subjects and classifications
    subjects: {
      sql: `(SELECT string_agg(value->>'value', ', ') FROM jsonb_array_elements(${CUBE}.jsonb->'subjects') AS value)`,
      type: `string`,
    },
    classifications: {
      sql: `(SELECT string_agg(value->>'classificationNumber', ', ') FROM jsonb_array_elements(${CUBE}.jsonb->'classifications') AS value)`,
      type: `string`,
    },

    // Languages and content
    languages: {
      sql: `(SELECT string_agg(value, ', ') FROM jsonb_array_elements_text(${CUBE}.jsonb->'languages') AS value)`,
      type: `string`,
    },
    nature_of_content_list: {
      sql: `(
        SELECT string_agg(nct.jsonb->>'name', ', ') 
        FROM jsonb_array_elements_text(${CUBE}.jsonb->'natureOfContentTermIds') AS nct_id
        LEFT JOIN kware_mod_inventory_storage.nature_of_content_term nct ON nct_id::uuid = nct.id
        WHERE nct_id IS NOT NULL AND nct_id != '' AND nct.jsonb->>'name' IS NOT NULL
      )`,
      type: `string`,
    },

    // Publication information
    publication_info: {
      sql: `(
        SELECT string_agg(
          CONCAT(
            COALESCE(value->>'publisher', ''), 
            CASE WHEN value->>'dateOfPublication' IS NOT NULL 
                 THEN ' (' || (value->>'dateOfPublication') || ')' 
                 ELSE '' END
          ), 
          '; '
        )
        FROM jsonb_array_elements(${CUBE}.jsonb->'publication') AS value
      )`,
      type: `string`,
    },
    publicationrange: {
      sql: `${CUBE}.jsonb->>'publicationRange'`,
      type: `string`,
    },
    publicationfrequency: {
      sql: `${CUBE}.jsonb->>'publicationFrequency'`,
      type: `string`,
    },
    publicationperiod: {
      sql: `${CUBE}.jsonb->>'publicationPeriod'`,
      type: `string`,
    },
    publicationperiod_start: {
      sql: `${CUBE}.jsonb->'publicationPeriod'->>'start'`,
      type: `number`,
    },
    publicationperiod_end: {
      sql: `${CUBE}.jsonb->'publicationPeriod'->>'end'`,
      type: `number`,
    },

    // Series and editions
    series_list: {
      sql: `(
        SELECT string_agg(value, '; ') 
        FROM jsonb_array_elements_text(${CUBE}.jsonb->'series') AS value
      )`,
      type: `string`,
    },
    editions_list: {
      sql: `(
        SELECT string_agg(value, '; ') 
        FROM jsonb_array_elements_text(${CUBE}.jsonb->'editions') AS value
      )`,
      type: `string`,
    },

    // Alternative titles
    alternative_titles_list: {
      sql: `(
        SELECT string_agg(value->>'alternativeTitle', '; ') 
        FROM jsonb_array_elements(${CUBE}.jsonb->'alternativeTitles') AS value
      )`,
      type: `string`,
    },

    // Physical descriptions and formats
    physicaldescriptions: {
      sql: `(
        SELECT string_agg(value, '; ') 
        FROM jsonb_array_elements_text(${CUBE}.jsonb->'physicalDescriptions') AS value
      )`,
      type: `string`,
    },
    instance_formats_list: {
      sql: `(
        SELECT string_agg(fmt.jsonb->>'name', ', ') 
        FROM jsonb_array_elements_text(${CUBE}.jsonb->'instanceFormatIds') AS fmt_id
        LEFT JOIN kware_mod_inventory_storage.instance_format fmt ON fmt_id::uuid = fmt.id
        WHERE fmt_id IS NOT NULL AND fmt_id != '' AND fmt.jsonb->>'name' IS NOT NULL
      )`,
      type: `string`,
    },

    // Electronic access
    electronic_access_urls: {
      sql: `(
        SELECT string_agg(value->>'uri', '; ') 
        FROM jsonb_array_elements(${CUBE}.jsonb->'electronicAccess') AS value
        WHERE value->>'uri' IS NOT NULL
      )`,
      type: `string`,
    },

    // Statistical codes
    statistical_codes_list: {
      sql: `(
        SELECT string_agg(sc.jsonb->>'name', ', ') 
        FROM jsonb_array_elements_text(${CUBE}.jsonb->'statisticalCodeIds') AS sc_id
        LEFT JOIN kware_mod_inventory_storage.statistical_code sc ON sc_id::uuid = sc.id
        WHERE sc_id IS NOT NULL AND sc_id != '' AND sc.jsonb->>'name' IS NOT NULL
      )`,
      type: `string`,
    },

    // Notes and administrative
    notes: {
      sql: `(SELECT string_agg(value->>'note', ' | ') FROM jsonb_array_elements(${CUBE}.jsonb->'notes') AS value)`,
      type: `string`,
    },
    notes_with_types: {
      sql: `(
        SELECT string_agg(
          CONCAT(
            COALESCE(nt.jsonb->>'name', 'Unknown Type'), 
            ': ', 
            note_elem->>'note'
          ), 
          ' | '
        )
        FROM jsonb_array_elements(${CUBE}.jsonb->'notes') AS note_elem
        LEFT JOIN kware_mod_inventory_storage.instance_note_type nt 
          ON (note_elem->>'instanceNoteTypeId')::uuid = nt.id
        WHERE note_elem->>'instanceNoteTypeId' IS NOT NULL AND note_elem->>'instanceNoteTypeId' != ''
      )`,
      type: `string`,
    },
    staff_only_notes: {
      sql: `(
        SELECT string_agg(value->>'note', ' | ') 
        FROM jsonb_array_elements(${CUBE}.jsonb->'notes') AS value 
        WHERE (value->>'staffOnly')::boolean = true
      )`,
      type: `string`,
    },
    administrativenotes: {
      sql: `(
        SELECT string_agg(value, ' | ') 
        FROM jsonb_array_elements_text(${CUBE}.jsonb->'administrativeNotes') AS value
      )`,
      type: `string`,
    },

    // Status and suppression
    discoverysuppress: {
      sql: `${CUBE}.jsonb->>'discoverySuppress'`,
      type: `boolean`,
    },
    staffsuppress: {
      sql: `${CUBE}.jsonb->>'staffSuppress'`,
      type: `boolean`,
    },
    suppression_status: {
      sql: `CASE 
        WHEN (${CUBE}.jsonb->>'discoverySuppress')::boolean = true THEN 'Discovery Suppressed'
        WHEN (${CUBE}.jsonb->>'staffSuppress')::boolean = true THEN 'Staff Suppressed'
        ELSE 'Not Suppressed'
      END`,
      type: `string`,
    },
    previouslyheld: {
      sql: `${CUBE}.jsonb->>'previouslyHeld'`,
      type: `boolean`,
    },

    // Tags and metadata
    tags: {
      sql: `${CUBE}.jsonb->'tags'->>'tagList'`,
      type: `string`,
    },
    mode_of_issuance_name: {
      sql: `(
        SELECT moi.jsonb->>'name' 
        FROM kware_mod_inventory_storage.mode_of_issuance moi 
        WHERE moi.id = (${CUBE}.jsonb->>'modeOfIssuanceId')::uuid
          AND ${CUBE}.jsonb->>'modeOfIssuanceId' IS NOT NULL 
          AND ${CUBE}.jsonb->>'modeOfIssuanceId' != ''
      )`,
      type: `string`,
    },

    // Date fields
    creation_date: {
      sql: `DATE(${CUBE}.creation_date)`,
      type: `time`,
    },
    complete_updated_date: {
      sql: `DATE(${CUBE}.complete_updated_date)`,
      type: `time`,
    },
    metadata_createddate: {
      sql: `DATE((${CUBE}.jsonb->'metadata'->>'createdDate')::timestamp)`,
      type: `time`,
    },
    metadata_updateddate: {
      sql: `DATE((${CUBE}.jsonb->'metadata'->>'updatedDate')::timestamp)`,
      type: `time`,
    },
    catalogeddate: {
      sql: `DATE((${CUBE}.jsonb->>'catalogedDate')::timestamp)`,
      type: `time`,
    },
    statusupdateddate: {
      sql: `DATE((${CUBE}.jsonb->>'statusUpdatedDate')::timestamp)`,
      type: `time`,
    },

    // Count dimensions
    subjects_count: {
      sql: `jsonb_array_length(${CUBE}.jsonb->'subjects')`,
      type: `number`,
    },
    identifiers_count: {
      sql: `jsonb_array_length(${CUBE}.jsonb->'identifiers')`,
      type: `number`,
    },
    contributors_count: {
      sql: `jsonb_array_length(${CUBE}.jsonb->'contributors')`,
      type: `number`,
    },
    notes_count: {
      sql: `jsonb_array_length(${CUBE}.jsonb->'notes')`,
      type: `number`,
    },
  },

  measures: {
    // Basic counts
    count: {
      type: `count`,
      drillMembers: [title, hrid, creation_date, metadata_createddate],
    },

    // Activity-based counts
    created_count: {
      sql: `CASE WHEN ${CUBE}.created_by IS NOT NULL THEN ${CUBE}.id END`,
      type: `countDistinct`,
      drillMembers: [
        title,
        hrid,
        creation_date,
        metadata_createddate,
        instance_type.name,
        instance_status.name,
      ],
    },
    updated_count: {
      sql: `CASE WHEN ${CUBE}.jsonb->'metadata'->>'updatedByUserId' IS NOT NULL THEN ${CUBE}.id END`,
      type: `countDistinct`,
      drillMembers: [
        title,
        hrid,
        metadata_updateddate,
        instance_type.name,
        instance_status.name,
      ],
    },

    // Suppression counts
    discovery_suppressed_count: {
      sql: `CASE WHEN (${CUBE}.jsonb->>'discoverySuppress')::boolean = true AND ${CUBE}.created_by IS NOT NULL THEN ${CUBE}.id END`,
      type: `countDistinct`,
      drillMembers: [title, hrid, creation_date, discoverysuppress],
    },
    staff_suppressed_count: {
      sql: `CASE WHEN (${CUBE}.jsonb->>'staffSuppress')::boolean = true AND ${CUBE}.created_by IS NOT NULL THEN ${CUBE}.id END`,
      type: `countDistinct`,
      drillMembers: [title, hrid, creation_date, staffsuppress],
    },
    suppressed_count: {
      sql: `CASE WHEN ((${CUBE}.jsonb->>'discoverySuppress')::boolean = true OR (${CUBE}.jsonb->>'staffSuppress')::boolean = true) AND ${CUBE}.created_by IS NOT NULL THEN ${CUBE}.id END`,
      type: `countDistinct`,
      drillMembers: [title, hrid, creation_date, suppression_status],
    },

    // Publication period sums
    publicationperiod_start_sum: {
      sql: `${CUBE}.jsonb->'publicationPeriod'->>'start'`,
      type: `sum`,
    },
    publicationperiod_end_sum: {
      sql: `${CUBE}.jsonb->'publicationPeriod'->>'end'`,
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
        every: '2 hours',
      },
    },
    by_type_status: {
      measures: [count, suppressed_count],
      dimensions: [instance_type.name, instance_status.name],
      refreshKey: {
        every: '4 hours',
      },
    },
    monthly_summary: {
      measures: [count, created_count, updated_count, suppressed_count],
      timeDimension: creation_date,
      granularity: 'month',
      refreshKey: {
        every: '1 day',
      },
    },
  },
});

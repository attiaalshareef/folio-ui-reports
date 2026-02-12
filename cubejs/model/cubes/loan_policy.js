cube(`loan_policy`, {
  sql_table: `kware_mod_circulation_storage.loan_policy`,

  data_source: `default`,

  joins: {
    fixed_due_date_schedule: {
      sql: `${CUBE}.renewalspolicy_alternatefixedduedatescheduleid = ${fixed_due_date_schedule}.id`,
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
    loanspolicy_fixedduedatescheduleid: {
      sql: `loanspolicy_fixedduedatescheduleid`,
      type: `string`,
    },
    renewalspolicy_alternatefixedduedatescheduleid: {
      sql: `renewalspolicy_alternatefixedduedatescheduleid`,
      type: `string`,
    },
    name: {
      sql: `${CUBE}.jsonb->>'name'`,
      type: `string`,
    },
    loanable: {
      sql: `${CUBE}.jsonb->>'loanable'`,
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
    renewable: {
      sql: `${CUBE}.jsonb->>'renewable'`,
      type: `boolean`,
    },
    description: {
      sql: `${CUBE}.jsonb->>'description'`,
      type: `string`,
    },
    loanspolicy: {
      sql: `${CUBE}.jsonb->>'loansPolicy'`,
      type: `string`,
    },
    loanspolicy_period: {
      sql: `${CUBE}.jsonb->'loansPolicy'->>'period'`,
      type: `string`,
    },
    loanspolicy_period_duration: {
      sql: `jsonb_extract_path_text(${CUBE}.jsonb, 'loansPolicy', 'period', 'duration')`,
      type: `number`,
    },
    loanspolicy_period_intervalid: {
      sql: `jsonb_extract_path_text(${CUBE}.jsonb, 'loansPolicy', 'period', 'intervalId')`,
      type: `string`,
    },
    loanspolicy_profileid: {
      sql: `${CUBE}.jsonb->'loansPolicy'->>'profileId'`,
      type: `string`,
    },
    loanspolicy_graceperiod: {
      sql: `${CUBE}.jsonb->'loansPolicy'->>'gracePeriod'`,
      type: `string`,
    },
    loanspolicy_graceperiod_duration: {
      sql: `jsonb_extract_path_text(${CUBE}.jsonb, 'loansPolicy', 'gracePeriod', 'duration')`,
      type: `number`,
    },
    loanspolicy_graceperiod_intervalid: {
      sql: `jsonb_extract_path_text(${CUBE}.jsonb, 'loansPolicy', 'gracePeriod', 'intervalId')`,
      type: `string`,
    },
    loanspolicy_closedlibraryduedatemanagementid: {
      sql: `${CUBE}.jsonb->'loansPolicy'->>'closedLibraryDueDateManagementId'`,
      type: `string`,
    },
    renewalspolicy: {
      sql: `${CUBE}.jsonb->>'renewalsPolicy'`,
      type: `string`,
    },
    renewalspolicy_period: {
      sql: `${CUBE}.jsonb->'renewalsPolicy'->>'period'`,
      type: `string`,
    },
    renewalspolicy_period_duration: {
      sql: `jsonb_extract_path_text(${CUBE}.jsonb, 'renewalsPolicy', 'period', 'duration')`,
      type: `number`,
    },
    renewalspolicy_period_intervalid: {
      sql: `jsonb_extract_path_text(${CUBE}.jsonb, 'renewalsPolicy', 'period', 'intervalId')`,
      type: `string`,
    },
    renewalspolicy_unlimited: {
      sql: `${CUBE}.jsonb->'renewalsPolicy'->>'unlimited'`,
      type: `boolean`,
    },
    renewalspolicy_renewfromid: {
      sql: `${CUBE}.jsonb->'renewalsPolicy'->>'renewFromId'`,
      type: `string`,
    },
    renewalspolicy_differentperiod: {
      sql: `${CUBE}.jsonb->'renewalsPolicy'->>'differentPeriod'`,
      type: `boolean`,
    },
    requestmanagement: {
      sql: `${CUBE}.jsonb->>'requestManagement'`,
      type: `string`,
    },
    requestmanagement_recalls: {
      sql: `${CUBE}.jsonb->'requestManagement'->>'recalls'`,
      type: `string`,
    },
    requestmanagement_recalls_recallreturninterval: {
      sql: `jsonb_extract_path_text(${CUBE}.jsonb, 'requestManagement', 'recalls', 'recallReturnInterval')`,
      type: `string`,
    },
    requestmanagement_recalls_recallreturninterval_duration: {
      sql: `jsonb_extract_path_text(${CUBE}.jsonb, 'requestManagement', 'recalls', 'recallReturnInterval', 'duration')`,
      type: `number`,
    },
    requestmanagement_recalls_recallreturninterval_intervalid: {
      sql: `jsonb_extract_path_text(${CUBE}.jsonb, 'requestManagement', 'recalls', 'recallReturnInterval', 'intervalId')`,
      type: `string`,
    },
    requestmanagement_recalls_minimumguaranteedloanperiod: {
      sql: `jsonb_extract_path_text(${CUBE}.jsonb, 'requestManagement', 'recalls', 'minimumGuaranteedLoanPeriod')`,
      type: `string`,
    },
    requestmanagement_recalls_minimumguaranteedloanperiod_duration: {
      sql: `jsonb_extract_path_text(${CUBE}.jsonb, 'requestManagement', 'recalls', 'minimumGuaranteedLoanPeriod', 'duration')`,
      type: `number`,
    },
    requestmanagement_recalls_minimumguaranteedloanperiod_intervalid: {
      sql: `jsonb_extract_path_text(${CUBE}.jsonb, 'requestManagement', 'recalls', 'minimumGuaranteedLoanPeriod', 'intervalId')`,
      type: `string`,
    },
    requestmanagement_recalls_allowrecallstoextendoverdueloans: {
      sql: `jsonb_extract_path_text(${CUBE}.jsonb, 'requestManagement', 'recalls', 'allowRecallsToExtendOverdueLoans')`,
      type: `boolean`,
    },
    renewalspolicy_numberallowed: {
      sql: `${CUBE}.jsonb->'renewalsPolicy'->>'numberAllowed'`,
      type: `number`,
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
    loanspolicy_period_duration_sum: {
      sql: `jsonb_extract_path_text(${CUBE}.jsonb, 'loansPolicy', 'period', 'duration')`,
      type: `sum`,
    },
    loanspolicy_graceperiod_duration_sum: {
      sql: `jsonb_extract_path_text(${CUBE}.jsonb, 'loansPolicy', 'gracePeriod', 'duration')`,
      type: `sum`,
    },
    renewalspolicy_period_duration_sum: {
      sql: `jsonb_extract_path_text(${CUBE}.jsonb, 'renewalsPolicy', 'period', 'duration')`,
      type: `sum`,
    },
    requestmanagement_recalls_recallreturninterval_duration_sum: {
      sql: `jsonb_extract_path_text(${CUBE}.jsonb, 'requestManagement', 'recalls', 'recallReturnInterval', 'duration')`,
      type: `sum`,
    },
    requestmanagement_recalls_minimumguaranteedloanperiod_duration_sum: {
      sql: `jsonb_extract_path_text(${CUBE}.jsonb, 'requestManagement', 'recalls', 'minimumGuaranteedLoanPeriod', 'duration')`,
      type: `sum`,
    },
    renewalspolicy_numberallowed_sum: {
      sql: `${CUBE}.jsonb->'renewalsPolicy'->>'numberAllowed'`,
      type: `sum`,
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

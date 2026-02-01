import reportTypes from './ReportsTypes';

/* eslint-disable import/prefer-default-export */
export const filtersConfigs = (intl) => {
  const data = [
    {
      id: 'privacy-type',
      label: intl.formatMessage({
        id: 'ui-reports.filters.privacyType',
        defaultMessage: 'Privacy Type',
      }),
      initialStatus: true,
      separator: false,
      values: [
        {
          label: intl.formatMessage({
            id: 'ui-reports.filters.privacyType.public',
            defaultMessage: 'Public',
          }),
          value: 'public',
        },
        {
          label: intl.formatMessage({
            id: 'ui-reports.filters.privacyType.private',
            defaultMessage: 'Private',
          }),
          value: 'private',
        },
      ],
    },
    {
      id: 'report-status',
      label: intl.formatMessage({
        id: 'ui-reports.filters.status',
        defaultMessage: 'Status',
      }),
      initialStatus: true,
      separator: true,
      values: [
        {
          label: intl.formatMessage({
            id: 'ui-reports.filters.status.active',
            defaultMessage: 'Active',
          }),
          value: 'active',
        },
        {
          label: intl.formatMessage({
            id: 'ui-reports.filters.status.inactive',
            defaultMessage: 'Inactive',
          }),
          value: 'inactive',
        },
      ],
    },
    // {
    //   id: 'report-type',
    //   label: intl.formatMessage({
    //     id: 'ui-reports.filters.reportType',
    //     defaultMessage: 'Report Type'
    //   }),
    //   initialStatus: true,
    //   separator: true,
    //   values: reportTypes.map(report => ({
    //     label: intl.formatMessage({
    //       id: `ui-reports.reportTypes.label.${report.value}`,
    //       defaultMessage: report.name
    //     }),
    //     value: report.value
    //   }))
    // },
    {
      id: 'report-category',
      label: intl.formatMessage({
        id: 'ui-reports.filters.category',
        defaultMessage: 'Category',
      }),
      initialStatus: true,
      separator: true,
      values: [],
    },
    {
      id: 'date-created',
      label: intl.formatMessage({
        id: 'ui-reports.filters.dateCreated',
        defaultMessage: 'Date Created',
      }),
      initialStatus: true,
      separator: true,
      values: [],
    },
    {
      id: 'date-updated',
      label: intl.formatMessage({
        id: 'ui-reports.filters.dateUpdated',
        defaultMessage: 'Date updated',
      }),
      initialStatus: true,
      separator: true,
      values: [],
    },
  ];
  return data;
};

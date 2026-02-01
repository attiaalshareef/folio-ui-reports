import reportTypes from './ReportsTypes';

/* eslint-disable import/prefer-default-export */
export const reportStatusOptions = intl => {
  const options = [
    {
      label: intl.formatMessage({
        id: 'ui-reports.saveNewReportForm.reportStatusField.options.active',
        defaultMessage: 'Active'
      }),
      value: 'active'
    },
    {
      label: intl.formatMessage({
        id: 'ui-reports.saveNewReportForm.reportStatusField.options.inactive',
        defaultMessage: 'Inactive'
      }),
      value: 'inactive'
    }
  ];
  return options;
};

export const reportPrivacyOptions = intl => {
  const options = [
    {
      label: intl.formatMessage({
        id: 'ui-reports.saveNewReportForm.reportPrivacyField.options.public',
        defaultMessage: 'Public'
      }),
      value: 'public'
    },
    {
      label: intl.formatMessage({
        id: 'ui-reports.saveNewReportForm.reportPrivacyField.options.private',
        defaultMessage: 'Private'
      }),
      value: 'private'
    }
  ];
  return options;
};

export const reportTypesOptions = intl => {
  return reportTypes.map(report => ({
    label: intl.formatMessage({
      id: `ui-reports.reportTypes.label.${report.value}`,
      defaultMessage: report.name
    }),
    value: report.value
  }));
};

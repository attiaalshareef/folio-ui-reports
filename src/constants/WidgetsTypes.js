const widgetTypes = [
  {
    name: 'Single Report Widget',
    value: 'singleReport',
    translationKey: {
      id: 'ui-reports.widgetTypes.singleReport',
      defaultMessage: 'Single Report Widget'
    },
    description: 'Display data from a single report',
    maxReports: 1,
    supportedDisplayMethods: ['numLabel', 'table', 'barChart', 'pieChart', 'lineChart', 'areaChart'],
    defaultDisplayMethod: 'table'
  },
  {
    name: 'Multi Reports Widget',
    value: 'multiReports',
    translationKey: {
      id: 'ui-reports.widgetTypes.multiReports',
      defaultMessage: 'Multi Reports Widget'
    },
    description: 'Display data from multiple reports in separate sections',
    maxReports: 6,
    supportedDisplayMethods: ['numLabel', 'table'],
    defaultDisplayMethod: 'numLabel'
  },
  {
    name: 'Comparison Widget',
    value: 'comparison',
    translationKey: {
      id: 'ui-reports.widgetTypes.comparison',
      defaultMessage: 'Comparison Widget'
    },
    description: 'Compare data between multiple reports',
    maxReports: 4,
    supportedDisplayMethods: ['barChart', 'lineChart', 'table'],
    defaultDisplayMethod: 'barChart'
  }
];

export default widgetTypes;
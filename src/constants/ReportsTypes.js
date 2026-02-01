const reportTypes = [
  {
    name: 'Numeric metrics',
    value: 'numMetric',
    desc: `
           This type of reports is used to return a set of numerical values from one or more joined tables in one query.
           For example, if you want to retrieve the total number of titles in the inventory
           With the total number of holdings and the total number of items,
           You can retrieve that in one query.
           Note that:
             --Multible tables can be selected at the same report.
             --Multi metrics can be selected from one or more tables at the same report.
             --Only tables with relationships between them are allowed.
             --No dimensions can be selected.
             --No filters can be applied.
             --No sorting options applied.
             `,
    displayMethods: ['numLabel', 'table'],
    defaultDisplayMethod: 'numLabel',
  },
  {
    name: 'Dimensions metric',
    value: 'dimMetric',
    desc: 'This type of report is used to return a set of numerical values in one query. For example, if you want to retrieve the total number of titles in stock with the total number of holdings and the total number of items, you can retrieve that in one query.Note that: -Multi metrics can be selected at the same report. -No dimensions can be selected',
    displayMethods: [
      'numLabel',
      'table',
      'barChart',
      'pieChart',
      'lineChart',
      'areaChart',
    ],
    defaultDisplayMethod: 'table',
  },
  {
    name: 'Periodical metric',
    value: 'periodMetric',
    desc: 'This type of report is used to return a set of numerical values in one query. For example, if you want to retrieve the total number of titles in stock with the total number of holdings and the total number of items, you can retrieve that in one query.Note that: -Multi metrics can be selected at the same report. -No dimensions can be selected',
    displayMethods: ['numLabel', 'table', 'barChart', 'pieChart', 'lineChart', 'areaChart'],
    defaultDisplayMethod: 'table',
  },
  {
    name: 'Sorted list',
    value: 'list',
    desc: 'This type of report is used to return a set of numerical values in one query. For example, if you want to retrieve the total number of titles in stock with the total number of holdings and the total number of items, you can retrieve that in one query.Note that: -Multi metrics can be selected at the same report. -No dimensions can be selected',
    displayMethods: ['numLabel', 'table'],
    defaultDisplayMethod: 'table',
  },
  {
    name: 'Productivity Report',
    value: 'productivity',
    desc: 'This type of report shows cataloging productivity metrics including instances, holdings, and items created/updated by staff members.',
    displayMethods: ['table', 'barChart', 'pieChart', 'lineChart', 'areaChart'],
    defaultDisplayMethod: 'table',
  },
];

export default reportTypes;

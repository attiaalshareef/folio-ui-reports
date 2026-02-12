/**
 * Professional Report Types Classification System
 * Defines comprehensive report categories with appropriate display methods
 */

const reportTypes = [
  {
    name: 'Statistical Analysis Report',
    value: 'statistical',
    desc: `Comprehensive statistical reports featuring aggregated data, metrics, and visual analytics. 
           Ideal for: Collection statistics, circulation metrics, acquisition summaries, and comparative analysis.
           Supports: Multiple dimensions, time-series data, grouping, and filtering.`,
    displayMethods: ['table', 'barChart', 'pieChart', 'lineChart', 'areaChart'],
    defaultDisplayMethod: 'table',
    icon: 'graph',
    category: 'analytics',
    useCases: ['Cataloging statistics', 'Circulation trends', 'Collection analysis', 'Usage patterns']
  },
  {
    name: 'Detailed Data Report',
    value: 'detailed',
    desc: `Comprehensive tabular reports displaying detailed records with full data attributes.
           Ideal for: Item listings, patron records, transaction logs, and inventory details.
           Supports: Sorting, filtering, pagination, and export to Excel.`,
    displayMethods: ['table'],
    defaultDisplayMethod: 'table',
    icon: 'list',
    category: 'operational',
    useCases: ['Item inventory', 'Patron lists', 'Transaction history', 'Holdings details']
  },
  {
    name: 'Executive Summary Report',
    value: 'summary',
    desc: `High-level overview reports presenting key performance indicators and summary metrics.
           Ideal for: Dashboard KPIs, quick insights, management summaries, and at-a-glance metrics.
           Supports: Single or multiple numeric indicators with optional visual representation.`,
    displayMethods: ['numLabel', 'pieChart', 'table'],
    defaultDisplayMethod: 'numLabel',
    icon: 'dashboard',
    category: 'executive',
    useCases: ['Total collections', 'Active patrons', 'Circulation totals', 'Budget summaries']
  },
  {
    name: 'Trend Analysis Report',
    value: 'trend',
    desc: `Time-based analytical reports showing patterns, trends, and changes over specified periods.
           Ideal for: Historical analysis, growth tracking, seasonal patterns, and forecasting.
           Supports: Date ranges, time granularity (daily, weekly, monthly, yearly), and comparative periods.`,
    displayMethods: ['lineChart', 'areaChart', 'table'],
    defaultDisplayMethod: 'lineChart',
    icon: 'trending-up',
    category: 'temporal',
    useCases: ['Circulation trends', 'Acquisition patterns', 'Usage growth', 'Seasonal analysis']
  },
  {
    name: 'Comparative Analysis Report',
    value: 'comparative',
    desc: `Side-by-side comparison reports for analyzing differences and similarities across categories.
           Ideal for: Branch comparisons, collection comparisons, period-over-period analysis.
           Supports: Multiple groupings, percentage calculations, and variance analysis.`,
    displayMethods: ['barChart', 'table', 'lineChart'],
    defaultDisplayMethod: 'barChart',
    icon: 'compare',
    category: 'analytical',
    useCases: ['Branch performance', 'Collection comparison', 'Year-over-year analysis', 'Category breakdown']
  },
  {
    name: 'Distribution Analysis Report',
    value: 'distribution',
    desc: `Reports showing data distribution, proportions, and composition across categories.
           Ideal for: Collection composition, patron demographics, material type distribution.
           Supports: Percentage calculations, hierarchical grouping, and drill-down capabilities.`,
    displayMethods: ['pieChart', 'barChart', 'table'],
    defaultDisplayMethod: 'pieChart',
    icon: 'pie-chart',
    category: 'composition',
    useCases: ['Material types', 'Patron categories', 'Subject distribution', 'Language breakdown']
  },
  {
    name: 'Performance Metrics Report',
    value: 'performance',
    desc: `Operational performance reports tracking efficiency, productivity, and service quality metrics.
           Ideal for: Staff productivity, processing times, service levels, and operational KPIs.
           Supports: Multiple metrics, benchmarking, and goal tracking.`,
    displayMethods: ['table', 'barChart', 'lineChart', 'numLabel'],
    defaultDisplayMethod: 'table',
    icon: 'speedometer',
    category: 'operational',
    useCases: ['Cataloging productivity', 'Processing times', 'Service desk metrics', 'Staff performance']
  }
];

/**
 * Legacy report type mapping for backward compatibility
 * Maps old report types to new classification system
 */
export const legacyTypeMapping = {
  'numMetric': 'summary',
  'dimMetric': 'statistical',
  'periodMetric': 'trend',
  'list': 'detailed',
  'productivity': 'performance',
  'cataloging': 'statistical',
  'circulation': 'statistical'
};

/**
 * Get report type configuration by value
 * @param {string} typeValue - Report type value
 * @returns {object} Report type configuration
 */
export const getReportType = (typeValue) => {
  // Check if it's a legacy type and map it
  const mappedValue = legacyTypeMapping[typeValue] || typeValue;
  return reportTypes.find(type => type.value === mappedValue) || reportTypes[0];
};

/**
 * Get display methods for a specific report type
 * @param {string} typeValue - Report type value
 * @returns {array} Array of display method values
 */
export const getDisplayMethodsForType = (typeValue) => {
  const reportType = getReportType(typeValue);
  return reportType.displayMethods || [];
};

export default reportTypes;

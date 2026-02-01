// Results System - Unified Exports

// Core Components
export { default as GenericResultsDisplay } from './core/GenericResultsDisplay';
export { default as DisplayMethodRegistry } from './core/DisplayMethodRegistry';
export { default as ExportManager } from './core/ExportManager';
export { default as DrillDownManager } from './core/DrillDownManager';
export { default as DrillDownModal } from './preview/DrillDownModal';

// View Components
export { default as GenericTableView } from './views/table/GenericTableView';
export { default as GenericBarChart } from './views/charts/GenericBarChart';
export { default as GenericPieChart } from './views/charts/GenericPieChart';
export { default as GenericLineChart } from './views/charts/GenericLineChart';
export { default as GenericAreaChart } from './views/charts/GenericAreaChart';
export { default as GenericNumericalView } from './views/numerical/GenericNumericalView';

// Legacy Components (for backward compatibility)
export { default as ResultsPreview } from './preview/ResultsPreview';
export { default as QueryResultSet } from './dataset/QueryResultSet';
export { default as QueryFiltersManager } from './dataset/queryFilters/QueryFiltersManager';

// Display Method Registry Functions
export {
  getDisplayComponent,
  renderDisplayComponent,
  getAvailableDisplayMethods,
  registerDisplayMethod,
} from './core/DisplayMethodRegistry';

// Utilities
export { default as formatters } from './utils/formatters';
export { default as exportUtils } from './utils/exportUtils';
export { getFormatter, createDrillDownFormatter } from './utils/formatters';
export { prepareExcelData, preparePDFData, generateFilename, validateExportData } from './utils/exportUtils';
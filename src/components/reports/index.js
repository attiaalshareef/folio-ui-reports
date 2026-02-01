// Reports System - Main Exports

// Builders
export { default as ReportBuilderSelection } from './builders/shared/ReportBuilderSelection';
export { default as CatalogingReportManager } from './builders/cataloging/CatalogingReportManager';
export { default as ProductivityReportManager } from './builders/productivity/ProductivityReportManager';
export { default as QueryBuilderManger } from './builders/advanced/QueryBuilderManger';

// Results - New Unified System
export {
  GenericResultsDisplay,
  DisplayMethodRegistry,
  ExportManager,
  DrillDownManager,
  DrillDownModal,
  GenericTableView,
  GenericBarChart,
  GenericPieChart,
  GenericLineChart,
  GenericAreaChart,
  GenericNumericalView,
  getDisplayComponent,
  renderDisplayComponent,
  getAvailableDisplayMethods,
  registerDisplayMethod,
} from './results';

// Results - Legacy (for backward compatibility)
export { ResultsPreview, QueryResultSet, QueryFiltersManager } from './results';

// Management
export { default as SaveNewReportManager } from './management/save/SaveNewReportManager';
export { default as ReportEdit } from './management/edit';
export { default as ReportsList } from './management/list/ReportsList';
export { default as SearchAndFilters } from './management/list/searchAndFilters/SearchAndFilters';
export { default as ReportDetails } from './management/view/ReportDetails';

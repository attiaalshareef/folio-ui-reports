/* eslint-disable implicit-arrow-linebreak */
import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Icon,
  Pane,
  PaneFooter,
  Tooltip,
} from '@folio/stripes/components';
import { FormattedMessage } from 'react-intl';
import ResultsActionsMenu from './ResultsActionsMenu';
import DisplayMethodsMenu from './DisplayMethodsMenu';
import displayMethods from '../../../../constants/DisplayMethods';
import GenericResultsDisplay from '../core/GenericResultsDisplay';
import DrillDownModal from './DrillDownModal';
import ExportProgressModal from './ExportProgressModal';
import ExportManager from '../core/ExportManager';

function ResultsPreview(props) {
  // Use all available display methods instead of report-specific ones
  const allDisplayMethods = displayMethods;

  // Use props instead of executing query
  const { resultSet, error, isLoading } = props;

  // Drill-down state
  const [showDrillDownModal, setShowDrillDownModal] = useState(false);
  const [drillDownData, setDrillDownData] = useState(null);

  // Export progress state
  const [showExportModal, setShowExportModal] = useState(false);
  const [currentExportType, setCurrentExportType] = useState(null);

  // Handle drill-down using new DrillDownManager
  const handleDrillDown = (data) => {
    if (data) {
      setDrillDownData(data);
      setShowDrillDownModal(true);
    }
  };

  const closeDrillDownModal = () => {
    setShowDrillDownModal(false);
    setDrillDownData(null);
  };

  // Export event handlers
  const handleExportStart = (type) => {
    setCurrentExportType(
      type === 'excel' ? 'Excel' : type === 'pdf' ? 'PDF' : 'Print',
    );
    setShowExportModal(true);
  };

  const handleExportError = (type, exportError) => {
    console.error(`Export ${type} failed:`, exportError);
  };

  const closeExportModal = () => {
    setShowExportModal(false);
    setCurrentExportType(null);
  };

  const handleDownloadNow = (triggerDownload, pathInfo) => {
    if (triggerDownload) {
      // Close modal immediately since Save Dialog will appear
      closeExportModal();
      triggerDownload(pathInfo);
    }
  };

  const filtereDataOptions = () => {
    return allDisplayMethods.map((option) => ({
      label: option.name,
      value: option.value,
    }));
  };

  const renderFirstMenu = () => {
    return (
      <>
        {!props.showQueryBuilderPane ? (
          <Tooltip
            id="report-preview-pane-tooltip-show-query-builder"
            text={
              <FormattedMessage
                id="ui-reports.newReport.reportPreviewPane.tooltip.showQueryBuilderPane"
                defaultMessage="Show query builder panel"
              />
            }
          >
            {({ ref, ariaIds }) => (
              <Button
                buttonStyle="slim"
                id="report-preview-pane-showQueryBuilder-btn"
                marginBottom0
                onClick={() =>
                  props.setShowQueryBuilderPane(!props.showQueryBuilderPane)
                }
                aria-labelledby={ariaIds.text}
                ref={ref}
              >
                <Icon icon="chevron-double-right" size="large" />
              </Button>
            )}
          </Tooltip>
        ) : (
          <div />
        )}
        {/* Show DisplayMethodsMenu when there are results to display */}
        {!isLoading && resultSet && Object.keys(resultSet).length > 0 && (
          <DisplayMethodsMenu
            displayMethods={filtereDataOptions()}
            currentDisplayMethod={props.displayMethod}
            setCurrentDisplayMethod={props.setDisplayMethod}
          />
        )}
      </>
    );
  };

  const renderPaneFooter = () => {
    return (
      <PaneFooter
        renderEnd={
          <>
            <Button
              // buttonStyle="primary"
              id="clickable-closeNoSaveBtn-reports-"
              marginBottom0
              onClick={props.handleClose}
              disabled={props.showSavePane}
            >
              <FormattedMessage
                id="ui-reports.newReport.reportPreviewPane.closeBtn"
                defaultMessage="Close"
              />
            </Button>
          </>
        }
        renderStart={
          <>
            <Button
              buttonStyle="primary"
              id="new-report-save-as-report-btn"
              marginBottom0
              onClick={() => {
                props.setShowQueryBuilderPane(false);
                props.setShowSavePane(true);
              }}
              disabled={!resultSet || props.showSavePane}
            >
              <FormattedMessage
                id="ui-reports.newReport.reportPreviewPane.saveAsReportBtn"
                defaultMessage="Save as report"
              />
            </Button>
          </>
        }
      />
    );
  };

  return (
    <ExportManager
      query={props.query}
      reportName={`folio-report-${Date.now()}`}
      formats={['excel', 'pdf', 'print']}
      onExportStart={handleExportStart}
      onExportError={handleExportError}
    >
      {({ exportFunctions, exportState, printOptions }) => (
        <Pane
          appIcon={<Icon icon="preview" size="large" />}
          fluidContentWidth
          noOverflow
          firstMenu={renderFirstMenu()}
          lastMenu={
            <ResultsActionsMenu
              handleExcelExport={exportFunctions.excel}
              toPDF={exportFunctions.pdf}
              handlePrint={exportFunctions.print}
            />
          }
          footer={renderPaneFooter()}
          id="pane-report-preview"
          centeredContent
          paneTitle={
            <FormattedMessage
              id="ui-reports.newReport.reportPreviewPane.paneTitle"
              defaultMessage="Results Prewiew"
            />
          }
          paneSub={
            <FormattedMessage
              id="stripes-smart-components.searchResultsCountHeader"
              values={{
count: !isLoading && resultSet
                  ? resultSet.serialize?.()?.loadResponse?.results?.[0]?.total ||
                    resultSet?.loadResponses?.[0]?.total ||
                    resultSet.tablePivot?.()?.length ||
                    0
                  : 0,
              }}
            />
          }
        >
          <GenericResultsDisplay
            resultSet={resultSet}
            error={error}
            isLoading={isLoading}
            displayMethod={props.displayMethod}
            reportType={props.reportType}
            onDrillDown={handleDrillDown}
            query={props.query}
            printOptions={printOptions}
            exportOptions={{ excel: true, pdf: true }}
          />

          {/* Drill-down Modal */}
          <DrillDownModal
            isOpen={showDrillDownModal}
            onClose={closeDrillDownModal}
            drillDownData={drillDownData}
          />

          {/* Export Progress Modal */}
          <ExportProgressModal
            isOpen={showExportModal}
            exportType={currentExportType}
            exportStage={exportState.exportStage}
            exportError={exportState.exportError}
            onClose={closeExportModal}
            onRetry={closeExportModal}
            onDownload={(pathInfo) =>
              handleDownloadNow(exportFunctions.triggerDownload, pathInfo)
            }
            defaultFilename={`folio-report-${Date.now()}.xlsx`}
          />
        </Pane>
      )}
    </ExportManager>
  );
}

ResultsPreview.propTypes = {
  handleClose: PropTypes.func.isRequired,
  setShowSavePane: PropTypes.func.isRequired,
  showSavePane: PropTypes.bool.isRequired,
  showQueryBuilderPane: PropTypes.bool.isRequired,
  setShowQueryBuilderPane: PropTypes.func.isRequired,
  query: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  resultSet: PropTypes.object,
  error: PropTypes.object,
  isLoading: PropTypes.bool.isRequired,
  reportType: PropTypes.string.isRequired,
  displayMethod: PropTypes.string.isRequired,
  setDisplayMethod: PropTypes.func.isRequired,
};

export default ResultsPreview;

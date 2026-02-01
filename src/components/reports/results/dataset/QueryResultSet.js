import React, { useEffect, useRef, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Icon,
  Layout,
  Loading,
  Pane,
  PaneFooter,
  Tooltip,
} from '@folio/stripes/components';
import { FormattedMessage } from 'react-intl';
import { useCubeQuery, CubeContext } from '@cubejs-client/react';
import { useReactToPrint } from 'react-to-print';
import { Margin, usePDF } from 'react-to-pdf';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import ResultsActionsMenu from '../preview/ResultsActionsMenu';
import DisplayMethodsMenu from '../preview/DisplayMethodsMenu';
import PrintWindow from '../export/PrintWindow';
import { useExcelExport } from '../../../../hooks/useExcelExport';
import GenericResultsDisplay from '../core/GenericResultsDisplay';

const popupStyles = `
    @page {
      size: A4 auto;
      width: 100%;
    }

    @media print {
     html, body {
        height: auto !important;
        overflow: initial !important;
        color-adjust: exact;
        -webkit-print-color-adjust: exact;
    }
  `;

function QueryResultSet(props) {
  const [isShowPrintWindow, setIsShowPrintWindow] = useState(false);
  const componentRef = useRef(null);
  const promiseResolveRef = useRef(null);
  const { exportReport, isExporting, exportError } = useExcelExport();

  const { toPDF, targetRef } = usePDF({
    method: 'save',
    filename: 'usepdf-example.pdf',
    page: { margin: Margin.MEDIUM },
  });

  const handleDownloadPDF = () => {
    setIsShowPrintWindow(true);
    const input = document.getElementById('printWindow');
    // Specify the id of the element you want to convert to PDF
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      // eslint-disable-next-line new-cap
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 0, 0);
      pdf.save(`${props.currentReport?.name}.pdf`);
      // Specify the name of the downloaded PDF file
    });
  };

  useEffect(() => {
    if (isShowPrintWindow && promiseResolveRef.current) {
      // Resolves the Promise, letting `react-to-print` know that the DOM updates are completed
      promiseResolveRef.current();
    }
  }, [isShowPrintWindow]);

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    pageStyle: popupStyles,
    documentTitle: props.currentReport?.name,
    onBeforePrint: () => {
      return new Promise((resolve) => {
        promiseResolveRef.current = resolve;
        setIsShowPrintWindow(true);
      });
    },
    onAfterPrint: () => {
      // Reset the Promise resolve so we can print again
      promiseResolveRef.current = null;
      setIsShowPrintWindow(false);
    },
    // print: async (printIframe) => {
    //   const document = printIframe.contentDocument;
    //   console.log('document: ', document.getElementById('printWindow'));
    //   if (document) {
    //     // const html = document.getElementsByClassName('App')[0];
    //     // const options = {
    //     //   margin: 0,
    //     //   filename: 'the-joys-of-buying-over-building.pdf',
    //     // };
    //     // const exporter = new Html2Pdf(html, options);
    //     // await exporter.getPdf(options);
    //     const input = document.getElementById('printWindow');
    //     // Specify the id of the element you want to convert to PDF
    //     html2canvas(input).then((canvas) => {
    //       const imgData = canvas.toDataURL('image/png');
    //       // eslint-disable-next-line new-cap
    //       const pdf = new jsPDF();
    //       pdf.addImage(imgData, 'PNG', 0, 0);
    //       pdf.save(`${props.currentReport?.name}.pdf`);
    //       // Specify the name of the downloaded PDF file
    //     });
    //   }
    // },
  });
  const { resultSet, error, isLoading } = useCubeQuery(
    props.currentReport?.queryMetadata || {},
    {
      subscribe: true,
    },
  );

  const handleExcelExport = () => {
    if (props.currentReport?.queryMetadata) {
      exportReport(props.currentReport.queryMetadata, props.currentReport.name || 'report');
    }
  };

  const renderPaneFooter = () => {
    return (
      <PaneFooter
        renderEnd={
          <Button
            // buttonStyle="primary"
            id="clickable-closeNoSaveBtn-reports-"
            marginBottom0
            onClick={props.handleClose}
          >
            <FormattedMessage
              id="ui-reports.newReport.reportPreviewPane.closeBtn"
              defaultMessage="Close"
            />
          </Button>
        }
      />
    );
  };

  const renderFirstMenu = () => {
    return (
      <>
        {!props.showFiltersPane ? (
          <Tooltip
            id="report-preview-pane-tooltip-show-query-builder"
            text={
              <FormattedMessage
                id="ui-reports.newReport.reportPreviewPane.tooltip.showQueryBuilderPane"
                defaultMessage="Show query filters panel"
              />
            }
          >
            {({ ref, ariaIds }) => (
              <Button
                buttonStyle="primary"
                id="report-preview-pane-showQueryBuilder-btn"
                marginBottom0
                onClick={() => props.setShowFiltersPane(!props.showFiltersPane)}
                aria-labelledby={ariaIds.text}
                ref={ref}
              >
                {/* <Icon icon="chevron-double-right" size="large" /> */}
                <FormattedMessage
                  id="ui-reports.queryFilters.showFilterBtn"
                  defaultMessage="Filters"
                />
              </Button>
            )}
          </Tooltip>
        ) : (
          <div />
        )}
        {props.currentReport?.displayMethods && (
          <DisplayMethodsMenu
            displayMethods={props.currentReport?.displayMethods}
            currentDisplayMethod={props.displayMethod}
            setCurrentDisplayMethod={props.setDisplayMethod}
          />
        )}
      </>
    );
  };

  const renderResultSet = () => {
    return (
      <GenericResultsDisplay
        resultSet={resultSet}
        error={error}
        isLoading={isLoading}
        displayMethod={props.displayMethod}
        reportType={props.currentReport?.reportType}
        query={props.currentReport?.queryMetadata}
        printOptions={{
          componentRef,
          targetRef,
          isShowPrintWindow,
          currentReport: props.currentReport,
          onAfterPrint: () => {
            promiseResolveRef.current = null;
            setIsShowPrintWindow(false);
          },
        }}
      />
    );
  };

  return (
    <Pane
      appIcon={<Icon icon="preview" size="large" />}
      fluidContentWidth
      noOverflow
      firstMenu={renderFirstMenu()}
      lastMenu={
        <ResultsActionsMenu 
          handlePrint={handlePrint} 
          toPDF={handleDownloadPDF}
          handleExcelExport={handleExcelExport}
          isExporting={isExporting}
        />
      }
      footer={renderPaneFooter()}
      id="pane-report-resultset"
      centeredContent
      paneTitle={props.currentReport?.name}
      paneSub={
        <FormattedMessage
          id="stripes-smart-components.searchResultsCountHeader"
          values={{
            count:
              !isLoading && resultSet
                ? resultSet?.loadResponses[0]?.data?.length
                : 0,
          }}
        />
      }
    >
      {renderResultSet()}
    </Pane>
  );
}

QueryResultSet.propTypes = {
  handleClose: PropTypes.func,
  showFiltersPane: PropTypes.bool,
  setShowFiltersPane: PropTypes.func,
  currentReport: PropTypes.object,
  displayMethod: PropTypes.string,
  setDisplayMethod: PropTypes.func,
};

export default QueryResultSet;

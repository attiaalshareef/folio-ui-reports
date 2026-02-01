import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useReactToPrint } from 'react-to-print';
import { usePDF, Margin } from 'react-to-pdf';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useExcelExport } from '../../../../hooks/useExcelExport';

const printStyles = `
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
  }
`;

function ExportManager({
  query,
  reportName,
  formats,
  onExportStart,
  onExportComplete,
  onExportError,
  children,
}) {
  const [isShowPrintWindow, setIsShowPrintWindow] = useState(false);
  const componentRef = useRef(null);
  const promiseResolveRef = useRef(null);

  const { prepareExport, triggerDownload, resetExport, exportStage, exportError, isExporting } = useExcelExport();

  const { toPDF, targetRef } = usePDF({
    method: 'save',
    filename: `${reportName || 'report'}.pdf`,
    page: { margin: Margin.MEDIUM },
  });

  // Handle Excel export
  const handleExcelExport = () => {
    if (!query || Object.keys(query).length === 0) return;

    if (onExportStart) onExportStart('excel');
    prepareExport(query, reportName || 'report');
  };

  // Handle PDF export
  const handlePDFExport = () => {
    if (!componentRef.current) return;

    if (onExportStart) onExportStart('pdf');
    setIsShowPrintWindow(true);

    const input = document.getElementById('printWindow');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF(); // eslint-disable-line new-cap
        pdf.addImage(imgData, 'PNG', 0, 0);
        pdf.save(`${reportName || 'report'}.pdf`);
        if (onExportComplete) onExportComplete('pdf');
      })
      .catch((error) => {
        if (onExportError) onExportError('pdf', error);
      });
  };

  // Handle Print
  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    pageStyle: printStyles,
    documentTitle: reportName || 'Report',
    onBeforePrint: () => {
      return new Promise((resolve) => {
        promiseResolveRef.current = resolve;
        setIsShowPrintWindow(true);
        if (onExportStart) onExportStart('print');
      });
    },
    onAfterPrint: () => {
      promiseResolveRef.current = null;
      setIsShowPrintWindow(false);
      if (onExportComplete) onExportComplete('print');
    },
  });

  // Effect to handle print window state
  useEffect(() => {
    if (isShowPrintWindow && promiseResolveRef.current) {
      promiseResolveRef.current();
    }
  }, [isShowPrintWindow]);

  // Effect to handle export completion/errors
  useEffect(() => {
    if (exportError) {
      if (onExportError) onExportError('excel', exportError);
    } else if (exportStage === 'complete') {
      if (onExportComplete) onExportComplete('excel');
    }
  }, [exportStage, exportError, onExportComplete, onExportError]);

  // Export functions to pass to children
  const exportFunctions = {
    excel: formats.includes('excel') ? handleExcelExport : null,
    pdf: formats.includes('pdf') ? handlePDFExport : null,
    print: formats.includes('print') ? handlePrint : null,
    triggerDownload,
    resetExport,
  };

  const exportState = {
    isExporting: isExporting || isShowPrintWindow,
    exportError,
    exportStage,
    exportType: exportStage !== 'idle' ? 'Excel' : isShowPrintWindow ? 'Print' : null,
  };

  const printOptions = {
    componentRef,
    targetRef,
    isShowPrintWindow,
    reportName,
  };

  return children({ exportFunctions, exportState, printOptions });
}

ExportManager.propTypes = {
  query: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  reportName: PropTypes.string,
  formats: PropTypes.arrayOf(PropTypes.oneOf(['excel', 'pdf', 'print'])),
  onExportStart: PropTypes.func,
  onExportComplete: PropTypes.func,
  onExportError: PropTypes.func,
  children: PropTypes.func.isRequired,
};

ExportManager.defaultProps = {
  formats: ['excel', 'pdf', 'print'],
  reportName: 'report',
};

export default ExportManager;

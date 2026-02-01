import { useState } from 'react';
import { useIntl } from 'react-intl';
import { exportToExcel } from '../helpers/excelExport';

export const useExcelExport = () => {
  const intl = useIntl();
  const [exportStage, setExportStage] = useState('idle'); // idle, preparing, ready, downloading, complete
  const [exportError, setExportError] = useState(null);
  const [preparedData, setPreparedData] = useState(null);

  const prepareExport = async (query, filename = 'report') => {
    if (!query || Object.keys(query).length === 0) {
      setExportError('No query provided for export');
      return;
    }

    setExportStage('preparing');
    setExportError(null);

    try {
      // Prepare data without triggering download
      const result = await exportToExcel(query, filename, {
        prepareOnly: true,
        intl,
      });

      if (result.success) {
        setPreparedData({ data: result.data, filename });
        setExportStage('ready');
      } else {
        setExportError(result.error);
        setExportStage('idle');
      }
    } catch (error) {
      setExportError(error.message);
      setExportStage('idle');
    }
  };

  const triggerDownload = async (pathInfo = {}) => {
    if (!preparedData) return;

    setExportStage('downloading');

    try {
      // Trigger actual download with custom path and filename
      const result = await exportToExcel(null, pathInfo.filename || preparedData.filename, {
        data: preparedData.data,
        triggerDownload: true,
        customPath: pathInfo.path,
        intl,
      });

      if (result.success) {
        setExportStage('complete');
      } else {
        setExportError(result.error);
        setExportStage('ready');
      }
    } catch (error) {
      setExportError(error.message);
      setExportStage('ready');
    }
  };

  const resetExport = () => {
    setExportStage('idle');
    setExportError(null);
    setPreparedData(null);
  };

  return {
    prepareExport,
    triggerDownload,
    resetExport,
    exportStage,
    exportError,
    isExporting: exportStage === 'preparing' || exportStage === 'downloading',
    isReady: exportStage === 'ready',
    isComplete: exportStage === 'complete',
    clearError: () => setExportError(null),
  };
};

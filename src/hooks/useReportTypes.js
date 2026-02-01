import React, { useState, useEffect } from 'react';
import reportTypes from '../constants/ReportsTypes';
import displayMethods from '../constants/DisplayMethods';

function useReportTypes(reportType) {
  const [reportTypeRecord, setReportTypeRecord] = useState({});
  const [reportDisplayMethods, setReportDisplayMethods] = useState([]);

  useEffect(() => {
    const record = reportTypes.find((report) => report.value === reportType);
    if (record && Object.keys(record).length !== 0) {
      setReportTypeRecord(record);
      // const disMethods = displayMethods.map(method => method)
      const disMethods = record.displayMethods.map((dm) => {
        return displayMethods.find((method) => dm === method.value);
      });
      setReportDisplayMethods(disMethods);
    }
  }, [reportType]);

  return {
    reportTypeRecord,
    reportDisplayMethods,
  };
}

export default useReportTypes;

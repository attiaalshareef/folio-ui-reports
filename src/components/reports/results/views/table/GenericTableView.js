import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { MultiColumnList, TextLink } from '@folio/stripes/components';
import { FormattedMessage, useIntl } from 'react-intl';
import { branding } from 'stripes-config';
import { useStripes } from '@folio/stripes-core';
import moment from 'moment';
import {
  useCatalogingFieldLabels,
  createColumnMapping,
} from '../../../../../helpers/catalogingFieldLabels';
import { ReportColumnFormatter } from '../../../../../constants/ReportColumnFormatter';
import DrillDownManager from '../../core/DrillDownManager';
import css from './styles.css';

function GenericTableView({
  resultSet,
  onDrillDown,
  drillDownMeasures = [],
  hiddenFields = [],
  displaySettings,
  printOptions,
  reportType,
}) {
  const [contentData, setContentData] = useState([]);
  const [visibleColumns, setVisibleColumns] = useState([]);
  const fieldLabels = useCatalogingFieldLabels();
  const intl = useIntl();

  const {
    user: {
      user: { firstName, lastName },
    },
  } = useStripes();

  // Create custom formatter with drill-down support
  const createCustomFormatter = () => {
    const customFormatter = { ...ReportColumnFormatter };

    // Get drill-down measures from DrillDownManager
    const availableMeasures = DrillDownManager.getDrillDownMeasures(reportType);

    // Create formatters for all visible columns
    visibleColumns.forEach((column) => {
      // Skip if formatter already exists
      if (customFormatter[column]) {
        return;
      }

      // Check if this column corresponds to a drill-down measure
      const measureName = column.replace(/^.*_view_/, '').replace(/_/g, '_');

      if (availableMeasures.includes(measureName) && onDrillDown) {
        customFormatter[column] = (item) => {
          const value = item[column];
          if (!value || value === '0') {
            return value;
          }

          return (
            <TextLink
              onClick={() => {
                const drillDownData = DrillDownManager.handleDrillDown(
                  reportType,
                  measureName,
                  item,
                  value,
                );
                if (drillDownData) {
                  onDrillDown(drillDownData);
                }
              }}
              style={{ cursor: 'pointer' }}
            >
              {value}
            </TextLink>
          );
        };
      } else {
        // Check if this is a reference table field
        const refFormatter = ReportColumnFormatter.createReferenceFormatter(column, intl);
        if (refFormatter) {
          customFormatter[column] = refFormatter;
        } else {
          // Use generic formatter for other columns (including dates)
          customFormatter[column] = ReportColumnFormatter.formatColumn(column);
        }
      }
    });

    return customFormatter;
  };

  // Process result set data
  useMemo(() => {
    const data = [];
    if (
      resultSet &&
      Object.keys(resultSet).length !== 0 &&
      resultSet.loadResponses?.length > 0
    ) {
      resultSet.loadResponses[0].data.forEach((result) => {
        const obj = {};
        for (const key in result) {
          if (key) {
            obj[key.replace('.', '_')] = result[key];
          }
        }
        data.push(obj);
      });

      setContentData(data);

      const columns = resultSet.loadResponses[0].data.length
        ? Object.keys(resultSet.loadResponses[0].data[0])
        : [];

      setVisibleColumns(
        columns
          .map((col) => col.replace('.', '_'))
          .filter((col) => !hiddenFields.includes(col))
          .sort()
          .reverse(),
      );
    } else {
      setContentData([]);
      setVisibleColumns([]);
    }
  }, [resultSet, hiddenFields]);

  const renderPrintVersion = () => (
    <div style={{ overflow: 'hidden', height: 0 }}>
      <div ref={printOptions?.componentRef} dir="rtl">
        <div className={css.header_container}>
          <div className={css.branding_container}>
            <div className={css.logo}>
              <img alt={branding.logo.alt} src={branding.logo.src} />
            </div>
            <div className={css.org}>
              <img alt={branding.org.alt} src={branding.org.src} />
            </div>
          </div>
          <h2 className={css.paneTitle}>{printOptions?.reportName}</h2>
          <hr className={css.divider} />
        </div>
        <div style={{ width: '100%' }}>
          <MultiColumnList
            id="report-result-print-Multi-Column-List"
            interactive={false}
            visibleColumns={['rowIndex', ...visibleColumns]}
            contentData={contentData}
            columnMapping={createColumnMapping(visibleColumns, fieldLabels)}
            formatter={ReportColumnFormatter}
          />
        </div>
        <div className={css.footer}>
          <div>
            <FormattedMessage
              id="ui-reports.printWindow.createdBy"
              values={{ createdBy: `${firstName} ${lastName}` }}
              defaultMessage="Created by: {createdBy}"
            />
          </div>
          <div>
            <FormattedMessage
              id="ui-reports.printWindow.createdDate"
              values={{ createdDate: moment().toString() }}
              defaultMessage="Created date: {createdDate}"
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <MultiColumnList
        id="generic-table-view-multi-column-list"
        interactive={false}
        visibleColumns={['rowIndex', ...visibleColumns]}
        contentData={contentData}
        columnMapping={createColumnMapping(visibleColumns, fieldLabels)}
        formatter={createCustomFormatter()}
        autosize={displaySettings?.autosize}
        maxHeight={
          displaySettings?.autosize ? null : displaySettings?.maxHeight
        }
        virtualize={displaySettings?.autosize}
      />
      {printOptions?.isShowPrintWindow && renderPrintVersion()}
    </>
  );
}

GenericTableView.propTypes = {
  resultSet: PropTypes.object.isRequired,
  onDrillDown: PropTypes.func,
  drillDownMeasures: PropTypes.arrayOf(PropTypes.string),
  hiddenFields: PropTypes.arrayOf(PropTypes.string),
  displaySettings: PropTypes.shape({
    autosize: PropTypes.bool,
    maxHeight: PropTypes.number,
  }),
  printOptions: PropTypes.shape({
    componentRef: PropTypes.object,
    isShowPrintWindow: PropTypes.bool,
    reportName: PropTypes.string,
  }),
  reportType: PropTypes.string,
};

GenericTableView.defaultProps = {
  drillDownMeasures: [],
  hiddenFields: [],
  displaySettings: { autosize: true, maxHeight: null },
  printOptions: {},
};

export default GenericTableView;

/* eslint-disable implicit-arrow-linebreak */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Checkbox,
  Icon,
  MultiColumnList,
  Pane,
  TextLink,
  Tooltip,
} from '@folio/stripes/components';
import { AppIcon, stripesConnect } from '@folio/stripes-core';
import { FormattedMessage, useIntl } from 'react-intl';
import { get, isEqual, sortBy } from 'lodash';
import { matchPath } from 'react-router-dom';
import { Paneset } from '@folio/stripes-components';

import ReportDetails from '../view/ReportDetails';
// import MetadataFormatter from '../common/metadataFormatter/MetadataFormatter';

function ReportsList({
  showFilters,
  setShowFilters,
  resources,
  history,
  location,
}) {
  const intl = useIntl();
  const [openDetailsPane, setOpenDetailsPane] = useState(false);

  // To avoid fetching the report details evry time, we save selected report in the current session
  const [selectedRow, setSelectedRow] = useState({});

  // Get the curent report id from url params
  const [currentReportId, setCurrentReportId] = useState(null);

  const [reportsList, setReportsList] = useState([]);
  const [selection, setSelection] = useState({});

  // console.log({ selectedRow });

  useEffect(() => {
    const reports = sortBy((resources.reports || {}).records || [], ['']);

    if (!isEqual(reportsList, reports)) {
      setReportsList(reports);
    }
  }, [reportsList, resources.reports]);

  useEffect(() => {
    if (reportsList.length !== Object.values(selection).length) {
      const selectionData = {};
      reportsList.forEach((report) => {
        selectionData[report.id] = false;
      });
      setSelection(selectionData);
    }
  }, [reportsList]);

  useEffect(() => {
    const urlMeta = matchPath(location.pathname, {
      path: '/reports/reports-list/:id/view',
    });
    if (urlMeta?.path === '/reports/reports-list/:id/view') {
      setOpenDetailsPane(true);
    }
    if (urlMeta) setCurrentReportId(urlMeta.params.id);
  }, [location.pathname]);

  const onToggleBulkSelection = () => {
    const select = Object.values(selection).includes(false);
    const selectionData = {};

    reportsList.forEach((report) => {
      selectionData[report.id] = select;
    });
    setSelection(selectionData);
  };

  const onToggleSelection = (report) => {
    setSelection({
      ...selection,
      [report.id]: !selection[report.id],
    });
  };

  const onRowClick = (item) => {
    // if (!Object.values(selection).includes(true)) {
    history.push({
      pathname: `/reports/reports-list/${item.id}/view`,
      search: location.search,
    });
    setOpenDetailsPane(true);
    setSelectedRow(item);
    // }
  };

  const onCloseDetailedPane = () => {
    history.push({
      pathname: '/reports/reports-list',
      search: location.search,
    });
    setOpenDetailsPane(false);
    setCurrentReportId(null);
  };

  const isSelected = ({ item }) => item.id === currentReportId;

  const renderShowFiltersButton = () => {
    return (
      <>
        {!showFilters ? (
          <Tooltip
            id="reports-showFilters-tooltip"
            text={
              <FormattedMessage
                id="ui-reports.panes.reportsList.tooltip.showFiltersButton"
                defaultMessage="Show search and filters panel"
              />
            }
          >
            {({ ref, ariaIds }) => (
              <Button
                buttonStyle="dropdownItem"
                id="clickable-reports-showFilter"
                marginBottom0
                onClick={() => setShowFilters(!showFilters)}
                aria-labelledby={ariaIds.text}
                ref={ref}
              >
                <Icon icon="chevron-double-right" />
              </Button>
            )}
          </Tooltip>
        ) : (
          <div />
        )}
      </>
    );
  };

  const renderLastMenu = () => {
    return null;
  };

  return (
    <>
      <Pane
        id="pane-reports-list-List"
        appIcon={<AppIcon app="reports" />}
        defaultWidth="fill"
        fluidContentWidth
        // noOverflow
        padContent={false}
        paneTitle={
          <FormattedMessage
            id="ui-reports.panes.reportsList.title"
            defaultMessage="Reports List"
          />
        }
        paneSub={
          <FormattedMessage
            id="stripes-smart-components.searchResultsCountHeader"
            values={{
              count: reportsList?.length,
            }}
          />
        }
        firstMenu={renderShowFiltersButton()}
        lastMenu={renderLastMenu()}
      >
        <MultiColumnList
          id="reports-list-multi-column-list"
          interactive
          visibleColumns={[
            'selected',
            'rowIndex',
            'name',
            'desc',
            // 'reportType',
            'status',
            'privacyType',
            // 'createdBy',
            // 'createdDate',
          ]}
          columnWidths={{
            selected: '5%',
            rowIndex: '5%',
            name: '30%',
            desc: '30%',
            // reportType: '10%',
            status: '15%',
            privacyType: '15%',
            // createdDate: '12%'
          }}
          contentData={reportsList}
          columnMapping={{
            selected: (
              <Checkbox
                name="selected-all"
                checked={Object.values(selection).includes(false) !== true}
                onChange={onToggleBulkSelection}
                onMouseDown={(e) => e.preventDefault()}
              />
            ),
            rowIndex: '#',
            name: (
              <FormattedMessage
                id="ui-reports.panes.reportsList.columns.reportName"
                defaultMessage="Report name"
              />
            ),
            desc: (
              <FormattedMessage
                id="ui-reports.panes.reportsList.columns.reportDesc"
                defaultMessage="Description"
              />
            ),
            reportType: (
              <FormattedMessage
                id="ui-reports.panes.reportsList.columns.reportType"
                defaultMessage="Report type"
              />
            ),
            privacyType: (
              <FormattedMessage
                id="ui-reports.panes.reportsList.columns.privacyType"
                defaultMessage="Privacy type"
              />
            ),
            status: (
              <FormattedMessage
                id="ui-reports.panes.reportsList.columns.status"
                defaultMessage="Status"
              />
            ),
            createdDate: (
              <FormattedMessage
                id="ui-reports.panes.reportsList.columns.createdDate"
                defaultMessage="Creation date"
              />
            ),
            createdBy: (
              <FormattedMessage
                id="ui-reports.panes.reportsList.columns.createdBy"
                defaultMessage="Created by"
              />
            ),
          }}
          formatter={{
            selected: (report) => (
              <Checkbox
                name={`selected-${report.id}`}
                checked={!!selection[report.id]}
                onChange={() => {
                  onToggleSelection(report);
                }}
                onMouseDown={(e) => e.preventDefault()}
              />
            ),
            rowIndex: (item) => item.rowIndex + 1,
            // name: (report) => (
            //   <TextLink
            //     marginBottom0
            //     id="clickable-open-query-builder"
            //     buttonStyle="dropdownItem"
            //     to={{
            //       pathname: `/reports/reports-list/${report.id}/view`,
            //       search: location.search,
            //     }}
            //     onClick={() => {
            //       setOpenDetailsPane(true);
            //       setSelectedRow(report);
            //     }}
            //     disabled={Object.values(selection).includes(true)}
            //   >
            //     {report.name}
            //   </TextLink>
            // ),
            reportType: (item) =>
              intl.formatMessage({
                id: `ui-reports.filters.reportType.${item.reportType}`,
                defaultMessage: item.reportType,
              }),
            status: (item) =>
              intl.formatMessage({
                id: `ui-reports.filters.status.${item.status}`,
                defaultMessage: item.status,
              }),
            privacyType: (item) =>
              intl.formatMessage({
                id: `ui-reports.filters.privacyType.${item.privacyType}`,
                defaultMessage: item.privacyType,
              }),
            // createdDate: (item) => (
            //   <HandleDateTime
            //     dateTimeValue={item?.metadata?.createdDate}
            //     handleType="date"
            //   />
            // ),
            // createdBy: item => <MetadataFormatter metadata={item.metadata} />
          }}
          onRowClick={(e, item) => onRowClick(item)}
          isSelected={isSelected}
          autosize
          virtualize
        />
      </Pane>
      <ReportDetails
        open={openDetailsPane}
        onClose={onCloseDetailedPane}
        selectedRow={selectedRow}
        currentReportId={currentReportId}
        reportsList={reportsList}
      />
    </>
  );
}

ReportsList.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.object.isRequired,
  showFilters: PropTypes.bool.isRequired,
  setShowFilters: PropTypes.func.isRequired,
  resources: PropTypes.shape({
    reports: PropTypes.shape({
      records: PropTypes.arrayOf(PropTypes.object),
    }),
    reportId: PropTypes.shape({
      replace: PropTypes.func.isRequired,
    }),
  }),
  mutator: PropTypes.shape({
    reports: PropTypes.shape({
      GET: PropTypes.func.isRequired,
      reset: PropTypes.func.isRequired,
      POST: PropTypes.func.isRequired,
      PUT: PropTypes.func.isRequired,
    }),
    reportId: PropTypes.shape({
      replace: PropTypes.func.isRequired,
    }),
  }),
};

ReportsList.manifest = Object.freeze({
  reportId: '',
  reports: {
    type: 'okapi',
    records: 'reports',
    path: 'reports?limit=10000',
    POST: {
      path: 'reports',
    },
    PUT: {
      path: 'reports',
    },
    DELETE: {
      path: 'reports',
    },
  },
});

export default stripesConnect(ReportsList);

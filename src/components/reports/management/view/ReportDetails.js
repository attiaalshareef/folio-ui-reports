import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Icon, Pane, Tooltip } from '@folio/stripes/components';
import { AppIcon, IfPermission, stripesConnect } from '@folio/stripes-core';
import { get, isEqual } from 'lodash';

import { FormattedMessage } from 'react-intl';
import { useParams } from 'react-router-dom';
import MainMetaData from './components/MainMetaData';
import AuthorizedUsers from './components/AuthorizedUsers';
import ReportDisplayMethods from './components/ReportDisplayMethods';
import ReportDetailsActions from './components/ReportDetailsActions';
import QueryMetadata from './components/QueryMetadata';

function ReportDetails({
  open,
  onClose,
  selectedRow,
  currentReportId,
  reportsList,
  mutator,
  resources,
}) {
  const params = useParams();
  const [selectedReport, setSelectedReport] = useState(selectedRow);
  console.log({ params });

  useEffect(() => {
    if (reportsList.length) {
      setSelectedReport(
        reportsList?.find((report) => report.id === currentReportId),
      );
    }
  }, [currentReportId, reportsList]);

  const renderLastMenu = () => {
    return (
      <>
        <Tooltip
          id="report-details-actions-run-report-btn-tooltip"
          text={
            <FormattedMessage
              id="ui-reports.reportDetailsActions.runReportBtn.tooltip.msg"
              defaultMessage="Run the report"
            />
          }
        >
          {({ ref, ariaIds }) => (
            <Button
              marginBottom0
              id="report-details-actions-run-report-btn"
              buttonStyle="primary"
              to={{
                pathname: `/reports/reports-list/${selectedReport?.id}/run`,
              }}
              onMouseDown={(e) => e.preventDefault()}
              aria-labelledby={ariaIds.text}
              ref={ref}
            >
              <Icon icon="play" size="large" />
            </Button>
          )}
        </Tooltip>
        <ReportDetailsActions reportId={params.reportId} />
      </>
    );
  };

  return (
    <>
      {open && (
        <Pane
          id="report-details-pane"
          appIcon={<AppIcon app="reports" />}
          defaultWidth="40%"
          paneTitle={selectedReport?.name || ''}
          dismissible
          onClose={() => onClose()}
          lastMenu={renderLastMenu()}
        >
          <MainMetaData selectedReport={selectedReport} />
          {/* <QueryMetadata selectedReport={selectedReport} /> */}
          <ReportDisplayMethods selectedReport={selectedReport} />
          <AuthorizedUsers />
        </Pane>
      )}
    </>
  );
}

ReportDetails.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  selectedRow: PropTypes.object.isRequired,
  currentReportId: PropTypes.string.isRequired,
  reportsList: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  resources: PropTypes.shape({
    report: PropTypes.shape({
      records: PropTypes.arrayOf(PropTypes.object),
    }),
  }),
  mutator: PropTypes.shape({
    report: PropTypes.shape({
      GET: PropTypes.func.isRequired,
      PUT: PropTypes.func.isRequired,
      DELETE: PropTypes.func.isRequired,
    }),
  }),
};

// ReportDetails.manifest = Object.freeze({
//   report: {
//     type: 'okapi',
//     GET: {
//       path: 'reports',
//       params: {
//         query: 'query=(id==:{id})',
//         limit: '1',
//       },
//     },
//   },
// });

export default ReportDetails;

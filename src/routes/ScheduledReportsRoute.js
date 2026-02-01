/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Pane } from '@folio/stripes/components';
import { AppIcon } from '@folio/stripes-core';
import { FormattedMessage } from 'react-intl';
import EmptyData from '../components/common/emptyData/EmptyData';

function ScheduledReportsRoute(props) {
  return (
    <Pane
      id="pane-scheduled-reports"
      appIcon={<AppIcon app="reports" />}
      defaultWidth="fill"
      fluidContentWidth
      noOverflow
      padContent={false}
      paneTitle={
        <FormattedMessage
          id="ui-reports.panes.scheduledReports.title"
          defaultMessage="Scheduled Reports"
        />
      }
    >
      <EmptyData />
    </Pane>
  );
}

ScheduledReportsRoute.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired
  }).isRequired,
  location: PropTypes.object
};

export default ScheduledReportsRoute;

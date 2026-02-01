/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Pane } from '@folio/stripes/components';
import { FormattedMessage } from 'react-intl';
import { AppIcon } from '@folio/stripes-core';
import EmptyData from '../components/common/emptyData/EmptyData';

function PrefferedReportsRoute(props) {
  return (
    <Pane
      id="pane-preffered-reports"
      appIcon={<AppIcon app="reports" />}
      defaultWidth="fill"
      fluidContentWidth
      noOverflow
      padContent={false}
      paneTitle={
        <FormattedMessage
          id="ui-reports.panes.prefferedReports.title"
          defaultMessage="Preffered Reports"
        />
      }
    >
      <EmptyData />
    </Pane>
  );
}

PrefferedReportsRoute.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired
  }).isRequired,
  location: PropTypes.object
};

export default PrefferedReportsRoute;

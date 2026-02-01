import React from 'react';
import PropTypes from 'prop-types';
import DefaultReportTypeManager from './DefaultReportTypeManager';

function GeneralSettings(props) {
  return (
    <DefaultReportTypeManager {...props} />
  );
}

GeneralSettings.propTypes = {};

export default GeneralSettings;

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import css from './emptyData.css';

function EmptyData(props) {
  return (
    <div className={css.emptyContainer}>
      <div style={{ paddingBottom: '10px' }}>
        <FormattedMessage
          id="ui-reports.components.common.emptyData.message"
          defaultMessage="No data to show!"
        />
      </div>
    </div>
  );
}

EmptyData.propTypes = {};

export default EmptyData;

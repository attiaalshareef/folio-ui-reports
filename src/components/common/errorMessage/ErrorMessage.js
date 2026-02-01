import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Button } from '@folio/stripes/components';
import css from './styles.css';

function ErrorMessage({ errorMessage }) {
  const [openMessage, setOpenMessage] = useState(false);

  return (
    <div className={css.emptyContainer}>
      <div style={{ paddingBottom: '10px' }}>
        <FormattedMessage
          id="ui-reports.errorMessage.label"
          defaultMessage="Error executing the query"
        />
      </div>
      <div>
        <Button
          marginBottom0
          id="errorMessage-show-error-btn"
          buttonStyle="primary"
          onClick={() => setOpenMessage(!openMessage)}
          onMouseDown={(e) => e.preventDefault()}
        >
          {!openMessage ? (
            <FormattedMessage
              id="ui-reports.errorMessage.showErrorBtn"
              defaultMessage="Show error"
            />
          ) : (
            <FormattedMessage
              id="ui-reports.errorMessage.showErrorBtn"
              defaultMessage="Hide error"
            />
          )}
        </Button>
      </div>
      {openMessage && (
        <div
          style={{
            margin: '20px',
            textAlign: 'center',
            lineHeight: '1.4',
            border: '1.5px solid rgba(0, 0, 0, 0.62)',
            padding: '20px',
            background: 'rgb(246, 141, 117)',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {errorMessage}
        </div>
      )}
    </div>
  );
}

ErrorMessage.propTypes = {
  errorMessage: PropTypes.string,
};

export default ErrorMessage;

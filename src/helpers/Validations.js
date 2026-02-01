import React from 'react';
import { FormattedMessage } from 'react-intl';

// eslint-disable-next-line import/prefer-default-export
export const required = (value) =>
  value ? undefined : (
    <strong>
      <FormattedMessage
        id='ui-reports.validation.required'
        defaultMessage='required'
      />
    </strong>
  );

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Accordion,
  FilterAccordionHeader,
  Select,
} from '@folio/stripes/components';

import { Field } from 'react-final-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { timeUnitDataOptions } from './utils';

function TimeDimensionsField({ currentCubeMembers, disabled }) {
  const [filterToggle, setFilterToggle] = useState(true);

  const intl = useIntl();

  const getColumnData = () => {
    const fields = [];
    currentCubeMembers?.forEach((member) => {
      member?.dimensions?.map((col) => {
        if (col.type === 'time') {
          fields.push(col);
        }
        return null;
      });
    });
    return fields;
  };

  return (
    <Accordion
      id="query-builder-form-time-dimensions-accordion"
      label={
        <FormattedMessage
          id="ui-reports.queryBuilder.timeDimensionsField.Accordion.header"
          defaultMessage="Date & Time Options"
        />
      }
      onToggle={() => setFilterToggle(!filterToggle)}
      open={filterToggle}
      separator
      header={FilterAccordionHeader}
    >
      <Field
        id="query-builder-form-time-dimensions-column-select"
        name="timeDimentions.timeColumn"
        component={Select}
        label={
          <FormattedMessage
            id="ui-reports.queryBuilder.timeDimensionsField.column.label"
            defaultMessage="Column"
          />
        }
        placeholder={intl.formatMessage({
          id: 'ui-reports.queryBuilder.timeDimensionsField.column.placeholder',
          defaultMessage: 'Choose column',
        })}
        dataOptions={getColumnData()?.map((option) => ({
          label: option.name,
          value: option.name,
        }))}
        required
        // validate={required}
        disabled={disabled}
      />
      <Field
        id="query-builder-form-time-dimensions-unit-multiselect"
        name="timeDimentions.timeUnit"
        component={Select}
        label={
          <FormattedMessage
            id="ui-reports.queryBuilder.timeDimensionsField.unit.label"
            defaultMessage="Unit"
          />
        }
        placeholder={intl.formatMessage({
          id: 'ui-reports.queryBuilder.timeDimensionsField.unit.placeholder',
          defaultMessage: 'Choose unit',
        })}
        dataOptions={timeUnitDataOptions}
        required
        // validate={required}
        disabled={disabled}
      />
    </Accordion>
    // </Card>
  );
}

TimeDimensionsField.propTypes = {
  currentCubeMembers: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default TimeDimensionsField;

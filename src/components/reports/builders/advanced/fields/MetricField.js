import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Accordion,
  FilterAccordionHeader,
  MultiSelection,
} from '@folio/stripes/components';
import { Field } from 'react-final-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { required } from '../../../../../helpers/Validations';

function MetricField({ currentCubeMembers, disabled }) {
  const [filterToggle, setFilterToggle] = useState(true);

  const intl = useIntl();

  const getMeasuresDataOptions = () => {
    const measures = [];
    currentCubeMembers?.forEach((member) => {
      member?.measures?.map((option) =>
        measures.push({
          label: option?.name,
          value: option?.name,
        }),
      );
    });
    return measures;
  };

  return (
    <Accordion
      id="query-builder-form-metrics-accordion"
      label={
        <FormattedMessage
          id="ui-reports.queryBuilder.metricsField.Accordion.header"
          defaultMessage="Metrics Options"
        />
      }
      onToggle={() => setFilterToggle(!filterToggle)}
      open={filterToggle}
      separator
      header={FilterAccordionHeader}
    >
      <Field
        id="query-builder-form-metrics-multiselect"
        name="metrics"
        component={MultiSelection}
        label={
          <FormattedMessage
            id="ui-reports.queryBuilder.metricsField.label"
            defaultMessage="Metrics"
          />
        }
        placeholder={intl.formatMessage({
          id: 'ui-reports.queryBuilder.metricField.placeholder',
          defaultMessage: 'Choose metrics',
        })}
        dataOptions={getMeasuresDataOptions()}
        required
        validate={required}
        disabled={disabled}
      />
    </Accordion>
  );
}

MetricField.propTypes = {
  currentCubeMembers: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default MetricField;

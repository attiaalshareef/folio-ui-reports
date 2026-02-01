import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import { Accordion, MultiSelection } from '@folio/stripes/components';
import { FormattedMessage } from 'react-intl';
import { useCirculationFieldLabels } from '../../../../helpers/circulationFieldLabels';

function CirculationMeasuresSelector({ formValues }) {
  const fieldLabels = useCirculationFieldLabels();

  const measuresOptions = [
    { value: 'circulation_view.total_loans', label: fieldLabels['circulation_view.total_loans'] },
    { value: 'circulation_view.loans_created', label: fieldLabels['circulation_view.loans_created'] },
    { value: 'circulation_view.loans_updated', label: fieldLabels['circulation_view.loans_updated'] },
    { value: 'circulation_view.total_renewals', label: fieldLabels['circulation_view.total_renewals'] },
    { value: 'circulation_view.total_borrowers', label: fieldLabels['circulation_view.total_borrowers'] },
    { value: 'circulation_view.total_items', label: fieldLabels['circulation_view.total_items'] },
  ];

  return (
    <Accordion
      id="circulation-measures-accordion"
      label={
        <FormattedMessage
          id="ui-reports.circulationReports.measures.title"
          defaultMessage="Statistics & Measures"
        />
      }
      separator={false}
    >
      <div style={{ padding: '1rem' }}>
        <p style={{ marginBottom: '1rem', color: '#666', fontSize: '0.9rem' }}>
          <FormattedMessage
            id="ui-reports.circulationReports.measures.description"
            defaultMessage="Select statistical measures and filters:"
          />
        </p>
        
        <Field name="measures">
          {({ input, meta }) => (
            <MultiSelection
              {...input}
              id="circulation-measures-selection"
              label={
                <FormattedMessage
                  id="ui-reports.circulationReports.measures.label"
                  defaultMessage="Measures"
                />
              }
              placeholder={
                <FormattedMessage
                  id="ui-reports.circulationReports.measures.placeholder"
                  defaultMessage="Choose measures..."
                />
              }
              dataOptions={measuresOptions}
              error={meta.touched && meta.error}
            />
          )}
        </Field>
      </div>
    </Accordion>
  );
}

CirculationMeasuresSelector.propTypes = {
  formValues: PropTypes.object.isRequired,
};

export default CirculationMeasuresSelector;
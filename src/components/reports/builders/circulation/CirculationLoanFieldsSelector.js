import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import {
  Accordion,
  FilterAccordionHeader,
  MultiSelection,
  RepeatableField,
  Row,
  Col,
  Label,
} from '@folio/stripes/components';
import { FormattedMessage, useIntl } from 'react-intl';
import FieldFilter from '../advanced/fields/filters/components/FieldFilter';
import OperatorField from '../advanced/fields/filters/components/OperatorField';
import ValueField from '../advanced/fields/filters/components/ValueField';
import { useCirculationFieldLabels } from '../../../../helpers/circulationFieldLabels';

function CirculationLoanFieldsSelector({ formValues }) {
  const [filterToggle, setFilterToggle] = useState(true);
  const intl = useIntl();
  const fieldLabels = useCirculationFieldLabels();

  const loanFieldOptions = [
    { value: 'circulation_view.loan_id', label: fieldLabels['circulation_view.loan_id'] },
    { value: 'circulation_view.loan_date', label: fieldLabels['circulation_view.loan_date'] },
    { value: 'circulation_view.due_date', label: fieldLabels['circulation_view.due_date'] },
    { value: 'circulation_view.return_date', label: fieldLabels['circulation_view.return_date'] },
    { value: 'circulation_view.loan_status', label: fieldLabels['circulation_view.loan_status'] },
    { value: 'circulation_view.loan_action', label: fieldLabels['circulation_view.loan_action'] },
    { value: 'circulation_view.renewal_count', label: fieldLabels['circulation_view.renewal_count'] },
    { value: 'circulation_view.loan_created_date', label: fieldLabels['circulation_view.loan_created_date'] },
    { value: 'circulation_view.loan_updated_date', label: fieldLabels['circulation_view.loan_updated_date'] },
  ];

  // Create cube members structure for loan fields
  const loanCubeMembers = [
    {
      name: 'circulation_view',
      dimensions: [
        {
          name: 'circulation_view.loan_id',
          type: 'string',
          label: fieldLabels['circulation_view.loan_id'],
        },
        {
          name: 'circulation_view.loan_date',
          type: 'time',
          label: fieldLabels['circulation_view.loan_date'],
        },
        {
          name: 'circulation_view.due_date',
          type: 'time',
          label: fieldLabels['circulation_view.due_date'],
        },
        {
          name: 'circulation_view.return_date',
          type: 'time',
          label: fieldLabels['circulation_view.return_date'],
        },
        {
          name: 'circulation_view.loan_status',
          type: 'string',
          label: fieldLabels['circulation_view.loan_status'],
        },
        {
          name: 'circulation_view.loan_action',
          type: 'string',
          label: fieldLabels['circulation_view.loan_action'],
        },
        {
          name: 'circulation_view.renewal_count',
          type: 'number',
          label: fieldLabels['circulation_view.renewal_count'],
        },
        {
          name: 'circulation_view.loan_created_date',
          type: 'time',
          label: fieldLabels['circulation_view.loan_created_date'],
        },
        {
          name: 'circulation_view.loan_updated_date',
          type: 'time',
          label: fieldLabels['circulation_view.loan_updated_date'],
        },
      ],
    },
  ];

  const renderFiltersList = (field, index) => {
    const selectedMember = formValues?.loanFilters?.[index]?.member;
    const selectedOperator = formValues?.loanFilters?.[index]?.operator;

    const isDateRangeOperator = ['inDateRange', 'notInDateRange'].includes(
      selectedOperator,
    );

    return (
      <>
        <Row>
          <Col xs={4}>
            <FieldFilter
              field={field}
              index={index}
              currentCubeMembers={loanCubeMembers}
              disabled={false}
              fieldType="dimensions"
            />
          </Col>
          <Col xs={4}>
            <OperatorField
              field={field}
              index={index}
              disabled={false}
              currentCubeMembers={loanCubeMembers}
              fieldType="dimensions"
              selectedMember={selectedMember}
            />
          </Col>
          {!isDateRangeOperator && (
            <Col xs={4}>
              <ValueField
                field={field}
                index={index}
                currentCubeMembers={loanCubeMembers}
                disabled={false}
                fieldType="dimensions"
                selectedMember={selectedMember}
                selectedOperator={selectedOperator}
                formValues={formValues}
              />
            </Col>
          )}
        </Row>
        {isDateRangeOperator && (
          <Row>
            <Col xs={12}>
              <ValueField
                field={field}
                index={index}
                currentCubeMembers={loanCubeMembers}
                disabled={false}
                fieldType="dimensions"
                selectedMember={selectedMember}
                selectedOperator={selectedOperator}
                formValues={formValues}
              />
            </Col>
          </Row>
        )}
      </>
    );
  };

  return (
    <Accordion
      label={
        <h2>
          <FormattedMessage
            id="ui-reports.circulationReports.loanFields.title"
            defaultMessage="Loan Data"
          />
        </h2>
      }
      id="circulation-loan-fields"
      onToggle={() => setFilterToggle(!filterToggle)}
      open={filterToggle}
      separator
      header={FilterAccordionHeader}
    >
      <div style={{ marginBottom: '1rem' }}>
        <FormattedMessage
          id="ui-reports.circulationReports.loanFields.description"
          defaultMessage="Select fields and filters for loan data:"
        />
      </div>

      <Field
        name="loanFields"
        component={MultiSelection}
        label={
          <FormattedMessage
            id="ui-reports.circulationReports.loanFields.label"
            defaultMessage="Loan Fields"
          />
        }
        placeholder={intl.formatMessage({
          id: 'ui-reports.circulationReports.loanFields.placeholder',
          defaultMessage: 'Choose loan fields...',
        })}
        dataOptions={loanFieldOptions}
      />

      <Label>
        <FormattedMessage
          id="ui-reports.circulationReports.filtersSection.title"
          defaultMessage="Filters"
        />
      </Label>

      <FieldArray
        addLabel={intl.formatMessage({
          id: 'ui-reports.circulationReports.addLoanFilter',
          defaultMessage: 'Add loan filter',
        })}
        component={RepeatableField}
        name="loanFilters"
        onAdd={(fields) => fields.push('')}
        renderField={renderFiltersList}
      />
    </Accordion>
  );
}

CirculationLoanFieldsSelector.propTypes = {
  formValues: PropTypes.object.isRequired,
};

export default CirculationLoanFieldsSelector;
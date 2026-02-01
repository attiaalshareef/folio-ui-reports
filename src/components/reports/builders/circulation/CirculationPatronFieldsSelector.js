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

function CirculationPatronFieldsSelector({ formValues }) {
  const [filterToggle, setFilterToggle] = useState(true);
  const intl = useIntl();
  const fieldLabels = useCirculationFieldLabels();

  const patronFieldOptions = [
    { value: 'circulation_view.borrower_username', label: fieldLabels['circulation_view.borrower_username'] },
    { value: 'circulation_view.borrower_first_name', label: fieldLabels['circulation_view.borrower_first_name'] },
    { value: 'circulation_view.borrower_last_name', label: fieldLabels['circulation_view.borrower_last_name'] },
    { value: 'circulation_view.borrower_email', label: fieldLabels['circulation_view.borrower_email'] },
    { value: 'circulation_view.borrower_phone', label: fieldLabels['circulation_view.borrower_phone'] },
    { value: 'circulation_view.borrower_barcode', label: fieldLabels['circulation_view.borrower_barcode'] },
    { value: 'circulation_view.patron_group_name', label: fieldLabels['circulation_view.patron_group_name'] },
    { value: 'circulation_view.borrower_active', label: fieldLabels['circulation_view.borrower_active'] },
    { value: 'circulation_view.borrower_type', label: fieldLabels['circulation_view.borrower_type'] },
    { value: 'circulation_view.borrower_enrollment_date', label: fieldLabels['circulation_view.borrower_enrollment_date'] },
    { value: 'circulation_view.borrower_expiration_date', label: fieldLabels['circulation_view.borrower_expiration_date'] },
  ];

  // Create cube members structure for patron fields
  const patronCubeMembers = [
    {
      name: 'circulation_view',
      dimensions: [
        {
          name: 'circulation_view.borrower_id',
          type: 'string',
          label: fieldLabels['circulation_view.borrower_id'],
        },
        {
          name: 'circulation_view.borrower_barcode',
          type: 'string',
          label: fieldLabels['circulation_view.borrower_barcode'],
        },
        {
          name: 'circulation_view.borrower_username',
          type: 'string',
          label: fieldLabels['circulation_view.borrower_username'],
        },
        {
          name: 'circulation_view.borrower_first_name',
          type: 'string',
          label: fieldLabels['circulation_view.borrower_first_name'],
        },
        {
          name: 'circulation_view.borrower_last_name',
          type: 'string',
          label: fieldLabels['circulation_view.borrower_last_name'],
        },
        {
          name: 'circulation_view.borrower_email',
          type: 'string',
          label: fieldLabels['circulation_view.borrower_email'],
        },
        {
          name: 'circulation_view.borrower_phone',
          type: 'string',
          label: fieldLabels['circulation_view.borrower_phone'],
        },
        {
          name: 'circulation_view.borrower_active',
          type: 'boolean',
          label: fieldLabels['circulation_view.borrower_active'],
        },
        {
          name: 'circulation_view.borrower_type',
          type: 'string',
          label: fieldLabels['circulation_view.borrower_type'],
        },
        {
          name: 'circulation_view.borrower_enrollment_date',
          type: 'time',
          label: fieldLabels['circulation_view.borrower_enrollment_date'],
        },
        {
          name: 'circulation_view.borrower_expiration_date',
          type: 'time',
          label: fieldLabels['circulation_view.borrower_expiration_date'],
        },
        {
          name: 'circulation_view.patron_group_name',
          type: 'string',
          label: fieldLabels['circulation_view.patron_group_name'],
        },
      ],
    },
  ];

  const renderFiltersList = (field, index) => {
    const selectedMember = formValues?.patronFilters?.[index]?.member;
    const selectedOperator = formValues?.patronFilters?.[index]?.operator;

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
              currentCubeMembers={patronCubeMembers}
              disabled={false}
              fieldType="dimensions"
            />
          </Col>
          <Col xs={4}>
            <OperatorField
              field={field}
              index={index}
              disabled={false}
              currentCubeMembers={patronCubeMembers}
              fieldType="dimensions"
              selectedMember={selectedMember}
            />
          </Col>
          {!isDateRangeOperator && (
            <Col xs={4}>
              <ValueField
                field={field}
                index={index}
                currentCubeMembers={patronCubeMembers}
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
                currentCubeMembers={patronCubeMembers}
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
            id="ui-reports.circulationReports.patronFields.title"
            defaultMessage="Patron Data"
          />
        </h2>
      }
      id="circulation-patron-fields"
      onToggle={() => setFilterToggle(!filterToggle)}
      open={filterToggle}
      separator
      header={FilterAccordionHeader}
    >
      <div style={{ marginBottom: '1rem' }}>
        <FormattedMessage
          id="ui-reports.circulationReports.patronFields.description"
          defaultMessage="Select fields and filters for patron data:"
        />
      </div>

      <Field
        name="patronFields"
        component={MultiSelection}
        label={
          <FormattedMessage
            id="ui-reports.circulationReports.patronFields.label"
            defaultMessage="Patron Fields"
          />
        }
        placeholder={intl.formatMessage({
          id: 'ui-reports.circulationReports.patronFields.placeholder',
          defaultMessage: 'Choose patron fields...',
        })}
        dataOptions={patronFieldOptions}
      />

      <Label>
        <FormattedMessage
          id="ui-reports.circulationReports.filtersSection.title"
          defaultMessage="Filters"
        />
      </Label>

      <FieldArray
        addLabel={intl.formatMessage({
          id: 'ui-reports.circulationReports.addPatronFilter',
          defaultMessage: 'Add patron filter',
        })}
        component={RepeatableField}
        name="patronFilters"
        onAdd={(fields) => fields.push('')}
        renderField={renderFiltersList}
      />
    </Accordion>
  );
}

CirculationPatronFieldsSelector.propTypes = {
  formValues: PropTypes.object.isRequired,
};

export default CirculationPatronFieldsSelector;
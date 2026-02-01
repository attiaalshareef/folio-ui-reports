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

function CirculationItemFieldsSelector({ formValues }) {
  const [filterToggle, setFilterToggle] = useState(true);
  const intl = useIntl();
  const fieldLabels = useCirculationFieldLabels();

  const itemFieldOptions = [
    { value: 'circulation_view.title', label: fieldLabels['circulation_view.title'] },
    { value: 'circulation_view.item_barcode', label: fieldLabels['circulation_view.item_barcode'] },
    { value: 'circulation_view.item_hrid', label: fieldLabels['circulation_view.item_hrid'] },
    { value: 'circulation_view.call_number', label: fieldLabels['circulation_view.call_number'] },
    { value: 'circulation_view.material_type', label: fieldLabels['circulation_view.material_type'] },
    { value: 'circulation_view.loan_type', label: fieldLabels['circulation_view.loan_type'] },
    { value: 'circulation_view.item_status', label: fieldLabels['circulation_view.item_status'] },
    { value: 'circulation_view.location_name', label: fieldLabels['circulation_view.location_name'] },
    { value: 'circulation_view.library_name', label: fieldLabels['circulation_view.library_name'] },
    { value: 'circulation_view.campus_name', label: fieldLabels['circulation_view.campus_name'] },
    { value: 'circulation_view.institution_name', label: fieldLabels['circulation_view.institution_name'] },
    { value: 'circulation_view.contributors', label: fieldLabels['circulation_view.contributors'] },
    { value: 'circulation_view.identifiers', label: fieldLabels['circulation_view.identifiers'] },
    { value: 'circulation_view.subjects', label: fieldLabels['circulation_view.subjects'] },
    { value: 'circulation_view.resource_type', label: fieldLabels['circulation_view.resource_type'] },
  ];

  // Create cube members structure for item fields
  const itemCubeMembers = [
    {
      name: 'circulation_view',
      dimensions: [
        {
          name: 'circulation_view.title',
          type: 'string',
          label: fieldLabels['circulation_view.title'],
        },
        {
          name: 'circulation_view.item_barcode',
          type: 'string',
          label: fieldLabels['circulation_view.item_barcode'],
        },
        {
          name: 'circulation_view.item_hrid',
          type: 'string',
          label: fieldLabels['circulation_view.item_hrid'],
        },
        {
          name: 'circulation_view.call_number',
          type: 'string',
          label: fieldLabels['circulation_view.call_number'],
        },
        {
          name: 'circulation_view.material_type',
          type: 'string',
          label: fieldLabels['circulation_view.material_type'],
        },
        {
          name: 'circulation_view.loan_type',
          type: 'string',
          label: fieldLabels['circulation_view.loan_type'],
        },
        {
          name: 'circulation_view.item_status',
          type: 'string',
          label: fieldLabels['circulation_view.item_status'],
        },
        {
          name: 'circulation_view.location_name',
          type: 'string',
          label: fieldLabels['circulation_view.location_name'],
        },
        {
          name: 'circulation_view.library_name',
          type: 'string',
          label: fieldLabels['circulation_view.library_name'],
        },
        {
          name: 'circulation_view.campus_name',
          type: 'string',
          label: fieldLabels['circulation_view.campus_name'],
        },
        {
          name: 'circulation_view.institution_name',
          type: 'string',
          label: fieldLabels['circulation_view.institution_name'],
        },
        {
          name: 'circulation_view.contributors',
          type: 'string',
          label: fieldLabels['circulation_view.contributors'],
        },
        {
          name: 'circulation_view.identifiers',
          type: 'string',
          label: fieldLabels['circulation_view.identifiers'],
        },
        {
          name: 'circulation_view.subjects',
          type: 'string',
          label: fieldLabels['circulation_view.subjects'],
        },
        {
          name: 'circulation_view.resource_type',
          type: 'string',
          label: fieldLabels['circulation_view.resource_type'],
        },
      ],
    },
  ];

  const renderFiltersList = (field, index) => {
    const selectedMember = formValues?.itemFilters?.[index]?.member;
    const selectedOperator = formValues?.itemFilters?.[index]?.operator;

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
              currentCubeMembers={itemCubeMembers}
              disabled={false}
              fieldType="dimensions"
            />
          </Col>
          <Col xs={4}>
            <OperatorField
              field={field}
              index={index}
              disabled={false}
              currentCubeMembers={itemCubeMembers}
              fieldType="dimensions"
              selectedMember={selectedMember}
            />
          </Col>
          {!isDateRangeOperator && (
            <Col xs={4}>
              <ValueField
                field={field}
                index={index}
                currentCubeMembers={itemCubeMembers}
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
                currentCubeMembers={itemCubeMembers}
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
            id="ui-reports.circulationReports.itemFields.title"
            defaultMessage="Item Data"
          />
        </h2>
      }
      id="circulation-item-fields"
      onToggle={() => setFilterToggle(!filterToggle)}
      open={filterToggle}
      separator
      header={FilterAccordionHeader}
    >
      <div style={{ marginBottom: '1rem' }}>
        <FormattedMessage
          id="ui-reports.circulationReports.itemFields.description"
          defaultMessage="Select fields and filters for item and bibliographic data:"
        />
      </div>

      <Field
        name="itemFields"
        component={MultiSelection}
        label={
          <FormattedMessage
            id="ui-reports.circulationReports.itemFields.label"
            defaultMessage="Item Fields"
          />
        }
        placeholder={intl.formatMessage({
          id: 'ui-reports.circulationReports.itemFields.placeholder',
          defaultMessage: 'Choose item fields...',
        })}
        dataOptions={itemFieldOptions}
      />

      <Label>
        <FormattedMessage
          id="ui-reports.circulationReports.filtersSection.title"
          defaultMessage="Filters"
        />
      </Label>

      <FieldArray
        addLabel={intl.formatMessage({
          id: 'ui-reports.circulationReports.addItemFilter',
          defaultMessage: 'Add item filter',
        })}
        component={RepeatableField}
        name="itemFilters"
        onAdd={(fields) => fields.push('')}
        renderField={renderFiltersList}
      />
    </Accordion>
  );
}

CirculationItemFieldsSelector.propTypes = {
  formValues: PropTypes.object.isRequired,
};

export default CirculationItemFieldsSelector;
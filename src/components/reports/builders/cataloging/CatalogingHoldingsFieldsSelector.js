import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, useIntl } from 'react-intl';
import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import { 
  Accordion, 
  FilterAccordionHeader, 
  MultiSelection, 
  RepeatableField,
  Row,
  Col,
  Label
} from '@folio/stripes/components';
import FieldFilter from '../advanced/fields/filters/components/FieldFilter';
import OperatorField from '../advanced/fields/filters/components/OperatorField';
import ValueField from '../advanced/fields/filters/components/ValueField';
import { useCatalogingFieldLabels } from '../../../../helpers/catalogingFieldLabels';

const CatalogingHoldingsFieldsSelector = ({ formValues }) => {
  const [filterToggle, setFilterToggle] = useState(true);
  const intl = useIntl();
  const fieldLabels = useCatalogingFieldLabels();

  const holdingsFieldsOptions = [
    { value: 'cataloging_view.holdings_hrid', label: intl.formatMessage({ id: 'ui-reports.catalogingReports.holdingsFields.hrid', defaultMessage: 'HRID' }) },
    { value: 'cataloging_view.call_number', label: intl.formatMessage({ id: 'ui-reports.catalogingReports.holdingsFields.callNumber', defaultMessage: 'Call Number' }) },
    { value: 'cataloging_view.call_number_type', label: intl.formatMessage({ id: 'ui-reports.catalogingReports.holdingsFields.callNumberType', defaultMessage: 'Call Number Type' }) },
    { value: 'cataloging_view.location_name', label: intl.formatMessage({ id: 'ui-reports.catalogingReports.holdingsFields.locationName', defaultMessage: 'Location Name' }) },
    { value: 'cataloging_view.library_name', label: intl.formatMessage({ id: 'ui-reports.catalogingReports.holdingsFields.libraryName', defaultMessage: 'Library Name' }) },
    { value: 'cataloging_view.campus_name', label: intl.formatMessage({ id: 'ui-reports.catalogingReports.holdingsFields.campusName', defaultMessage: 'Campus Name' }) },
    { value: 'cataloging_view.institution_name', label: intl.formatMessage({ id: 'ui-reports.catalogingReports.holdingsFields.institutionName', defaultMessage: 'Institution Name' }) },
    { value: 'cataloging_view.holdings_notes', label: intl.formatMessage({ id: 'ui-reports.catalogingReports.holdingsFields.notes', defaultMessage: 'Notes' }) },
    { value: 'cataloging_view.holdings_admin_notes', label: intl.formatMessage({ id: 'ui-reports.catalogingReports.holdingsFields.adminNotes', defaultMessage: 'Administrative Notes' }) },
    { value: 'cataloging_view.holdings_created_date', label: intl.formatMessage({ id: 'ui-reports.catalogingReports.holdingsFields.creationDate', defaultMessage: 'Created Date' }) },
    { value: 'cataloging_view.holdings_updated_date', label: intl.formatMessage({ id: 'ui-reports.catalogingReports.holdingsFields.updatedDate', defaultMessage: 'Updated Date' }) },
  ];

  const holdingsCubeMembers = [
    {
      name: 'cataloging_view',
      dimensions: [
        { name: 'cataloging_view.holdings_hrid', type: 'string', label: fieldLabels['cataloging_view.holdings_hrid'] },
        { name: 'cataloging_view.call_number', type: 'string', label: fieldLabels['cataloging_view.call_number'] },
        { name: 'cataloging_view.holdings_created_date', type: 'time', label: fieldLabels['cataloging_view.holdings_created_date'] },
        { name: 'cataloging_view.holdings_updated_date', type: 'time', label: fieldLabels['cataloging_view.holdings_updated_date'] },
      ]
    },
    {
      name: 'call_number_type',
      dimensions: [
        { name: 'call_number_type.id', type: 'string', label: fieldLabels['call_number_type.id'] },
        { name: 'call_number_type.name', type: 'string', label: fieldLabels['call_number_type.name'] },
      ],
      meta: { isReferenceTable: true }
    },
    {
      name: 'location',
      dimensions: [
        { name: 'location.id', type: 'string', label: fieldLabels['location.id'] },
        { name: 'location.name', type: 'string', label: fieldLabels['location.name'] },
        { name: 'location.code', type: 'string', label: fieldLabels['location.code'] },
      ],
      meta: { isReferenceTable: true }
    },
    {
      name: 'loclibrary',
      dimensions: [
        { name: 'loclibrary.id', type: 'string', label: fieldLabels['loclibrary.id'] },
        { name: 'loclibrary.name', type: 'string', label: fieldLabels['loclibrary.name'] },
        { name: 'loclibrary.code', type: 'string', label: fieldLabels['loclibrary.code'] },
      ],
      meta: { isReferenceTable: true }
    },
    {
      name: 'loccampus',
      dimensions: [
        { name: 'loccampus.id', type: 'string', label: fieldLabels['loccampus.id'] },
        { name: 'loccampus.name', type: 'string', label: fieldLabels['loccampus.name'] },
        { name: 'loccampus.code', type: 'string', label: fieldLabels['loccampus.code'] },
      ],
      meta: { isReferenceTable: true }
    },
    {
      name: 'locinstitution',
      dimensions: [
        { name: 'locinstitution.id', type: 'string', label: fieldLabels['locinstitution.id'] },
        { name: 'locinstitution.name', type: 'string', label: fieldLabels['locinstitution.name'] },
        { name: 'locinstitution.code', type: 'string', label: fieldLabels['locinstitution.code'] },
      ],
      meta: { isReferenceTable: true }
    }
  ];

  const renderFiltersList = (field, index) => {
    const selectedMember = formValues?.holdingsFilters?.[index]?.member;
    const selectedOperator = formValues?.holdingsFilters?.[index]?.operator;
    
    return (
      <Row>
        <Col xs={4}>
          <FieldFilter
            field={field}
            index={index}
            currentCubeMembers={holdingsCubeMembers}
            disabled={false}
            fieldType="dimensions"
          />
        </Col>
        <Col xs={4}>
          <OperatorField 
            field={field} 
            index={index} 
            disabled={false}
            currentCubeMembers={holdingsCubeMembers}
            fieldType="dimensions"
            selectedMember={selectedMember}
          />
        </Col>
        <Col xs={4}>
          <ValueField
            field={field}
            index={index}
            currentCubeMembers={holdingsCubeMembers}
            disabled={false}
            fieldType="dimensions"
            selectedMember={selectedMember}
            selectedOperator={selectedOperator}
            formValues={formValues}
          />
        </Col>
      </Row>
    );
  };

  return (
    <Accordion
      label={
        <h2>
          <FormattedMessage 
            id="ui-reports.catalogingReports.holdingsFields.title" 
            defaultMessage="Holdings Data"
          />
        </h2>
      }
      id="cataloging-holdings-fields"
      onToggle={() => setFilterToggle(!filterToggle)}
      open={filterToggle}
      separator
      header={FilterAccordionHeader}
    >
      <div style={{ marginBottom: '1rem' }}>
        <FormattedMessage
          id="ui-reports.catalogingReports.holdingsFields.description"
          defaultMessage="Select fields and filters for holdings data:"
        />
      </div>
      
      <Field
        name="holdingsFields"
        component={MultiSelection}
        label={
          <FormattedMessage
            id="ui-reports.catalogingReports.holdingsFields.label"
            defaultMessage="Holdings Fields"
          />
        }
        placeholder={intl.formatMessage({
          id: 'ui-reports.catalogingReports.holdingsFields.placeholder',
          defaultMessage: 'Choose holdings fields...',
        })}
        dataOptions={holdingsFieldsOptions}
      />

      <Label>
        <FormattedMessage
          id="ui-reports.catalogingReports.filtersSection.title"
          defaultMessage="Filters"
        />
      </Label>
      
      <FieldArray
        addLabel={intl.formatMessage({
          id: 'ui-reports.catalogingReports.addHoldingsFilter',
          defaultMessage: 'Add holdings filter',
        })}
        component={RepeatableField}
        name="holdingsFilters"
        onAdd={(fields) => fields.push('')}
        renderField={renderFiltersList}
      />
    </Accordion>
  );
};

CatalogingHoldingsFieldsSelector.propTypes = {
  formValues: PropTypes.object,
};

export default CatalogingHoldingsFieldsSelector;
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

const CatalogingItemFieldsSelector = ({ formValues }) => {
  const [filterToggle, setFilterToggle] = useState(true);
  const intl = useIntl();
  const fieldLabels = useCatalogingFieldLabels();

  const itemFieldsOptions = [
    { value: 'cataloging_view.item_hrid', label: intl.formatMessage({ id: 'ui-reports.catalogingReports.itemFields.hrid', defaultMessage: 'HRID' }) },
    { value: 'cataloging_view.barcode', label: intl.formatMessage({ id: 'ui-reports.catalogingReports.itemFields.barcode', defaultMessage: 'Barcode' }) },
    { value: 'cataloging_view.item_status', label: intl.formatMessage({ id: 'ui-reports.catalogingReports.itemFields.statusName', defaultMessage: 'Status' }) },
    { value: 'cataloging_view.material_type', label: intl.formatMessage({ id: 'ui-reports.catalogingReports.itemFields.materialTypeName', defaultMessage: 'Material Type' }) },
    { value: 'cataloging_view.loan_type', label: intl.formatMessage({ id: 'ui-reports.catalogingReports.itemFields.loanTypeName', defaultMessage: 'Loan Type' }) },
    { value: 'cataloging_view.copy_number', label: intl.formatMessage({ id: 'ui-reports.catalogingReports.itemFields.copyNumber', defaultMessage: 'Copy Number' }) },
    { value: 'cataloging_view.item_notes', label: intl.formatMessage({ id: 'ui-reports.catalogingReports.itemFields.notes', defaultMessage: 'Notes' }) },
    { value: 'cataloging_view.item_admin_notes', label: intl.formatMessage({ id: 'ui-reports.catalogingReports.itemFields.adminNotes', defaultMessage: 'Administrative Notes' }) },
    { value: 'cataloging_view.item_created_date', label: intl.formatMessage({ id: 'ui-reports.catalogingReports.itemFields.creationDate', defaultMessage: 'Created Date' }) },
    { value: 'cataloging_view.item_updated_date', label: intl.formatMessage({ id: 'ui-reports.catalogingReports.itemFields.updatedDate', defaultMessage: 'Updated Date' }) },
    { value: 'cataloging_view.status_date', label: intl.formatMessage({ id: 'ui-reports.catalogingReports.itemFields.statusDate', defaultMessage: 'Status Date' }) },
  ];

  const itemCubeMembers = [
    {
      name: 'cataloging_view',
      dimensions: [
        { name: 'cataloging_view.item_hrid', type: 'string', label: fieldLabels['cataloging_view.item_hrid'] },
        { name: 'cataloging_view.barcode', type: 'string', label: fieldLabels['cataloging_view.barcode'] },
        { name: 'cataloging_view.item_status', type: 'string', label: fieldLabels['cataloging_view.item_status'] },
        { name: 'cataloging_view.copy_number', type: 'string', label: fieldLabels['cataloging_view.copy_number'] },
        { name: 'cataloging_view.item_created_date', type: 'time', label: fieldLabels['cataloging_view.item_created_date'] },
        { name: 'cataloging_view.item_updated_date', type: 'time', label: fieldLabels['cataloging_view.item_updated_date'] },
        { name: 'cataloging_view.status_date', type: 'time', label: fieldLabels['cataloging_view.status_date'] },
      ]
    },
    {
      name: 'material_type',
      dimensions: [
        { name: 'material_type.id', type: 'string', label: fieldLabels['material_type.id'] },
        { name: 'material_type.name', type: 'string', label: fieldLabels['material_type.name'] },
      ],
      meta: { isReferenceTable: true }
    },
    {
      name: 'loan_type',
      dimensions: [
        { name: 'loan_type.id', type: 'string', label: fieldLabels['loan_type.id'] },
        { name: 'loan_type.name', type: 'string', label: fieldLabels['loan_type.name'] },
      ],
      meta: { isReferenceTable: true }
    }
  ];

  const renderFiltersList = (field, index) => {
    const selectedMember = formValues?.itemFilters?.[index]?.member;
    const selectedOperator = formValues?.itemFilters?.[index]?.operator;
    
    return (
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
      </Row>
    );
  };

  return (
    <Accordion
      label={
        <h2>
          <FormattedMessage 
            id="ui-reports.catalogingReports.itemFields.title" 
            defaultMessage="Item Data"
          />
        </h2>
      }
      id="cataloging-item-fields"
      onToggle={() => setFilterToggle(!filterToggle)}
      open={filterToggle}
      separator
      header={FilterAccordionHeader}
    >
      <div style={{ marginBottom: '1rem' }}>
        <FormattedMessage
          id="ui-reports.catalogingReports.itemFields.description"
          defaultMessage="Select fields and filters for item data:"
        />
      </div>
      
      <Field
        name="itemFields"
        component={MultiSelection}
        label={
          <FormattedMessage
            id="ui-reports.catalogingReports.itemFields.label"
            defaultMessage="Item Fields"
          />
        }
        placeholder={intl.formatMessage({
          id: 'ui-reports.catalogingReports.itemFields.placeholder',
          defaultMessage: 'Choose item fields...',
        })}
        dataOptions={itemFieldsOptions}
      />

      <Label>
        <FormattedMessage
          id="ui-reports.catalogingReports.filtersSection.title"
          defaultMessage="Filters"
        />
      </Label>
      
      <FieldArray
        addLabel={intl.formatMessage({
          id: 'ui-reports.catalogingReports.addItemFilter',
          defaultMessage: 'Add item filter',
        })}
        component={RepeatableField}
        name="itemFilters"
        onAdd={(fields) => fields.push('')}
        renderField={renderFiltersList}
      />
    </Accordion>
  );
};

CatalogingItemFieldsSelector.propTypes = {
  formValues: PropTypes.object,
};

export default CatalogingItemFieldsSelector;
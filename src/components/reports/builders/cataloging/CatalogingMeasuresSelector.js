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
  Label,
} from '@folio/stripes/components';
import FieldFilter from '../advanced/fields/filters/components/FieldFilter';
import OperatorField from '../advanced/fields/filters/components/OperatorField';
import ValueField from '../advanced/fields/filters/components/ValueField';

const CatalogingMeasuresSelector = ({ formValues }) => {
  const [filterToggle, setFilterToggle] = useState(true);
  const intl = useIntl();

  const measuresOptions = [
    {
      value: 'cataloging_view.total_instances',
      label: intl.formatMessage({
        id: 'ui-reports.catalogingReports.measures.instanceCount',
        defaultMessage: 'Instance Count',
      }),
    },
    {
      value: 'cataloging_view.total_holdings',
      label: intl.formatMessage({
        id: 'ui-reports.catalogingReports.measures.holdingsCount',
        defaultMessage: 'Holdings Count',
      }),
    },
    {
      value: 'cataloging_view.total_items',
      label: intl.formatMessage({
        id: 'ui-reports.catalogingReports.measures.itemCount',
        defaultMessage: 'Item Count',
      }),
    },
    {
      value: 'cataloging_view.instances_created',
      label: intl.formatMessage({
        id: 'ui-reports.catalogingReports.measures.instancesCreated',
        defaultMessage: 'Instances Created',
      }),
    },
    {
      value: 'cataloging_view.holdings_created',
      label: intl.formatMessage({
        id: 'ui-reports.catalogingReports.measures.holdingsCreated',
        defaultMessage: 'Holdings Created',
      }),
    },
    {
      value: 'cataloging_view.items_created',
      label: intl.formatMessage({
        id: 'ui-reports.catalogingReports.measures.itemsCreated',
        defaultMessage: 'Items Created',
      }),
    },
    {
      value: 'cataloging_view.instances_updated',
      label: intl.formatMessage({
        id: 'ui-reports.catalogingReports.measures.instancesUpdated',
        defaultMessage: 'Instances Updated',
      }),
    },
    {
      value: 'cataloging_view.holdings_updated',
      label: intl.formatMessage({
        id: 'ui-reports.catalogingReports.measures.holdingsUpdated',
        defaultMessage: 'Holdings Updated',
      }),
    },
    {
      value: 'cataloging_view.items_updated',
      label: intl.formatMessage({
        id: 'ui-reports.catalogingReports.measures.itemsUpdated',
        defaultMessage: 'Items Updated',
      }),
    },
    {
      value: 'cataloging_view.instances_suppressed',
      label: intl.formatMessage({
        id: 'ui-reports.catalogingReports.measures.instancesSuppressed',
        defaultMessage: 'Instances Suppressed',
      }),
    },
  ];

  const measuresCubeMembers = [
    {
      name: 'cataloging_view',
      measures: [
        { name: 'cataloging_view.total_instances', type: 'number' },
        { name: 'cataloging_view.total_holdings', type: 'number' },
        { name: 'cataloging_view.total_items', type: 'number' },
        { name: 'cataloging_view.instances_created', type: 'number' },
        { name: 'cataloging_view.holdings_created', type: 'number' },
        { name: 'cataloging_view.items_created', type: 'number' },
        { name: 'cataloging_view.instances_updated', type: 'number' },
        { name: 'cataloging_view.holdings_updated', type: 'number' },
        { name: 'cataloging_view.items_updated', type: 'number' },
        { name: 'cataloging_view.instances_suppressed', type: 'number' },
      ],
    },
  ];

  const renderFiltersList = (field, index) => {
    const selectedMember = formValues?.measuresFilters?.[index]?.member;
    const selectedOperator = formValues?.measuresFilters?.[index]?.operator;

    return (
      <Row>
        <Col xs={4}>
          <FieldFilter
            field={field}
            index={index}
            currentCubeMembers={measuresCubeMembers}
            disabled={false}
            fieldType="measures"
          />
        </Col>
        <Col xs={4}>
          <OperatorField
            field={field}
            index={index}
            disabled={false}
            currentCubeMembers={measuresCubeMembers}
            fieldType="measures"
            selectedMember={selectedMember}
          />
        </Col>
        <Col xs={4}>
          <ValueField
            field={field}
            index={index}
            currentCubeMembers={measuresCubeMembers}
            disabled={false}
            fieldType="measures"
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
            id="ui-reports.catalogingReports.measures.title"
            defaultMessage="Statistics & Measures"
          />
        </h2>
      }
      id="cataloging-measures"
      onToggle={() => setFilterToggle(!filterToggle)}
      open={filterToggle}
      separator
      header={FilterAccordionHeader}
    >
      <div style={{ marginBottom: '1rem' }}>
        <FormattedMessage
          id="ui-reports.catalogingReports.measures.description"
          defaultMessage="Select statistical measures and filters:"
        />
      </div>

      <Field
        name="measures"
        component={MultiSelection}
        label={
          <FormattedMessage
            id="ui-reports.catalogingReports.measures.label"
            defaultMessage="Measures"
          />
        }
        placeholder={intl.formatMessage({
          id: 'ui-reports.catalogingReports.measures.placeholder',
          defaultMessage: 'Choose measures...',
        })}
        dataOptions={measuresOptions}
      />

      <Label>
        <FormattedMessage
          id="ui-reports.catalogingReports.filtersSection.title"
          defaultMessage="Filters"
        />
      </Label>

      <FieldArray
        addLabel={intl.formatMessage({
          id: 'ui-reports.catalogingReports.addMeasuresFilter',
          defaultMessage: 'Add measures filter',
        })}
        component={RepeatableField}
        name="measuresFilters"
        onAdd={(fields) => fields.push('')}
        renderField={renderFiltersList}
      />
    </Accordion>
  );
};

CatalogingMeasuresSelector.propTypes = {
  formValues: PropTypes.object,
};

export default CatalogingMeasuresSelector;

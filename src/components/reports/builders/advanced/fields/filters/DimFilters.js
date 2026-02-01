import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Accordion,
  Col,
  FilterAccordionHeader,
  RepeatableField,
  Row,
} from '@folio/stripes/components';
import { FormattedMessage } from 'react-intl';
import { FieldArray } from 'react-final-form-arrays';
import FieldFilter from './components/FieldFilter';
import OperatorField from './components/OperatorField';
import ValueField from './components/ValueField';

function DimFilters({ currentCubeMembers, disabled, formValues }) {
  const [filterToggle, setFilterToggle] = useState(true);

  const renderFiltersList = (field, index) => {
    // Get selected field and operator from form values
    const selectedMember = formValues?.dimFilters?.[index]?.member;
    const selectedOperator = formValues?.dimFilters?.[index]?.operator;
    
    return (
      <>
        <Row>
          <Col xs={4}>
            <FieldFilter
              field={field}
              index={index}
              currentCubeMembers={currentCubeMembers}
              disabled={disabled}
              fieldType="dimensions"
            />
          </Col>
          <Col xs={4}>
            <OperatorField 
              field={field} 
              index={index} 
              disabled={disabled}
              currentCubeMembers={currentCubeMembers}
              fieldType="dimensions"
              selectedMember={selectedMember}
            />
          </Col>
          <Col xs={4}>
            <ValueField
              field={field}
              index={index}
              currentCubeMembers={currentCubeMembers}
              disabled={disabled}
              fieldType="dimensions"
              selectedMember={selectedMember}
              selectedOperator={selectedOperator}
              formValues={formValues}
            />
          </Col>
        </Row>
      </>
    );
  };

  return (
    <>
      <Accordion
        id="query-builder-form-dim-filters-accordion"
        label={
          <FormattedMessage
            id="ui-reports.queryBuilder.dimFilters.Accordion.header"
            defaultMessage="Fields Filters"
          />
        }
        onToggle={() => setFilterToggle(!filterToggle)}
        open={filterToggle}
        separator
        header={FilterAccordionHeader}
      >
        <FieldArray
          addLabel="Add filter"
          component={RepeatableField}
          name="dimFilters"
          onAdd={(fields) => fields.push('')}
          renderField={renderFiltersList}
        />
      </Accordion>
    </>
  );
}

DimFilters.propTypes = {
  currentCubeMembers: PropTypes.array.isRequired,
  disabled: PropTypes.bool.isRequired,
  formValues: PropTypes.object,
};

export default DimFilters;

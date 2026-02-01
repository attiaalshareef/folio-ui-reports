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
import SortByField from './components/SortByField';
import SortType from './components/SortType';

function SortByOptions({ selectedColumns, selectedMetrics, disabled }) {
  const [filterToggle, setFilterToggle] = useState(true);

  const renderFiltersList = (field, index) => {
    return (
      <>
        <Row>
          <Col xs={6}>
            <SortByField
              field={field}
              index={index}
              selectedColumns={selectedColumns}
              selectedMetrics={selectedMetrics}
              disabled={disabled}
            />
          </Col>
          <Col xs={6}>
            <SortType field={field} index={index} disabled={disabled} />
          </Col>
        </Row>
      </>
    );
  };

  return (
    <>
      <Accordion
        id="query-builder-form-sort-by-options-accordion"
        label={
          <FormattedMessage
            id="ui-reports.queryBuilder.sortByOptions.Accordion.header"
            defaultMessage="Sorting Options"
          />
        }
        onToggle={() => setFilterToggle(!filterToggle)}
        open={filterToggle}
        separator
        header={FilterAccordionHeader}
      >
        <FieldArray
          addLabel="Add sorting option"
          component={RepeatableField}
          name="orders"
          onAdd={(fields) => fields.push('')}
          renderField={renderFiltersList}
        />
      </Accordion>
    </>
  );
}

SortByOptions.propTypes = {
  selectedColumns: PropTypes.object.isRequired,
  selectedMetrics: PropTypes.arrayOf(PropTypes.object).isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default SortByOptions;

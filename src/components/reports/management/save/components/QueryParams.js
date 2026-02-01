import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { 
  Accordion, 
  FilterAccordionHeader,
  List,
  Card,
  KeyValue,
  Badge,
  NoValue
} from '@folio/stripes/components';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';

function QueryParams({ queryParams = [] }) {
  const [filterToggle, setFilterToggle] = useState(false);

  const renderQueryParam = (param, index) => (
    <Card 
      key={index}
      headerStart={<Badge>{param.operator}</Badge>}
      headerEnd={param.required && <Badge color="red">Required</Badge>}
    >
      <KeyValue 
        label="Field Name" 
        value={param.fieldName || <NoValue />}
      />
      <KeyValue 
        label="Default Value" 
        value={param.defaultValue || <NoValue />}
      />
      {param.description && (
        <KeyValue 
          label="Description" 
          value={param.description}
        />
      )}
    </Card>
  );

  return (
    <>
      <Accordion
        id="save-new-report-query-params-accordion"
        label={
          <FormattedMessage
            id="ui-reports.newReport.saveReportPane.QueryParams.accordion.header"
            defaultMessage="Query params"
          />
        }
        onToggle={() => setFilterToggle(!filterToggle)}
        open={filterToggle}
        separator
        header={FilterAccordionHeader}
      >
        {queryParams.length > 0 ? (
          <List
            items={queryParams}
            itemFormatter={renderQueryParam}
            isEmptyMessage={
              <FormattedMessage
                id="ui-reports.newReport.saveReportPane.QueryParams.noParams"
                defaultMessage="No query parameters defined"
              />
            }
          />
        ) : (
          <FormattedMessage
            id="ui-reports.newReport.saveReportPane.QueryParams.noParams"
            defaultMessage="No query parameters defined"
          />
        )}
      </Accordion>
    </>
  );
}

QueryParams.propTypes = {
  queryParams: PropTypes.arrayOf(PropTypes.shape({
    fieldName: PropTypes.string,
    operator: PropTypes.string,
    defaultValue: PropTypes.any,
    required: PropTypes.bool,
    description: PropTypes.string,
  })),
};

export default QueryParams;

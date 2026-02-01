import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';
import { Accordion, Datepicker, Row, Col } from '@folio/stripes/components';

const ProductivityDateRangeSelector = () => {
  return (
    <Accordion
      label={<FormattedMessage id="ui-reports.productivityReports.dateRange.title" />}
      id="productivity-date-range"
    >
      <Row>
        <Col xs={6}>
          <Field
            name="dateRange.startDate"
            component={Datepicker}
            label={<FormattedMessage id="ui-reports.productivityReports.dateRange.startDate" />}
            placeholder="Select start date"
          />
        </Col>
        <Col xs={6}>
          <Field
            name="dateRange.endDate"
            component={Datepicker}
            label={<FormattedMessage id="ui-reports.productivityReports.dateRange.endDate" />}
            placeholder="Select end date"
          />
        </Col>
      </Row>
    </Accordion>
  );
};

export default ProductivityDateRangeSelector;
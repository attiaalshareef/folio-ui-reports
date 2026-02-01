import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';
import { Accordion, RadioButton, Row, Col } from '@folio/stripes/components';

const ProductivityReportTypeSelector = () => {
  const reportTypes = [
    {
      value: 'individual',
      labelId: 'ui-reports.productivityReports.reportTypes.individual',
      descriptionId:
        'ui-reports.productivityReports.reportTypes.individualDesc',
    },
    {
      value: 'team',
      labelId: 'ui-reports.productivityReports.reportTypes.team',
      descriptionId: 'ui-reports.productivityReports.reportTypes.teamDesc',
    },
    {
      value: 'all',
      labelId: 'ui-reports.productivityReports.reportTypes.all',
      descriptionId: 'ui-reports.productivityReports.reportTypes.allDesc',
    },
    {
      value: 'comparison',
      labelId: 'ui-reports.productivityReports.reportTypes.comparison',
      descriptionId:
        'ui-reports.productivityReports.reportTypes.comparisonDesc',
    },
  ];

  return (
    <Accordion
      label={
        <FormattedMessage id="ui-reports.productivityReports.reportType.title" />
      }
      id="productivity-report-type"
    >
      <Row>
        {reportTypes.map((type) => (
          <Col xs={12} key={type.value}>
            <Field
              name="reportType"
              type="radio"
              value={type.value}
              component={RadioButton}
              label={
                <div>
                  <strong>
                    <FormattedMessage id={type.labelId} />
                  </strong>
                  <div
                    style={{
                      fontSize: '0.9rem',
                      color: '#666',
                      marginTop: '0.25rem',
                    }}
                  >
                    <FormattedMessage id={type.descriptionId} />
                  </div>
                </div>
              }
            />
          </Col>
        ))}
      </Row>
    </Accordion>
  );
};

export default ProductivityReportTypeSelector;

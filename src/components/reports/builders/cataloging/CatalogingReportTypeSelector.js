import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';
import { Accordion, RadioButton, Row, Col } from '@folio/stripes/components';

const CatalogingReportTypeSelector = () => {
  const reportTypes = [
    {
      value: 'detailed',
      labelId: 'ui-reports.catalogingReports.reportTypes.detailed',
      descriptionId: 'ui-reports.catalogingReports.reportTypes.detailedDesc',
    },
    {
      value: 'summary',
      labelId: 'ui-reports.catalogingReports.reportTypes.summary',
      descriptionId: 'ui-reports.catalogingReports.reportTypes.summaryDesc',
    },
    {
      value: 'statistical',
      labelId: 'ui-reports.catalogingReports.reportTypes.statistical',
      descriptionId: 'ui-reports.catalogingReports.reportTypes.statisticalDesc',
    },
  ];

  return (
    <Accordion
      label={
        <FormattedMessage 
          id="ui-reports.catalogingReports.reportType.title" 
          defaultMessage="Report Type"
        />
      }
      id="cataloging-report-type"
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
                    <FormattedMessage 
                      id={type.labelId} 
                      defaultMessage={type.value}
                    />
                  </strong>
                  <div style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.25rem' }}>
                    <FormattedMessage 
                      id={type.descriptionId} 
                      defaultMessage={`${type.value} report description`}
                    />
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

export default CatalogingReportTypeSelector;
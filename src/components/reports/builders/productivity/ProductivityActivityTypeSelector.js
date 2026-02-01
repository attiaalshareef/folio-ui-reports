import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';
import { Accordion, Checkbox, Row, Col } from '@folio/stripes/components';

const ProductivityActivityTypeSelector = () => {
  const activityTypes = [
    {
      name: 'includeCreated',
      labelId: 'ui-reports.productivityReports.activityTypes.created',
      descriptionId: 'ui-reports.productivityReports.activityTypes.createdDesc',
    },
    {
      name: 'includeUpdated',
      labelId: 'ui-reports.productivityReports.activityTypes.updated',
      descriptionId: 'ui-reports.productivityReports.activityTypes.updatedDesc',
    },
    {
      name: 'includeSuppressed',
      labelId: 'ui-reports.productivityReports.activityTypes.suppressed',
      descriptionId: 'ui-reports.productivityReports.activityTypes.suppressedDesc',
    },
  ];

  return (
    <Accordion
      label={
        <FormattedMessage id="ui-reports.productivityReports.activityType.title" />
      }
      id="productivity-activity-type"
    >
      <Row>
        {activityTypes.map((type) => (
          <Col xs={6} key={type.name}>
            <Field
              name={type.name}
              type="checkbox"
              component={Checkbox}
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

export default ProductivityActivityTypeSelector;

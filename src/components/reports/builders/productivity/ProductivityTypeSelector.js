import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';
import { Accordion, Checkbox, Row, Col } from '@folio/stripes/components';

const ProductivityTypeSelector = () => {
  const productivityTypes = [
    {
      name: 'includeInstances',
      labelId: 'ui-reports.productivityReports.productivityTypes.instances',
      descriptionId: 'ui-reports.productivityReports.productivityTypes.instancesDesc',
    },
    {
      name: 'includeHoldings',
      labelId: 'ui-reports.productivityReports.productivityTypes.holdings',
      descriptionId: 'ui-reports.productivityReports.productivityTypes.holdingsDesc',
    },
    {
      name: 'includeItems',
      labelId: 'ui-reports.productivityReports.productivityTypes.items',
      descriptionId: 'ui-reports.productivityReports.productivityTypes.itemsDesc',
    },
  ];

  return (
    <Accordion
      label={<FormattedMessage id="ui-reports.productivityReports.productivityType.title" />}
      id="productivity-type-selector"
    >
      <Row>
        {productivityTypes.map((type) => (
          <Col xs={4} key={type.name}>
            <Field
              name={type.name}
              type="checkbox"
              component={Checkbox}
              label={
                <div>
                  <strong><FormattedMessage id={type.labelId} /></strong>
                  <div style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.25rem' }}>
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

export default ProductivityTypeSelector;
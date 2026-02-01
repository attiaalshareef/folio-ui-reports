import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';
import { Accordion, Checkbox, Row, Col } from '@folio/stripes/components';

const ProductivityFieldsSelector = ({ values }) => {
  console.log('ProductivityFieldsSelector values:', values);
  const fieldGroups = [
    {
      id: 'staffInfo',
      labelId: 'ui-reports.productivityReports.fieldGroups.staffInfo',
      fields: [
        { name: 'staff_username', labelId: 'ui-reports.productivityReports.fields.username' },
        { name: 'first_name', labelId: 'ui-reports.productivityReports.fields.firstName' },
        { name: 'last_name', labelId: 'ui-reports.productivityReports.fields.lastName' },
        { name: 'email', labelId: 'ui-reports.productivityReports.fields.email' },
        { name: 'phone', labelId: 'ui-reports.productivityReports.fields.phone' },
        { name: 'staff_barcode', labelId: 'ui-reports.productivityReports.fields.staffBarcode' },
        { name: 'departments', labelId: 'ui-reports.productivityReports.fields.departments' },
        { name: 'active', labelId: 'ui-reports.productivityReports.fields.active' },
        { name: 'type', labelId: 'ui-reports.productivityReports.fields.userType' },
      ]
    },
    {
      id: 'dates',
      labelId: 'ui-reports.productivityReports.fieldGroups.dates',
      fields: [
        { name: 'instance_created_date', labelId: 'ui-reports.productivityReports.fields.instanceCreatedDate' },
        { name: 'instance_updated_date', labelId: 'ui-reports.productivityReports.fields.instanceUpdatedDate' },
        { name: 'staff_created_date', labelId: 'ui-reports.productivityReports.fields.staffCreatedDate' },
      ]
    }
  ];

  return (
    <div>
      {fieldGroups.map((group) => (
        <Accordion
          key={group.id}
          label={<FormattedMessage id={group.labelId} />}
          id={`productivity-fields-${group.id}`}
        >
          <Row>
            {group.fields.map((field) => (
              <Col xs={6} md={4} key={field.name}>
                <Field
                  name={`selectedFields.${field.name}`}
                  type="checkbox"
                  component={Checkbox}
                  label={<FormattedMessage id={field.labelId} />}
                />
              </Col>
            ))}
          </Row>
        </Accordion>
      ))}
    </div>
  );
};

export default ProductivityFieldsSelector;
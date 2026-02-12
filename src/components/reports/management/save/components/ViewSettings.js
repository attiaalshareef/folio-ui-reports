import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Accordion,
  FilterAccordionHeader,
  MultiSelection,
  Select,
  Row,
  Col
} from '@folio/stripes/components';
import { FormattedMessage, useIntl } from 'react-intl';
import { Field } from 'react-final-form';
import { required } from '../../../../../helpers/Validations';

function ViewSettings(props) {
  const [accordionToggle, setAccordionToggle] = useState(true);
  const intl = useIntl();

  const displayMethodsOptions = (props.reportDisplayMethods || []).map(method => ({
    label: intl.formatMessage({
      id: method.translationKey.id,
      defaultMessage: method.translationKey.defaultMessage
    }),
    value: method.value
  }));

  // Update form when display methods change
  useEffect(() => {
    if (props.reportDisplayMethods && props.reportDisplayMethods.length > 0) {
      // This will trigger form update through Field components
    }
  }, [props.reportDisplayMethods]);

  return (
    <>
      <Accordion
        id="save-new-report-view-settings-accordion"
        label={
          <FormattedMessage
            id="ui-reports.newReport.saveReportPane.ViewSettings.accordion.header"
            defaultMessage="Display settings"
          />
        }
        onToggle={() => setAccordionToggle(!accordionToggle)}
        open={accordionToggle}
        separator
        header={FilterAccordionHeader}
      >
        <Row>
          <Col xs={12}>
            <Field
              id="new-report-displayMethods-multiselect"
              name="displayMethods"
              component={MultiSelection}
              label={
                <FormattedMessage
                  id="ui-reports.newReport.fields.displayMethods.label"
                  defaultMessage="Display methods"
                />
              }
              placeholder={intl.formatMessage({
                id: 'ui-reports.newReport.fields.displayMethods.placeholder',
                defaultMessage: 'Choose display methods'
              })}
              dataOptions={displayMethodsOptions}
              required
              validate={required}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Field
              id="new-report-defaultDisplayMethod-select"
              name="defaultDisplayMethod"
              component={Select}
              label={
                <FormattedMessage
                  id="ui-reports.newReport.fields.defaultDisplayMethod.label"
                  defaultMessage="Default display method"
                />
              }
              placeholder={intl.formatMessage({
                id: 'ui-reports.newReport.fields.defaultDisplayMethod.placeholder',
                defaultMessage: 'Choose default display method'
              })}
              dataOptions={displayMethodsOptions}
              required
              validate={required}
            />
          </Col>
        </Row>
      </Accordion>
    </>
  );
}

ViewSettings.propTypes = {
  reportDisplayMethods: PropTypes.arrayOf(PropTypes.object)
};

export default ViewSettings;

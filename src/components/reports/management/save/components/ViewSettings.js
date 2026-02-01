import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Accordion,
  FilterAccordionHeader,
  MultiSelection,
  Select
} from '@folio/stripes/components';
import { FormattedMessage, useIntl } from 'react-intl';
import { Field } from 'react-final-form';
import { required } from '../../../../../helpers/Validations';

function ViewSettings(props) {
  const [accordionToggle, setAccordionToggle] = useState(true);
  const intl = useIntl();

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
          dataOptions={props.reportDisplayMethods.map(method => ({
            label: intl.formatMessage({
              id: method.translationKey.id,
              defaultMessage: method.translationKey.defaultMessage
            }),
            value: method.value
          }))}
          required
          validate={required}
        />
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
          dataOptions={props.reportDisplayMethods.map(method => ({
            label: intl.formatMessage({
              id: method.translationKey.id,
              defaultMessage: method.translationKey.defaultMessage
            }),
            value: method.value
          }))}
          required
          validate={required}
        />
      </Accordion>
    </>
  );
}

ViewSettings.propTypes = {
  reportDisplayMethods: PropTypes.arrayOf(PropTypes.object)
};

export default ViewSettings;

import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Col,
  Pane,
  PaneFooter,
  Paneset,
  Row,
  Select,
} from '@folio/stripes-components';
import { FormattedMessage, useIntl } from 'react-intl';
import { Field } from 'react-final-form';
import stripesFinalForm from '@folio/stripes/final-form';
import { required } from '../../helpers/Validations';

const REPORT_TYPES = [
  { value: 'numMetric', label: 'Numeric metrics' },
  { value: 'dimMetric', label: 'Dimensions metric' },
  { value: 'periodMetric', label: 'Periodical metric' },
  { value: 'list', label: 'Sorted list' }
];

function DefaultReportTypeForm({
  handleSubmit,
  pristine,
  submitting,
  form,
}) {
  const intl = useIntl();

  const renderPaneFooter = () => {
    return (
      <PaneFooter
        renderEnd={
          <Button
            buttonStyle="primary"
            disabled={pristine || submitting}
            id="default-report-type-settings-save-btn"
            marginBottom0
            type="submit"
          >
            <FormattedMessage id="stripes-core.button.save" />
          </Button>
        }
        renderStart={
          <Button
            buttonStyle="default"
            disabled={pristine || submitting}
            id="default-report-type-settings-cancel-btn"
            marginBottom0
            onClick={() => form.reset()}
          >
            <FormattedMessage id="stripes-components.cancel" />
          </Button>
        }
      />
    );
  };

  return (
    <form
      id="form-default-report-type-settings"
      onSubmit={handleSubmit}
      style={{ width: 'inherit' }}
    >
      <Paneset>
        <Pane
          fluidContentWidth
          footer={renderPaneFooter()}
          id="default-report-type-settings-pane"
          paneTitle={
            <FormattedMessage
              id="ui-reports.settings.sections.general.defaultReportType.paneTitle"
              defaultMessage="Default report type"
            />
          }
        >
          <Row>
            <Col xs={6}>
              <Field
                id="settings-defaultReportType-select-field"
                name="defaultReportType"
                component={Select}
                label={
                  <FormattedMessage
                    id="ui-reports.settings.sections.general.defaultReportType.field.label"
                    defaultMessage="Default report type"
                  />
                }
                placeholder={intl.formatMessage({
                  id: 'ui-reports.settings.sections.general.defaultReportType.field.placeholder',
                  defaultMessage: 'Select report type',
                })}
                required
                validate={required}
                dataOptions={REPORT_TYPES.map((option) => ({
                  label: intl.formatMessage({
                    id: `ui-reports.reportTypes.label.${option.value}`,
                    defaultMessage: option.label,
                  }),
                  value: option.value,
                }))}
              />
            </Col>
          </Row>
        </Pane>
      </Paneset>
    </form>
  );
}

DefaultReportTypeForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  form: PropTypes.object.isRequired,
};

export default stripesFinalForm({
  navigationCheck: true,
  subscription: {
    values: true,
  },
  validateOnBlur: true,
})(DefaultReportTypeForm);
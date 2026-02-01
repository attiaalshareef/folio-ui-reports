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
  TextField,
} from '@folio/stripes-components';
import { FormattedMessage, useIntl } from 'react-intl';
import { Field } from 'react-final-form';
import stripesFinalForm from '@folio/stripes/final-form';
import { required } from '../../helpers/Validations';

function DefaultDashboardForm({
  handleSubmit,
  pristine,
  submitting,
  dashboards,
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
            id="default-dashboard-settings-save-btn"
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
            id="default-dashboard-settings-cancel-btn"
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
      id="form-default-dashboard-settings"
      onSubmit={handleSubmit}
      style={{ width: 'inherit' }}
    >
      <Paneset>
        <Pane
          fluidContentWidth
          footer={renderPaneFooter()}
          id="default-dashboard-settings-pane"
          paneTitle={
            <FormattedMessage
              id="ui-reports.settings.sections.dashboards.defaultDashboard.paneTitle"
              defaultMessage="Default dashboard"
            />
          }
        >
          <Row>
            <Col xs={6}>
              <Field
                id="setttings-defaultDashboard-text-field"
                name="defaultDashboard"
                component={Select}
                label={
                  <FormattedMessage
                    id="ui-reports.settings.sections.dashboards.defaultDashboard.field.label"
                    defaultMessage="Default dashboard"
                  />
                }
                placeholder={intl.formatMessage({
                  id: 'ui-reports.settings.sections.dashboards.defaultDashboard.field.placeholder',
                  defaultMessage: 'Select dashboard',
                })}
                required
                validate={required}
                dataOptions={dashboards?.map((option) => ({
                  label: intl.formatMessage({
                    id: `ui-reports.dashboards.name.${option.name}`,
                    defaultMessage: option.name,
                  }),
                  value: option.id,
                }))}
              />
            </Col>
          </Row>
        </Pane>
      </Paneset>
    </form>
  );
}

DefaultDashboardForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  form: PropTypes.object.isRequired,
  dashboards: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default stripesFinalForm({
  navigationCheck: true,
  subscription: {
    values: true,
  },
  mutators: {
    resetZipFileField: (args, state) => {
      const field = state.fields[args[0]];
      field.change(args[1]);
      state.formState.submitFailed = true;
    },
  },
  validateOnBlur: true,
})(DefaultDashboardForm);

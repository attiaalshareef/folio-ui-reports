import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, useIntl } from 'react-intl';
import {
  Button,
  Col,
  Icon,
  Pane,
  PaneFooter,
  Paneset,
  Row,
  Select,
  TextArea,
  TextField,
} from '@folio/stripes/components';
import stripesFinalForm from '@folio/stripes/final-form';
import { Field } from 'react-final-form';

import { FcBarChart } from 'react-icons/fc';
import { AppIcon } from '@folio/stripes-core';
import WidgetsList from './components/WidgetsList';
import WidgetReportData from './components/WidgetReportData';
import { required } from '../../../helpers/Validations';

function WidgetForm({
  pristine,
  submitting,
  handleSubmit,
  form,
  handleClose,
  editMode,
  initialValues,
  currentDashName,
  currentReport,
  setCurrentReport,
  selectedReports,
  setSelectedReports,
  widgetType,
  setWidgetType,
  isLoading,
}) {
  const intl = useIntl();

  const renderPaneFooter = () => {
    return (
      <PaneFooter
        id="widget-form-pane-footer"
        renderEnd={
          <Button
            buttonStyle="primary"
            disabled={pristine || submitting || isLoading}
            id="widget-form-pane-save-btn"
            marginBottom0
            type="submit"
            onClick={async (e) => {
              e.preventDefault();
              await handleSubmit();
              form.reset();
              handleClose();
            }}
          >
            <FormattedMessage
              id="ui-reports.dashboards.widgetForm.save.btn"
              defaultMessage="Save & Close"
            />
          </Button>
        }
        renderStart={
          <>
            <Button
              buttonStyle="default"
              id="widget-form-pane-cancel-btn"
              marginBottom0
              onClick={() => handleClose()}
            >
              <FormattedMessage
                id="ui-reports.dashboards.widgetForm.cancel.btn"
                defaultMessage="Cancel"
              />
            </Button>
          </>
        }
      />
    );
  };
  return (
    <Paneset>
      <Pane
        appIcon={<AppIcon app="reports" />}
        dismissible
        onClose={() => handleClose()}
        footer={renderPaneFooter()}
        id="widget-form-pane"
        centerContent
        paneTitle={
          editMode ? (
            <FormattedMessage
              id="ui-reports.dashboards.widgetForm.paneTitle.editMode"
              values={{ widgetName: initialValues.widgetName }}
              defaultMessage="Edit {widgetName}"
            />
          ) : (
            <FormattedMessage
              id="ui-reports.dashboards.widgets.addNewWidget.btn"
              defaultMessage="Create new widget"
            />
          )
        }
      >
        <form id="widget-form" onSubmit={handleSubmit}>
          <Row>
            <Col xs={6}>
              <TextField
                id="form-widget-name-textField"
                // name="widgetName"
                label={
                  <FormattedMessage
                    id="ui-reports.dashboards.widgetForm.dashNameField.label"
                    defaultMessage="Dashboard name"
                  />
                }
                value={intl.formatMessage({
                  id: `ui-reports.dashboards.name.${currentDashName}`,
                  defaultMessage: currentDashName,
                })}
                disabled
              />
            </Col>
            <Col xs={6}>
              <Field
                id="form-widget-name-textField"
                name="widgetName"
                component={TextField}
                label={
                  <FormattedMessage
                    id="ui-reports.dashboards.widgetForm.widgetNameField.label"
                    defaultMessage="Widget name"
                  />
                }
                placeholder={intl.formatMessage({
                  id: 'ui-reports.dashboards.widgetForm.widgetNameField.placeholder',
                  defaultMessage: 'Enter widget name',
                })}
                required
                validate={required}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
              <Field
                id="form-widget-desc-textField"
                name="widgetDesc"
                component={TextArea}
                label={
                  <FormattedMessage
                    id="ui-reports.dashboards.widgetForm.widgetDescField.label"
                    defaultMessage="Widget description"
                  />
                }
                placeholder={intl.formatMessage({
                  id: 'ui-reports.dashboards.widgetForm.widgetDescField.placeholder',
                  defaultMessage: 'Enter widget desc',
                })}
                required
                validate={required}
              />
            </Col>
            <Col xs={6}>
              <Field
                id="form-widget-order-textField"
                name="order"
                component={TextField}
                type="number"
                label={
                  <FormattedMessage
                    id="ui-reports.dashboards.widgetForm.orderField.label"
                    defaultMessage="Display order"
                  />
                }
                placeholder={intl.formatMessage({
                  id: 'ui-reports.dashboards.widgetForm.orderField.placeholder',
                  defaultMessage: 'Enter display order',
                })}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <WidgetReportData
                currentReport={currentReport}
                setCurrentReport={setCurrentReport}
                widgetType={widgetType}
                setWidgetType={setWidgetType}
                selectedReports={selectedReports}
                setSelectedReports={setSelectedReports}
              />
            </Col>
          </Row>
        </form>
      </Pane>
    </Paneset>
  );
}

WidgetForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  form: PropTypes.object.isRequired,
  handleClose: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  editMode: PropTypes.bool.isRequired,
  currentDashName: PropTypes.string.isRequired,
  currentReport: PropTypes.object,
  setCurrentReport: PropTypes.func.isRequired,
  selectedReports: PropTypes.array,
  setSelectedReports: PropTypes.func.isRequired,
  widgetType: PropTypes.string,
  setWidgetType: PropTypes.func.isRequired,
};

export default stripesFinalForm({
  mutators: {},
  validateOnBlur: true,
  navigationCheck: true,
  subscription: {
    values: true,
  },
})(WidgetForm);

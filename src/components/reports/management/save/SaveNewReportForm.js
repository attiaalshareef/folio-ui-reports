import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Card,
  Icon,
  Pane,
  PaneFooter,
  RepeatableField,
  Select,
  TextField
} from '@folio/stripes/components';
import { FormattedMessage, useIntl } from 'react-intl';
import stripesFinalForm from '@folio/stripes/final-form';
import AddToCategory from './components/AddToCategory';
import AddToDashboard from './components/AddToDashboard';
import AdministrativeData from './components/AdministrativeData';
import ViewSettings from './components/ViewSettings';
import QueryParams from './components/QueryParams';
import AuthorizedUsers from './components/AuthorizedUsers';

function SaveNewReportForm({
  pristine,
  submitting,
  handleSubmit,
  form,
  showQueryBuilderPane,
  setShowQueryBuilderPane,
  showSavePane,
  setShowSavePane,
  handleClose,
  // reportType,
  reportTypeRecord,
  reportDisplayMethods,
  selectedReportType,
  setSelectedReportType,
  queryParams,
  categories,
  dashboards
}) {
  const renderPaneFooter = () => {
    return (
      <PaneFooter
        renderEnd={
          <Button
            buttonStyle="default"
            // disabled={pristine || submitting}
            id="save-new-report-pane-cancel-btn"
            marginBottom0
            onClick={() => {
              setShowSavePane(false);
              setShowQueryBuilderPane(true);
            }}
          >
            <FormattedMessage
              id="ui-reports.newReport.saveNewReportForm.cancel.btn"
              defaultMessage="Cancel"
            />
          </Button>
        }
        renderStart={
          <>
            <Button
              buttonStyle="primary"
              disabled={pristine || submitting}
              id="save-new-report-pane-save-btn"
              marginBottom0
              type="submit"
              onClick={() => {
                handleSubmit();
                setShowSavePane(false);
                setShowQueryBuilderPane(true);
              }}
            >
              <FormattedMessage
                id="ui-reports.newReport.saveNewReportForm.saveBtn"
                defaultMessage="Save"
              />
            </Button>
            <Button
              buttonStyle="primary"
              id="clickable-closeAndSaveBtn-reports"
              marginBottom0
              type="submit"
              onClick={() => {
                handleSubmit();
                handleClose();
              }}
              disabled={pristine || submitting}
            >
              <FormattedMessage
                id="ui-reports.newReport.reportPreviewPane.closeAndSaveBtn"
                defaultMessage="Save & Close"
              />
            </Button>
          </>
        }
      />
    );
  };

  return (
    <>
      {showSavePane ? (
        <Pane
          appIcon={<Icon icon="save" size="large" />}
          defaultWidth="30%"
          fluidContentWidth
          // firstMenu={renderFirstMenu()}
          // lastMenu={<NewReportActions />}
          footer={renderPaneFooter()}
          id="pane-report-save"
          centeredContent
          paneTitle={
            <FormattedMessage
              id="ui-reports.newReport.saveReportPane.paneTitle"
              defaultMessage="Save the report"
            />
          }
        >
          <form id="form-save-new-report" onSubmit={handleSubmit}>
            <AdministrativeData 
              reportTypeRecord={reportTypeRecord}
              selectedReportType={selectedReportType}
              setSelectedReportType={setSelectedReportType}
            />
            <QueryParams queryParams={queryParams} />
            <AuthorizedUsers />
            <AddToCategory categories={categories} />
            <AddToDashboard dashboards={dashboards} />
            <ViewSettings reportDisplayMethods={reportDisplayMethods} />
          </form>
        </Pane>
      ) : (
        <div />
      )}
    </>
  );
}

SaveNewReportForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  form: PropTypes.object.isRequired,
  showQueryBuilderPane: PropTypes.bool.isRequired,
  setShowQueryBuilderPane: PropTypes.func.isRequired,
  showSavePane: PropTypes.bool.isRequired,
  setShowSavePane: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  reportTypeRecord: PropTypes.object,
  reportDisplayMethods: PropTypes.arrayOf(PropTypes.object),
  selectedReportType: PropTypes.string,
  setSelectedReportType: PropTypes.func,
  queryParams: PropTypes.arrayOf(PropTypes.object),
  categories: PropTypes.arrayOf(PropTypes.object),
  dashboards: PropTypes.arrayOf(PropTypes.object)
};

export default stripesFinalForm({
  mutators: {},
  validateOnBlur: true,
  navigationCheck: true,
  subscription: {
    values: true
  }
})(SaveNewReportForm);

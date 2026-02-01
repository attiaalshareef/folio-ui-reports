import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import {
  Button,
  Icon,
  Pane,
  PaneFooter,
  Tooltip,
} from '@folio/stripes/components';
import { FormattedMessage } from 'react-intl';
import CirculationLoanFieldsSelector from './CirculationLoanFieldsSelector';
import CirculationPatronFieldsSelector from './CirculationPatronFieldsSelector';
import CirculationItemFieldsSelector from './CirculationItemFieldsSelector';
import CirculationMeasuresSelector from './CirculationMeasuresSelector';

function CirculationReportBuilder({
  showBuilderPane,
  setShowBuilderPane,
  onSubmit,
  onReset,
  onCancel,
  initialValues,
  isLoading,
}) {
  return (
    <Form
      initialValues={initialValues}
      onSubmit={(values, form) => onSubmit(values, form)}
      mutators={{
        ...arrayMutators,
      }}
      subscription={{ values: true, submitting: true, pristine: true }}
    >
      {({ handleSubmit, form, submitting, values, pristine }) => {
        // Check if any fields are selected
        const hasSelectedFields =
          (values.loanFields && values.loanFields.length > 0) ||
          (values.patronFields && values.patronFields.length > 0) ||
          (values.itemFields && values.itemFields.length > 0) ||
          (values.measures && values.measures.length > 0);

        return (
          <>
            {showBuilderPane ? (
              <Pane
                id="pane-circulation-report-builder"
                appIcon={<Icon icon="exchange" size="large" />}
                defaultWidth="30%"
                paneTitle={
                  <FormattedMessage
                    id="ui-reports.circulationReports.title"
                    defaultMessage="Circulation Report Builder"
                  />
                }
                fluidContentWidth
                centeredContent
                footer={
                  <PaneFooter
                    renderEnd={
                      isLoading ? (
                        <Button
                          buttonStyle="danger"
                          id="circulation-builder-cancel-btn"
                          marginBottom0
                          onClick={onCancel}
                          onMouseDown={(e) => e.preventDefault()}
                        >
                          <FormattedMessage
                            id="ui-reports.circulationReports.buttons.stopLoading"
                            defaultMessage="Stop Loading"
                          />
                        </Button>
                      ) : (
                        <Button
                          buttonStyle="primary"
                          disabled={
                            submitting || !hasSelectedFields || pristine
                          }
                          id="circulation-builder-apply-btn"
                          marginBottom0
                          onClick={() => handleSubmit()}
                          onMouseDown={(e) => e.preventDefault()}
                        >
                          <FormattedMessage
                            id="ui-reports.circulationReports.buttons.generateReport"
                            defaultMessage="Generate Report"
                          />
                        </Button>
                      )
                    }
                    renderStart={
                      <Button
                        buttonStyle="primary"
                        disabled={submitting || !hasSelectedFields || isLoading}
                        id="circulation-builder-reset-btn"
                        marginBottom0
                        onClick={() => {
                          onReset(form);
                        }}
                        onMouseDown={(e) => e.preventDefault()}
                      >
                        <FormattedMessage
                          id="ui-reports.circulationReports.buttons.reset"
                          defaultMessage="Reset"
                        />
                      </Button>
                    }
                  />
                }
                lastMenu={
                  <Tooltip
                    id="circulation-builder-hide-pane-tooltip"
                    text={
                      <FormattedMessage
                        id="ui-reports.circulationReports.tooltip.hidePane"
                        defaultMessage="Hide builder pane"
                      />
                    }
                  >
                    {({ ref, ariaIds }) => (
                      <Button
                        buttonStyle="dropdownItem"
                        id="circulation-builder-hide-pane-btn"
                        marginBottom0
                        onClick={() => setShowBuilderPane(!showBuilderPane)}
                        aria-labelledby={ariaIds.text}
                        ref={ref}
                      >
                        <Icon icon="chevron-double-left" />
                      </Button>
                    )}
                  </Tooltip>
                }
              >
                <form
                  id="form-circulation-report-builder"
                  onSubmit={handleSubmit}
                >
                  <CirculationLoanFieldsSelector formValues={values} />
                  <CirculationPatronFieldsSelector formValues={values} />
                  <CirculationItemFieldsSelector formValues={values} />
                  <CirculationMeasuresSelector formValues={values} />
                </form>
              </Pane>
            ) : (
              <div />
            )}
          </>
        );
      }}
    </Form>
  );
}

CirculationReportBuilder.propTypes = {
  showBuilderPane: PropTypes.bool.isRequired,
  setShowBuilderPane: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
  isLoading: PropTypes.bool.isRequired,
};

export default CirculationReportBuilder;
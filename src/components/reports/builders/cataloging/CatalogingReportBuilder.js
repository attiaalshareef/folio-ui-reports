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
import CatalogingInstanceFieldsSelector from './CatalogingInstanceFieldsSelector';
import CatalogingHoldingsFieldsSelector from './CatalogingHoldingsFieldsSelector';
import CatalogingItemFieldsSelector from './CatalogingItemFieldsSelector';
import CatalogingMeasuresSelector from './CatalogingMeasuresSelector';

function CatalogingReportBuilder({
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
          (values.instanceFields && values.instanceFields.length > 0) ||
          (values.holdingsFields && values.holdingsFields.length > 0) ||
          (values.itemFields && values.itemFields.length > 0) ||
          (values.measures && values.measures.length > 0);

        return (
          <>
            {showBuilderPane ? (
              <Pane
                id="pane-cataloging-report-builder"
                appIcon={<Icon icon="catalog" size="large" />}
                defaultWidth="30%"
                paneTitle={
                  <FormattedMessage
                    id="ui-reports.catalogingReports.title"
                    defaultMessage="Cataloging Report Builder"
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
                          id="cataloging-builder-cancel-btn"
                          marginBottom0
                          onClick={onCancel}
                          onMouseDown={(e) => e.preventDefault()}
                        >
                          <FormattedMessage
                            id="ui-reports.catalogingReports.buttons.stopLoading"
                            defaultMessage="Stop Loading"
                          />
                        </Button>
                      ) : (
                        <Button
                          buttonStyle="primary"
                          disabled={
                            submitting || !hasSelectedFields || pristine
                          }
                          id="cataloging-builder-apply-btn"
                          marginBottom0
                          onClick={() => handleSubmit()}
                          onMouseDown={(e) => e.preventDefault()}
                        >
                          <FormattedMessage
                            id="ui-reports.catalogingReports.buttons.generateReport"
                            defaultMessage="Generate Report"
                          />
                        </Button>
                      )
                    }
                    renderStart={
                      <Button
                        buttonStyle="primary"
                        disabled={submitting || !hasSelectedFields || isLoading}
                        id="cataloging-builder-reset-btn"
                        marginBottom0
                        onClick={() => {
                          onReset(form);
                        }}
                        onMouseDown={(e) => e.preventDefault()}
                      >
                        <FormattedMessage
                          id="ui-reports.catalogingReports.buttons.reset"
                          defaultMessage="Reset"
                        />
                      </Button>
                    }
                  />
                }
                lastMenu={
                  <Tooltip
                    id="cataloging-builder-hide-pane-tooltip"
                    text={
                      <FormattedMessage
                        id="ui-reports.catalogingReports.tooltip.hidePane"
                        defaultMessage="Hide builder pane"
                      />
                    }
                  >
                    {({ ref, ariaIds }) => (
                      <Button
                        buttonStyle="dropdownItem"
                        id="cataloging-builder-hide-pane-btn"
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
                  id="form-cataloging-report-builder"
                  onSubmit={handleSubmit}
                >
                  <CatalogingInstanceFieldsSelector formValues={values} />
                  <CatalogingHoldingsFieldsSelector formValues={values} />
                  <CatalogingItemFieldsSelector formValues={values} />
                  <CatalogingMeasuresSelector formValues={values} />
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

CatalogingReportBuilder.propTypes = {
  showBuilderPane: PropTypes.bool.isRequired,
  setShowBuilderPane: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
  isLoading: PropTypes.bool.isRequired,
};

export default CatalogingReportBuilder;

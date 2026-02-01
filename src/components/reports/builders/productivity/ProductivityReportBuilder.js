import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-final-form';
import {
  Button,
  Icon,
  Pane,
  PaneFooter,
  Tooltip,
} from '@folio/stripes/components';
import { FormattedMessage } from 'react-intl';
import ProductivityFieldsSelector from './ProductivityFieldsSelector';
import ProductivityDateRangeSelector from './ProductivityDateRangeSelector';

import ProductivityReportTypeSelector from './ProductivityReportTypeSelector';
import ProductivityActivityTypeSelector from './ProductivityActivityTypeSelector';
import ProductivityTypeSelector from './ProductivityTypeSelector';
import ProductivityStaffSelector from './ProductivityStaffSelector';

function ProductivityReportBuilder({
  showBuilderPane,
  setShowBuilderPane,
  setQuery,
  onSubmit,
  initialValues,
}) {
  return (
    <Form
      initialValues={initialValues}
      onSubmit={onSubmit}
      subscription={{ values: true, submitting: true, pristine: true }}
    >
      {({ handleSubmit, form, submitting, values }) => (
        <>
          {showBuilderPane ? (
            <Pane
              id="pane-productivity-report-builder"
              appIcon={<Icon icon="chart-bar" size="large" />}
              defaultWidth="30%"
              paneTitle={
                <FormattedMessage
                  id="ui-reports.productivityReports.title"
                  defaultMessage="Productivity Report Builder"
                />
              }
              fluidContentWidth
              centeredContent
              footer={
                <PaneFooter
                  renderEnd={
                    <Button
                      buttonStyle="primary"
                      disabled={submitting}
                      id="productivity-builder-apply-btn"
                      marginBottom0
                      type="submit"
                      onClick={handleSubmit}
                    >
                      <FormattedMessage
                        id="ui-reports.productivityReports.buttons.generateReport"
                        defaultMessage="Generate Report"
                      />
                    </Button>
                  }
                  renderStart={
                    <Button
                      buttonStyle="primary"
                      disabled={submitting}
                      id="productivity-builder-reset-btn"
                      marginBottom0
                      onClick={() => {
                        form.reset();
                        setQuery('');
                      }}
                    >
                      <FormattedMessage
                        id="ui-reports.productivityReports.buttons.reset"
                        defaultMessage="Reset"
                      />
                    </Button>
                  }
                />
              }
              lastMenu={
                <Tooltip
                  id="productivity-builder-hide-pane-tooltip"
                  text={
                    <FormattedMessage
                      id="ui-reports.productivityReports.tooltip.hidePane"
                      defaultMessage="Hide builder pane"
                    />
                  }
                >
                  {({ ref, ariaIds }) => (
                    <Button
                      buttonStyle="dropdownItem"
                      id="productivity-builder-hide-pane-btn"
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
                id="form-productivity-report-builder"
                onSubmit={handleSubmit}
              >
                <ProductivityReportTypeSelector />
                <ProductivityStaffSelector values={values} />
                <ProductivityTypeSelector />
                <ProductivityActivityTypeSelector />
                <ProductivityDateRangeSelector />
                <ProductivityFieldsSelector values={values} />
              </form>
            </Pane>
          ) : (
            <div />
          )}
        </>
      )}
    </Form>
  );
}

ProductivityReportBuilder.propTypes = {
  showBuilderPane: PropTypes.bool.isRequired,
  setShowBuilderPane: PropTypes.func.isRequired,
  setQuery: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
};

export default ProductivityReportBuilder;

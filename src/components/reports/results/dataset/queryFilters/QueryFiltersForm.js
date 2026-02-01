import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Icon,
  Pane,
  PaneFooter,
  Tooltip,
} from '@folio/stripes/components';
import { FormattedMessage } from 'react-intl';
import stripesFinalForm from '@folio/stripes-final-form/lib/stripesFinalForm';

function QueryFiltersForm({
  pristine,
  submitting,
  handleSubmit,
  form,
  showFiltersPane,
  setShowFiltersPane,
}) {
  const renderPaneFooter = () => {
    return (
      <PaneFooter
        renderEnd={
          <Button
            buttonStyle="primary"
            disabled={pristine || submitting}
            id="query-filters-pane-apply-btn"
            marginBottom0
            type="submit"
            onClick={handleSubmit}
          >
            <FormattedMessage
              id="ui-reports.queryBuilderPane.applyBtn"
              defaultMessage="Apply"
            />
          </Button>
        }
        renderStart={
          <Button
            buttonStyle="primary"
            disabled={pristine || submitting}
            id="query-filters-pane-reset-form-btn"
            marginBottom0
            onClick={() => {
              form.reset();
              // setQuery('');
              // setSelectedTables([]);
            }}
          >
            <FormattedMessage
              id="ui-reports.queryBuilderPane.resetForm.btn"
              defaultMessage="Reset"
            />
          </Button>
        }
      />
    );
  };

  const renderPaneLastMenu = () => {
    return (
      <Tooltip
        id="query-filters-hide-pane-tooltip"
        text={
          <FormattedMessage
            id="ui-reports.queryfiltersPane.tooltip.hidePane.msg"
            defaultMessage="Hide filters pane"
          />
        }
      >
        {({ ref, ariaIds }) => (
          <Button
            buttonStyle="dropdownItem"
            id="query-filters-hide-pane-btn"
            marginBottom0
            onClick={() => setShowFiltersPane(!showFiltersPane)}
            aria-labelledby={ariaIds.text}
            ref={ref}
          >
            <Icon icon="chevron-double-left" />
          </Button>
        )}
      </Tooltip>
    );
  };

  return (
    <>
      {showFiltersPane ? (
        <Pane
          id="pane-query-filters-form"
          appIcon={<Icon icon="source" size="large" />}
          defaultWidth="20%"
          paneTitle={
            <FormattedMessage
              id="ui-reports.queryFiltersPane.paneTitle"
              defaultMessage="Query Filters"
            />
          }
          // fluidContentWidth
          // centeredContent
          // noOverflow
          footer={renderPaneFooter()}
          lastMenu={renderPaneLastMenu()}
        >
          <form id="form-query-filters" onSubmit={handleSubmit}>
            <div>QueryFiltersForm</div>
          </form>
        </Pane>
      ) : (
        <div />
      )}
    </>
  );
}

QueryFiltersForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  form: PropTypes.object.isRequired,
  showFiltersPane: PropTypes.bool,
  setShowFiltersPane: PropTypes.func,
};

export default stripesFinalForm({
  mutators: {},
  validateOnBlur: true,
  navigationCheck: true,
  subscription: {
    values: true,
  },
})(QueryFiltersForm);

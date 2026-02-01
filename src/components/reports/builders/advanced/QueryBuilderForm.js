/* eslint-disable indent */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import stripesFinalForm from '@folio/stripes/final-form';

import {
  Button,
  Icon,
  Pane,
  PaneFooter,
  Tooltip,
} from '@folio/stripes/components';
import { FormattedMessage } from 'react-intl';
import ReportTypesField from './fields/ReportTypesField';
import QBFormModelSwitcher from './QBFormModelSwitcher';
import TablesField from './fields/TablesField';

function QueryBuilderForm({
  pristine,
  submitting,
  handleSubmit,
  form,
  showQueryBuilderPane,
  setShowQueryBuilderPane,
  cubeMetaData,
  setQuery,
  reportType,
  setReportType,
  selectedTables,
  setSelectedTables,
}) {
  const [currentCubeMembers, setCurrentCubeMembers] = useState([]);

  useEffect(() => {
    if (selectedTables) {
      const tables = selectedTables?.map((table) => {
        return cubeMetaData?.cubes.find((cube) => cube.name === table.value);
      });
      setCurrentCubeMembers(tables);
    } else {
      form.change('columns', []);
      form.change('metrics', []);
      setCurrentCubeMembers([]);
    }
  }, [selectedTables]);

  const renderPaneFooter = () => {
    return (
      <PaneFooter
        renderEnd={
          <Button
            buttonStyle="primary"
            disabled={pristine || submitting}
            id="query-builder-pane-apply-btn"
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
            id="query-builder-pane-reset-form-btn"
            marginBottom0
            onClick={() => {
              form.reset();
              setQuery('');
              setSelectedTables([]);
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

  return (
    <>
      {showQueryBuilderPane ? (
        <Pane
          id="pane-query-builder"
          appIcon={<Icon icon="source" size="large" />}
          defaultWidth="30%"
          paneTitle={
            <FormattedMessage
              id="ui-reports.queryBuilderPane.paneTitle"
              defaultMessage="Query Builder"
            />
          }
          fluidContentWidth
          centeredContent
          // noOverflow
          footer={renderPaneFooter()}
          lastMenu={
            <Tooltip
              id="query-builder-hide-pane-tooltip"
              text={
                <FormattedMessage id="ui-reports.queryBuilderPane.tooltip.hidePane.msg" />
              }
            >
              {({ ref, ariaIds }) => (
                <Button
                  buttonStyle="dropdownItem"
                  id="query-builder-hide-pane-btn"
                  marginBottom0
                  onClick={() => setShowQueryBuilderPane(!showQueryBuilderPane)}
                  aria-labelledby={ariaIds.text}
                  ref={ref}
                >
                  <Icon icon="chevron-double-left" />
                </Button>
              )}
            </Tooltip>
          }
        >
          <form id="form-query-builder" onSubmit={handleSubmit}>
            <ReportTypesField
              reportType={reportType}
              setReportType={setReportType}
              resetForm={() => {
                form.reset();
                setQuery('');
                setSelectedTables([]);
              }}
            />
            <TablesField
              selectedTables={selectedTables}
              setSelectedTables={setSelectedTables}
            />
            <QBFormModelSwitcher
              reportType={reportType}
              currentCubeMembers={currentCubeMembers}
              disabled={!selectedTables.length}
              formValues={form.getState().values}
            />
          </form>
        </Pane>
      ) : (
        <div />
      )}
    </>
  );
}

QueryBuilderForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  form: PropTypes.object.isRequired,
  showQueryBuilderPane: PropTypes.bool.isRequired,
  setShowQueryBuilderPane: PropTypes.func.isRequired,
  cubeMetaData: PropTypes.arrayOf(PropTypes.object).isRequired,
  setQuery: PropTypes.func.isRequired,
  reportType: PropTypes.string.isRequired,
  setReportType: PropTypes.func.isRequired,
  selectedTables: PropTypes.arrayOf(PropTypes.string),
  setSelectedTables: PropTypes.func.isRequired,
};

export default stripesFinalForm({
  mutators: {},
  validateOnBlur: true,
  navigationCheck: true,
  subscription: {
    values: true,
  },
})(QueryBuilderForm);

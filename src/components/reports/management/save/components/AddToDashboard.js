import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import {
  Accordion,
  Card,
  FilterAccordionHeader,
  Icon,
  RepeatableField,
  Select,
} from '@folio/stripes/components';
import { FormattedMessage } from 'react-intl';

function AddToDashboard(props) {
  const [filterToggle, setFilterToggle] = useState(true);

  const renderDashboardsList = (field, index) => {
    return (
      <>
        <Field
          component={Select}
          label={
            <FormattedMessage
              id="ui-reports.newReport.saveReportPane.addToDashboard.field.dashboardName"
              defaultMessage="Dashboard name"
            />
          }
          name={`${field}.values`}
          //   disabled={disabled}
        />
      </>
    );
  };
  return (
    <>
      <Accordion
        id="save-new-report-add-to-dashboards-accordion"
        label={
          <FormattedMessage
            id="ui-reports.newReport.saveReportPane.addToDashboard.accordion.header"
            defaultMessage="Dashboards"
          />
        }
        onToggle={() => setFilterToggle(!filterToggle)}
        open={filterToggle}
        separator
        header={FilterAccordionHeader}
      >
        <FieldArray
          addLabel="Add to dashboard"
          component={RepeatableField}
          name="dashboards"
          onAdd={(fields) => fields.push('')}
          renderField={renderDashboardsList}
        />
      </Accordion>
    </>
  );
}

AddToDashboard.propTypes = {};

export default AddToDashboard;

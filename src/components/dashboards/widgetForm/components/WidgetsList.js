import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import {
  Accordion,
  Button,
  Card,
  FilterAccordionHeader,
  Icon,
  RepeatableField,
  Select,
} from '@folio/stripes/components';
import { FormattedMessage } from 'react-intl';
import Widget from './Widget';
import AddNewWidget from './AddNewWidget';

function WidgetsList(props) {
  const [filterToggle, setFilterToggle] = useState(true);
  const [showNewWidgetForm, setShowNewWidgetForm] = useState(false);

  const renderAddNewWidgetButton = () => {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          paddingBottom: '10px',
        }}
      >
        <Button
          id="add-new-widget-btn"
          buttonStyle="primary"
          onClick={() => setShowNewWidgetForm(true)}
          marginBottom0
          disabled={showNewWidgetForm}
        >
          <Icon icon="plus-sign" />
        </Button>
      </div>
    );
  };

  const renderWidgetsList = ({ fields }) => {
    return fields?.value?.map((widget, index) => (
      <Widget widget={widget} index={index} />
    ));
  };

  return (
    <>
      <Accordion
        id="add-dashboard-report-accordion"
        label={
          <FormattedMessage
            id="ui-reports.manageDashboardsForm.widgetsList.accordion.header"
            defaultMessage="Widgets List"
          />
        }
        onToggle={() => setFilterToggle(!filterToggle)}
        open={filterToggle}
        separator
        header={FilterAccordionHeader}
      >
        {renderAddNewWidgetButton()}
        {showNewWidgetForm && (
          <AddNewWidget
            setShowNewWidgetForm={setShowNewWidgetForm}
            onSave={props.form.mutators.unshift}
          />
        )}
        <FieldArray name="widgetsList" component={renderWidgetsList} />
      </Accordion>
    </>
  );
}

WidgetsList.propTypes = {
  form: PropTypes.object.isRequired,
};

export default WidgetsList;

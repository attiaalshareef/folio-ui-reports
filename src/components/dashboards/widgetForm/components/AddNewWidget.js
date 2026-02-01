import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Icon } from '@folio/stripes/components';
import { FormattedMessage } from 'react-intl';

function AddNewWidget({ setShowNewWidgetForm, onSave }) {
  return (
    <>
      <Card
        id="card-add-new-widget"
        //   cardStyle="positive"
        roundedBorder
        headerStart={
          <span style={{ fontWeight: 'bold' }}>
            <Icon icon="plus-sign">
              <FormattedMessage
                id="ui-reports.manageDashboardsForm.addNewWidget.card.header"
                defaultMessage="Add New Widget"
              />
            </Icon>
          </span>
        }
        headerEnd={
          <>
            <Button
              id="add-new-widget-btn"
              buttonStyle="slim"
              onClick={() => {
                onSave('widgetsList', {});
                setShowNewWidgetForm(false);
              }}
              marginBottom0
            >
              <Icon icon="save" />
            </Button>
            <Button
              id="cancel-new-widget-btn"
              buttonStyle="slim"
              onClick={() => {
                setShowNewWidgetForm(false);
              }}
              marginBottom0
            >
              <Icon icon="times" />
            </Button>
          </>
        }
      >
        <div />
      </Card>
      <hr />
    </>
  );
}

AddNewWidget.propTypes = {
  setShowNewWidgetForm: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default AddNewWidget;

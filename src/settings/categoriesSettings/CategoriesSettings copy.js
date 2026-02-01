import React from 'react';
import PropTypes from 'prop-types';
import { Button, Pane, PaneFooter, Paneset } from '@folio/stripes-components';
import { FormattedMessage } from 'react-intl';

function CategoriesSettings(props) {
  const renderPaneFooter = () => {
    return (
      <PaneFooter
        renderEnd={
          <Button
            buttonStyle="primary mega"
            // disabled={pristine || submitting}
            disabled
            id="clickable-tenantLocales"
            marginBottom0
            type="submit"
          >
            <FormattedMessage id="stripes-core.button.save" />
          </Button>
        }
        renderStart={
          <Button
            buttonStyle="default mega"
            // disabled={pristine || submitting}
            disabled
            id="clickable-cancel"
            marginBottom0
          >
            <FormattedMessage id="stripes-components.cancel" />
          </Button>
        }
      />
    );
  };
  return (
    <>
      <Paneset>
        <Pane
          fluidContentWidth
          footer={renderPaneFooter()}
          id="reports-categories-settings-list"
          paneTitle={
            <FormattedMessage
              id="ui-reports.settings.sections.categories.paneTitle"
              defaultMessage="Reports Categories"
            />
          }
        >
          <FormattedMessage
            id="ui-reports.settings.sections.categories.paneTitle"
            defaultMessage="Reports Categories"
          />
        </Pane>
      </Paneset>
    </>
  );
}

CategoriesSettings.propTypes = {};

export default CategoriesSettings;

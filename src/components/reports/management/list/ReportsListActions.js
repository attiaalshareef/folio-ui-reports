/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
  Dropdown,
  DropdownMenu,
  Button,
  Icon,
  MenuSection
} from '@folio/stripes-components';
import { FormattedMessage } from 'react-intl';
import { IfPermission } from '@folio/stripes-core';
const ReportsListActions = props => {
  const [dropdownOpen, setdropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setdropdownOpen(!dropdownOpen);
  };

  const getDropdownContent = () => {
    return (
      <>
        <MenuSection>
          {/* Actions menu content can be added here if needed */}
        </MenuSection>
      </>
    );
  };

  const renderActionsMenuTrigger = ({ getTriggerProps, open }) => {
    return (
      <FormattedMessage id="ui-reports.importreports">
        {label => (
          <div style={{ paddingRight: '0.25em', paddingLeft: '0.25em' }}>
            <Button
              data-test-pane-header-actions-button
              buttonStyle="primary"
              marginBottom0
              ariaLabel={label}
              type="button"
              {...getTriggerProps()}
            >
              <Icon icon="ellipsis" size="large" />
            </Button>
          </div>
        )}
      </FormattedMessage>
    );
  };

  const renderActionsMenu = ({ open }) => (
    <DropdownMenu open={open}>{getDropdownContent()}</DropdownMenu>
  );

  return (
    <Dropdown
      id="ui-translation-actionsMenu-Dropdown"
      renderTrigger={renderActionsMenuTrigger}
      renderMenu={renderActionsMenu}
      open={dropdownOpen}
      onToggle={toggleDropdown}
      placement="bottom-end"
      relativePosition
      focusHandlers={{ open: () => null }}
    />
  );
};

export default ReportsListActions;

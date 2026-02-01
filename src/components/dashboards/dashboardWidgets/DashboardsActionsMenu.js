/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
  Dropdown,
  DropdownMenu,
  Button,
  Icon,
  MenuSection,
} from '@folio/stripes-components';
import { FormattedMessage } from 'react-intl';
import { IfPermission } from '@folio/stripes-core';

const DashboardsActionsMenu = (props) => {
  const [dropdownOpen, setdropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setdropdownOpen(!dropdownOpen);
  };

  const getDropdownContent = () => {
    return (
      <MenuSection>
        {/* <IfPermission perm="ui-reports.create-report"> */}
        <Button
          marginBottom0
          id="dashboards-actions-menu-create-new-btn"
          buttonStyle="dropdownItem"
          to={{
            pathname: `/reports/dashboards/${props.currentDashboard.name}/widgets/create`,
          }}
          // onMouseDown={(e) => e.preventDefault()}
        >
          <Icon icon="plus-sign">
            <FormattedMessage
              id="ui-reports.dashboards.widgets.addNewWidget.btn"
              defaultMessage="Create new widget"
            />
          </Icon>
        </Button>
        {/* </IfPermission> */}
      </MenuSection>
    );
  };

  const renderActionsMenuTrigger = ({ getTriggerProps, open }) => {
    return (
      <FormattedMessage
        id="ui-reports.dashboardsActionsMenu"
        defaultMessage="Dashboards Actions Menu"
      >
        {(label) => (
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
    <>
      <Dropdown
        id="dashboards-actionsMenu-dropdown"
        renderTrigger={renderActionsMenuTrigger}
        renderMenu={renderActionsMenu}
        open={dropdownOpen}
        onToggle={toggleDropdown}
        placement="bottom-end"
        relativePosition
        focusHandlers={{ open: () => null }}
      />
    </>
  );
};

export default DashboardsActionsMenu;

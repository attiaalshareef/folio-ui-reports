/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import PropTypes, { object } from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  NavList,
  NavListItem,
  Icon,
  DropdownMenu,
  Dropdown,
  Button,
} from '@folio/stripes-components';

const propTypes = {
  dataOptions: PropTypes.arrayOf(object),
  currentDashboard: PropTypes.object,
  setCurrentDashboard: PropTypes.func,
};

const DashboardsMenu = ({
  dataOptions,
  currentDashboard,
  setCurrentDashboard,
}) => {
  const [DropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!DropdownOpen);
  };

  const getDropdownContent = () => {
    return (
      <div>
        <NavList>
          {dataOptions?.map((dashboard) => (
            <NavListItem
              key={dashboard.id}
              id={`dashboards-menu-${dashboard?.id}`}
              buttonStyle={`${
                currentDashboard?.id === dashboard?.id ? 'primary' : 'default'
              }`}
              selected={currentDashboard?.id === dashboard?.id}
              onClick={() => {
                setCurrentDashboard(dashboard);
                toggleDropdown();
              }}
            >
              <FormattedMessage
                id={`ui-reports.dashboards.name.${dashboard?.name}`}
                defaultMessage={dashboard?.name}
              />
            </NavListItem>
          ))}
        </NavList>
      </div>
    );
  };

  const renderLocalesTrigger = ({ getTriggerProps, open }) => {
    return (
      <FormattedMessage
        id="ui-reports.dashboardsMenu"
        defaultMessage="Dashboards Menu"
      >
        {(label) => (
          <Button
            data-role="toggle"
            ariaLabel={label}
            buttonStyle="slim"
            selected={open}
            marginBottom0
            {...getTriggerProps()}
          >
            <Icon iconPosition="end" icon={open ? 'caret-up' : 'caret-down'}>
              <FormattedMessage
                id={`ui-reports.dashboards.name.${currentDashboard?.name}`}
                defaultMessage={currentDashboard?.name}
              />
            </Icon>
          </Button>
        )}
      </FormattedMessage>
    );
  };

  const renderLocalesMenu = ({ open }) => (
    <DropdownMenu open={open}>{getDropdownContent()}</DropdownMenu>
  );

  return (
    <>
      <Dropdown
        id="dashboards-list-dropdown"
        renderTrigger={renderLocalesTrigger}
        renderMenu={renderLocalesMenu}
        open={DropdownOpen}
        onToggle={toggleDropdown}
        placement="bottom"
        // usePortal={false}
        relativePosition
        focusHandlers={{ open: () => null }}
      />
    </>
  );
};

DashboardsMenu.propTypes = propTypes;

export default DashboardsMenu;

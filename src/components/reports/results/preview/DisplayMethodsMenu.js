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
import displayMethods from '../../../../constants/DisplayMethods';

const DisplayMethodsMenu = (props) => {
  const [DropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!DropdownOpen);
  };

  const getDropdownContent = () => {
    return (
      <div>
        <NavList>
          {props.displayMethods.map((method) => (
            <NavListItem
              id={`queryBuilder-display-methods-menu-${method.value}`}
              isActive={props.currentDisplayMethod === method.value}
              onClick={() => {
                props.setCurrentDisplayMethod(method.value);
                toggleDropdown();
              }}
              type="button"
            >
              <FormattedMessage
                id={`ui-reports.displayMethods.${method.value}`}
                defaultMessage={method.label}
              />
            </NavListItem>
          ))}
        </NavList>
      </div>
    );
  };

  const renderMenuTrigger = ({ getTriggerProps, open }) => {
    return (
      <FormattedMessage id="ui-reports.queryBuilder.displayMethodsMenu">
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
                id={`ui-reports.displayMethods.${props.currentDisplayMethod}`}
                defaultMessage={
                  displayMethods.find(
                    (method) => method.value === props.currentDisplayMethod
                  )?.name
                }
              />
            </Icon>
          </Button>
        )}
      </FormattedMessage>
    );
  };

  const renderMenu = ({ open }) => (
    <DropdownMenu open={open}>{getDropdownContent()}</DropdownMenu>
  );

  return (
    <>
      <Dropdown
        id="queryBuilder-display-methods-dropdown"
        renderTrigger={renderMenuTrigger}
        renderMenu={renderMenu}
        open={DropdownOpen}
        onToggle={toggleDropdown}
        placement="bottom-start"
        // usePortal={false}
        relativePosition
        focusHandlers={{ open: () => null }}
      />
    </>
  );
};

DisplayMethodsMenu.propTypes = {
  displayMethods: PropTypes.arrayOf(PropTypes.string),
  currentDisplayMethod: PropTypes.object,
  setCurrentDisplayMethod: PropTypes.func,
};

export default DisplayMethodsMenu;

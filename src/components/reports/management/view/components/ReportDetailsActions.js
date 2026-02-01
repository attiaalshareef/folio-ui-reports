import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Dropdown,
  DropdownMenu,
  Button,
  Icon,
  MenuSection,
} from '@folio/stripes-components';
import { FormattedMessage } from 'react-intl';
import { IfPermission } from '@folio/stripes-core';

function ReportDetailsActions({ reportId }) {
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
          id="report-details-actions-menu-edit-btn"
          buttonStyle="dropdownItem"
          to={{
            pathname: `/reports/reports-list/${reportId}/edit`,
          }}
          onMouseDown={(e) => e.preventDefault()}
        >
          <Icon icon="edit">
            <FormattedMessage
              id="ui-reports.report.details.actions.editBtn"
              defaultMessage="Edit report"
            />
          </Icon>
        </Button>
        {/* </IfPermission> */}

        {/* <IfPermission perm="ui-reports.create-report"> */}
        <Button
          marginBottom0
          id="report-details-actions-menu-delete-btn"
          buttonStyle="dropdownItem"
          // onClick={() => props.onDeleteReport}
          onMouseDown={(e) => e.preventDefault()}
        >
          <Icon icon="trash">
            <FormattedMessage
              id="ui-reports.report.details.actions.deleteBtn"
              defaultMessage="Delete report"
            />
          </Icon>
        </Button>
        {/* </IfPermission> */}
      </MenuSection>
    );
  };

  const renderActionsMenuTrigger = ({ getTriggerProps, open }) => {
    return (
      <FormattedMessage id="ui-reports.importreports">
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
    <Dropdown
      id="report-details-actions-menu-dropdown"
      renderTrigger={renderActionsMenuTrigger}
      renderMenu={renderActionsMenu}
      open={dropdownOpen}
      onToggle={toggleDropdown}
      placement="bottom-end"
      relativePosition
      focusHandlers={{ open: () => null }}
    />
  );
}

ReportDetailsActions.propTypes = {
  reportId: PropTypes.string,
};

export default ReportDetailsActions;

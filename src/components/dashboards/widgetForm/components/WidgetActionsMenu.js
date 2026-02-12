/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
  Dropdown,
  DropdownMenu,
  Button,
  Icon,
  MenuSection,
  Modal,
  ModalFooter,
} from '@folio/stripes-components';
import { FormattedMessage } from 'react-intl';
import { IfPermission } from '@folio/stripes-core';
import { GoKebabHorizontal } from 'react-icons/go';

const WidgetActionsMenu = (props) => {
  const [dropdownOpen, setdropdownOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showMoveModal, setShowMoveModal] = useState(false);

  const toggleDropdown = () => {
    setdropdownOpen(!dropdownOpen);
  };

  const getDropdownContent = () => {
    return (
      <MenuSection>
        <Button
          marginBottom0
          id="widget-actions-menu-edit-btn"
          buttonStyle="dropdownItem"
          to={{
            pathname: `/reports/dashboards/${props.currentDashboard?.name}/widgets/edit/${props.widget?.id}`,
          }}
        >
          <Icon icon="edit">
            <FormattedMessage
              id="ui-reports.dashboards.widgets.actionsMenu.editBtn"
              defaultMessage="Edit"
            />
          </Icon>
        </Button>

        <Button
          marginBottom0
          id="widget-actions-menu-delete-btn"
          buttonStyle="dropdownItem"
          onClick={() => {
            setShowDeleteModal(true);
            setdropdownOpen(false);
          }}
        >
          <Icon icon="trash">
            <FormattedMessage
              id="ui-reports.dashboards.widgets.actionsMenu.deleteBtn"
              defaultMessage="Delete"
            />
          </Icon>
        </Button>

        <Button
          marginBottom0
          id="widget-actions-menu-move-btn"
          buttonStyle="dropdownItem"
          onClick={() => {
            setShowMoveModal(true);
            setdropdownOpen(false);
          }}
        >
          <Icon icon="transfer">
            <FormattedMessage
              id="ui-reports.dashboards.widgets.actionsMenu.moveBtn"
              defaultMessage="Move"
            />
          </Icon>
        </Button>
      </MenuSection>
    );
  };

  const renderActionsMenuTrigger = ({ getTriggerProps, open }) => {
    return (
      <FormattedMessage
        id="ui-reports.widgetActionsMenu"
        defaultMessage="Widget Actions Menu"
      >
        {(label) => (
          <div style={{ paddingRight: '0.25em', paddingLeft: '0.25em' }}>
            <Button
              data-test-pane-header-actions-button
              buttonStyle="slim"
              marginBottom0
              ariaLabel={label}
              type="button"
              {...getTriggerProps()}
            >
              {/* <Icon icon="ellipsis" size="large" color="white" /> */}
              <GoKebabHorizontal fill="white" size="20px" />
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
      
      {/* Delete Confirmation Modal */}
      <Modal
        open={showDeleteModal}
        label={
          <FormattedMessage
            id="ui-reports.dashboards.widgets.deleteModal.title"
            defaultMessage="Delete widget"
          />
        }
        footer={
          <ModalFooter>
            <Button
              buttonStyle="primary"
              onClick={() => {
                props.onDeleteWidget(props.widget?.id);
                setShowDeleteModal(false);
              }}
            >
              <FormattedMessage
                id="ui-reports.dashboards.widgets.deleteModal.confirm"
                defaultMessage="Delete"
              />
            </Button>
            <Button
              onClick={() => setShowDeleteModal(false)}
            >
              <FormattedMessage
                id="ui-reports.dashboards.widgets.deleteModal.cancel"
                defaultMessage="Cancel"
              />
            </Button>
          </ModalFooter>
        }
      >
        <FormattedMessage
          id="ui-reports.dashboards.widgets.deleteModal.message"
          defaultMessage="Are you sure you want to delete this widget?"
        />
      </Modal>

      {/* Move Modal - TODO: Implement move functionality */}
      <Modal
        open={showMoveModal}
        label={
          <FormattedMessage
            id="ui-reports.dashboards.widgets.moveModal.title"
            defaultMessage="Move widget"
          />
        }
        footer={
          <ModalFooter>
            <Button
              buttonStyle="primary"
              onClick={() => {
                // TODO: Implement move logic
                setShowMoveModal(false);
              }}
            >
              <FormattedMessage
                id="ui-reports.dashboards.widgets.moveModal.confirm"
                defaultMessage="Move"
              />
            </Button>
            <Button
              onClick={() => setShowMoveModal(false)}
            >
              <FormattedMessage
                id="ui-reports.dashboards.widgets.moveModal.cancel"
                defaultMessage="Cancel"
              />
            </Button>
          </ModalFooter>
        }
      >
        <FormattedMessage
          id="ui-reports.dashboards.widgets.moveModal.message"
          defaultMessage="Select dashboard to move this widget to:"
        />
        {/* TODO: Add dashboard selector */}
      </Modal>
    </>
  );
};

export default WidgetActionsMenu;

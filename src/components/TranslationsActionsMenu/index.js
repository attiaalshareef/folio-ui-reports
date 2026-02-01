/* eslint-disable max-len */
/* eslint-disable react/sort-prop-types */
/* eslint-disable array-callback-return */
/* eslint-disable react/no-unused-prop-types */
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Callout,
  Dropdown,
  DropdownMenu,
  Button,
  Icon,
  NavListSection,
  NavListItem,
  NavList,
} from '@folio/stripes-components';
import { FormattedMessage } from 'react-intl';
import { stripesConnect, IfPermission } from '@folio/stripes-core';
import WithTranslations from './WithTranslations';
import CreateNewKeysModal from './CreateNewKeysModal';

const propTypes = {
  appName: PropTypes.string.isRequired,
  dataSource: PropTypes.string.isRequired,
  contentData: PropTypes.arrayOf(PropTypes.object).isRequired,
  paneTitle: PropTypes.string.isRequired,
  translatableFields: PropTypes.arrayOf(PropTypes.string),
  updateTranslations: PropTypes.func.isRequired,
  stripes: PropTypes.object.isRequired,
  // generateNewTranslationKey: PropTypes.func.isRequired,
  defaultValueField: PropTypes.string,
};

const TranslationsActionsMenu = ({
  translatableFields,
  appName,
  dataSource,
  contentData,
  paneTitle,
  defaultValueField,
  updateTranslations,
}) => {
  const [dropdownOpen, setdropdownOpen] = useState(false);

  const [openNewKeysModal, setOpenNewKeysModal] = useState(false);

  const toggleDropdown = () => {
    setdropdownOpen(!dropdownOpen);
  };

  const generateNewTranslationsKeys = () => {
    // const { translatableFields, appName, dataSource } = props;
    const newTrans = {};

    contentData?.map((item) => {
      if (translatableFields && translatableFields.length !== 0) {
        translatableFields.forEach((trans) => {
          if (item[trans]) {
            newTrans[`${appName}.${dataSource}.${trans}.${item[trans]}`] =
              item[defaultValueField];
          }
        });
      }
    });

    return newTrans;
  };

  const onGenerateNewTranslationKey = async () => {
    const newTransKeys = await Promise.resolve(generateNewTranslationsKeys());
    await updateTranslations('en', 'libTranslations', newTransKeys);
    setOpenNewKeysModal(false);
  };

  const renderCreateNewKeysModal = () => {
    return (
      <CreateNewKeysModal
        onClose={() => setOpenNewKeysModal(false)}
        onSave={onGenerateNewTranslationKey}
        open={openNewKeysModal}
        contentData={generateNewTranslationsKeys()}
        dataSource={dataSource}
        paneTitle={paneTitle}
      />
    );
  };

  const getDropdownContent = () => {
    return (
      <NavList>
        <NavListSection>
          <NavListItem
            id="clickable-create-new-translation-keys"
            type="button"
            onClick={() => setOpenNewKeysModal(true)}
          >
            <Icon icon="plus-sign">
              <FormattedMessage
                id="stripes-smart-components.buttons.createTranslationKeys"
                defaultMessage="Create translations keys"
              />
            </Icon>
          </NavListItem>
        </NavListSection>
      </NavList>
    );
  };

  const renderActionsMenuTrigger = ({ getTriggerProps, open }) => {
    return (
      <FormattedMessage id="stripes-core.mainnav.myProfileAriaLabel">
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

  const renderDropdownComponent = () => {
    return (
      <Dropdown
        id="editableList-actionsMenu-Dropdown"
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

  return (
    <>
      {renderCreateNewKeysModal()}
      {renderDropdownComponent()}
    </>
  );
};

TranslationsActionsMenu.propTypes = propTypes;

export default stripesConnect(WithTranslations(TranslationsActionsMenu));

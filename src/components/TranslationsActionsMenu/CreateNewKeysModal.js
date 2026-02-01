/* eslint-disable react/sort-prop-types */
/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  MultiColumnList,
  ModalFooter,
  Button,
  Icon,
  Layout,
} from '@folio/stripes-components';
import { FormattedMessage, useIntl } from 'react-intl';

const propTypes = {
  columnMapping: PropTypes.object,
  contentData: PropTypes.arrayOf(PropTypes.object).isRequired,
  paneTitle: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

const CreateNewKeysModal = (props) => {
  const intl = useIntl();

  const renderFilePreview = () => {
    const { contentData } = props;
    const newKeysArray = [];

    for (const key in contentData) {
      if (key) {
        const translationObj = {};
        translationObj.keyName = key;
        translationObj.keyValue = contentData[key];
        newKeysArray.push(translationObj);
      }
    }

    const dataWithIndex = newKeysArray.map((item, index) => {
      item.id = index + 1;
      return item;
    });

    return (
      <MultiColumnList
        interactive={false}
        contentData={dataWithIndex}
        visibleColumns={['id', 'keyName', 'keyValue']}
        columnWidths={{ id: '10%', keyName: '45%', keyValue: '45%' }}
        columnMapping={{
          keyName: intl.formatMessage({
            id: 'ui-translations.settings.keyName',
          }),
          keyValue: intl.formatMessage({
            id: 'ui-translations.settings.keyValue',
          }),
        }}
        maxHeight={500}
        virtualize
        pageAmount={100}
        totalCount={dataWithIndex.length}
        isEmptyMessage={
          <FormattedMessage id="stripes-smart-components.actionMenu.createNewKeysModal.isEmptyMessage" />
        }
      />
    );
  };

  const renderFooter = () => {
    return (
      <ModalFooter>
        <Button buttonStyle="primary" onClick={props.onSave}>
          <Icon icon="save" size="large">
            <FormattedMessage id="stripes-core.button.save" />
          </Icon>
        </Button>
        <Button buttonStyle="slim" onClick={props.onClose}>
          <Icon icon="times-circle-solid" size="large">
            <FormattedMessage id="stripes-core.button.cancel" />
          </Icon>
        </Button>
      </ModalFooter>
    );
  };

  const renderConfirmationModal = () => {
    const { open, onClose, paneTitle } = props;

    return (
      <Modal
        footer={renderFooter()}
        open={open}
        onClose={onClose}
        label={
          <Icon icon="plus-sign" size="large">
            <FormattedMessage
              id="stripes-smart-components.actionMenu.createNewKeysModal.header"
              defaultMessage="{name} - Create new translations keys"
              values={{ name: paneTitle }}
            />
          </Icon>
        }
      >
        {renderFilePreview()}
      </Modal>
    );
  };

  return <>{renderConfirmationModal()}</>;
};

CreateNewKeysModal.propTypes = propTypes;

export default CreateNewKeysModal;

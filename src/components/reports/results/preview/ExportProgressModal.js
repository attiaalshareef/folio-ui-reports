import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  ModalFooter,
  Loading,
  Icon,
  Button,
} from '@folio/stripes/components';
import { FormattedMessage } from 'react-intl';

function ExportProgressModal({
  isOpen,
  exportType,
  exportStage,
  exportError,
  onClose,
  onRetry,
  onDownload,
  defaultFilename,
}) {
  const filename = defaultFilename || 'report.xlsx';

  const getModalFooter = () => {
    if (exportError) {
      return (
        <ModalFooter>
          <Button buttonStyle="primary" onClick={onRetry}>
            <FormattedMessage
              id="ui-reports.exportProgress.error.retryBtn"
              defaultMessage="Try Again"
            />
          </Button>
          <Button buttonStyle="default" onClick={onClose}>
            <FormattedMessage
              id="ui-reports.exportProgress.error.closeBtn"
              defaultMessage="Close"
            />
          </Button>
        </ModalFooter>
      );
    }

    if (exportStage === 'ready') {
      return (
        <ModalFooter>
          <Button
            buttonStyle="primary"
            onClick={() => onDownload({ filename })}
            bottomMargin0
          >
            <FormattedMessage
              id="ui-reports.exportProgress.ready.downloadBtn"
              defaultMessage="Export Now"
            />
          </Button>
          <Button buttonStyle="default" onClick={onClose} bottomMargin0>
            <FormattedMessage
              id="ui-reports.exportProgress.ready.cancelBtn"
              defaultMessage="Cancel"
            />
          </Button>
        </ModalFooter>
      );
    }

    if (exportStage === 'complete') {
      return (
        <ModalFooter>
          <Button buttonStyle="primary" onClick={onClose}>
            <FormattedMessage
              id="ui-reports.exportProgress.complete.closeBtn"
              defaultMessage="Close"
            />
          </Button>
        </ModalFooter>
      );
    }

    return null;
  };

  const getModalTitle = () => {
    if (exportError) {
      return (
        <FormattedMessage
          id="ui-reports.exportProgress.error.title"
          defaultMessage="Export Failed"
        />
      );
    }

    switch (exportStage) {
      case 'preparing':
        return (
          <FormattedMessage
            id="ui-reports.exportProgress.preparing.title"
            defaultMessage="Preparing Export"
          />
        );
      case 'ready':
        return (
          <FormattedMessage
            id="ui-reports.exportProgress.ready.title"
            defaultMessage="Export Ready"
          />
        );
      case 'downloading':
        return (
          <FormattedMessage
            id="ui-reports.exportProgress.downloading.title"
            defaultMessage="Saving File"
          />
        );
      case 'complete':
        return (
          <FormattedMessage
            id="ui-reports.exportProgress.complete.title"
            defaultMessage="Export Complete"
          />
        );
      default:
        return (
          <FormattedMessage
            id="ui-reports.exportProgress.inProgress.title"
            defaultMessage="Exporting Report"
          />
        );
    }
  };

  const getModalContent = () => {
    if (exportError) {
      return (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <Icon
            icon="exclamation-circle"
            size="large"
            iconClassName="text-danger"
            style={{ marginBottom: '1rem' }}
          />
          <div style={{ marginBottom: '1rem' }}>
            <FormattedMessage
              id="ui-reports.exportProgress.error.message"
              values={{ type: exportType, error: exportError }}
              defaultMessage="Failed to export to {type}. Error: {error}"
            />
          </div>
        </div>
      );
    }

    switch (exportStage) {
      case 'preparing':
        return (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <Loading size="large" />
            <div style={{ marginTop: '1.5rem', fontSize: '1.1rem' }}>
              <FormattedMessage
                id="ui-reports.exportProgress.preparing.message"
                values={{ type: exportType }}
                defaultMessage="Preparing your {type} data..."
              />
            </div>
            <div
              style={{ marginTop: '0.5rem', color: '#666', fontSize: '0.9rem' }}
            >
              <FormattedMessage
                id="ui-reports.exportProgress.preparing.subMessage"
                defaultMessage="Processing report data and formatting for export."
              />
            </div>
          </div>
        );

      case 'ready':
        return (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <Icon
              icon="check-circle"
              size="large"
              iconClassName="text-success"
              style={{ marginBottom: '1rem' }}
            />
            <div style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>
              <FormattedMessage
                id="ui-reports.exportProgress.ready.message"
                values={{ type: exportType }}
                defaultMessage="Your {type} export is ready!"
              />
            </div>
            <div
              style={{
                marginBottom: '2rem',
                color: '#666',
                fontSize: '0.9rem',
              }}
            >
              <FormattedMessage
                id="ui-reports.exportProgress.ready.subMessage"
                defaultMessage="Click Export Now to download the file to your Downloads folder."
              />
            </div>
          </div>
        );

      case 'downloading':
        return (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <Loading size="large" />
            <div style={{ marginTop: '1.5rem', fontSize: '1.1rem' }}>
              <FormattedMessage
                id="ui-reports.exportProgress.downloading.message"
                defaultMessage="Saving your file..."
              />
            </div>
            <div
              style={{ marginTop: '0.5rem', color: '#666', fontSize: '0.9rem' }}
            >
              <FormattedMessage
                id="ui-reports.exportProgress.downloading.subMessage"
                defaultMessage="Please choose a location in the save dialog."
              />
            </div>
          </div>
        );

      case 'complete':
        return (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <Icon
              icon="check-circle"
              size="large"
              iconClassName="text-success"
              style={{ marginBottom: '1rem' }}
            />
            <div style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>
              <FormattedMessage
                id="ui-reports.exportProgress.complete.message"
                values={{ type: exportType }}
                defaultMessage="Your {type} file has been saved successfully!"
              />
            </div>
            <div
              style={{
                marginBottom: '2rem',
                color: '#666',
                fontSize: '0.9rem',
              }}
            >
              <FormattedMessage
                id="ui-reports.exportProgress.complete.subMessage"
                defaultMessage="The file has been downloaded to your default downloads folder."
              />
            </div>
          </div>
        );

      default:
        return (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <Loading size="large" />
          </div>
        );
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={
        exportStage !== 'preparing' && exportStage !== 'downloading'
          ? onClose
          : undefined
      }
      size="small"
      label={getModalTitle()}
      footer={getModalFooter()}
      dismissible={exportStage !== 'preparing' && exportStage !== 'downloading'}
      closeOnBackgroundClick={
        exportStage !== 'preparing' && exportStage !== 'downloading'
      }
    >
      {getModalContent()}
    </Modal>
  );
}

ExportProgressModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  exportType: PropTypes.oneOf(['Excel', 'PDF', 'Print']),
  exportStage: PropTypes.oneOf([
    'idle',
    'preparing',
    'ready',
    'downloading',
    'complete',
  ]),
  exportError: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  onRetry: PropTypes.func,
  onDownload: PropTypes.func,
  defaultFilename: PropTypes.string,
};

ExportProgressModal.defaultProps = {
  exportType: 'Excel',
  exportStage: 'idle',
  exportError: null,
  defaultFilename: 'report.xlsx',
};

export default ExportProgressModal;

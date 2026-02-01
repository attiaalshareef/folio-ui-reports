import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Pane, PaneFooter } from '@folio/stripes/components';
import { FormattedMessage } from 'react-intl';
import GenericResultsDisplay from '../core/GenericResultsDisplay';
import useCubeQuery from '../../../../hooks/useQuery';

function DrillDownModal({ isOpen, onClose, drillDownData }) {
  const [displayMethod, setDisplayMethod] = useState('table');

  // Execute drill-down query
  const [resultSet, error, isLoading] = useCubeQuery(
    drillDownData?.query || null,
  );

  if (!drillDownData) return null;

  const { measureName, staffName, measureValue, reportType } = drillDownData;

  const renderFooter = () => (
    <PaneFooter
      renderEnd={
        <Button buttonStyle="primary" onClick={onClose} marginBottom0>
          <FormattedMessage
            id="ui-reports.drillDown.modal.closeBtn"
            defaultMessage="Close"
          />
        </Button>
      }
    />
  );

  const getModalTitle = () => {
    const measureLabel = measureName
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (l) => l.toUpperCase());
    return (
      <FormattedMessage
        id="ui-reports.drillDown.modal.title"
        values={{
          measure: measureLabel,
          staff: staffName,
          count: measureValue,
        }}
        defaultMessage="{measure} Details - {staff} ({count} records)"
      />
    );
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      size="large"
      label={getModalTitle()}
      dismissible
    >
      <Pane
        defaultWidth="fill"
        fluidContentWidth
        footer={renderFooter()}
        paneTitle={getModalTitle()}
        paneSub={
          !isLoading && resultSet ? (
            <FormattedMessage
              id="stripes-smart-components.searchResultsCountHeader"
              values={{
                count: resultSet?.loadResponses?.[0]?.data?.length || 0,
              }}
            />
          ) : null
        }
      >
        <GenericResultsDisplay
          resultSet={resultSet}
          error={error}
          isLoading={isLoading}
          displayMethod={displayMethod}
          reportType={reportType}
          query={drillDownData.query}
          // No drill-down in drill-down modal to avoid infinite loops
          onDrillDown={null}
        />
      </Pane>
    </Modal>
  );
}

DrillDownModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  drillDownData: PropTypes.shape({
    query: PropTypes.object,
    measureName: PropTypes.string,
    staffName: PropTypes.string,
    measureValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    reportType: PropTypes.string,
  }),
};

export default DrillDownModal;

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  ModalFooter,
  Button,
  MultiColumnList,
  Loading,
  Icon,
} from '@folio/stripes/components';
import { FormattedMessage } from 'react-intl';
import { useCubeQuery } from '@cubejs-client/react';

function DrillDownModal({
  open,
  onClose,
  drillDownQuery,
  measureName,
  staffName,
  measureValue,
}) {
  // Use useCubeQuery hook
  const { resultSet, error, isLoading } = useCubeQuery(
    drillDownQuery && open ? drillDownQuery : null,
  );

  const [data, setData] = useState([]);

  useEffect(() => {
    console.log('DrillDownModal useEffect:', {
      resultSet: !!resultSet,
      isLoading,
      error: !!error,
    });

    if (resultSet && !isLoading && !error) {
      try {
        const tableData = resultSet.tablePivot();
        console.log('Drill-down data:', tableData);
        console.log('Drill-down data length:', tableData.length);
        setData(tableData);
      } catch (err) {
        console.error('Error processing drill-down data:', err);
        setData([]);
      }
    } else if (error) {
      console.error('Drill-down query error:', error);
      setData([]);
    } else if (!isLoading && !resultSet) {
      console.log(
        'No resultSet and not loading - query might have failed silently',
      );
    }
  }, [resultSet, isLoading, error]);

  const getColumnMapping = () => {
    if (data.length === 0) return {};

    const mapping = {};
    Object.keys(data[0]).forEach((key) => {
      // Convert cube field names to readable labels
      const label = key.split('.').pop().replace(/_/g, ' ');
      mapping[key] = label.charAt(0).toUpperCase() + label.slice(1);
    });

    return mapping;
  };

  const getVisibleColumns = () => {
    return data.length > 0 ? Object.keys(data[0]) : [];
  };

  const renderFooter = () => (
    <ModalFooter>
      <Button buttonStyle="primary" onClick={onClose}>
        <FormattedMessage
          id="ui-reports.drillDown.close"
          defaultMessage="Close"
        />
      </Button>
    </ModalFooter>
  );

  const getMeasureLabel = (measure) => {
    const labels = {
      instances_created: 'العناوين المنشأة',
      instances_updated: 'العناوين المحدثة',
      holdings_created: 'المقتنيات المنشأة',
      holdings_updated: 'المقتنيات المحدثة',
      items_created: 'النسخ المنشأة',
      items_updated: 'النسخ المحدثة',
      instances_suppressed: 'العناوين المحجوبة',
      instances_discovery_suppressed: 'العناوين المحجوبة من الاكتشاف',
      instances_staff_suppressed: 'العناوين المحجوبة من الموظفين',
    };
    return labels[measure] || measure;
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      footer={renderFooter()}
      label={
        <FormattedMessage
          id="ui-reports.drillDown.modalTitle"
          defaultMessage="تفاصيل {measure} - {staff} ({count})"
          values={{
            measure: getMeasureLabel(measureName),
            staff: staffName,
            count: measureValue,
          }}
        />
      }
      size="large"
    >
      <div style={{ padding: '1rem', minHeight: '400px' }}>
        {isLoading && (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <Loading />
          </div>
        )}

        {error && (
          <div style={{ color: 'red', padding: '1rem' }}>
            <Icon icon="exclamation-circle" />
            <FormattedMessage
              id="ui-reports.drillDown.error"
              defaultMessage="خطأ في تحميل البيانات: {error}"
              values={{ error: error?.toString() || 'Unknown error' }}
            />
          </div>
        )}

        {!isLoading && !error && data.length > 0 && (
          <MultiColumnList
            id="drill-down-results"
            contentData={data}
            visibleColumns={getVisibleColumns()}
            columnMapping={getColumnMapping()}
            autosize
            virtualize
            interactive={false}
          />
        )}

        {!isLoading && !error && data.length === 0 && (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <FormattedMessage
              id="ui-reports.drillDown.noData"
              defaultMessage="لا توجد بيانات للعرض"
            />
          </div>
        )}
      </div>
    </Modal>
  );
}

DrillDownModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  drillDownQuery: PropTypes.object,
  measureName: PropTypes.string,
  staffName: PropTypes.string,
  measureValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default DrillDownModal;

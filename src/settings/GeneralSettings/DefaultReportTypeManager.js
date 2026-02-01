import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { CalloutContext, useOkapiKy } from '@folio/stripes/core';
import useReportsConfigs from '../../hooks/useReportsConfigs';
import DefaultReportTypeForm from './DefaultReportTypeForm';

function DefaultReportTypeManager(props) {
  const {
    defaultReportType,
    isLoading: configLoading,
    configId,
  } = useReportsConfigs();
  const [initialValues, setInitialValues] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const okapiKy = useOkapiKy();
  const callout = useContext(CalloutContext);

  useEffect(() => {
    const reportType = defaultReportType || 'dimMetric';
    setInitialValues({ defaultReportType: reportType });
  }, [defaultReportType]);

  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      const configData = {
        configName: 'defaultReportType',
        configCode: 'defaultReportType',
        configValue: {
          reportType: values.defaultReportType,
        },
      };

      if (configId) {
        // Update existing config
        await okapiKy.put(`reportsConfigs/${configId}`, {
          json: {
            id: configId,
            ...configData,
          },
        });
        const message = (
          <FormattedMessage
            id="ui-reports.settings.defaultReportType.updated"
            defaultMessage="Default report type updated successfully"
          />
        );
        callout.sendCallout({ message, type: 'success' });
      } else {
        // Create new config
        await okapiKy.post('reportsConfigs', {
          json: configData,
        });
        const message = (
          <FormattedMessage
            id="ui-reports.settings.defaultReportType.created"
            defaultMessage="Default report type created successfully"
          />
        );
        callout.sendCallout({ message, type: 'success' });
      }
    } catch (error) {
      console.error('Error saving default report type:', error);
      const errorMessage = (
        <FormattedMessage
          id="ui-reports.settings.defaultReportType.error"
          defaultMessage="Error saving default report type"
        />
      );
      callout.sendCallout({ message: errorMessage, type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DefaultReportTypeForm
      {...props}
      onSubmit={handleSubmit}
      initialValues={initialValues}
      isLoading={isLoading || configLoading}
    />
  );
}

DefaultReportTypeManager.propTypes = {};

export default DefaultReportTypeManager;

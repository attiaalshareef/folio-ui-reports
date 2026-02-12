import React, { useContext, useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { stripesConnect } from '@folio/stripes-core';
import { Callout } from '@folio/stripes/components';
import WidgetForm from './WidgetForm';
import DashboardsContext from '../../../Context/dashboards/DashboardsContext';

function WidgetFormManager(props) {
  const dashboards = useContext(DashboardsContext);
  const calloutRef = React.useRef();

  const [initialValues, setInitialValues] = useState({});
  const [currentReport, setCurrentReport] = useState({});
  const [selectedReports, setSelectedReports] = useState([]);
  const [widgetType, setWidgetType] = useState('singleReport');
  const [isLoading, setIsLoading] = useState(false);

  const currentDashboard = dashboards.find(
    dash => dash.name === props.location.pathname.split('/')[3]
  );

  const isEditMode = props.location?.pathname?.includes('/edit/');
  const widgetId = isEditMode ? props.location.pathname.split('/').pop() : null;

  // Load widget data in edit mode
  useEffect(() => {
    if (isEditMode && widgetId && props.resources.widget?.records?.[0]) {
      const widget = props.resources.widget.records[0];
      setInitialValues({
        widgetName: widget.name || '',
        widgetDesc: widget.desc || '',
        order: widget.order || 0,
      });
      setWidgetType(widget.generalSettings?.widgetType || 'singleReport');
    }
  }, [isEditMode, widgetId, props.resources.widget]);

  const onFormSubmit = async (values) => {
    setIsLoading(true);
    
    try {
      let reportsIds = [];
      let queriesMetadata = [];
      
      if (widgetType === 'singleReport' && currentReport?.id) {
        reportsIds = [currentReport.id];
        queriesMetadata = [currentReport.queryMetadata];
      } else if (selectedReports.length > 0) {
        reportsIds = selectedReports.map(report => report.id);
        queriesMetadata = selectedReports.map(report => report.queryMetadata);
      }

      const widgetData = {
        name: values.widgetName,
        desc: values.widgetDesc,
        order: values.order || 0,
        dashboardId: currentDashboard?.id,
        type: [{
          name: widgetType,
          supportedReportsTypes: ['statistical', 'detailed', 'summary', 'trend', 'comparative', 'distribution', 'performance'],
          displayMethod: currentReport?.displayMethods || [{
            name: 'numLabel',
            displaySettings: {}
          }],
          defaultMethod: currentReport?.defaultDisplayMethod || 'numLabel'
        }],
        reportsIds: reportsIds,
        queriesMetadata: queriesMetadata,
        generalSettings: {
          widgetType: widgetType,
          reportsCount: reportsIds.length
        }
      };
      
      console.log('Creating/Updating widget with data:', widgetData);
      console.log('Current dashboard:', currentDashboard);
      
      if (isEditMode && widgetId) {
        await props.mutator.widget.PUT({ ...widgetData, id: widgetId });
        calloutRef.current?.sendCallout({
          type: 'success',
          message: 'Widget updated successfully'
        });
      } else {
        await props.mutator.widgets.POST(widgetData);
        calloutRef.current?.sendCallout({
          type: 'success',
          message: 'Widget created successfully'
        });
      }
      
      props.handleClose();
    } catch (error) {
      console.error('Error saving widget:', error);
      calloutRef.current?.sendCallout({
        type: 'error',
        message: `Error saving widget: ${error.message}`
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <WidgetForm
        handleClose={props.handleClose}
        onSubmit={onFormSubmit}
        initialValues={initialValues}
        editMode={isEditMode}
        currentDashName={props.location.pathname.split('/')[3]}
        currentReport={currentReport}
        setCurrentReport={setCurrentReport}
        selectedReports={selectedReports}
        setSelectedReports={setSelectedReports}
        widgetType={widgetType}
        setWidgetType={setWidgetType}
        isLoading={isLoading}
      />
      <Callout ref={calloutRef} />
    </>
  );
}

WidgetFormManager.propTypes = {
  handleClose: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired
  }).isRequired,
  location: PropTypes.object,
  resources: PropTypes.shape({
    widgets: PropTypes.shape({
      records: PropTypes.arrayOf(PropTypes.object)
    }),
    widgetId: PropTypes.shape({
      replace: PropTypes.func.isRequired
    })
  }),
  mutator: PropTypes.shape({
    widgets: PropTypes.shape({
      GET: PropTypes.func.isRequired,
      reset: PropTypes.func.isRequired,
      POST: PropTypes.func.isRequired,
      PUT: PropTypes.func.isRequired
    }),
    widgetId: PropTypes.shape({
      replace: PropTypes.func.isRequired
    })
  })
};

WidgetFormManager.manifest = Object.freeze({
  widgets: {
    type: 'okapi',
    records: 'widgets',
    path: 'widgets?limit=1000',
    POST: {
      path: 'widgets'
    },
    accumulate: true,
    fetch: false,
  },
  widget: {
    type: 'okapi',
    records: 'widgets',
    path: 'widgets/:{widgetId}',
    PUT: {
      path: 'widgets/:{widgetId}'
    },
    accumulate: true,
    fetch: false,
  },
});

export default stripesConnect(WidgetFormManager);

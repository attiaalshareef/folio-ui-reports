import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { stripesConnect } from '@folio/stripes-core';
import WidgetForm from './WidgetForm';
import DashboardsContext from '../../../Context/dashboards/DashboardsContext';

function WidgetFormManager(props) {
  const dashboards = useContext(DashboardsContext);

  const [initialValues, setInitialValues] = useState({});
  const [currentReport, setCurrentReport] = useState({});
  const [selectedReports, setSelectedReports] = useState([]);
  const [widgetType, setWidgetType] = useState('singleReport');

  const currentDashboard = dashboards.find(
    dash => dash.name === props.location.pathname.split('/')[3]
  );

  useEffect(() => {
    if (props.location?.pathname?.endsWith('/edit')) {
      setInitialValues({
        reportId: '',
        wedgetName: 'Total Instances',
        wedgetDesc: 'Total Instances',
        visableColumns: [],
        viewSettings: {}
      });
    }
  }, [props.location]);

  console.log({ currentReport });

  const getFieldValues = values => {
    const columns = [];
    values.map(val => columns.push(val.value));

    return columns;
  };

  const onFormSubmit = values => {
    console.log({ values, widgetType, selectedReports, currentReport });
    
    // تحضير بيانات التقارير حسب نوع الويدجت
    let reportsIds = [];
    let queriesMetadata = [];
    
    if (widgetType === 'singleReport' && currentReport?.id) {
      reportsIds = [currentReport.id];
      queriesMetadata = [currentReport.queryMetadata];
    } else if (selectedReports.length > 0) {
      reportsIds = selectedReports.map(report => report.id);
      queriesMetadata = selectedReports.map(report => report.queryMetadata);
    }
    
    if (Object.keys(initialValues).length) {
      // تحديث ويدجت موجود
      const widgetId = props.location?.pathname?.split('/')[4];
      props.mutator.widgetId.replace(widgetId);
      // TODO: تنفيذ منطق التحديث
    } else {
      // إنشاء ويدجت جديد
      props.mutator.widgets.POST({
        name: values.widgetName,
        desc: values.widgetDesc,
        type: [{
          name: widgetType,
          supportedReportsTypes: ['numMetric', 'dimMetric', 'periodMetric', 'list'],
          displayMethod: [{
            name: 'numLabel',
            displaySettings: {}
          }],
          defaultMethod: 'numLabel'
        }],
        reportsIds: reportsIds,
        dashboardId: currentDashboard?.id,
        queriesMetadata: queriesMetadata,
        generalSettings: {
          widgetType: widgetType,
          reportsCount: reportsIds.length
        }
      });
    }
  };

  return (
    <>
      <WidgetForm
        handleClose={props.handleClose}
        onSubmit={onFormSubmit}
        initialValues={initialValues}
        editMode={Object.keys(initialValues).length}
        currentDashName={props.location.pathname.split('/')[3]}
        currentReport={currentReport}
        setCurrentReport={setCurrentReport}
        selectedReports={selectedReports}
        setSelectedReports={setSelectedReports}
        widgetType={widgetType}
        setWidgetType={setWidgetType}
      />
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
    PUT: {
      path: 'widgets'
    },
    DELETE: {
      path: 'widgets'
    }
  }
});

export default stripesConnect(WidgetFormManager);

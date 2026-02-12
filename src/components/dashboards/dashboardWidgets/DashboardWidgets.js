import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { get, isEqual, sortBy } from 'lodash';

import { AppIcon, stripesConnect } from '@folio/stripes-core';
import { Button, Icon, Pane, Row, Callout } from '@folio/stripes/components';
import DashboardsActionsMenu from './DashboardsActionsMenu';
import DashboardsMenu from './DashboardsMenu';
import DashboardsContext from '../../../Context/dashboards/DashboardsContext';
import AppConfigListContext from '../../../Context/appConfigList/AppConfigListContext';
import css from './style.css';
import Widget from '../widgetForm/components/Widget';

function DashboardWidgets(props) {
  const dashboards = useContext(DashboardsContext);
  const defaultDashboard = useContext(AppConfigListContext);
  const [currentDashboard, setCurrentDashboard] = useState({});
  const [widgetsList, setWidgetsList] = useState([]);
  const calloutRef = React.useRef();

  useEffect(() => {
    if (defaultDashboard?.defaultDashboard?.configValue) {
      setCurrentDashboard(defaultDashboard?.defaultDashboard?.configValue);
    }
  }, [defaultDashboard]);

  useEffect(() => {
    const nextWidgets = sortBy(
      (props.resources.widgets || {}).records || [], 
      ['order', 'name']
    )?.filter((widget) => widget.dashboardId === currentDashboard.id);

    if (!isEqual(nextWidgets, widgetsList)) {
      setWidgetsList(nextWidgets);
    }
  }, [currentDashboard, props.resources.widgets, widgetsList]);

  const onDeleteWidget = async (widgetId) => {
    try {
      await props.mutator.widgets.DELETE({ id: widgetId });
      calloutRef.current?.sendCallout({
        type: 'success',
        message: 'Widget deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting widget:', error);
      calloutRef.current?.sendCallout({
        type: 'error',
        message: `Error deleting widget: ${error.message}`
      });
    }
  };

  return (
    <>
      <Pane
        id="pane-dashboard-widgets"
        appIcon={<AppIcon app="reports" />}
        padContent={false}
        paneTitle={
          <DashboardsMenu
            dataOptions={dashboards}
            currentDashboard={currentDashboard}
            setCurrentDashboard={setCurrentDashboard}
          />
        }
        lastMenu={<DashboardsActionsMenu currentDashboard={currentDashboard} />}
      >
        {!widgetsList.length ? (
          <div className={css.emptyList}>
            <div style={{ paddingBottom: '10px' }}>
              <FormattedMessage
                id="ui-reports.dashboards.widgets.noWidgets.message"
                defaultMessage="No widgets found!"
              />
            </div>
            <Button
              marginBottom0
              id="dashboards-widgets-list-new-widget-btn"
              to={{
                pathname: `/reports/dashboards/${currentDashboard.name}/widgets/create`,
              }}
            >
              <Icon icon="plus-sign">
                <FormattedMessage
                  id="ui-reports.dashboards.widgets.addNewWidget.btn"
                  defaultMessage="Create new widget"
                />
              </Icon>
            </Button>
          </div>
        ) : (
          <div style={{ padding: '20px' }}>
            <Row>
              {widgetsList?.map((widget, index) => {
                const widgetType = widget?.reportsIds?.length > 1 ? 'multiReports' : 'singleReport';
                return (
                  <Col 
                    key={widget.id}
                    xs={12}
                    sm={widgetType === 'multiReports' ? 12 : 6}
                    md={widgetType === 'multiReports' ? 12 : 6}
                    lg={widgetType === 'multiReports' ? 12 : 4}
                  >
                    <Widget
                      widget={widget}
                      index={index}
                      onDeleteWidget={onDeleteWidget}
                      currentDashboard={currentDashboard}
                    />
                  </Col>
                );
              })}
            </Row>
          </div>
        )}
      </Pane>
      <Callout ref={calloutRef} />
    </>
  );
}

DashboardWidgets.propTypes = {
  resources: PropTypes.shape({
    widgets: PropTypes.shape({
      records: PropTypes.arrayOf(PropTypes.object),
    }),
  }),
  mutator: PropTypes.shape({
    widgets: PropTypes.shape({
      GET: PropTypes.func.isRequired,
      PUT: PropTypes.func.isRequired,
      DELETE: PropTypes.func.isRequired,
    }),
  }),
};

DashboardWidgets.manifest = Object.freeze({
  widgets: {
    type: 'okapi',
    records: 'widgets',
    path: 'widgets?limit=10000',
    PUT: {
      path: 'widgets',
    },
    DELETE: {
      path: 'widgets',
    },
  },
});

export default stripesConnect(DashboardWidgets);
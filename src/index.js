import PropTypes from 'prop-types';
import { okapi } from 'stripes-config';
import Switch from 'react-router-dom/Switch';
import Route from 'react-router-dom/Route';
import { CubeProvider } from '@cubejs-client/react';
import cube from '@cubejs-client/core';
import { Redirect } from 'react-router';
import WebSocketTransport from '@cubejs-client/ws-transport';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Settings from './settings';
import PrefferedReportsRoute from './routes/PrefferedReportsRoute';
import ScheduledReportsRoute from './routes/ScheduledReportsRoute';
import DashboardsProvider from './Context/dashboards/DashboardsProvider';
import AppConfigListProvider from './Context/appConfigList/AppConfigListProvider';
import WidgetFormRoute from './routes/WidgetFormRoute';
import DashboardsRoute from './routes/DashboardsRoute';
import ReportsProvider from './Context/reports/ReportsProvider';
import QueryBuilderRoute from './routes/reportBuilders/QueryBuilderRoute';
import CatalogingReportsRoute from './routes/reportBuilders/CatalogingReportsRoute';
import ProductivityReportsRoute from './routes/reportBuilders/ProductivityReportsRoute';
import ReportsListRoute from './routes/ReportsListRoute';
import QueryResultSetRoute from './routes/QueryResultSetRoute';
import ReportEdit from './components/reports/management/edit';
import ReportBuilderSelectionRoute from './routes/reportBuilders/ReportBuilderSelectionRoute';
import CirculationReportsRoute from './routes/reportBuilders/CirculationReportsRoute';
import RoutesTabs from './routes/RoutesTabs';
import css from './routes/style.css';

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 2 * 60 * 1000, // 2 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

function Reports(props) {
  const { stripes } = props;
  const wsProtocol = okapi.cubeURL.startsWith('https:') ? 'wss' : 'ws';
  const wsUrl = `${wsProtocol}://${okapi.cubeWS}/`;

  const getCubeToken = () => stripes?.okapi?.token;

  const cubejsApi = cube(getCubeToken, {
    apiUrl: `${okapi.cubeURL}/cubejs-api/v1`,
    transport: new WebSocketTransport({
      authorization: getCubeToken,
      apiUrl: wsUrl,
    }),
  });

  const {
    actAs,
    match: { path },
  } = props;
  if (actAs === 'settings') {
    return <Settings {...props} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <CubeProvider cubeApi={cubejsApi}>
        <AppConfigListProvider>
          <DashboardsProvider>
            <ReportsProvider>
              <div className={css.appContainer}>
                <RoutesTabs />
                <div className={css.mainContent}>
                  <Switch>
                    <Redirect exact from={path} to={`${path}/dashboards`} />
                    <Route
                      path={`${path}/dashboards`}
                      exact
                      component={DashboardsRoute}
                    />

                    <Route
                      path={`${path}/dashboards/:dashName/widgets/create`}
                      exact
                      component={WidgetFormRoute}
                    />
                    <Route
                      path={`${path}/dashboards/:dashName/:widgetId/edit`}
                      component={WidgetFormRoute}
                    />

                    <Route
                      path={`${path}/reports-list`}
                      exact
                      component={ReportsListRoute}
                    />
                    <Route
                      path={`${path}/reports-list/:reportId/view`}
                      exact
                      component={ReportsListRoute}
                    />

                    <Route
                      path={`${path}/reports-list/:reportId/edit`}
                      exact
                      component={ReportEdit}
                    />

                    <Route
                      path={`${path}/reports-list/:id/run`}
                      exact
                      component={QueryResultSetRoute}
                    />

                    <Route
                      path={`${path}/preffered-reports`}
                      exact
                      component={PrefferedReportsRoute}
                    />
                    <Route
                      path={`${path}/scheduled-reports`}
                      exact
                      component={ScheduledReportsRoute}
                    />
                    <Route
                      path={`${path}/query-builder`}
                      exact
                      component={QueryBuilderRoute}
                    />
                    <Route
                      path={`${path}/cataloging-reports`}
                      exact
                      component={CatalogingReportsRoute}
                    />
                    <Route
                      path={`${path}/circulation-reports`}
                      exact
                      component={CirculationReportsRoute}
                    />
                    <Route
                      path={`${path}/productivity-reports`}
                      exact
                      component={ProductivityReportsRoute}
                    />
                    <Route
                      path={`${path}/select-builder`}
                      exact
                      component={ReportBuilderSelectionRoute}
                    />
                    <Route
                      path={`${path}/report-builder`}
                      exact
                      component={ReportBuilderSelectionRoute}
                    />
                  </Switch>
                </div>
              </div>
            </ReportsProvider>
          </DashboardsProvider>
        </AppConfigListProvider>
      </CubeProvider>
    </QueryClientProvider>
  );
}

Reports.propTypes = {
  match: PropTypes.object.isRequired,
  showSettings: PropTypes.bool,
  stripes: PropTypes.shape({
    connect: PropTypes.func,
    okapi: PropTypes.shape({
      token: PropTypes.string,
    }),
  }),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.object,
  actAs: PropTypes.string.isRequired,
};

export default Reports;

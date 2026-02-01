import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { get, isEqual, sortBy } from 'lodash';
import DefaultDashboardForm from './DefaultDashboardForm';

function DefaultDashboardManager(props) {
  const [dashboards, setDashboards] = useState([]);
  const [defaultDashboard, setDefaultDashboard] = useState({});

  useEffect(() => {
    const dashboardsList = sortBy(
      (props.resources.dashboards || {}).records || [],
      ['name'],
    );

    if (!isEqual(dashboardsList, dashboards)) {
      setDashboards(dashboardsList);
    }
  }, [dashboards, props.resources.dashboards]);

  useEffect(() => {
    const configsList = sortBy(
      (props.resources.reportsConfigs || {}).records || [],
      ['configName'],
    );
    const nextConfig = configsList.find(
      (config) => config.configName === 'defaultDashboard',
    );

    if (!isEqual(get(nextConfig, ['configValue'], {}), defaultDashboard)) {
      setDefaultDashboard(get(nextConfig, ['configValue'], {}));
    }
  }, [defaultDashboard, props.resources.reportsConfigs]);

  const onFormSubmit = (values) => {
    const defaultDashboardvalue = dashboards.find(
      (dashboard) => values.defaultDashboard === dashboard.id,
    );
    // console.log({ values, defaultDashboardvalue });
    const record = (
      (props.resources.reportsConfigs || {}).records || []
    ).filter((config) => config.configName === 'defaultDashboard');

    if (record && record.length !== 0) {
      props.mutator.reportsConfigId.replace(record[0].id);
      record[0].configValue = {
        id: defaultDashboardvalue.id,
        name: defaultDashboardvalue.name,
        desc: defaultDashboardvalue.desc,
      };
      props.mutator.reportsConfigs.PUT(record[0]);
    } else {
      props.mutator.reportsConfigs.POST({
        configName: 'defaultDashboard',
        configCode: 'defaultDashboard',
        configValue: {
          id: defaultDashboardvalue.id,
          name: defaultDashboardvalue.name,
          desc: defaultDashboardvalue.desc,
        },
      });
    }
  };

  return (
    <DefaultDashboardForm
      onSubmit={onFormSubmit}
      initialValues={{
        defaultDashboard:
          Object.keys(defaultDashboard).length !== 0 ? defaultDashboard.id : '',
      }}
      dashboards={dashboards}
    />
  );
}

DefaultDashboardManager.propTypes = {
  resources: PropTypes.shape({
    dashboards: PropTypes.shape({
      records: PropTypes.arrayOf(PropTypes.object),
    }),
    reportsConfigs: PropTypes.shape({
      records: PropTypes.arrayOf(PropTypes.object),
    }),
    reportsConfigId: PropTypes.shape({
      replace: PropTypes.func.isRequired,
    }),
  }),
  mutator: PropTypes.shape({
    dashboards: PropTypes.shape({
      GET: PropTypes.func.isRequired,
    }),
    reportsConfigs: PropTypes.shape({
      GET: PropTypes.func.isRequired,
      reset: PropTypes.func.isRequired,
      POST: PropTypes.func.isRequired,
      PUT: PropTypes.func.isRequired,
    }),
    reportsConfigId: PropTypes.shape({
      replace: PropTypes.func.isRequired,
    }),
  }),
};

DefaultDashboardManager.manifest = Object.freeze({
  dashboards: {
    type: 'okapi',
    records: 'dashboards',
    path: 'dashboards?limit=1000',
  },
  reportsConfigId: '',
  reportsConfigs: {
    type: 'okapi',
    records: 'reportsConfigs',
    path: 'reportsConfigs?limit=1000',
    // resourceShouldRefresh: true,
    POST: {
      path: 'reportsConfigs',
    },
    PUT: {
      path: 'reportsConfigs',
    },
    DELETE: {
      path: 'reportsConfigs',
    },
  },
});

export default DefaultDashboardManager;

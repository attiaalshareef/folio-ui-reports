import React from 'react';
import { okapi } from 'stripes-config';
import { FormattedMessage } from 'react-intl';
import { Settings } from '@folio/stripes/smart-components';
import cube from '@cubejs-client/core';
import { CubeProvider } from '@cubejs-client/react';
import GeneralSettings from './GeneralSettings/GeneralSettings';
import CategoriesSettings from './categoriesSettings/CategoriesSettings';
import DashboardsSettings from './dashboardsSettings/DashboardsSettings';
import DefaultDashboardManager from './dashboardsSettings/DefaultDashboardManager';
import AvailableTables from './DataModels/AvailableTables';
import AvailableColumns from './DataModels/AvailableColumns';
import AvailableMeasures from './DataModels/AvailableMeasures';

function ReportsSettings(props) {
  const cubejsApi = cube(
    '1ef06b123908163668dcc89c6cf947265114a0bd26c496b9c9a7197c691710ce323534afee282dda37e04b8b2b3b39b361876571460528ee4c97dd706667f97e',
    {
      apiUrl: `${okapi.cubeURL}/cubejs-api/v1`,
    },
  );
  const sections = [
    {
      label: (
        <FormattedMessage
          id="ui-reports.settings.sections.general.label"
          defaultMessage="General"
        />
      ),
      pages: [
        {
          route: 'general',
          label: (
            <FormattedMessage
              id="ui-reports.settings.sections.general.pages.generalSettings.lable"
              defaultMessage="General Settings"
            />
          ),
          component: GeneralSettings,
          // perm: 'ui-reports.create',
        },
      ],
    },
    {
      label: (
        <FormattedMessage
          id="ui-reports.settings.sections.categories.label"
          defaultMessage="Categories"
        />
      ),
      pages: [
        {
          route: 'categories',
          label: (
            <FormattedMessage
              id="ui-reports.settings.sections.categories.pages.categoriesList.lable"
              defaultMessage="Reports Categories"
            />
          ),
          component: CategoriesSettings,
          // perm: 'ui-reports.create',
        },
      ],
    },
    {
      label: (
        <FormattedMessage
          id="ui-reports.settings.sections.dashboards.label"
          defaultMessage="Dashboards"
        />
      ),
      pages: [
        {
          route: 'dashboards',
          label: (
            <FormattedMessage
              id="ui-reports.settings.sections.dashboards.pages.dashboardsList.lable"
              defaultMessage="Dashboards list"
            />
          ),
          component: DashboardsSettings,
          // perm: 'ui-reports.create',
        },
        {
          route: 'default-dashboard',
          label: (
            <FormattedMessage
              id="ui-reports.settings.sections.dashboards.defaultDashboard.label"
              defaultMessage="Default dashboard"
            />
          ),
          component: DefaultDashboardManager,
          // perm: 'ui-reports.create',
        },
      ],
    },
    {
      label: (
        <FormattedMessage
          id="ui-reports.settings.sections.dataModels.label"
          defaultMessage="Data models"
        />
      ),
      pages: [
        {
          route: 'available-tables',
          label: (
            <FormattedMessage
              id="ui-reports.settings.sections.dataModels.pages.availableTables.lable"
              defaultMessage="Available tables"
            />
          ),
          component: AvailableTables,
          // perm: 'ui-reports.create',
        },
        {
          route: 'available-columns',
          label: (
            <FormattedMessage
              id="ui-reports.settings.sections.dataModels.availableColumns.label"
              defaultMessage="Available columns"
            />
          ),
          component: AvailableColumns,
          // perm: 'ui-reports.create',
        },
        {
          route: 'available-measures',
          label: (
            <FormattedMessage
              id="ui-reports.settings.sections.dataModels.availableMeasures.label"
              defaultMessage="Available measures"
            />
          ),
          component: AvailableMeasures,
          // perm: 'ui-reports.create',
        },
      ],
    },
  ];

  return (
    <CubeProvider cubeApi={cubejsApi}>
      <Settings
        {...props}
        sections={sections}
        paneTitle={
          <FormattedMessage
            id="ui-reports.meta.title"
            defaultMessage="Reports"
          />
        }
        navPaneWidth="20%"
      />
    </CubeProvider>
  );
}

ReportsSettings.propTypes = {};

export default ReportsSettings;

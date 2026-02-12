/* eslint-disable no-useless-escape */
import React from 'react';
import PropTypes from 'prop-types';
import { stripesConnect } from '@folio/stripes-core';
import { useIntl } from 'react-intl';
import SaveNewReportForm from './SaveNewReportForm';
import useReportTypes from '../../../../hooks/useReportTypes';
import useQueryString from '../../../../hooks/useQueryString';
import useDryQuery from '../../../../hooks/useDryQuery';
import displayMethodsConfig from '../../../../constants/DisplayMethods';

function SaveNewReportManager({
  showQueryBuilderPane,
  setShowQueryBuilderPane,
  showSavePane,
  setShowSavePane,
  handleClose,
  resources,
  mutator,
  query,
  reportType,
}) {
  const { reportTypeRecord, reportDisplayMethods } = useReportTypes(reportType);
  const [queryString] = useQueryString(query);
  const [queryMeta] = useDryQuery(query);
  const intl = useIntl();

  console.log('queryMeta', queryMeta);

  // Generate queryParams from current query filters
  const queryParams = queryMeta?.filters?.map((filter) => ({
    fieldName: filter.member,
    operator: filter.operator,
    defaultValue: filter.values?.[0] || null,
    required: false,
    description: `Filter for ${filter.member}`,
  })) || [];

  const onFormSubmit = (values) => {
    // Transform displayMethods to match backend schema
    const transformedDisplayMethods = (values.displayMethods || []).map(method => {
      const methodValue = typeof method === 'string' ? method : method.value;
      const methodConfig = displayMethodsConfig.find(m => m.value === methodValue);
      return {
        name: methodValue,
        displaySettings: methodConfig?.settings || {}
      };
    });

    // Transform authorizedUsers to match backend schema
    const transformedAuthorizedUsers = (values.authorizedUsers || []).map(user => ({
      userId: user.id,
      role: user.role || 'Viewer',
      permissions: user.permissions || ''
    }));

    mutator.reports.POST({
      name: values.reportName,
      desc: values.reportDesc,
      status: values.reportStatus,
      reportType: values.reportType,
      privacyType: values.privacyType,
      displayMethods: transformedDisplayMethods,
      defaultDisplayMethod: values.defaultDisplayMethod,
      authorizedUsers: transformedAuthorizedUsers,
      queryMetadata: typeof query === 'string' ? JSON.parse(query) : query,
      queryString: {
        sqlCommand: queryString?.replace(/(\r\n|\n|\r|\")/gm, ' '),
      },
      queryParams,
      viewSettings: values.viewSettings,
    });
  };

  return (
    <>
      <SaveNewReportForm
        onSubmit={onFormSubmit}
        initialValues={{
          reportName: '',
          reportDesc: '',
          reportStatus: 'active',
          privacyType: 'public',
          reportType,
          displayMethods: reportDisplayMethods.map((method) => method.value),
          defaultDisplayMethod: reportTypeRecord?.defaultDisplayMethod,
          authorizedUsers: [],
          queryMetadata: '',
          queryString: '',
          queryParams,
          categories: [],
          viewSettings: {
            table: {
              columnWidths: {},
              columnMapping: {},
              visibleColumns: [],
              translatableFields: [
                {
                  fieldName: '',
                  keyPattern: '',
                },
              ],
            },
            numLabel: {},
            barChart: {},
          },
        }}
        showQueryBuilderPane={showQueryBuilderPane}
        setShowQueryBuilderPane={setShowQueryBuilderPane}
        showSavePane={showSavePane}
        setShowSavePane={setShowSavePane}
        handleClose={handleClose}
        reportTypeRecord={reportTypeRecord}
        reportDisplayMethods={reportDisplayMethods}
        queryParams={queryParams}
        categories={resources.categories?.records || []}
      />
    </>
  );
}

SaveNewReportManager.propTypes = {
  showQueryBuilderPane: PropTypes.bool.isRequired,
  setShowQueryBuilderPane: PropTypes.func.isRequired,
  showSavePane: PropTypes.bool.isRequired,
  setShowSavePane: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  query: PropTypes.object.isRequired,
  reportType: PropTypes.string,
  resources: PropTypes.shape({
    reports: PropTypes.shape({
      records: PropTypes.arrayOf(PropTypes.object),
    }),
    reportId: PropTypes.shape({
      replace: PropTypes.func.isRequired,
    }),
  }),
  mutator: PropTypes.shape({
    reports: PropTypes.shape({
      reset: PropTypes.func.isRequired,
      POST: PropTypes.func.isRequired,
      PUT: PropTypes.func.isRequired,
    }),
    reportId: PropTypes.shape({
      replace: PropTypes.func.isRequired,
    }),
  }),
};

SaveNewReportManager.manifest = Object.freeze({
  reportId: '',
  reports: {
    type: 'okapi',
    records: 'reports',
    path: 'reports?limit=10000',
    POST: {
      path: 'reports',
    },
    PUT: {
      path: 'reports',
    },
    DELETE: {
      path: 'reports',
    },
  },
  categories: {
    type: 'okapi',
    records: 'categories',
    path: 'categories?limit=1000',
  },
});

export default stripesConnect(SaveNewReportManager);

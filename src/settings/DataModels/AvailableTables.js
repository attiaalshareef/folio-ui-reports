import React from 'react';
import PropTypes from 'prop-types';
import {
  Checkbox,
  Layout,
  Loading,
  MultiColumnList,
  Pane,
} from '@folio/stripes-components';
import { FormattedMessage } from 'react-intl';
import { useCubeMeta } from '@cubejs-client/react';
import ErrorMessage from '../../components/common/errorMessage/ErrorMessage';
import TranslationsActionsMenu from '../../components/TranslationsActionsMenu';

function AvailableTables(props) {
  const { isLoading, error, response } = useCubeMeta();

  return (
    // <Paneset>
    <Pane
      fluidContentWidth
      // footer={renderPaneFooter()}
      id="available-tables-settings-pane"
      paneTitle={
        <FormattedMessage
          id="ui-reports.settings.sections.dataModels.pages.availableTables.lable"
          defaultMessage="Available tables"
        />
      }
      lastMenu={
        <TranslationsActionsMenu
          contentData={response?.cubes}
          paneTitle={
            <FormattedMessage
              id="ui-reports.settings.sections.dataModels.pages.availableTables.lable"
              defaultMessage="Available tables"
            />
          }
          defaultValueField="title"
          translatableFields={['name']}
          appName="ui-reports"
          dataSource="dataModels.availableTables"
        />
      }
    >
      {isLoading && (
        <Layout
          className="centered full"
          style={{ maxWidth: '15rem', height: '8rem' }}
        >
          &nbsp;
          <Loading size="xlarge" />
        </Layout>
      )}
      {error && <ErrorMessage errorMessage={error.toString()} />}
      {!isLoading && !error && (
        <MultiColumnList
          id="available-tables-multi-column-list"
          interactive={false}
          visibleColumns={['rowIndex', 'name', 'desc', 'visible']}
          contentData={response?.cubes || []}
          columnMapping={{
            rowIndex: '#',
            visible: (
              <FormattedMessage
                id="ui-reports.sections.dataModels.availableTables.columns.visible"
                defaultMessage="Visible"
              />
            ),
            name: (
              <FormattedMessage
                id="ui-reports.sections.dataModels.availableTables.columns.name"
                defaultMessage="Name"
              />
            ),
            desc: (
              <FormattedMessage
                id="ui-reports.sections.dataModels.availableTables.columns.desc"
                defaultMessage="Description"
              />
            ),
          }}
          columnWidths={{
            rowIndex: '10%',
            name: '50%',
            visible: '15%',
            desc: '25%',
          }}
          formatter={{
            rowIndex: (item) => item.rowIndex + 1,
            name: (item) => (
              <FormattedMessage
                id={`ui-reports.dataModels.availableTables.name.${item.name}`}
                defaultMessage={item.title}
              />
            ),
            visible: (item) => (
              <Checkbox
                name={`selected-${item.id}`}
                checked
                //   onChange={() => {
                //     onToggleSelection(report);
                //   }}
                onMouseDown={(e) => e.preventDefault()}
              />
            ),
          }}
          autosize
          virtualize
        />
      )}
    </Pane>
    // </Paneset>
  );
}

AvailableTables.propTypes = {};

export default AvailableTables;

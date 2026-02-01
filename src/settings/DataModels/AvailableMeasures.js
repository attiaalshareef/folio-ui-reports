import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Checkbox,
  Col,
  Layout,
  Loading,
  MultiColumnList,
  Pane,
  Row,
  Select,
} from '@folio/stripes-components';
import { FormattedMessage, useIntl } from 'react-intl';
import { useCubeMeta } from '@cubejs-client/react';
import { chain } from 'lodash';
import ErrorMessage from '../../components/common/errorMessage/ErrorMessage';
import TranslationsActionsMenu from '../../components/TranslationsActionsMenu';

function AvailableMeasures(props) {
  const { isLoading, error, response } = useCubeMeta();
  const [selectedTable, setSelectedTable] = useState('');
  const [measures, setMeasures] = useState([]);

  const intl = useIntl();

  console.log('response: ', response);
  console.log(
    'dimensions: ',
    chain(response?.cubes).map('measures').flatten().value(),
  );

  const onChangeSelectedTable = (e) => {
    setMeasures(
      response.cubes.find((cube) => cube.name === e.target.value)?.measures,
    );
    setSelectedTable(e.target.value);
  };

  const renderSelectedTable = () => {
    return (
      <Row>
        <Col xs={6}>
          <Select
            dataOptions={[
              {
                label: intl.formatMessage({
                  id: 'ui-reports.dataModels.availableTables.selectTable.label',
                  defaultMessage: 'Select table',
                }),
                value: '',
              },
              ...(response?.cubes || []).map((option) => ({
                label: intl.formatMessage({
                  id: `ui-reports.dataModels.availableTables.name.${option.name}`,
                  defaultMessage: option.title,
                }),
                value: option.name,
              })),
            ]}
            value={selectedTable}
            onChange={(e) => onChangeSelectedTable(e)}
            label={
              <FormattedMessage
                id="ui-reports.queryBuilder.tablesField.label"
                defaultMessage="Tables"
              />
            }
          />
        </Col>
      </Row>
    );
  };

  const renderColumnsList = () => {
    return (
      <>
        <strong>
          <FormattedMessage
            id="ui-reports.sections.dataModels.availableMeasures.columnsList.label"
            defaultMessage="Measures"
          />
        </strong>
        <MultiColumnList
          id="available-tables-multi-column-list"
          interactive={false}
          visibleColumns={['rowIndex', 'name', 'visible']}
          contentData={measures || []}
          columnMapping={{
            rowIndex: '#',
            visible: (
              <FormattedMessage
                id="ui-reports.sections.dataModels.availableMeasures.columns.visible"
                defaultMessage="Visible"
              />
            ),
            name: (
              <FormattedMessage
                id="ui-reports.sections.dataModels.availableMeasures.columns.name"
                defaultMessage="Name"
              />
            ),
          }}
          columnWidths={{
            rowIndex: '10%',
            name: '75%',
            visible: '15%',
          }}
          formatter={{
            rowIndex: (item) => item.rowIndex + 1,
            name: (item) => (
              <FormattedMessage
                id={`ui-reports.availableMeasures.name.${item.name}`}
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
      </>
    );
  };

  return (
    <Pane
      fluidContentWidth
      // footer={renderPaneFooter()}
      id="available-tables-settings-pane"
      paneTitle={
        <FormattedMessage
          id="ui-reports.settings.sections.dataModels.pages.availableMeasures.lable"
          defaultMessage="Available measures"
        />
      }
      lastMenu={
        <TranslationsActionsMenu
          contentData={chain(response?.cubes).map('measures').flatten().value()}
          paneTitle={
            <FormattedMessage
              id="ui-reports.settings.sections.dataModels.pages.availableMeasures.lable"
              defaultMessage="Available measures"
            />
          }
          defaultValueField="title"
          translatableFields={['name']}
          appName="ui-reports"
          dataSource="availableMeasures"
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
      {!isLoading && renderSelectedTable()}

      {!isLoading && !error && renderColumnsList()}
    </Pane>
  );
}

AvailableMeasures.propTypes = {};

export default AvailableMeasures;

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Accordion,
  FilterAccordionHeader,
  MultiSelection,
} from '@folio/stripes/components';
import { FormattedMessage, useIntl } from 'react-intl';
import { useCubeMeta } from '@cubejs-client/react';
import { required } from '../../../../../helpers/Validations';

function TablesField({ selectedTables, setSelectedTables }) {
  const cubeMetaData = useCubeMeta();
  const [filterToggle, setFilterToggle] = useState(true);
  const intl = useIntl();

  return (
    <Accordion
      id="query-builder-form-tables-accordion"
      label={
        <FormattedMessage
          id="ui-reports.queryBuilder.tablesField.Accordion.header"
          defaultMessage="Tables Options"
        />
      }
      onToggle={() => setFilterToggle(!filterToggle)}
      open={filterToggle}
      separator
      header={FilterAccordionHeader}
    >
      <MultiSelection
        id="query-builder-form-table-multiselect"
        label={
          <FormattedMessage
            id="ui-reports.queryBuilder.tablesField.label"
            defaultMessage="Tables"
          />
        }
        placeholder={intl.formatMessage({
          id: 'ui-reports.queryBuilder.tableField.placeholder',
          defaultMessage: 'Choose table',
        })}
        dataOptions={cubeMetaData?.response?.cubes?.map((option) => ({
          label: intl.formatMessage({
            id: `ui-reports.dataModels.availableTables.name.${option.name}`,
            defaultMessage: option.title,
          }),
          value: option.name,
        }))}
        required
        validate={required}
        value={selectedTables}
        onChange={setSelectedTables}
      />
    </Accordion>
  );
}

TablesField.propTypes = {
  selectedTables: PropTypes.arrayOf(PropTypes.string),
  setSelectedTables: PropTypes.func.isRequired,
};

export default TablesField;

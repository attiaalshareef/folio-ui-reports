import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Accordion,
  FilterAccordionHeader,
  MultiSelection,
} from '@folio/stripes/components';
import { FormattedMessage, useIntl } from 'react-intl';
import { useCubeMeta } from '@cubejs-client/react';
import { required } from '../../../helpers/Validations';

function TablesField({ selectedTables, setSelectedTables }) {
  const [dataOptions, setDataOptions] = useState([]);
  const [currentValues, setcurrentValues] = useState([]);
  const cubeMetaData = useCubeMeta();

  const [filterToggle, setFilterToggle] = useState(true);

  const intl = useIntl();

  useEffect(() => {
    if (cubeMetaData?.response?.cubes) {
      setDataOptions(
        cubeMetaData?.response?.cubes?.map((option) => ({
          label: option.name,
          value: option.name,
        }))
      );
    }

    if (currentValues.length) {
      setSelectedTables(currentValues.map((value) => value.value).join(','));
    }
  }, [cubeMetaData.response, currentValues]);

  return (
    <>
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
          dataOptions={dataOptions}
          required
          validate={required}
          value={currentValues}
          onChange={setcurrentValues}
          // value={
          //   selectedTables
          //     ? selectedTables.split(',').map((table) => {
          //       return dataOptions.filter((option) => option.value === table);
          //     })
          //     : null
          // }
          // onChange={(values) => {
          //   console.log(values);
          //   setSelectedTables(values.map((value) => value.value).join(','));
          // }}
        />
      </Accordion>
    </>
  );
}

TablesField.propTypes = {
  selectedTables: PropTypes.arrayOf(PropTypes.string),
  setSelectedTables: PropTypes.func.isRequired,
};

export default TablesField;

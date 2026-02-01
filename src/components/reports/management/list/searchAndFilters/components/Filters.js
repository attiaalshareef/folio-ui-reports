import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import FillterAccordion from './FillterAccordion';
import { filtersConfigs } from '../../../../../../constants/filters-configs';

function Filters(props) {
  const intl = useIntl();
  const filters = filtersConfigs(intl);

  return (
    <>
      {filters.map((filter) => {
        return <FillterAccordion key={filter.id} filter={filter} />;
      })}
    </>
  );
}

Filters.propTypes = {};

export default Filters;

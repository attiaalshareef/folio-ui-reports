import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  AdvancedSearch,
  Button,
  Icon,
  Pane,
  Tooltip,
} from '@folio/stripes/components';
import SearchBox from './components/SearchBox';
import Filters from './components/Filters';

function SearchAndFilters({ showFilters, setShowFilters }) {
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <>
      {showFilters ? (
        <Pane
          id="pane-search-and-filters"
          defaultWidth="20%"
          paneTitle={
            <FormattedMessage
              id="ui-reports.panes.filtersPane.title"
              defaultMessage=""
            />
          }
          fluidContentWidth
          // noOverflow
          // padContent={false}
          lastMenu={
            <Tooltip
              id="reports-hideFilters-tooltip"
              text={
                <FormattedMessage id="ui-reports.panes.filtersPane.tooltip.hideFilterButton" />
              }
            >
              {({ ref, ariaIds }) => (
                <Button
                  buttonStyle="dropdownItem"
                  id="clickable-reports-hideFilters"
                  marginBottom0
                  onClick={() => setShowFilters(!showFilters)}
                  aria-labelledby={ariaIds.text}
                  ref={ref}
                >
                  <Icon icon="chevron-double-left" />
                </Button>
              )}
            </Tooltip>
          }
        >
          <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <Filters />
        </Pane>
      ) : (
        <div />
      )}
    </>
  );
}

SearchAndFilters.propTypes = {
  showFilters: PropTypes.bool.isRequired,
  setShowFilters: PropTypes.func.isRequired,
};

export default SearchAndFilters;

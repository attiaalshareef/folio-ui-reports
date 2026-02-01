import React from 'react';
import PropTypes from 'prop-types';
import { Button, SearchField } from '@folio/stripes/components';
import { FormattedMessage, useIntl } from 'react-intl';

function SearchBox({ searchTerm, setSearchTerm, onHandleSearchBox }) {
  const intl = useIntl();

  const clearValue = () => {
    setSearchTerm('');
    // onActivateSearch('false');
  };

  const onHandleChangeSearchTerm = e => {
    setSearchTerm(e.target.value);
    // onActivateSearch('false');
  };

  const getSearchResultsByValues = (array, string, index) => {
    return array.filter(obj => {
      const str = obj[index] ? obj[index].toLowerCase() : '';
      return str.includes(string.toLowerCase());
    });
  };

  return (
    <div>
      <SearchField
        onClear={clearValue}
        value={searchTerm}
        onChange={onHandleChangeSearchTerm}
        placeholder={intl.formatMessage({
          id: 'ui-reports.search.enterSearchTerm',
          defaultMessage: 'Enter Search Term'
        })}
        aria-label="Search for reports."
        clearSearchId="reports-search-button"
        id="clear-reports-sesrch-field"
      />
      <Button
        buttonStyle="primary"
        disabled={!searchTerm || searchTerm === ''}
        fullWidth
        id="clickable-search-reports"
        marginBottom0
        onClick={() => onHandleSearchBox()}
      >
        <FormattedMessage id="stripes-smart-components.search" />
      </Button>
    </div>
  );
}

SearchBox.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
  onHandleSearchBox: PropTypes.func.isRequired
};

export default SearchBox;

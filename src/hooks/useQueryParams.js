import React, { useState } from 'react';
import PropTypes from 'prop-types';

const propTypes = {};

const getQuery = () => {
  if (typeof window !== 'undefined') {
    return new URLSearchParams(window.location.search);
  }
  return new URLSearchParams();
};

export const getQueryStringValue = (key) => {
  return getQuery().get(key);
};

function useQueryParams(key, defaultVal) {
  const [currentValue, setCurrentValue] = useState(
    getQueryStringValue(key) || defaultVal
  );

  const updateUrl = (newVal) => {
    setCurrentValue(newVal);

    const query = getQuery();

    if (newVal.trim() !== '') {
      query.set(key, newVal);
    } else {
      query.delete(key);
    }

    if (typeof window !== 'undefined') {
      const { protocol, pathname, host } = window.location;
      const newUrl = `${protocol}//${host}${pathname}?${query.toString()}`;
      window.history.pushState({}, '', newUrl);
      // localStorage.setItem('currentURL', `${pathname}?${query.toString()}`);
    }
  };

  return [currentValue, updateUrl];
}

useQueryParams.propTypes = propTypes;

export default useQueryParams;

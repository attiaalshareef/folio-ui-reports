import React, { useCallback, useEffect, useState } from 'react';

const getQuery = () => {
  if (typeof window !== 'undefined') {
    return new URLSearchParams(window.location.search);
  }
  return new URLSearchParams();
};

export const getQueryStringValue = (key) => {
  return getQuery().get(key);
};

function useURLParams(key, defaultVal) {
  const [currentValue, setCurrentValue] = useState(
    getQueryStringValue(key) || defaultVal
  );

  const updateUrl = useCallback(() => {
    setCurrentValue(currentValue);

    const query = getQuery();

    // console.log(typeof currentValue, key);

    // if (typeof currentValue === 'object') {
    //   query.set(key, JSON.stringify(currentValue));
    // } else if (currentValue?.trim() !== '') {
    //   query.set(key, currentValue);
    // } else {
    //   query.delete(key);
    // }

    if (typeof currentValue === 'object') {
      query.set(key, JSON.stringify(currentValue));
    } else if (typeof currentValue === 'string') {
      query.set(key, currentValue.toString());
    } else {
      query.delete(key);
    }

    if (typeof window !== 'undefined') {
      const { protocol, pathname, host } = window.location;
      const newUrl = `${protocol}//${host}${pathname}?${query.toString()}`;
      window.history.pushState({}, '', newUrl);
    }
  }, [currentValue, key]);

  useEffect(() => {
    updateUrl();
  }, [updateUrl]);

  return [currentValue, setCurrentValue];
}

export default useURLParams;

// Generic formatters for different data types
export const formatters = {
  // String formatter
  string: (value) => value || '',
  
  // Number formatter with locale support
  number: (value) => {
    if (value === null || value === undefined) return '';
    return Number(value).toLocaleString();
  },
  
  // Date formatter
  date: (value) => {
    if (!value) return '';
    try {
      return new Date(value).toLocaleDateString();
    } catch (e) {
      return value;
    }
  },
  
  // DateTime formatter
  datetime: (value) => {
    if (!value) return '';
    try {
      return new Date(value).toLocaleString();
    } catch (e) {
      return value;
    }
  },
  
  // Boolean formatter
  boolean: (value) => {
    if (value === null || value === undefined) return '';
    return value ? 'Yes' : 'No';
  },
  
  // Currency formatter
  currency: (value, currency = 'USD') => {
    if (value === null || value === undefined) return '';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
    }).format(value);
  },
  
  // Percentage formatter
  percentage: (value) => {
    if (value === null || value === undefined) return '';
    return `${Number(value).toFixed(2)}%`;
  },
};

// Get appropriate formatter based on data type
export const getFormatter = (dataType) => {
  return formatters[dataType] || formatters.string;
};

// Create custom formatter with drill-down support
export const createDrillDownFormatter = (column, onDrillDown, baseFormatter = formatters.string) => {
  return (item) => {
    const value = item[column];
    const formattedValue = baseFormatter(value);
    
    if (!value || value === '0' || !onDrillDown) {
      return formattedValue;
    }

    return (
      <TextLink
        onClick={() => onDrillDown(column, item, value)}
        style={{ cursor: 'pointer' }}
      >
        {formattedValue}
      </TextLink>
    );
  };
};

export default formatters;
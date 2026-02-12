import React from 'react';
import PropTypes from 'prop-types';
import EmptyData from '../../../../common/emptyData/EmptyData';
import css from './styles.css';

function GenericNumericalView({ 
  resultSet, 
  displayFormat = 'large',
  showLabel = true,
  customLabel,
}) {
  if (!resultSet || Object.keys(resultSet).length === 0) {
    return <EmptyData />;
  }

  const data = resultSet.loadResponses?.[0]?.data?.[0];
  if (!data) {
    return <EmptyData />;
  }

  const numericValue = Object.values(data).find(value => 
    typeof value === 'number' || !isNaN(Number(value))
  );

  if (numericValue === undefined) {
    return <EmptyData />;
  }

  const formattedValue = typeof numericValue === 'number' 
    ? numericValue.toLocaleString() 
    : Number(numericValue).toLocaleString();

  const label = customLabel || Object.keys(data)[0] || 'Value';

  return (
    <div className={css.card}>
      {showLabel && (
        <div className={css.cardHeader}>
          {label}
        </div>
      )}
      <div className={css.cardBody}>
        {formattedValue}
      </div>
    </div>
  );
}

GenericNumericalView.propTypes = {
  resultSet: PropTypes.object.isRequired,
  displayFormat: PropTypes.oneOf(['small', 'medium', 'large']),
  showLabel: PropTypes.bool,
  customLabel: PropTypes.string,
};

export default GenericNumericalView;
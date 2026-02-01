import React from 'react';
import PropTypes from 'prop-types';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import EmptyData from '../../../../common/emptyData/EmptyData';
import { CHART_COLORS } from './GenericBarChart';

function GenericPieChart({ 
  resultSet, 
  height = 400, 
  colors = CHART_COLORS,
  showLegend = true,
  showTooltip = true,
}) {
  if (!resultSet || Object.keys(resultSet).length === 0) {
    return <EmptyData />;
  }

  const chartData = resultSet.chartPivot ? resultSet.chartPivot() : [];
  const seriesNames = resultSet.seriesNames ? resultSet.seriesNames() : [];

  if (chartData.length === 0) {
    return <EmptyData />;
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        {seriesNames.map(({ key }, seriesIndex) => (
          <Pie
            key={key}
            data={chartData}
            dataKey={key}
            nameKey="x"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
        ))}
        {showTooltip && <Tooltip />}
        {showLegend && <Legend />}
      </PieChart>
    </ResponsiveContainer>
  );
}

GenericPieChart.propTypes = {
  resultSet: PropTypes.object.isRequired,
  height: PropTypes.number,
  colors: PropTypes.arrayOf(PropTypes.string),
  showLegend: PropTypes.bool,
  showTooltip: PropTypes.bool,
};

export default GenericPieChart;
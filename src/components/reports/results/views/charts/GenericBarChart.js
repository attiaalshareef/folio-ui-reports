import React from 'react';
import PropTypes from 'prop-types';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import EmptyData from '../../../../common/emptyData/EmptyData';

export const CHART_COLORS = [
  '#7DB3FF',
  '#49457B',
  '#FF7C78',
  '#FED3D0',
  '#6F76D9',
  '#9ADFB4',
  '#2E7987',
];

function GenericBarChart({
  resultSet,
  height = 400,
  colors = CHART_COLORS,
  showGrid = true,
  showLegend = true,
  showTooltip = true,
}) {
  // Check if we have valid data
  if (!resultSet || Object.keys(resultSet).length === 0) {
    return <EmptyData />;
  }

  // Get chart data
  const chartData = resultSet.chartPivot ? resultSet.chartPivot() : [];
  const seriesNames = resultSet.seriesNames ? resultSet.seriesNames() : [];

  if (chartData.length === 0) {
    return <EmptyData />;
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={chartData}>
        {showGrid && <CartesianGrid strokeDasharray="3 3" />}
        <XAxis dataKey="x" />
        <YAxis />
        {showTooltip && <Tooltip />}
        {showLegend && <Legend />}
        {seriesNames.map(({ key }, index) => (
          <Bar
            key={key}
            dataKey={key}
            stackId="a"
            fill={colors[index % colors.length]}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}

GenericBarChart.propTypes = {
  resultSet: PropTypes.object.isRequired,
  height: PropTypes.number,
  colors: PropTypes.arrayOf(PropTypes.string),
  showGrid: PropTypes.bool,
  showLegend: PropTypes.bool,
  showTooltip: PropTypes.bool,
};

export default GenericBarChart;

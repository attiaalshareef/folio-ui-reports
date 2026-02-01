import React from 'react';
import PropTypes from 'prop-types';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import EmptyData from '../../../../common/emptyData/EmptyData';
import { CHART_COLORS } from './GenericBarChart';

function GenericLineChart({ 
  resultSet, 
  height = 400, 
  colors = CHART_COLORS,
  showGrid = true,
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
      <LineChart data={chartData}>
        {showGrid && <CartesianGrid strokeDasharray="3 3" />}
        <XAxis dataKey="x" />
        <YAxis />
        {showTooltip && <Tooltip />}
        {showLegend && <Legend />}
        {seriesNames.map(({ key }, index) => (
          <Line 
            key={key} 
            type="monotone" 
            dataKey={key} 
            stroke={colors[index % colors.length]} 
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}

GenericLineChart.propTypes = {
  resultSet: PropTypes.object.isRequired,
  height: PropTypes.number,
  colors: PropTypes.arrayOf(PropTypes.string),
  showGrid: PropTypes.bool,
  showLegend: PropTypes.bool,
  showTooltip: PropTypes.bool,
};

export default GenericLineChart;
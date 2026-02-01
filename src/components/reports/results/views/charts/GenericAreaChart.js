import React from 'react';
import PropTypes from 'prop-types';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import EmptyData from '../../../../common/emptyData/EmptyData';
import { CHART_COLORS } from './GenericBarChart';

function GenericAreaChart({ 
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
      <AreaChart data={chartData}>
        {showGrid && <CartesianGrid strokeDasharray="3 3" />}
        <XAxis dataKey="x" />
        <YAxis />
        {showTooltip && <Tooltip />}
        {showLegend && <Legend />}
        {seriesNames.map(({ key }, index) => (
          <Area 
            key={key} 
            type="monotone" 
            dataKey={key} 
            stackId="1"
            stroke={colors[index % colors.length]} 
            fill={colors[index % colors.length]} 
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
}

GenericAreaChart.propTypes = {
  resultSet: PropTypes.object.isRequired,
  height: PropTypes.number,
  colors: PropTypes.arrayOf(PropTypes.string),
  showGrid: PropTypes.bool,
  showLegend: PropTypes.bool,
  showTooltip: PropTypes.bool,
};

export default GenericAreaChart;
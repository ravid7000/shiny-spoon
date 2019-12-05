import React from 'react';
import moment from 'moment';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

/**
 * Source: http://recharts.org/en-US/examples/LineChartWithXAxisPading
 */
const StockGraph = ({ timeSeries }) => {
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <LineChart width={500} height={300} data={timeSeries}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="time"
            padding={{ left: 30, right: 30 }}
            tickFormatter={timeStr => moment(new Date(timeStr)).format('HH:mm')}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="high" stroke="#8884d8" />
          <Line type="monotone" dataKey="low" stroke="#dd292a" />
          <Line type="monotone" dataKey="open" stroke="#2dcc2d" />
          <Line type="monotone" dataKey="close" stroke="#5e7f83" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StockGraph;

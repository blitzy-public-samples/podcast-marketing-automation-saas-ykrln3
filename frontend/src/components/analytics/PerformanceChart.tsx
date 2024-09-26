import React, { useState, useEffect } from 'react';
import { Chart } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js';
import { AnalyticsData } from '../../types';
import { useAnalytics } from '../../hooks/useAnalytics';
import Dropdown from '../common/Dropdown';
import Card from '../common/Card';
import Spinner from '../common/Spinner';

interface PerformanceChartProps {
  podcastId: string;
  episodeId: string | null;
  metric: string;
  timeRange: string;
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({ podcastId, episodeId, metric, timeRange }) => {
  const { fetchAnalytics, loading, error } = useAnalytics();
  const [chartData, setChartData] = useState<any>(null);
  const [chartOptions, setChartOptions] = useState<ChartOptions>({});

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAnalytics(podcastId, episodeId, metric, timeRange);
      if (data) {
        const processedData = processAnalyticsData(data);
        setChartData(processedData);
        setChartOptions(generateChartOptions(metric, timeRange));
      }
    };
    fetchData();
  }, [podcastId, episodeId, metric, timeRange, fetchAnalytics]);

  const processAnalyticsData = (data: AnalyticsData[]): any => {
    // Process the analytics data into a format suitable for the chart
    // This is a placeholder implementation and should be adjusted based on the actual data structure
    return {
      labels: data.map(item => item.date),
      datasets: [{
        label: metric,
        data: data.map(item => item[metric as keyof AnalyticsData]),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    };
  };

  const generateChartOptions = (metric: string, timeRange: string): ChartOptions => {
    // Generate chart options based on the metric and time range
    // This is a placeholder implementation and should be adjusted based on requirements
    return {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: `${metric} over ${timeRange}`
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: metric
          }
        },
        x: {
          title: {
            display: true,
            text: 'Date'
          }
        }
      }
    };
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div>Error loading chart data: {error}</div>;
  }

  return (
    <Card>
      <Dropdown
        options={[
          { value: 'listens', label: 'Listens' },
          { value: 'downloads', label: 'Downloads' },
          { value: 'shares', label: 'Shares' }
        ]}
        value={metric}
        onChange={(value) => {/* Handle metric change */}}
      />
      <Dropdown
        options={[
          { value: '7d', label: 'Last 7 days' },
          { value: '30d', label: 'Last 30 days' },
          { value: '90d', label: 'Last 90 days' }
        ]}
        value={timeRange}
        onChange={(value) => {/* Handle time range change */}}
      />
      {chartData && <Chart type="line" data={chartData} options={chartOptions} />}
    </Card>
  );
};

export default PerformanceChart;
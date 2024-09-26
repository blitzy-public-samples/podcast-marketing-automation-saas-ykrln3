import React, { useState, useEffect } from 'react';
import { PieChart, BarChart } from 'react-chartjs-2';
import { useAnalytics } from '../../hooks/useAnalytics';
import { AnalyticsData } from '../../types';
import Card from '../common/Card';
import WorldMap from '../common/WorldMap';
import Dropdown from '../common/Dropdown';
import Spinner from '../common/Spinner';

interface AudienceMetricsProps {
  podcastId: string;
  timeRange: string;
}

const AudienceMetrics: React.FC<AudienceMetricsProps> = ({ podcastId, timeRange }) => {
  const { fetchAudienceMetrics, loading, error } = useAnalytics();
  const [demographicData, setDemographicData] = useState<any>(null);
  const [geographicData, setGeographicData] = useState<any>(null);
  const [deviceData, setDeviceData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAudienceMetrics(podcastId, timeRange);
      if (data) {
        processData(data);
      }
    };
    fetchData();
  }, [podcastId, timeRange, fetchAudienceMetrics]);

  const processData = (data: AnalyticsData) => {
    setDemographicData(processDemographicData(data));
    setGeographicData(processGeographicData(data));
    setDeviceData(processDeviceData(data));
  };

  const processDemographicData = (data: AnalyticsData) => {
    // Process demographic data for age and gender charts
    // This is a placeholder and should be implemented based on actual data structure
    return {
      age: {
        labels: ['18-24', '25-34', '35-44', '45-54', '55+'],
        datasets: [{
          data: [15, 30, 25, 20, 10],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
        }]
      },
      gender: {
        labels: ['Male', 'Female', 'Other'],
        datasets: [{
          data: [55, 43, 2],
          backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56']
        }]
      }
    };
  };

  const processGeographicData = (data: AnalyticsData) => {
    // Process geographic data for the world map
    // This is a placeholder and should be implemented based on actual data structure
    return {
      // Example data structure for WorldMap component
      countries: {
        US: 1000,
        GB: 500,
        CA: 300,
        // ... other countries
      }
    };
  };

  const processDeviceData = (data: AnalyticsData) => {
    // Process device data for the bar chart
    // This is a placeholder and should be implemented based on actual data structure
    return {
      labels: ['Smartphone', 'Desktop', 'Tablet', 'Smart Speaker'],
      datasets: [{
        label: 'Listening Devices',
        data: [45, 30, 15, 10],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
      }]
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div>Error loading audience metrics: {error}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card>
        <h3>Age Distribution</h3>
        {demographicData && <PieChart data={demographicData.age} options={chartOptions} />}
      </Card>
      <Card>
        <h3>Gender Distribution</h3>
        {demographicData && <PieChart data={demographicData.gender} options={chartOptions} />}
      </Card>
      <Card>
        <h3>Listening Devices</h3>
        {deviceData && <BarChart data={deviceData} options={chartOptions} />}
      </Card>
      <Card className="col-span-full">
        <h3>Geographic Distribution</h3>
        {geographicData && <WorldMap data={geographicData.countries} />}
      </Card>
      <div className="col-span-full">
        <Dropdown
          options={[
            { value: '7d', label: 'Last 7 days' },
            { value: '30d', label: 'Last 30 days' },
            { value: '90d', label: 'Last 90 days' }
          ]}
          value={timeRange}
          onChange={(value) => {/* Implement time range change handler */}}
        />
      </div>
    </div>
  );
};

export default AudienceMetrics;

// Human tasks:
// - Implement responsive design to ensure proper display on various screen sizes
// - Add unit tests for the AudienceMetrics component, including data processing functions
// - Implement interactive tooltips for the charts to display more detailed information
// - Add support for drilling down into specific demographic or geographic segments
// - Implement a feature to export audience metrics data as CSV or PDF reports
// - Ensure the component is accessible, including proper ARIA labels for chart elements
// - Add animations to enhance the visual appeal of chart rendering and updates
// - Implement a caching mechanism to improve performance when switching between different time ranges
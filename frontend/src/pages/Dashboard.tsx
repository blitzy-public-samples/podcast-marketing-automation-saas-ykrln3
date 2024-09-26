import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { usePodcast } from '../hooks/usePodcast';
import { useAnalytics } from '../hooks/useAnalytics';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import PerformanceChart from '../components/analytics/PerformanceChart';
import PodcastList from '../components/podcast/PodcastList';
import RecentActivities from '../components/dashboard/RecentActivities';
import QuickActions from '../components/dashboard/QuickActions';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { podcasts, fetchPodcasts, loading: podcastsLoading, error: podcastsError } = usePodcast();
  const { fetchAnalytics, loading: analyticsLoading, error: analyticsError } = useAnalytics();

  const [selectedPodcast, setSelectedPodcast] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState('7d'); // Default to 7 days

  useEffect(() => {
    fetchPodcasts();
  }, [fetchPodcasts]);

  useEffect(() => {
    if (podcasts.length > 0 && !selectedPodcast) {
      setSelectedPodcast(podcasts[0].id);
    }
  }, [podcasts, selectedPodcast]);

  const handlePodcastSelection = (podcastId: string) => {
    setSelectedPodcast(podcastId);
  };

  const handleTimeRangeChange = (range: string) => {
    setTimeRange(range);
  };

  if (podcastsLoading || analyticsLoading) {
    return <div>Loading...</div>; // TODO: Replace with skeleton loader
  }

  if (podcastsError || analyticsError) {
    return <div>Error loading dashboard data. Please try again later.</div>;
  }

  return (
    <div className="dashboard-container">
      <h1>Welcome, {user?.name}!</h1>
      
      <QuickActions />

      <div className="dashboard-grid">
        <Card className="overall-performance">
          <h2>Overall Performance</h2>
          {/* Add overall performance metrics here */}
        </Card>

        <Card className="podcast-performance">
          <h2>Podcast Performance</h2>
          {selectedPodcast && (
            <PerformanceChart 
              podcastId={selectedPodcast} 
              timeRange={timeRange} 
            />
          )}
          <div className="time-range-selector">
            <Button onClick={() => handleTimeRangeChange('7d')}>7 Days</Button>
            <Button onClick={() => handleTimeRangeChange('30d')}>30 Days</Button>
            <Button onClick={() => handleTimeRangeChange('90d')}>90 Days</Button>
          </div>
        </Card>

        <Card className="podcast-list">
          <h2>Your Podcasts</h2>
          <PodcastList 
            podcasts={podcasts} 
            onPodcastSelect={handlePodcastSelection} 
            selectedPodcastId={selectedPodcast}
          />
        </Card>

        <Card className="recent-activities">
          <h2>Recent Activities</h2>
          <RecentActivities />
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
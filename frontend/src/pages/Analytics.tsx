import React, { useState, useEffect } from 'react';
import { usePodcast } from '../hooks/usePodcast';
import { useEpisode } from '../hooks/useEpisode';
import { useAnalytics } from '../hooks/useAnalytics';
import PodcastSelector from '../components/analytics/PodcastSelector';
import EpisodeSelector from '../components/analytics/EpisodeSelector';
import PerformanceChart from '../components/analytics/PerformanceChart';
import AudienceMetrics from '../components/analytics/AudienceMetrics';
import EngagementMetrics from '../components/analytics/EngagementMetrics';
import MarketingImpact from '../components/analytics/MarketingImpact';
import Tab from '../components/common/Tab';
import Card from '../components/common/Card';
import DateRangePicker from '../components/common/DateRangePicker';
import Dropdown from '../components/common/Dropdown';

const Analytics: React.FC = () => {
  const [selectedPodcast, setSelectedPodcast] = useState<string | null>(null);
  const [selectedEpisode, setSelectedEpisode] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState({ startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), endDate: new Date() });
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedMetric, setSelectedMetric] = useState('listens');

  const { podcasts, fetchPodcasts } = usePodcast();
  const { episodes, fetchEpisodes } = useEpisode();
  const { analyticsData, fetchAnalytics, loading, error } = useAnalytics();

  useEffect(() => {
    fetchPodcasts();
  }, []);

  useEffect(() => {
    if (selectedPodcast) {
      fetchEpisodes(selectedPodcast);
    }
  }, [selectedPodcast]);

  useEffect(() => {
    if (selectedPodcast) {
      fetchAnalytics(selectedPodcast, selectedEpisode, dateRange.startDate, dateRange.endDate);
    }
  }, [selectedPodcast, selectedEpisode, dateRange]);

  const handlePodcastSelect = (podcastId: string) => {
    setSelectedPodcast(podcastId);
    setSelectedEpisode(null);
  };

  const handleEpisodeSelect = (episodeId: string) => {
    setSelectedEpisode(episodeId);
  };

  const handleDateRangeChange = (start: Date, end: Date) => {
    setDateRange({ startDate: start, endDate: end });
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleMetricChange = (metric: string) => {
    setSelectedMetric(metric);
  };

  if (error) {
    return <div>Error loading analytics data. Please try again later.</div>;
  }

  return (
    <div className="analytics-container">
      <Card>
        <PodcastSelector podcasts={podcasts} onSelect={handlePodcastSelect} />
        {selectedPodcast && (
          <EpisodeSelector episodes={episodes} onSelect={handleEpisodeSelect} />
        )}
        <DateRangePicker
          startDate={dateRange.startDate}
          endDate={dateRange.endDate}
          onChange={handleDateRangeChange}
        />
      </Card>

      <Tab
        tabs={['Overview', 'Audience', 'Engagement', 'Marketing Impact']}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      {loading ? (
        <div>Loading analytics data...</div>
      ) : (
        <>
          {activeTab === 'overview' && (
            <Card>
              <Dropdown
                options={[
                  { value: 'listens', label: 'Listens' },
                  { value: 'downloads', label: 'Downloads' },
                  { value: 'shares', label: 'Shares' },
                ]}
                value={selectedMetric}
                onChange={handleMetricChange}
              />
              <PerformanceChart
                data={analyticsData}
                metric={selectedMetric}
                dateRange={dateRange}
              />
            </Card>
          )}

          {activeTab === 'audience' && (
            <AudienceMetrics data={analyticsData} />
          )}

          {activeTab === 'engagement' && (
            <EngagementMetrics data={analyticsData} />
          )}

          {activeTab === 'marketing-impact' && (
            <MarketingImpact data={analyticsData} />
          )}
        </>
      )}
    </div>
  );
};

export default Analytics;
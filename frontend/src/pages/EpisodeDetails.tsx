import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useEpisode from '../hooks/useEpisode';
import useAnalytics from '../hooks/useAnalytics';
import useMarketing from '../hooks/useMarketing';
import EpisodeForm from '../components/podcast/EpisodeForm';
import PerformanceChart from '../components/analytics/PerformanceChart';
import ContentGenerator from '../components/marketing/ContentGenerator';
import ScheduleCalendar from '../components/marketing/ScheduleCalendar';
import Tab from '../components/common/Tab';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';

const EpisodeDetails: React.FC = () => {
  const { podcastId, episodeId } = useParams<{ podcastId: string; episodeId: string }>();
  const { episode, fetchEpisode, updateEpisode, isLoading: isEpisodeLoading, error: episodeError } = useEpisode(podcastId, episodeId);
  const { analyticsData, fetchAnalytics, isLoading: isAnalyticsLoading, error: analyticsError } = useAnalytics(podcastId, episodeId);
  const { marketingContent, generateContent, schedulePost, isLoading: isMarketingLoading, error: marketingError } = useMarketing(episodeId);

  const [activeTab, setActiveTab] = useState<'overview' | 'analytics' | 'marketing' | 'scheduling'>('overview');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    if (podcastId && episodeId) {
      fetchEpisode();
      fetchAnalytics();
    }
  }, [podcastId, episodeId, fetchEpisode, fetchAnalytics]);

  const handleTabChange = (tab: 'overview' | 'analytics' | 'marketing' | 'scheduling') => {
    setActiveTab(tab);
  };

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
  };

  const handleEpisodeUpdate = async (updatedEpisode: any) => {
    try {
      await updateEpisode(updatedEpisode);
      setIsEditModalOpen(false);
      // Show success message
    } catch (error) {
      // Show error message
    }
  };

  const handleContentGeneration = async () => {
    try {
      await generateContent();
      // Show success message
    } catch (error) {
      // Show error message
    }
  };

  const handleSchedulePost = async (post: any) => {
    try {
      await schedulePost(post);
      // Show success message
    } catch (error) {
      // Show error message
    }
  };

  if (isEpisodeLoading || isAnalyticsLoading || isMarketingLoading) {
    return <div>Loading...</div>;
  }

  if (episodeError || analyticsError || marketingError) {
    return <div>Error: {episodeError || analyticsError || marketingError}</div>;
  }

  return (
    <div className="episode-details">
      <h1>{episode?.title}</h1>
      <Tab
        tabs={[
          { label: 'Overview', value: 'overview' },
          { label: 'Analytics', value: 'analytics' },
          { label: 'Marketing', value: 'marketing' },
          { label: 'Scheduling', value: 'scheduling' },
        ]}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      {activeTab === 'overview' && (
        <Card>
          <h2>Episode Details</h2>
          <p>{episode?.description}</p>
          <p>Duration: {episode?.duration}</p>
          <p>Publish Date: {episode?.publishDate}</p>
          <Button onClick={handleEditClick}>Edit Episode</Button>
        </Card>
      )}

      {activeTab === 'analytics' && (
        <Card>
          <h2>Performance Analytics</h2>
          <PerformanceChart data={analyticsData} />
        </Card>
      )}

      {activeTab === 'marketing' && (
        <Card>
          <h2>Marketing Content</h2>
          <ContentGenerator
            episode={episode}
            onGenerate={handleContentGeneration}
            generatedContent={marketingContent}
          />
        </Card>
      )}

      {activeTab === 'scheduling' && (
        <Card>
          <h2>Content Schedule</h2>
          <ScheduleCalendar
            episode={episode}
            marketingContent={marketingContent}
            onSchedule={handleSchedulePost}
          />
        </Card>
      )}

      <Modal isOpen={isEditModalOpen} onClose={handleEditModalClose}>
        <EpisodeForm
          episode={episode}
          onSubmit={handleEpisodeUpdate}
          onCancel={handleEditModalClose}
        />
      </Modal>
    </div>
  );
};

export default EpisodeDetails;
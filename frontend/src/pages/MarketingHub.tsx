import React, { useState, useEffect } from 'react';
import { usePodcast } from '../hooks/usePodcast';
import { useEpisode } from '../hooks/useEpisode';
import { useMarketing } from '../hooks/useMarketing';
import PodcastSelector from '../components/marketing/PodcastSelector';
import EpisodeSelector from '../components/marketing/EpisodeSelector';
import ContentGenerator from '../components/marketing/ContentGenerator';
import SocialMediaPreview from '../components/marketing/SocialMediaPreview';
import ScheduleCalendar from '../components/marketing/ScheduleCalendar';
import PerformanceMetrics from '../components/marketing/PerformanceMetrics';
import Tab from '../components/common/Tab';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';

const MarketingHub: React.FC = () => {
  const [selectedPodcast, setSelectedPodcast] = useState<string | null>(null);
  const [selectedEpisode, setSelectedEpisode] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('content');
  const [generatedContent, setGeneratedContent] = useState<any>(null);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState<boolean>(false);

  const { podcasts, fetchPodcasts, isLoading: isPodcastsLoading } = usePodcast();
  const { episodes, fetchEpisodes, isLoading: isEpisodesLoading } = useEpisode(selectedPodcast);
  const { generateContent, scheduleContent, isLoading: isMarketingLoading } = useMarketing();

  useEffect(() => {
    fetchPodcasts();
  }, [fetchPodcasts]);

  useEffect(() => {
    if (selectedPodcast) {
      fetchEpisodes(selectedPodcast);
    }
  }, [selectedPodcast, fetchEpisodes]);

  const handlePodcastSelect = (podcastId: string) => {
    setSelectedPodcast(podcastId);
    setSelectedEpisode(null);
  };

  const handleEpisodeSelect = (episodeId: string) => {
    setSelectedEpisode(episodeId);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleContentGeneration = async () => {
    if (selectedEpisode) {
      try {
        const content = await generateContent(selectedEpisode);
        setGeneratedContent(content);
      } catch (error) {
        console.error('Error generating content:', error);
        // TODO: Implement proper error handling and user feedback
      }
    }
  };

  const handleContentScheduling = async () => {
    if (generatedContent) {
      setIsScheduleModalOpen(true);
    }
  };

  const confirmScheduling = async () => {
    if (generatedContent && selectedEpisode) {
      try {
        await scheduleContent(selectedEpisode, generatedContent);
        setIsScheduleModalOpen(false);
        // TODO: Implement success message for user
      } catch (error) {
        console.error('Error scheduling content:', error);
        // TODO: Implement proper error handling and user feedback
      }
    }
  };

  return (
    <div className="marketing-hub">
      <Card>
        <PodcastSelector
          podcasts={podcasts}
          selectedPodcast={selectedPodcast}
          onSelect={handlePodcastSelect}
          isLoading={isPodcastsLoading}
        />
        <EpisodeSelector
          episodes={episodes}
          selectedEpisode={selectedEpisode}
          onSelect={handleEpisodeSelect}
          isLoading={isEpisodesLoading}
        />
      </Card>

      <Tab
        tabs={[
          { id: 'content', label: 'Content Generation' },
          { id: 'scheduling', label: 'Scheduling' },
          { id: 'performance', label: 'Performance' },
        ]}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      {activeTab === 'content' && (
        <Card>
          <ContentGenerator
            onGenerate={handleContentGeneration}
            isLoading={isMarketingLoading}
          />
          {generatedContent && (
            <>
              <SocialMediaPreview content={generatedContent} />
              <Button onClick={handleContentScheduling}>Schedule Content</Button>
            </>
          )}
        </Card>
      )}

      {activeTab === 'scheduling' && (
        <Card>
          <ScheduleCalendar
            podcastId={selectedPodcast}
            episodeId={selectedEpisode}
          />
        </Card>
      )}

      {activeTab === 'performance' && (
        <Card>
          <PerformanceMetrics
            podcastId={selectedPodcast}
            episodeId={selectedEpisode}
          />
        </Card>
      )}

      <Modal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        title="Confirm Scheduling"
      >
        <p>Are you sure you want to schedule this content?</p>
        <Button onClick={confirmScheduling}>Confirm</Button>
        <Button onClick={() => setIsScheduleModalOpen(false)}>Cancel</Button>
      </Modal>
    </div>
  );
};

export default MarketingHub;
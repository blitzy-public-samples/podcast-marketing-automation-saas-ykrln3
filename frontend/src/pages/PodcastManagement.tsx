import React, { useState, useEffect } from 'react';
import { usePodcast } from '../hooks/usePodcast';
import { useEpisode } from '../hooks/useEpisode';
import { useMarketing } from '../hooks/useMarketing';
import { PodcastList } from '../components/podcast/PodcastList';
import { PodcastForm } from '../components/podcast/PodcastForm';
import { EpisodeList } from '../components/podcast/EpisodeList';
import { EpisodeForm } from '../components/podcast/EpisodeForm';
import { ContentGenerator } from '../components/marketing/ContentGenerator';
import { ScheduleCalendar } from '../components/marketing/ScheduleCalendar';
import { Tab } from '../components/common/Tab';
import { Modal } from '../components/common/Modal';
import { Button } from '../components/common/Button';
import { Podcast, Episode } from '../types';

export const PodcastManagement: React.FC = () => {
  const [selectedPodcast, setSelectedPodcast] = useState<Podcast | null>(null);
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);
  const [activeTab, setActiveTab] = useState('podcasts');
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(null);

  const { podcasts, fetchPodcasts, createPodcast, updatePodcast, deletePodcast } = usePodcast();
  const { episodes, fetchEpisodes, createEpisode, updateEpisode, deleteEpisode } = useEpisode(selectedPodcast?.id);
  const { generateMarketingContent, schedulePost } = useMarketing(selectedEpisode?.id);

  useEffect(() => {
    fetchPodcasts();
  }, [fetchPodcasts]);

  const handlePodcastSelect = (podcast: Podcast) => {
    setSelectedPodcast(podcast);
    setSelectedEpisode(null);
    setActiveTab('episodes');
  };

  const handleEpisodeSelect = (episode: Episode) => {
    setSelectedEpisode(episode);
    setActiveTab('marketing');
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const openModal = (content: React.ReactNode) => {
    setModalContent(content);
  };

  const closeModal = () => {
    setModalContent(null);
  };

  const handleCreatePodcast = () => {
    openModal(
      <PodcastForm
        onSubmit={async (podcastData) => {
          await createPodcast(podcastData);
          closeModal();
          fetchPodcasts();
        }}
        onCancel={closeModal}
      />
    );
  };

  const handleEditPodcast = (podcast: Podcast) => {
    openModal(
      <PodcastForm
        podcast={podcast}
        onSubmit={async (podcastData) => {
          await updatePodcast(podcast.id, podcastData);
          closeModal();
          fetchPodcasts();
        }}
        onCancel={closeModal}
      />
    );
  };

  const handleDeletePodcast = async (podcastId: string) => {
    if (window.confirm('Are you sure you want to delete this podcast?')) {
      await deletePodcast(podcastId);
      fetchPodcasts();
      setSelectedPodcast(null);
    }
  };

  const handleCreateEpisode = () => {
    if (!selectedPodcast) return;
    openModal(
      <EpisodeForm
        podcastId={selectedPodcast.id}
        onSubmit={async (episodeData) => {
          await createEpisode(episodeData);
          closeModal();
          fetchEpisodes();
        }}
        onCancel={closeModal}
      />
    );
  };

  const handleEditEpisode = (episode: Episode) => {
    openModal(
      <EpisodeForm
        podcastId={selectedPodcast!.id}
        episode={episode}
        onSubmit={async (episodeData) => {
          await updateEpisode(episode.id, episodeData);
          closeModal();
          fetchEpisodes();
        }}
        onCancel={closeModal}
      />
    );
  };

  const handleDeleteEpisode = async (episodeId: string) => {
    if (window.confirm('Are you sure you want to delete this episode?')) {
      await deleteEpisode(episodeId);
      fetchEpisodes();
      setSelectedEpisode(null);
    }
  };

  return (
    <div className="podcast-management">
      <Tab
        tabs={['podcasts', 'episodes', 'marketing']}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      {activeTab === 'podcasts' && (
        <div>
          <Button onClick={handleCreatePodcast}>Create New Podcast</Button>
          <PodcastList
            podcasts={podcasts}
            onPodcastSelect={handlePodcastSelect}
            onEditPodcast={handleEditPodcast}
            onDeletePodcast={handleDeletePodcast}
          />
        </div>
      )}

      {activeTab === 'episodes' && selectedPodcast && (
        <div>
          <Button onClick={handleCreateEpisode}>Create New Episode</Button>
          <EpisodeList
            episodes={episodes}
            onEpisodeSelect={handleEpisodeSelect}
            onEditEpisode={handleEditEpisode}
            onDeleteEpisode={handleDeleteEpisode}
          />
        </div>
      )}

      {activeTab === 'marketing' && selectedEpisode && (
        <div>
          <ContentGenerator
            episode={selectedEpisode}
            onContentGenerated={generateMarketingContent}
          />
          <ScheduleCalendar
            podcastId={selectedPodcast!.id}
            onScheduleUpdate={schedulePost}
          />
        </div>
      )}

      <Modal isOpen={!!modalContent} onClose={closeModal}>
        {modalContent}
      </Modal>
    </div>
  );
};
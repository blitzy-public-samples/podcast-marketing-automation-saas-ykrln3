import React, { useState, useEffect, useCallback } from 'react';
import { Episode } from '../types';
import { get, post, put, delete as apiDelete } from '../utils/api';

const useEpisode = (podcastId: string) => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEpisodes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await get(`/podcasts/${podcastId}/episodes`);
      setEpisodes(response.data);
    } catch (err) {
      setError('Failed to fetch episodes');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [podcastId]);

  const createEpisode = useCallback(async (episodeData: Partial<Episode>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await post(`/podcasts/${podcastId}/episodes`, episodeData);
      setEpisodes(prevEpisodes => [...prevEpisodes, response.data]);
      return response.data;
    } catch (err) {
      setError('Failed to create episode');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [podcastId]);

  const updateEpisode = useCallback(async (episodeId: string, episodeData: Partial<Episode>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await put(`/podcasts/${podcastId}/episodes/${episodeId}`, episodeData);
      setEpisodes(prevEpisodes => 
        prevEpisodes.map(episode => 
          episode.id === episodeId ? { ...episode, ...response.data } : episode
        )
      );
      return response.data;
    } catch (err) {
      setError('Failed to update episode');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [podcastId]);

  const deleteEpisode = useCallback(async (episodeId: string) => {
    setLoading(true);
    setError(null);
    try {
      await apiDelete(`/podcasts/${podcastId}/episodes/${episodeId}`);
      setEpisodes(prevEpisodes => prevEpisodes.filter(episode => episode.id !== episodeId));
    } catch (err) {
      setError('Failed to delete episode');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [podcastId]);

  useEffect(() => {
    if (podcastId) {
      fetchEpisodes();
    }
  }, [podcastId, fetchEpisodes]);

  return {
    episodes,
    loading,
    error,
    fetchEpisodes,
    createEpisode,
    updateEpisode,
    deleteEpisode
  };
};

export default useEpisode;

// TODO: Implement pagination for fetching episodes to handle large datasets
// TODO: Add support for filtering and sorting episodes
// TODO: Implement caching mechanism for episode data to reduce API calls
// TODO: Add error handling and user feedback for failed operations
// TODO: Implement optimistic updates for better user experience
// TODO: Consider adding a debounce mechanism for search/filter operations
// TODO: Add support for bulk operations (e.g., deleting multiple episodes)
// TODO: Implement a mechanism to handle episode scheduling and publishing
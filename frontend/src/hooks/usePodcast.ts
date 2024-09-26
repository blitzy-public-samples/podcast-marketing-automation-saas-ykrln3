import React, { useState, useEffect, useCallback } from 'react';
import { Podcast } from '../types';
import { get, post, put, delete as apiDelete } from '../utils/api';

interface UsePodcastResult {
  podcasts: Podcast[];
  loading: boolean;
  error: string | null;
  fetchPodcasts: () => Promise<void>;
  createPodcast: (podcast: Omit<Podcast, 'id'>) => Promise<Podcast>;
  updatePodcast: (id: string, podcast: Partial<Podcast>) => Promise<Podcast>;
  deletePodcast: (id: string) => Promise<void>;
}

export const usePodcast = (): UsePodcastResult => {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPodcasts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await get<Podcast[]>('/podcasts');
      setPodcasts(response);
    } catch (err) {
      setError('Failed to fetch podcasts');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createPodcast = useCallback(async (podcast: Omit<Podcast, 'id'>): Promise<Podcast> => {
    setLoading(true);
    setError(null);
    try {
      const response = await post<Podcast>('/podcasts', podcast);
      setPodcasts(prevPodcasts => [...prevPodcasts, response]);
      return response;
    } catch (err) {
      setError('Failed to create podcast');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updatePodcast = useCallback(async (id: string, podcast: Partial<Podcast>): Promise<Podcast> => {
    setLoading(true);
    setError(null);
    try {
      const response = await put<Podcast>(`/podcasts/${id}`, podcast);
      setPodcasts(prevPodcasts => prevPodcasts.map(p => p.id === id ? response : p));
      return response;
    } catch (err) {
      setError('Failed to update podcast');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deletePodcast = useCallback(async (id: string): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      await apiDelete(`/podcasts/${id}`);
      setPodcasts(prevPodcasts => prevPodcasts.filter(p => p.id !== id));
    } catch (err) {
      setError('Failed to delete podcast');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPodcasts();
  }, [fetchPodcasts]);

  return {
    podcasts,
    loading,
    error,
    fetchPodcasts,
    createPodcast,
    updatePodcast,
    deletePodcast,
  };
};
import React, { useState, useEffect, useCallback } from 'react';
import { AnalyticsData } from '../types';
import { api } from '../utils/api';

interface AnalyticsState {
  analyticsData: AnalyticsData | null;
  loading: boolean;
  error: string | null;
}

interface AnalyticsOperations {
  fetchAnalytics: (startDate?: string, endDate?: string) => Promise<void>;
  fetchPodcastAnalytics: (startDate?: string, endDate?: string) => Promise<void>;
  fetchEpisodeAnalytics: (startDate?: string, endDate?: string) => Promise<void>;
}

export const useAnalytics = (podcastId: string, episodeId?: string): AnalyticsState & AnalyticsOperations => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = useCallback(async (startDate?: string, endDate?: string) => {
    setLoading(true);
    setError(null);
    try {
      const endpoint = episodeId 
        ? `/analytics/episodes/${episodeId}`
        : `/analytics/podcasts/${podcastId}`;
      const params = { startDate, endDate };
      const response = await api.get(endpoint, { params });
      setAnalyticsData(response.data);
    } catch (err) {
      setError('Failed to fetch analytics data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [podcastId, episodeId]);

  const fetchPodcastAnalytics = useCallback(async (startDate?: string, endDate?: string) => {
    setLoading(true);
    setError(null);
    try {
      const endpoint = `/analytics/podcasts/${podcastId}`;
      const params = { startDate, endDate };
      const response = await api.get(endpoint, { params });
      setAnalyticsData(response.data);
    } catch (err) {
      setError('Failed to fetch podcast analytics data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [podcastId]);

  const fetchEpisodeAnalytics = useCallback(async (startDate?: string, endDate?: string) => {
    if (!episodeId) {
      setError('Episode ID is required to fetch episode analytics');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const endpoint = `/analytics/episodes/${episodeId}`;
      const params = { startDate, endDate };
      const response = await api.get(endpoint, { params });
      setAnalyticsData(response.data);
    } catch (err) {
      setError('Failed to fetch episode analytics data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [episodeId]);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  return {
    analyticsData,
    loading,
    error,
    fetchAnalytics,
    fetchPodcastAnalytics,
    fetchEpisodeAnalytics,
  };
};
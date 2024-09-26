import React, { useState, useEffect, useCallback } from 'react';
import { MarketingContent, SocialMediaPost } from '../types';
import { get, post, put, delete as apiDelete } from '../utils/api';

interface MarketingState {
  marketingContent: MarketingContent[];
  socialMediaPosts: SocialMediaPost[];
  loading: boolean;
  error: string | null;
}

interface MarketingOperations {
  fetchMarketingContent: () => Promise<void>;
  generateMarketingContent: (content: Partial<MarketingContent>) => Promise<MarketingContent>;
  updateMarketingContent: (id: string, content: Partial<MarketingContent>) => Promise<MarketingContent>;
  deleteMarketingContent: (id: string) => Promise<void>;
  scheduleSocialMediaPost: (post: Partial<SocialMediaPost>) => Promise<SocialMediaPost>;
  updateSocialMediaPost: (id: string, post: Partial<SocialMediaPost>) => Promise<SocialMediaPost>;
  deleteSocialMediaPost: (id: string) => Promise<void>;
}

export const useMarketing = (episodeId: string): MarketingState & MarketingOperations => {
  const [state, setState] = useState<MarketingState>({
    marketingContent: [],
    socialMediaPosts: [],
    loading: false,
    error: null,
  });

  const fetchMarketingContent = useCallback(async () => {
    setState(prevState => ({ ...prevState, loading: true, error: null }));
    try {
      const content = await get<MarketingContent[]>(`/episodes/${episodeId}/marketing-content`);
      const posts = await get<SocialMediaPost[]>(`/episodes/${episodeId}/social-media-posts`);
      setState(prevState => ({
        ...prevState,
        marketingContent: content,
        socialMediaPosts: posts,
        loading: false,
      }));
    } catch (error) {
      setState(prevState => ({ ...prevState, loading: false, error: error.message }));
    }
  }, [episodeId]);

  const generateMarketingContent = useCallback(async (content: Partial<MarketingContent>) => {
    setState(prevState => ({ ...prevState, loading: true, error: null }));
    try {
      const newContent = await post<MarketingContent>(`/episodes/${episodeId}/marketing-content`, content);
      setState(prevState => ({
        ...prevState,
        marketingContent: [...prevState.marketingContent, newContent],
        loading: false,
      }));
      return newContent;
    } catch (error) {
      setState(prevState => ({ ...prevState, loading: false, error: error.message }));
      throw error;
    }
  }, [episodeId]);

  const updateMarketingContent = useCallback(async (id: string, content: Partial<MarketingContent>) => {
    setState(prevState => ({ ...prevState, loading: true, error: null }));
    try {
      const updatedContent = await put<MarketingContent>(`/marketing-content/${id}`, content);
      setState(prevState => ({
        ...prevState,
        marketingContent: prevState.marketingContent.map(item => item.id === id ? updatedContent : item),
        loading: false,
      }));
      return updatedContent;
    } catch (error) {
      setState(prevState => ({ ...prevState, loading: false, error: error.message }));
      throw error;
    }
  }, []);

  const deleteMarketingContent = useCallback(async (id: string) => {
    setState(prevState => ({ ...prevState, loading: true, error: null }));
    try {
      await apiDelete(`/marketing-content/${id}`);
      setState(prevState => ({
        ...prevState,
        marketingContent: prevState.marketingContent.filter(item => item.id !== id),
        loading: false,
      }));
    } catch (error) {
      setState(prevState => ({ ...prevState, loading: false, error: error.message }));
      throw error;
    }
  }, []);

  const scheduleSocialMediaPost = useCallback(async (post: Partial<SocialMediaPost>) => {
    setState(prevState => ({ ...prevState, loading: true, error: null }));
    try {
      const newPost = await post<SocialMediaPost>(`/episodes/${episodeId}/social-media-posts`, post);
      setState(prevState => ({
        ...prevState,
        socialMediaPosts: [...prevState.socialMediaPosts, newPost],
        loading: false,
      }));
      return newPost;
    } catch (error) {
      setState(prevState => ({ ...prevState, loading: false, error: error.message }));
      throw error;
    }
  }, [episodeId]);

  const updateSocialMediaPost = useCallback(async (id: string, post: Partial<SocialMediaPost>) => {
    setState(prevState => ({ ...prevState, loading: true, error: null }));
    try {
      const updatedPost = await put<SocialMediaPost>(`/social-media-posts/${id}`, post);
      setState(prevState => ({
        ...prevState,
        socialMediaPosts: prevState.socialMediaPosts.map(item => item.id === id ? updatedPost : item),
        loading: false,
      }));
      return updatedPost;
    } catch (error) {
      setState(prevState => ({ ...prevState, loading: false, error: error.message }));
      throw error;
    }
  }, []);

  const deleteSocialMediaPost = useCallback(async (id: string) => {
    setState(prevState => ({ ...prevState, loading: true, error: null }));
    try {
      await apiDelete(`/social-media-posts/${id}`);
      setState(prevState => ({
        ...prevState,
        socialMediaPosts: prevState.socialMediaPosts.filter(item => item.id !== id),
        loading: false,
      }));
    } catch (error) {
      setState(prevState => ({ ...prevState, loading: false, error: error.message }));
      throw error;
    }
  }, []);

  useEffect(() => {
    fetchMarketingContent();
  }, [fetchMarketingContent]);

  return {
    ...state,
    fetchMarketingContent,
    generateMarketingContent,
    updateMarketingContent,
    deleteMarketingContent,
    scheduleSocialMediaPost,
    updateSocialMediaPost,
    deleteSocialMediaPost,
  };
};
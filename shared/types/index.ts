// Interfaces
export interface User {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  profilePicture: string | null;
  bio: string;
  website: string;
  createdAt: Date;
  updatedAt: Date;
  lastLogin: Date;
  isActive: boolean;
  isStaff: boolean;
}

export interface Podcast {
  id: string;
  userId: string;
  title: string;
  description: string;
  coverImageUrl: string;
  rssFeedUrl: string;
  website: string;
  createdAt: Date;
  updatedAt: Date;
  status: PodcastStatus;
  category: string;
  language: string;
}

export interface Episode {
  id: string;
  podcastId: string;
  title: string;
  description: string;
  audioFileUrl: string;
  duration: number;
  publishDate: Date;
  createdAt: Date;
  updatedAt: Date;
  status: EpisodeStatus;
  episodeNumber: number;
  seasonNumber: number | null;
  transcript: string;
  showNotes: string;
}

export interface MarketingContent {
  id: string;
  episodeId: string;
  content: string;
  contentType: ContentType;
  platform: SocialMediaPlatform;
  createdAt: Date;
  updatedAt: Date;
  isApproved: boolean;
}

export interface SocialMediaPost {
  id: string;
  marketingContentId: string;
  platform: SocialMediaPlatform;
  scheduledTime: Date;
  postedTime: Date | null;
  status: string;
  postUrl: string | null;
}

export interface AnalyticsData {
  id: string;
  podcastId: string;
  episodeId: string | null;
  date: Date;
  listens: number;
  uniqueListeners: number;
  averageListenDuration: number;
  totalListenTime: number;
  listenerRetentionRate: number;
  engagementRate: number;
  socialShares: number;
  comments: number;
  likes: number;
}

// Enums
export enum PodcastStatus {
  ACTIVE = 'ACTIVE',
  PAUSED = 'PAUSED',
  ARCHIVED = 'ARCHIVED'
}

export enum EpisodeStatus {
  DRAFT = 'DRAFT',
  SCHEDULED = 'SCHEDULED',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED'
}

export enum SocialMediaPlatform {
  TWITTER = 'TWITTER',
  FACEBOOK = 'FACEBOOK',
  INSTAGRAM = 'INSTAGRAM',
  LINKEDIN = 'LINKEDIN'
}

export enum ContentType {
  POST = 'POST',
  STORY = 'STORY',
  REEL = 'REEL',
  TWEET = 'TWEET'
}
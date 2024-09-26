// User interface
export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  createdAt: Date;
  lastLogin: Date;
}

// Podcast interface
export interface Podcast {
  id: string;
  userId: string;
  title: string;
  description: string;
  coverImageUrl: string;
  rssFeedUrl: string;
  createdAt: Date;
  status: PodcastStatus;
}

// Episode interface
export interface Episode {
  id: string;
  podcastId: string;
  title: string;
  description: string;
  audioFileUrl: string;
  duration: number;
  publishedAt: Date;
  status: EpisodeStatus;
}

// Transcript interface
export interface Transcript {
  id: string;
  episodeId: string;
  content: string;
  accuracyScore: number;
}

// MarketingContent interface
export interface MarketingContent {
  id: string;
  episodeId: string;
  content: string;
  contentType: ContentType;
  createdAt: Date;
}

// SocialMediaPost interface
export interface SocialMediaPost {
  id: string;
  marketingContentId: string;
  platform: SocialMediaPlatform;
  scheduledAt: Date;
  status: string;
}

// AnalyticsData interface
export interface AnalyticsData {
  id: string;
  podcastId: string;
  episodeId: string | null;
  listens: number;
  shares: number;
  likes: number;
  comments: number;
  date: Date;
}

// PodcastStatus enum
export enum PodcastStatus {
  ACTIVE = 'ACTIVE',
  PAUSED = 'PAUSED',
  ARCHIVED = 'ARCHIVED'
}

// EpisodeStatus enum
export enum EpisodeStatus {
  DRAFT = 'DRAFT',
  SCHEDULED = 'SCHEDULED',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED'
}

// SocialMediaPlatform enum
export enum SocialMediaPlatform {
  LINKEDIN = 'LINKEDIN',
  FACEBOOK = 'FACEBOOK',
  TWITTER = 'TWITTER',
  INSTAGRAM = 'INSTAGRAM'
}

// ContentType enum
export enum ContentType {
  POST = 'POST',
  STORY = 'STORY',
  REEL = 'REEL',
  TWEET = 'TWEET'
}
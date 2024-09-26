// API version
export const API_VERSION = "v1";

// Maximum lengths for text fields
export const MAX_TITLE_LENGTH = 100;
export const MAX_DESCRIPTION_LENGTH = 5000;

// Supported audio file formats
export const SUPPORTED_AUDIO_FORMATS = ["mp3", "wav", "m4a", "ogg"];

// Default pagination limit
export const DEFAULT_PAGINATION_LIMIT = 20;

// Date and time formats
export const DATE_FORMAT = "YYYY-MM-DD";
export const TIME_FORMAT = "HH:mm:ss";
export const DATETIME_FORMAT = "YYYY-MM-DD HH:mm:ss";

// Social media platforms
export const SOCIAL_MEDIA_PLATFORMS = {
  TWITTER: "twitter",
  FACEBOOK: "facebook",
  INSTAGRAM: "instagram",
  LINKEDIN: "linkedin"
};

// Content types for social media posts
export const CONTENT_TYPES = {
  POST: "post",
  STORY: "story",
  REEL: "reel",
  TWEET: "tweet"
};

// Podcast categories
export const PODCAST_CATEGORIES = [
  "Arts",
  "Business",
  "Comedy",
  "Education",
  "Fiction",
  "Government",
  "History",
  "Health & Fitness",
  "Kids & Family",
  "Leisure",
  "Music",
  "News",
  "Religion & Spirituality",
  "Science",
  "Society & Culture",
  "Sports",
  "Technology",
  "True Crime",
  "TV & Film"
];

// Supported languages
export const LANGUAGES = {
  EN: "English",
  ES: "Spanish",
  FR: "French",
  DE: "German",
  IT: "Italian",
  PT: "Portuguese",
  JA: "Japanese",
  KO: "Korean",
  ZH: "Chinese"
};

// Human tasks:
// TODO: Review and validate all constant values to ensure they meet the project requirements
// TODO: Consider adding more podcast categories if needed based on industry standards
// TODO: Evaluate if additional language options should be included
// TODO: Ensure that the MAX_TITLE_LENGTH and MAX_DESCRIPTION_LENGTH align with database field constraints
// TODO: Verify that the SUPPORTED_AUDIO_FORMATS list includes all necessary formats for the platform
// TODO: Consider adding constants for minimum and maximum values (e.g., min episode duration, max file size)
// TODO: Add comments to explain the purpose or source of specific constant values if not self-evident
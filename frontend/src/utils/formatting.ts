import numeral from 'numeral';

const DEFAULT_DECIMAL_PLACES = 2;
const LARGE_NUMBER_THRESHOLD = 1000000;

export function formatNumber(value: number, decimalPlaces: number = DEFAULT_DECIMAL_PLACES): string {
  // Use numeral to format the number with the specified decimal places
  return numeral(value).format(`0,0.${'0'.repeat(decimalPlaces)}`);
}

export function formatLargeNumber(value: number): string {
  // Check if the number is larger than the LARGE_NUMBER_THRESHOLD
  if (value >= LARGE_NUMBER_THRESHOLD) {
    // If larger, format with abbreviations (K, M, B)
    return numeral(value).format('0.0a');
  } else {
    // If smaller, use the standard formatNumber function
    return formatNumber(value);
  }
}

export function formatDuration(seconds: number): string {
  // Calculate hours, minutes, and remaining seconds
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  // Create a formatted string with 'h' for hours and 'm' for minutes
  let formattedDuration = '';
  if (hours > 0) {
    formattedDuration += `${hours}h `;
  }
  formattedDuration += `${minutes}m`;

  // Omit hours if the duration is less than an hour
  return formattedDuration.trim();
}

export function truncateText(text: string, maxLength: number): string {
  // Check if the text length exceeds the maxLength
  if (text.length > maxLength) {
    // If it does, truncate the text and add ellipsis
    return text.slice(0, maxLength - 3) + '...';
  }
  // If not, return the original text
  return text;
}

export function formatPodcastTitle(title: string, episodeNumber?: number, maxLength?: number): string {
  // Create a formatted title with episode number if provided
  let formattedTitle = episodeNumber ? `Episode ${episodeNumber}: ${title}` : title;

  // Truncate the title if maxLength is specified
  if (maxLength) {
    formattedTitle = truncateText(formattedTitle, maxLength);
  }

  // Return the formatted and potentially truncated title
  return formattedTitle;
}

export function formatFileSize(bytes: number): string {
  // Define an array of units (B, KB, MB, GB, TB)
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];

  // Calculate the appropriate unit based on the byte size
  let i = 0;
  while (bytes >= 1024 && i < units.length - 1) {
    bytes /= 1024;
    i++;
  }

  // Format the number with up to 2 decimal places
  const formattedSize = bytes.toFixed(2);

  // Return the formatted string with the unit
  return `${formattedSize} ${units[i]}`;
}
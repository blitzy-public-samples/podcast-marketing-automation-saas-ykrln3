import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);

const DEFAULT_DATE_FORMAT = 'YYYY-MM-DD';
const DEFAULT_TIME_FORMAT = 'HH:mm:ss';
const DEFAULT_DATETIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

/**
 * Formats a date string or Date object to a specified format
 * @param date The date to format
 * @param format The desired format (default: DEFAULT_DATETIME_FORMAT)
 * @returns Formatted date string
 */
export function formatDate(date: string | Date, format: string = DEFAULT_DATETIME_FORMAT): string {
  return dayjs(date).format(format);
}

/**
 * Parses a date string into a Date object
 * @param dateString The date string to parse
 * @param format The format of the input date string (default: DEFAULT_DATETIME_FORMAT)
 * @returns Parsed Date object
 */
export function parseDate(dateString: string, format: string = DEFAULT_DATETIME_FORMAT): Date {
  return dayjs(dateString, format).toDate();
}

/**
 * Returns a relative time string (e.g., '2 hours ago') for a given date
 * @param date The date to get relative time for
 * @returns Relative time string
 */
export function getRelativeTime(date: string | Date): string {
  return dayjs(date).fromNow();
}

/**
 * Adds a specified number of days to a given date
 * @param date The starting date
 * @param days The number of days to add
 * @returns New Date object with added days
 */
export function addDays(date: string | Date, days: number): Date {
  return dayjs(date).add(days, 'day').toDate();
}

/**
 * Checks if a date is before another date
 * @param date1 The first date to compare
 * @param date2 The second date to compare
 * @returns True if date1 is before date2, false otherwise
 */
export function isDateBefore(date1: string | Date, date2: string | Date): boolean {
  return dayjs(date1).isBefore(dayjs(date2));
}

/**
 * Calculates the number of days between two dates
 * @param startDate The start date
 * @param endDate The end date
 * @returns Number of days between the two dates
 */
export function getDaysBetween(startDate: string | Date, endDate: string | Date): number {
  return dayjs(endDate).diff(dayjs(startDate), 'day');
}

// Human tasks:
// TODO: Add unit tests for all date utility functions
// TODO: Implement localization support for date formatting and relative time strings
// TODO: Add functions for working with time zones and UTC conversions
// TODO: Implement functions for handling recurring dates (e.g., for scheduling recurring podcast episodes)
// TODO: Add validation functions for date inputs to ensure proper formatting and valid dates
// TODO: Consider adding functions for working with date ranges, especially for analytics date selection
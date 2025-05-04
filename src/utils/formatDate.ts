import { dayjs } from '@/libs/dayjs';

/**
 * Formats an ISO 8601 date string (or any string parseable by dayjs)
 * to a more readable format like 'DD/MM/YYYY'.
 *
 * @param {string} dateString - The input date string.
 * @returns {string} - The formatted date string (e.g., '12/12/2029'), or an empty string if formatting fails.
 */
export const formatDate = (dateString: string): string => {
  try {
    const dateObj = dayjs(dateString);
    if (!dateObj.isValid()) {
      return '';
    }
    return dateObj.format('DD/MM/YYYY');
  } catch (error) {
    console.error(`[formatDate] Error formatting date: ${dateString}`, error);
    return '';
  }
};

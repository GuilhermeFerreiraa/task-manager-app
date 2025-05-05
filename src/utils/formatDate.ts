import { dayjs, timezone, utc } from '@/libs/dayjs';

// Estendendo os plugins
dayjs.extend(utc);
dayjs.extend(timezone);

/**
 * Formats an ISO 8601 date string (or any string parseable by dayjs)
 * to a more readable format like 'DD/MM/YYYY'.
 *
 * @param {string} dateString - The input date string.
 * @returns {string} - The formatted date string (e.g., '12/12/2029'), or an empty string if formatting fails.
 */
export const formatDate = (dateString: string): string => {
  try {
    if (!dateString) return '';

    // Tratar a data como meio-dia para evitar problemas de timezone
    // Primeiro extraímos apenas a parte da data (YYYY-MM-DD)
    const datePart = dateString.split('T')[0];

    // Depois criamos uma nova data com hora fixa às 12:00
    const dateObj = dayjs(`${datePart}T12:00:00`);

    if (!dateObj.isValid()) {
      return '';
    }

    return dateObj.format('DD/MM/YYYY');
  } catch (error) {
    console.error(`[formatDate] Error formatting date: ${dateString}`, error);
    return '';
  }
};

export const formatFullDate = (dateString: string): string => {
  if (!dateString) return '';

  try {
    return dayjs(dateString).format('DD/MM/YYYY [às] HH:mm');
  } catch {
    return '';
  }
};

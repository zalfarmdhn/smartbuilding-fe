/**
 * Formats a number with commas as thousand separators
 * @param value - The number to format
 * @returns Formatted string with commas
 */
export const formatNumber = (value: number | string): string => {
  if (typeof value === 'string') {
    value = parseFloat(value);
  }
  
  if (isNaN(value)) {
    return '0';
  }

  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
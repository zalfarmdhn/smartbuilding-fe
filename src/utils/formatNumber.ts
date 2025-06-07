/**
 * Formats a number with commas as thousand separators
 * @param value - The number to format
 * @returns Formatted string with commas
 */
export const formatDecimalNumber = (value: number | string): string => {
  if (typeof value === "string") {
    value = parseFloat(value);
  }

  if (isNaN(value)) {
    return "0";
  }

  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const returnDecimalNumber = (value: number | string): number => {
  if (typeof value === "string") {
    // Extract only the numeric part (including decimal) from the string
    const numericMatch = value.match(/\d+\.?\d*/);
    if (numericMatch) {
      return parseFloat(numericMatch[0]);
    }
    return 0;
  }

  if (isNaN(value)) {
    return 0;
  }

  return value;
};

export const returnNumber = (value: number | string): string => {
  // If the input is a number, convert it directly to a string
  if (typeof value === 'number') {
    return Math.floor(value).toString(); // Ensure it's a whole number
  }

  // Remove all non-digit characters (including decimal points and symbols)
  const numericString = value.replace(/\D/g, ''); // \D matches anything that's not a digit

  // If the result is an empty string (no numbers found), return '0'
  return numericString || '0';
};
// Configuration
export const YEAR_HEIGHT = 80; // pixels per year
export const CURRENT_YEAR = new Date().getFullYear();
export const START_YEAR = 2011; // Earliest year to show
export const END_YEAR = CURRENT_YEAR + 1;
export const TOTAL_YEARS = END_YEAR - START_YEAR;

// Company color mapping - CRT terminal green theme
export const companyColors: Record<string, string> = {
  REOWN: '#10fb88',
  Clikalia: '#51e018',
  Cochescom: '#39d353',
  Shopery: '#00ff6a',
  Restia: '#7dff7d',
  Freelance: '#51e018',
  Atrápalo: '#00e676',
  'Setting Consultoria': '#4ade80',
};

// Helper to parse date strings like "January 2022" or "2011" to a decimal year
export function parseDateToDecimalYear(dateStr: string): number {
  const months: Record<string, number> = {
    january: 0,
    february: 1,
    march: 2,
    april: 3,
    may: 4,
    june: 5,
    july: 6,
    august: 7,
    september: 8,
    october: 9,
    november: 10,
    december: 11,
  };

  const lowerDate = dateStr.toLowerCase();

  // Check for "Present"
  if (lowerDate === 'present') {
    return CURRENT_YEAR + new Date().getMonth() / 12;
  }

  // Try to extract year
  const yearMatch = dateStr.match(/\d{4}/);
  if (!yearMatch) return CURRENT_YEAR;

  const year = parseInt(yearMatch[0]);

  // Try to extract month
  for (const [month, index] of Object.entries(months)) {
    if (lowerDate.includes(month)) {
      return year + index / 12;
    }
  }

  return year + 0.5; // Default to middle of year if no month
}

// Calculate position from top based on date
export function getPositionFromDate(dateStr: string): number {
  const decimalYear = parseDateToDecimalYear(dateStr);
  const yearsFromTop = END_YEAR - decimalYear;
  return yearsFromTop * YEAR_HEIGHT;
}

// Format date to short form like "JAN 22"
export function formatDateShort(dateStr: string): string {
  if (dateStr.toLowerCase() === 'present') return 'PRESENT';

  const months: Record<string, string> = {
    january: 'JAN',
    february: 'FEB',
    march: 'MAR',
    april: 'APR',
    may: 'MAY',
    june: 'JUN',
    july: 'JUL',
    august: 'AUG',
    september: 'SEP',
    october: 'OCT',
    november: 'NOV',
    december: 'DEC',
  };

  const lowerDate = dateStr.toLowerCase();
  const yearMatch = dateStr.match(/\d{4}/);
  const year = yearMatch ? yearMatch[0].slice(-2) : '';

  for (const [month, abbr] of Object.entries(months)) {
    if (lowerDate.includes(month)) {
      return `${abbr} ${year}`;
    }
  }

  return year;
}

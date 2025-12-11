export type Waypoint = {
  id: string;
  title: string;
  description?: string;
  date: string; // Format: "Month YYYY" or "YYYY"
  type: 'milestone' | 'achievement' | 'personal' | 'education';
  icon?: string; // emoji or icon name
};

export const waypoints: Waypoint[] = [
  {
    id: 'started-coding',
    title: 'Started Coding',
    description: 'Began my journey into programming',
    date: '2011',
    type: 'milestone',
    icon: '🚀',
  },
  // Add more waypoints as needed
  {
    id: ' ',
    title: 'Digital Nomad',
    description: 'Worked remotely from different countries',
    date: 'May 2024',
    type: 'personal',
    icon: '🌍',
  },
];

// Helper to parse date string to year for timeline positioning
export function parseWaypointYear(date: string): number {
  const yearMatch = date.match(/\d{4}/);
  return yearMatch ? parseInt(yearMatch[0]) : new Date().getFullYear();
}

// Helper to get month from date string (defaults to 6 for just year)
export function parseWaypointMonth(date: string): number {
  const months: Record<string, number> = {
    january: 1,
    february: 2,
    march: 3,
    april: 4,
    may: 5,
    june: 6,
    july: 7,
    august: 8,
    september: 9,
    october: 10,
    november: 11,
    december: 12,
  };

  const lowerDate = date.toLowerCase();
  for (const [month, num] of Object.entries(months)) {
    if (lowerDate.includes(month)) return num;
  }
  return 6; // Default to middle of year
}

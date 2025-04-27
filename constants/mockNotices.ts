export interface Notice {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  date: string;
  hasAttachment: boolean;
  isUnread: boolean;
  category: string;
}

// Import the mock notices from the JSON file
import mockNotices from './mockNotices.json';

export { mockNotices };


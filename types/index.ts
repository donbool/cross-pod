export type UserProfile = {
  id: string;
  full_name: string;
  goal: string;
  timezone: string;
  languages: string[];
  streak: number;
  badges: string[];
  created_at: string;
};

export type Pod = {
  id: string;
  goal: string;
  language: string;
  timezone: string;
  created_by: string;
  created_at: string;
};

export type PodMember = {
  pod_id: string;
  user_id: string;
  joined_at: string;
};

export type Session = {
  id: string;
  pod_id: string;
  scheduled_for: string;
  calendar_event_id: string | null;
  created_at: string;
};

export type Message = {
  id: string;
  pod_id: string;
  user_id: string;
  content: string;
  type: 'text' | 'voice';
  audio_url?: string;
  created_at: string;
};

export type Project = {
  id: string;
  pod_id: string;
  week: number;
  prompt: string;
  created_at: string;
}; 
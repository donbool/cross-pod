import { useEffect, useState } from 'react';
import { Project } from '../types';

const MOCK_PROJECT: Project = {
  id: '1',
  pod_id: '1',
  week: 1,
  prompt: 'Build a simple robot arm controller in Rust.',
  created_at: new Date().toISOString(),
};

export function useProjects(podId: string | null, week: number) {
  const [project, setProject] = useState<Project | null>(null);
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      setProject(MOCK_PROJECT);
      return;
    }
    // TODO: Add loading and error state, OpenAI integration
    if (!podId) return;
    // ... existing code ...
  }, [podId, week]);
  return project;
} 
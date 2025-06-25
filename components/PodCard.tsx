import { Pod } from '../types';

type PodCardProps = {
  pod: Pod;
  onClick?: () => void;
};

export default function PodCard({ pod, onClick }: PodCardProps) {
  return (
    <div
      className="p-4 bg-white rounded shadow hover:bg-indigo-50 cursor-pointer"
      onClick={onClick}
    >
      <div className="font-bold text-lg">{pod.goal}</div>
      <div className="text-sm text-gray-500">Language: {pod.language}</div>
      <div className="text-sm text-gray-500">Timezone: {pod.timezone}</div>
    </div>
  );
} 
type BadgeProps = {
  icon: string;
  label: string;
};

export default function Badge({ icon, label }: BadgeProps) {
  return (
    <span className="inline-flex items-center px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-sm font-medium mr-2">
      <span className="mr-1">{icon}</span>
      {label}
    </span>
  );
} 
type ProjectPromptProps = {
  prompt: string;
};

export default function ProjectPrompt({ prompt }: ProjectPromptProps) {
  return (
    <div className="p-4 bg-white rounded shadow mb-4">
      <h2 className="font-semibold mb-2">This Week's Project</h2>
      <div className="text-gray-800">{prompt}</div>
    </div>
  );
} 
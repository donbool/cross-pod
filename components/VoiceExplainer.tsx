type VoiceExplainerProps = {
  onUpload: (file: File) => void;
  audioUrl?: string;
  loading?: boolean;
};

export default function VoiceExplainer({ onUpload, audioUrl, loading }: VoiceExplainerProps) {
  return (
    <div className="mb-4">
      <label className="block mb-2 font-semibold">Voice Explainer</label>
      <input
        type="file"
        accept="audio/*"
        onChange={e => {
          if (e.target.files && e.target.files[0]) onUpload(e.target.files[0]);
        }}
        disabled={loading}
      />
      {audioUrl && (
        <audio controls src={audioUrl} className="mt-2" />
      )}
      {/* TODO: Add translation/clone playback */}
    </div>
  );
} 
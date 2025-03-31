import { useState } from "react";
import { useEditorStore } from "~/store/editorStore";

const VideoSelector = () => {
  const videoUrl = useEditorStore((state) => state.videoUrl);
  const setVideoUrl = useEditorStore((state) => state.setVideoUrl);
  const [inputValue, setInputValue] = useState(videoUrl);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setVideoUrl(inputValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="bg-white/5 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-white">Video URL</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label 
            htmlFor="videoUrl" 
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Arka Plan Video URL'si
          </label>
          <input
            id="videoUrl"
            type="url"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="https://example.com/video.mp4"
            className="w-full p-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Video URL'si girin"
          />
          <p className="mt-1 text-xs text-gray-400">
            YouTube, Vimeo veya doğrudan video URL'si ekleyin
          </p>
        </div>
        
        <button
          type="submit"
          className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          aria-label="Video URL'sini ayarla"
          tabIndex={0}
        >
          URL'yi Ayarla
        </button>
      </form>
      
      {videoUrl && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-300 mb-2">Mevcut Video:</h3>
          <div className="p-2 bg-black/30 rounded border border-white/10 text-gray-300 break-all">
            {videoUrl}
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoSelector;

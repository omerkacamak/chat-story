import { useEditorStore } from "~/store/editorStore";

// Örnek voice ID'leri - gerçek uygulamada ElevenLabs API'den çekilebilir
const voiceOptions = [
  { id: "voice1", name: "Adam" },
  { id: "voice2", name: "Rachel" },
  { id: "voice3", name: "Antoni" },
  { id: "voice4", name: "Domi" },
  { id: "voice5", name: "Bella" },
  { id: "voice6", name: "Thomas" },
];

const VoiceSelector = () => {
  const leftVoiceId = useEditorStore((state) => state.leftVoiceId);
  const rightVoiceId = useEditorStore((state) => state.rightVoiceId);
  const setLeftVoiceId = useEditorStore((state) => state.setLeftVoiceId);
  const setRightVoiceId = useEditorStore((state) => state.setRightVoiceId);

  return (
    <div className="bg-white/5 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-white">Ses Seçimi</h2>
      
      <div className="space-y-4">
        <div>
          <label 
            htmlFor="leftVoice" 
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Sol Konuşmacı Sesi
          </label>
          <select
            id="leftVoice"
            value={leftVoiceId}
            onChange={(e) => setLeftVoiceId(e.target.value)}
            className="w-full p-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Sol konuşmacı için ses seçin"
          >
            <option value="">Ses seçin</option>
            {voiceOptions.map((voice) => (
              <option key={voice.id} value={voice.id}>
                {voice.name}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label 
            htmlFor="rightVoice" 
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Sağ Konuşmacı Sesi
          </label>
          <select
            id="rightVoice"
            value={rightVoiceId}
            onChange={(e) => setRightVoiceId(e.target.value)}
            className="w-full p-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Sağ konuşmacı için ses seçin"
          >
            <option value="">Ses seçin</option>
            {voiceOptions.map((voice) => (
              <option key={voice.id} value={voice.id}>
                {voice.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default VoiceSelector;

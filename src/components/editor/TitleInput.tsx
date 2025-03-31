import { useEditorStore } from "~/store/editorStore";

const TitleInput = () => {
  const title = useEditorStore((state) => state.title);
  const setTitle = useEditorStore((state) => state.setTitle);

  return (
    <div className="bg-white/5 p-4 rounded-lg shadow-md">
      <label 
        htmlFor="storyTitle" 
        className="block text-xl font-semibold mb-2 text-white"
      >
        Story Başlığı
      </label>
      <input
        id="storyTitle"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Story için bir başlık girin..."
        className="w-full p-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        aria-label="Story başlığı"
      />
    </div>
  );
};

export default TitleInput;

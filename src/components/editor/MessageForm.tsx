import { useState } from "react";
import { useEditorStore } from "~/store/editorStore";

const MessageForm = () => {
  const [messageText, setMessageText] = useState("");
  const [side, setSide] = useState<"left" | "right">("left");
  const addMessage = useEditorStore((state) => state.addMessage);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageText.trim()) {
      addMessage(messageText, side);
      setMessageText("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="flex flex-col gap-3 bg-white/5 p-4 rounded-lg shadow-md"
    >
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setSide("left")}
          className={`flex-1 py-2 px-4 rounded-md transition-colors ${
            side === "left"
              ? "bg-indigo-600 text-white"
              : "bg-white/10 text-gray-200 hover:bg-white/20"
          }`}
          aria-label="Sol konuşmacı"
          tabIndex={0}
        >
          Sol
        </button>
        <button
          type="button"
          onClick={() => setSide("right")}
          className={`flex-1 py-2 px-4 rounded-md transition-colors ${
            side === "right"
              ? "bg-indigo-600 text-white"
              : "bg-white/10 text-gray-200 hover:bg-white/20"
          }`}
          aria-label="Sağ konuşmacı"
          tabIndex={0}
        >
          Sağ
        </button>
      </div>

      <textarea
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Mesajınızı yazın..."
        className="w-full p-3 rounded-md bg-white/10 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        rows={3}
        aria-label="Mesaj içeriği"
      />

      <button
        type="submit"
        className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!messageText.trim()}
        aria-label="Mesaj ekle"
        tabIndex={0}
      >
        Mesaj Ekle
      </button>
    </form>
  );
};

export default MessageForm;

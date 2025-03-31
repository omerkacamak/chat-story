import { useEditorStore, type Message } from "~/store/editorStore";

const MessageList = () => {
  const messages = useEditorStore((state) => state.messages);
  const removeMessage = useEditorStore((state) => state.removeMessage);

  if (messages.length === 0) {
    return (
      <div className="bg-white/5 p-6 rounded-lg text-center text-gray-400">
        Henüz mesaj eklenmedi. Yeni bir mesaj ekleyin.
      </div>
    );
  }

  const handleDelete = (id: string) => {
    removeMessage(id);
  };

  const handleKeyDown = (e: React.KeyboardEvent, id: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleDelete(id);
    }
  };

  return (
    <div className="bg-white/5 rounded-lg p-4 overflow-y-auto max-h-[400px]">
      <h2 className="text-xl font-semibold mb-4 text-white">Mesajlar</h2>
      <ul className="space-y-3">
        {messages.map((message) => (
          <MessageItem 
            key={message.id} 
            message={message} 
            onDelete={handleDelete}
            onKeyDown={handleKeyDown}
          />
        ))}
      </ul>
    </div>
  );
};

type MessageItemProps = {
  message: Message;
  onDelete: (id: string) => void;
  onKeyDown: (e: React.KeyboardEvent, id: string) => void;
};

const MessageItem = ({ message, onDelete, onKeyDown }: MessageItemProps) => {
  return (
    <li 
      className={`flex items-start gap-2 p-3 rounded-lg ${
        message.side === "left" ? "bg-blue-900/30" : "bg-purple-900/30"
      }`}
    >
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-white/10 text-gray-300">
            {message.side === "left" ? "Sol" : "Sağ"}
          </span>
          <span className="text-xs text-gray-400">#{message.order + 1}</span>
        </div>
        <p className="text-white">{message.text}</p>
      </div>
      <button
        onClick={() => onDelete(message.id)}
        onKeyDown={(e) => onKeyDown(e, message.id)}
        className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-white/10 rounded-full transition-colors"
        aria-label="Mesajı sil"
        tabIndex={0}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-5 w-5" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
          />
        </svg>
      </button>
    </li>
  );
};

export default MessageList;

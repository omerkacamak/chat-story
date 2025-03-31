"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { useEditorStore } from "~/store/editorStore";
import MessageForm from "~/components/editor/MessageForm";
import MessageList from "~/components/editor/MessageList";
import VoiceSelector from "~/components/editor/VoiceSelector";
import VideoSelector from "~/components/editor/VideoSelector";
import TitleInput from "~/components/editor/TitleInput";

export default function EditorPage() {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { messages, leftVoiceId, rightVoiceId, videoUrl, title, clearAll } = useEditorStore();
  
  const createStory = api.story.create.useMutation({
    onSuccess: (data) => {
      setIsCreating(false);
      clearAll();
      router.push(`/preview/${data.id}`);
    },
    onError: (error) => {
      setIsCreating(false);
      setError(error.message);
    }
  });
  
  const handleCreateStory = () => {
    if (!title) {
      setError("Lütfen bir başlık girin");
      return;
    }
    
    if (messages.length === 0) {
      setError("En az bir mesaj eklemelisiniz");
      return;
    }
    
    if (!leftVoiceId || !rightVoiceId) {
      setError("Lütfen sol ve sağ konuşmacı için ses seçin");
      return;
    }
    
    if (!videoUrl) {
      setError("Lütfen bir video URL'si girin");
      return;
    }
    
    setIsCreating(true);
    setError(null);
    
    createStory.mutate({
      title,
      messages: messages.map(msg => ({
        text: msg.text,
        side: msg.side,
        order: msg.order
      })),
      leftVoiceId,
      rightVoiceId,
      videoUrl
    });
  };
  
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Chat Story Editor</h1>
        
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-100 p-3 rounded-lg mb-6">
            {error}
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <TitleInput />
            
            <MessageForm />
            
            <MessageList />
          </div>
          
          <div className="space-y-6">
            <VoiceSelector />
            
            <VideoSelector />
            
            <div className="bg-white/5 p-4 rounded-lg shadow-md">
              <button
                onClick={handleCreateStory}
                disabled={isCreating}
                className="w-full py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
                aria-label="Story oluştur"
                tabIndex={0}
              >
                {isCreating ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Oluşturuluyor...
                  </>
                ) : "Story Oluştur"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

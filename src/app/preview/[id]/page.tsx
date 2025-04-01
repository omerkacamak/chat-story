"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import ChatMessage from "~/components/preview/ChatMessage";
import { ArrowLeft, Camera, Phone, MoreVertical } from "lucide-react";

export default function PreviewPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const storyId = params.id;

  const { data: story, isError } = api.story.getById.useQuery(
    { id: storyId },
    { retry: false }
  );

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [story]);

  useEffect(() => {
    if (isError) {
      setError("Story bulunamadı veya erişim izniniz yok");
    }
  }, [isError]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#eae6df] flex items-center justify-center">
        <div className="text-[#111b21] text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#111b21] mx-auto mb-4"></div>
          <p className="text-xl">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (error || !story) {
    return (
      <div className="min-h-screen bg-[#eae6df] flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg max-w-md w-full text-center shadow-lg">
          <h1 className="text-2xl font-bold text-[#111b21] mb-4">Hata</h1>
          <p className="text-red-500 mb-6">{error ?? "Story bulunamadı"}</p>
          <button
            onClick={() => router.push("/editor")}
            className="px-4 py-2 bg-[#00a884] text-white rounded-md hover:bg-[#008f6f] transition-colors"
          >
            Editöre Dön
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#eae6df] flex items-center justify-center p-4">
      {/* Phone Frame */}
      <div className="w-full max-w-[420px] h-[85vh] bg-white rounded-[3rem] overflow-hidden shadow-2xl relative">
        {/* Status Bar */}
        <div className="bg-[#075e54] h-7 flex items-center justify-between px-6 text-white text-xs">
          <span>5:37</span>
          <div className="flex items-center gap-1">
            <span>📶</span>
            <span>🔋</span>
          </div>
        </div>

        {/* WhatsApp Header */}
        <div className="bg-[#075e54] px-4 py-2 flex items-center gap-3">
          <button
            onClick={() => router.push("/editor")}
            className="p-1 hover:bg-[#ffffff1a] rounded-full transition-colors text-white"
            aria-label="Editöre dön"
          >
            <ArrowLeft size={20} />
          </button>

          <div className="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0" />

          <div className="flex-grow">
            <h1 className="font-medium text-[16px] leading-[21px] text-white">
              {story.title}
            </h1>
            <p className="text-[13px] leading-[18px] text-[#ffffff99]">
              çevrimiçi
            </p>
          </div>

          <div className="flex items-center gap-4 text-white">
            <button className="hover:bg-[#ffffff1a] p-2 rounded-full">
              <Camera size={20} />
            </button>
            <button className="hover:bg-[#ffffff1a] p-2 rounded-full">
              <Phone size={20} />
            </button>
            <button className="hover:bg-[#ffffff1a] p-2 rounded-full">
              <MoreVertical size={20} />
            </button>
          </div>
        </div>

        {/* Chat Area */}
        <div 
          className="h-[calc(100%-128px)] overflow-y-auto bg-[url('/wp.jpg')] bg-cover bg-center"
        >
          <div className="px-[20px] py-[20px] space-y-[2px]">
            {story.messages.map((message, index) => (
              <ChatMessage
                key={message.id}
                message={{
                  id: message.id,
                  content: message.content,
                  side: message.side as "left" | "right"
                }}
                isLast={index === story.messages.length - 1}
              />
            ))}
          </div>
        </div>

        {/* Message Input */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#f0f2f5] px-4 py-2 flex items-center gap-2">
          <button className="text-[#54656f] hover:text-[#111b21] p-2">
            😊
          </button>
          <div className="flex-grow bg-white rounded-lg px-4 py-2 text-[#667781]">
            Mesaj yazın
          </div>
          <button className="text-[#54656f] hover:text-[#111b21] p-2">
            🎤
          </button>
        </div>
      </div>
    </div>
  );
}

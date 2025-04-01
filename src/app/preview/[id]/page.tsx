"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import ChatMessage from "~/components/preview/ChatMessage";
import { ArrowLeft } from "lucide-react";

export default function PreviewPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleMessages, setVisibleMessages] = useState<number>(0);
  const [chatHeight, setChatHeight] = useState<number>(0);
  const storyId = params.id;
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const { data: story, isError } = api.story.getById.useQuery(
    { id: storyId },
    { retry: false }
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Header yüksekliği kadar başlangıç değeri
      setChatHeight(60);
    }, 1000);
    return () => clearTimeout(timer);
  }, [story]);

  useEffect(() => {
    if (isError) {
      setError("Story bulunamadı veya erişim izniniz yok");
    }
  }, [isError]);

  useEffect(() => {
    if (story && !isLoading) {
      const interval = setInterval(() => {
        setVisibleMessages(prev => {
          if (prev < story.messages.length) {
            // Her mesajda chat yüksekliğini artır
            setChatHeight(height => Math.min(height + 60, 500));
            if (chatContainerRef.current) {
              chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
            }
            return prev + 1;
          }
          clearInterval(interval);
          return prev;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [story, isLoading]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-xl">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (error || !story) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
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
    <div className="min-h-screen bg-black flex items-center justify-center">
      {/* Ana container - Video için geniş */}
      <div className="w-[800px] h-[700px] relative overflow-hidden">
        {/* Video Arka Plan */}
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover scale-[1.15] translate-y-[-5%]"
            src="/video.mp4"
            type="video/mp4"
          />
        </div>

        {/* WhatsApp Arayüzü - Ortada */}
        <div className="absolute left-1/2 -translate-x-1/2 w-[400px] h-full top-10">
          <div className="flex flex-col h-full">
            {/* Header */}
            {/* <div className="bg-[#075e54] px-4 py-3 flex items-center gap-3">
              <button
                onClick={() => router.push("/editor")}
                className="p-1 hover:bg-[#ffffff1a] rounded-full transition-colors text-white"
                aria-label="Editöre dön"
              >
                <ArrowLeft size={20} />
              </button>

              <div className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0" />

              <div className="flex-grow">
                <h1 className="font-medium text-[14px] leading-[18px] text-white">
                  {story.title}
                </h1>
                <p className="text-[12px] leading-[16px] text-[#ffffff99]">
                  {visibleMessages === story.messages.length ? "çevrimiçi" : "yazıyor..."}
                </p>
              </div>
            </div> */}

            {/* Mesaj Alanı */}
            <div 
              ref={chatContainerRef}
              className="bg-[url('/wp.jpg')] bg-cover bg-center overflow-hidden rounded-3xl"
              style={{ 
                height: `${chatHeight}px`,
                transition: 'height 0.5s ease-out'
              }}
            >
              <div className="p-3 space-y-2 h-full overflow-y-auto scrollbar-hide">
                {story.messages.slice(0, visibleMessages).map((message, index) => (
                  <div
                    key={message.id}
                    className="animate-fade-in-up"
                  >
                    <ChatMessage
                      message={{
                        id: message.id,
                        content: message.content,
                        side: message.side as "left" | "right"
                      }}
                      isLast={index === visibleMessages - 1}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

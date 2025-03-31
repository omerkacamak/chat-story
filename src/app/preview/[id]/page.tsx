"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";

export default function PreviewPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { data: story, isError } = api.story.getById.useQuery(
    { id: params.id },
    {
      onSuccess: () => setIsLoading(false),
      onError: (err) => {
        setError(err.message);
        setIsLoading(false);
      },
      retry: 1,
    }
  );

  useEffect(() => {
    if (isError) {
      setError("Story bulunamadı veya erişim izniniz yok");
    }
  }, [isError]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c] flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-xl">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (error || !story) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c] flex items-center justify-center">
        <div className="bg-white/10 p-6 rounded-lg max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Hata</h1>
          <p className="text-red-300 mb-6">{error || "Story bulunamadı"}</p>
          <button
            onClick={() => router.push("/editor")}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            Editöre Dön
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">{story.title}</h1>
          <button
            onClick={() => router.push("/editor")}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            Editöre Dön
          </button>
        </div>

        <div className="bg-black/30 rounded-lg overflow-hidden">
          <div className="aspect-video bg-black relative">
            {/* Video player will be implemented here */}
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-white text-lg">Video: {story.videoUrl}</p>
            </div>
          </div>

          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Mesajlar</h2>
            <div className="space-y-4">
              {story.messages.map((message) => (
                <div
                  key={message.id}
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.side === "left"
                      ? "bg-blue-900/50 mr-auto"
                      : "bg-purple-900/50 ml-auto"
                  }`}
                >
                  <p>{message.content}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 bg-white/5 border-t border-white/10">
            <h2 className="text-xl font-semibold mb-4">Ses Ayarları</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-300">Sol Konuşmacı Sesi:</p>
                <p className="font-medium">{story.leftVoiceId}</p>
              </div>
              <div>
                <p className="text-gray-300">Sağ Konuşmacı Sesi:</p>
                <p className="font-medium">{story.rightVoiceId}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

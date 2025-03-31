// src/app/page.tsx
import { redirect } from "next/navigation";
import { auth } from "~/server/auth";
import HeroSection from "~/app/_components/landing-page/HeroSection";
import FeatureGrid from "~/app/_components/landing-page/FeatureGrid";

export default async function Home() {
  const session = await auth();

  if (session?.user) {
    redirect("/editor");
  }

  const features = [
    {
      title: "Chat Senaryoları",
      description: "Sağ ve sol konuşma balonlarıyla gerçekçi chat sahneleri oluşturun"
    },
    {
      title: "Video Arka Plan",
      description: "Senaryonuza uygun video arka planı ekleyin"
    },
    {
      title: "Sesli Oynatma", 
      description: "ElevenLabs ile mesajlarınızı sesli hale getirin"
    }
  ];

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <HeroSection
          title="Chat Story Studio"
          subtitle="Kolayca sahte chat senaryoları oluşturun, video arka planı ekleyin ve ElevenLabs ile seslendirin!"
          session={!!session}
        />
        <FeatureGrid features={features} />
      </div>
    </main>
  );
}
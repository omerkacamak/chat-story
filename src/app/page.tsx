import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {
  const session = await auth();

  // Eğer kullanıcı giriş yapmışsa editor sayfasına yönlendir
  if (session?.user) {
    redirect("/editor");
  }

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight text-center sm:text-[5rem]">
            Chat Story <span className="text-[hsl(280,100%,70%)]">Studio</span>
          </h1>
          <p className="text-xl text-center max-w-2xl">
            Kolayca sahte chat senaryoları oluşturun, video arka planı ekleyin ve ElevenLabs ile seslendirin!
          </p>
          
          <div className="flex gap-4">
            <Link
              href="/api/auth/signin"
              className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
              aria-label="Giriş yap"
              tabIndex={0}
            >
              Giriş Yap
            </Link>
            <Link
              href="/register"
              className="rounded-full bg-[hsl(280,100%,70%)]/80 px-10 py-3 font-semibold no-underline transition hover:bg-[hsl(280,100%,70%)]"
              aria-label="Kayıt ol"
              tabIndex={0}
            >
              Kayıt Ol
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 mt-12">
            <div className="flex flex-col items-center p-6 bg-white/5 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Chat Senaryoları</h3>
              <p className="text-center text-gray-300">Sağ ve sol konuşma balonlarıyla gerçekçi chat sahneleri oluşturun</p>
            </div>
            <div className="flex flex-col items-center p-6 bg-white/5 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Video Arka Plan</h3>
              <p className="text-center text-gray-300">Senaryonuza uygun video arka planı ekleyin</p>
            </div>
            <div className="flex flex-col items-center p-6 bg-white/5 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Sesli Oynatma</h3>
              <p className="text-center text-gray-300">ElevenLabs ile mesajlarınızı sesli hale getirin</p>
            </div>
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}

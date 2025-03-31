// src/app/_components/HeroSection.tsx
import Link from "next/link";

type HeroSectionProps = {
  title: string;
  subtitle: string;
  session: boolean;
};

const HeroSection = ({ title, subtitle, session }: HeroSectionProps) => {
  return (
    <>
      <h1 className="text-5xl font-extrabold tracking-tight text-center sm:text-[5rem]">
        {title}
      </h1>
      <p className="text-xl text-center max-w-2xl mt-4">{subtitle}</p>
      
      <div className="flex gap-4 mt-8">
        <Link
          href="/api/auth/signin"
          className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
          aria-label="Giriş yap"
          tabIndex={0}
        >
          Giriş Yap
        </Link>
        {!session && (
          <Link
            href="/register"
            className="rounded-full bg-[hsl(280,100%,70%)]/80 px-10 py-3 font-semibold no-underline transition hover:bg-[hsl(280,100%,70%)]"
            aria-label="Kayıt ol"
            tabIndex={0}
          >
            Kayıt Ol
          </Link>
        )}
      </div>
    </>
  );
};

export default HeroSection;
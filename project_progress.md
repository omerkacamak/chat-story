# Chat Story Studio 📱🎥

Chat Story Studio, kullanıcıların kolayca sahte chat senaryoları oluşturabildiği, 
video arka planı ve ElevenLabs destekli sesli oynatma yapabilen bir web uygulamasıdır. 

Proje T3 stack üzerinde (Next.js 14 + Prisma + tRPC + Auth) inşa edilmiştir.

---

## 🚀 Özellikler

- Sağ / Sol konuşma balonlarıyla chat sahnesi oluşturma
- ElevenLabs üzerinden seslendirme (TTS)
- Video arka plan desteği
- Mesajları sesle birlikte animasyonlu oynatma
- Story kaydetme, preview ve export imkanı
- Üye olma, giriş yapma, sadece giriş yapan kullanıcıların içerik oluşturabilmesi
- Modern, responsive ve sosyal medya uyumlu

---

## 🛠️ Kullanılan Teknolojiler

| Teknoloji | Amaç |
|-----------|------|
| Next.js 14 | React tabanlı SSR / CSR Framework |
| Tailwind CSS | Utility-first CSS framework |
| Prisma | PostgreSQL ORM |
| PostgreSQL | Database |
| NextAuth | Authentication & Session yönetimi |
| T3 App | Next.js + tRPC + Prisma + NextAuth Boilerplate |
| tRPC | Typesafe API Layer |
| Zustand | Frontend state yönetimi |
| React Player | Video oynatıcı |
| Howler.js | Ses oynatıcı |
| ElevenLabs API | TTS API |

---

## 📝 Geliştirme Günlüğü

### 01.04.2025
- Authentication sistemi güncellendi
  - GitHub OAuth provider eklendi
  - Prisma adapter ve gerekli model alanları kontrol edildi
  - Environment değişkenleri düzenlendi
  - NextAuth config dosyası güncellendi
- Landing page tasarımı güncellendi
  - Chat Story Studio başlığı ve açıklama metni eklendi
  - Giriş Yap ve Kayıt Ol butonları eklendi
  - Özellikler grid ile gösterildi
  - Kullanıcı giriş yapmışsa otomatik olarak /editor sayfasına yönlendirme eklendi
  - Accessibility özellikleri eklendi (aria-label, tabIndex)
  - Modern ve responsive tasarım uygulandı
- Component tabanlı yapıya geçildi
  - `HeroSection` ve `FeatureGrid` component'leri oluşturuldu
  - Tüm UI elementleri component'ler üzerinden yönetilmeye başlandı
  - Props yapısı ile dinamik içerik yönetimi sağlandı
  - Kod tekrarı ortadan kaldırıldı (DRY prensibi)

1) Landing Page → Giriş yap
2) Auth olan kullanıcı → Editor sayfasına geçer
3) Editor:
     → Mesajlar ekler
     → Voice ID belirler (Sol ve Sağ)
     → Video URL ekler
4) Create → Story database'e kaydedilir
5) Redirect → Preview Page
6) Preview:
     → Video oynar
     → Mesajlar animasyonlu gelir
     → TTS ile sesler oynar
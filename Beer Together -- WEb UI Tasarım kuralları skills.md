Beer Together — Landing Page Web UI Spesifikasyonu
5 Eki 2026 · Hazırlayan: @SERKAN
1. Amaç & Ajan İçin Değişmez Kurallar
Bu doküman, Beer Together'ın tanıtım sitesini (Next.js) kurumsal kalitede üretmek için yazıldı: referans seviyesi Linear, Stripe, Airbnb ve Apple'ın ürün sayfalarıdır — sıradan bir "AI landing page" değil. Ajan bu dokümanı baştan sona okumadan tek satır kod yazmaz.
Sayfanın tek işi: ziyaretçiyi 10 saniyede "bu ne, bana ne faydası var, nasıl indiririm" sorularına cevap vererek uygulamayı indirmeye (ya da gelen daveti kabul etmeye) götürmek.
Değişmez kurallar (pazarlık yok):
1. Token dışına çıkma. Renk, font, boşluk, radius, gölge sadece Bölüm 2-4'teki token'lardan gelir. Koda hex rengi, rastgele px değeri gömülmez.
2. Metin uydurma. Sahte istatistik, sahte yorum, sahte kullanıcı sayısı, lorem ipsum yasaktır. Gerçek veri yoksa o bölüm hiç çizilmez (ya da "yakında" rozetiyle gösterilir).
3. Tüm metin translations.ts'ten gelir. Bileşenlerde sabit string yok. Sayfa 6 dilde (tr, en, es, ja, ar, it) çalışmak zorundadır; Arapçada layout aynalanır.
4. Mobile-first. Önce 390px genişlikte tasarla ve doğrula, sonra büyüt.
5. Az ama kusursuz. Bölüm sayısı Bölüm 5'te sabit. Süs amaçlı yeni bölüm, animasyon veya dekoratif öğe eklenmez.
6. Önce planla, sonra kodla. Ajan işe başlamadan önce bu dokümanı kendi cümleleriyle özetleyen bir plan yazar; her bölümü bitirince 390px ve 1440px ekran görüntüsü alıp Bölüm 12'deki kontrol listesiyle kendini denetler.
7. Alkol uyumluluğu görünür olmalı: 18+ ibaresi ve "sorumlu içiş" notu footer'da ve hero altında bulunur. Alkol tüketmeyi teşvik eden ("daha fazla iç", "sarhoş ol") dil kullanılmaz.
Ürün özeti (ajanın bilmesi gereken): Beer Together, arkadaşların gerçek hayatta buluşmasını planlayan bir mobil uygulamadır: davet oluştur, mekan seç, WhatsApp'tan paylaş, buluş, fotoğrafla kanıtla, timeline'da paylaş. Mesajlaşma yoktur, yabancılarla eşleştirme yoktur, ücretsizdir. Hedef kitle 21-40 yaş şehirli arkadaş grupları.
2. Renk & Tasarım Token'ları
Karakter: sıcak, olgun, premium — "zanaat bira" sıcaklığı ama kurumsal sadelik. Zemin sıcak kırık beyaz, metin koyu kahverengimsi siyah, tek vurgu rengi kehribar. Tek vurgu rengi kuralı: sayfada kehribar dışında hiçbir doygun renk kullanılmaz (mor, mavi, pembe gradient yasak).
Aşağıdaki bloğu globals.css'e olduğu gibi koy; Tailwind theme bu değişkenlere bağlanır.
:root {
  /* Yüzeyler */
  --bg:            #FAF8F5;
  --surface:       #FFFFFF;
  --surface-2:     #F3EFE9;   /* hafif ayrışan bölümler */
  --border:        #E7E1D8;

  /* Metin */
  --ink:           #1A1612;   /* başlık + gövde */
  --ink-2:         #5C544B;   /* ikincil metin (AA ≥ 7:1 zeminde) */
  --ink-3:         #8A8176;   /* yardımcı metin, sadece büyük/dekoratif */

  /* Vurgu: kehribar */
  --accent:        #E8A33D;   /* buton dolgusu, vurgular */
  --accent-hover:  #D8922A;
  --accent-ink:    #1A1612;   /* kehribar üstündeki metin (≈8:1) */
  --accent-text:   #8F5A0F;   /* kehribar renkli METİN/link (≈5.4:1) */
  --accent-soft:   #FBEBD0;   /* rozet/arka plan tonu */

  /* Koyu yüzey (CTA bandı, footer) */
  --dark-bg:       #14110E;
  --dark-surface:  #1F1B16;
  --dark-ink:      #F5F1EA;
  --dark-ink-2:    #B8AFA2;

  /* Durum */
  --success:       #2E7D4F;
  --focus-ring:    #1A1612;

  /* Şekil */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 20px;
  --radius-xl: 28px;
  --radius-pill: 999px;

  /* Gölge (yumuşak, çok katmanlı; asla siyah ağır gölge değil) */
  --shadow-sm: 0 1px 2px rgba(26,22,18,.06);
  --shadow-md: 0 1px 2px rgba(26,22,18,.05), 0 8px 24px -12px rgba(26,22,18,.18);
  --shadow-lg: 0 2px 4px rgba(26,22,18,.05), 0 24px 48px -20px rgba(26,22,18,.28);
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --bg: #0F0D0B; --surface: #1A1713; --surface-2: #221E19;
    --border: #2E2822;
    --ink: #F5F1EA; --ink-2: #B8AFA2; --ink-3: #8A8176;
    --accent-text: #F0B65A; --accent-soft: #3A2B12;
    --focus-ring: #F5F1EA;
  }
}
Kullanım kuralları:
• Birincil buton: --accent dolgu + --ink metin. İkincil: --surface dolgu + --border çerçeve. Kehribar metin olarak sadece --accent-text ile.
• Her metin/zemin çifti WCAG AA (normal metin ≥ 4.5:1) sağlamalıdır; ajan yeni bir çift eklerse kontrastı doğrular. Hesaplamalar yaklaşıktır, yayından önce bir kontrast aracıyla teyit edilir.
• Gradient yalnızca hero arkasındaki tek bir çok düşük opaklıklı (≤ 12%) kehribar radyal ışıkta kullanılabilir. Başka hiçbir yerde gradient yok.
• Light ve dark tema ikisi de tam çalışır; sistem tercihine uyar, elle değiştirme anahtarı gerekmez.
3. Tipografi
Karar: Latin için Inter Tight (başlıklar) + Inter (gövde); Japonca için Noto Sans JP; Arapça için IBM Plex Sans Arabic. Hepsi next/font ile self-host edilir (display: swap, sadece gereken subset ve ağırlıklar) — harici Google Fonts isteği yok.
Rol
Boyut (fluid)
Satır yüksekliği
Ağırlık
Letter-spacing
Display (H1)
clamp(2.5rem, 1.2rem + 5.2vw, 4.75rem)
1.04
650
-0.035em
H2
clamp(1.875rem, 1.1rem + 2.8vw, 3.25rem)
1.1
650
-0.03em
H3
clamp(1.25rem, 1rem + 0.9vw, 1.625rem)
1.25
600
-0.015em
Lead
clamp(1.125rem, 1rem + 0.5vw, 1.375rem)
1.55
400
0
Gövde
1.0625rem (17px)
1.65
400
0
Küçük / etiket
0.875rem (14px)
1.5
500
0.01em
Eyebrow (bölüm üstü etiket)
0.8125rem
1.3
600
0.08em, UPPERCASE (sadece Latin)
Kurallar:
• Paragraf genişliği en fazla 65 karakter (max-width: 65ch). Başlıklar text-wrap: balance, paragraflar text-wrap: pretty.
• Sayfada en fazla iki ağırlık ailesi (650 ve 400-500) görünür; her şeyi kalın yapmak yasak.
• Arapça: letter-spacing kesinlikle 0 (negatif aralık harf bağlantısını bozar), satır yüksekliği +0.2, başlık ağırlığı 600. UPPERCASE ve eyebrow büyük harfi uygulanmaz.
• Japonca: satır yüksekliği 1.8, line-break: strict, başlıklarda negatif letter-spacing yok, ağırlık 600.
• Sayılar font-variant-numeric: tabular-nums (istatistik ve saat gösterimlerinde).
• Locale'e göre font seçimi html[lang] seçicisiyle CSS değişkeninden yapılır: html[lang="ja"] { --font-sans: var(--font-noto-jp); }, html[lang="ar"] { --font-sans: var(--font-plex-ar); }.
4. Layout, Grid & Boşluk
Sayfa 8px tabanlı bir ritimle kurulur; tüm boşluklar 4'ün katlarıdır ve --space-* token'ı olarak tanımlanır.
Token
Değer
Kullanım
--space-2
8px
ikon-metin arası
--space-4
16px
bileşen içi
--space-6
24px
kart içi padding (mobil), grid gutter
--space-8
32px
kart içi padding (masaüstü)
--space-12
48px
blok arası
--section-y
clamp(72px, 9vw, 128px)
bölümlerin üst-alt boşluğu
Container: max-width: 1200px, yan boşluk mobilde 20px, ≥768px'te 32px. Metin ağırlıklı bölümlerde iç container 720px.
Breakpoint'ler: 390 (referans mobil) · 768 (tablet) · 1024 (küçük masaüstü) · 1440 (referans masaüstü). 1440 üstünde içerik genişlemez, ortada kalır.
Grid: masaüstünde 12 kolon, gutter 24px. Hero 5/7 bölünür (metin / telefon), bento grid 6 kolonlu.
RTL için mantıksal CSS zorunludur: margin-left/right, padding-left/right, left/right, text-align: left yasak; yerine margin-inline-start/end, padding-inline, inset-inline-start, text-align: start kullanılır. <html dir> Arapçada rtl olur ve tüm yatay yerleşim kendiliğinden aynalanır. Yön bildiren ikonlar (ok, geri) RTL'de transform: scaleX(-1) ile çevrilir; logo, telefon içeriği ve rakamlar çevrilmez.
Bölüm ritmi: zemin renkleri sırayla --bg → --surface-2 → --bg şeklinde değişir; bölümler arası ayırıcı çizgi yok, ritmi zemin tonu ve boşluk kurar. Her bölümde sadece bir ana mesaj olur.
5. Sayfa Yapısı & Metinler
Ana sayfa tam 10 bölümden oluşur, bu sırayla. Aşağıdaki İngilizce metinler kaynak metindir; translations.ts anahtarları parantez içinde verilmiştir. Diğer diller bu metinlerden çevrilir (Bölüm 9).
5.1 Header (nav.*)
• Yükseklik 72px, position: sticky, zemin --bg %80 opaklık + backdrop-filter: blur(12px), alt kenarda 1px --border (sadece sayfa kaydırılınca görünür).
• Sol: logo (ikon + "Beer Together" yazısı). Orta (≥1024px): How it works · Features · Safety · FAQ — anchor link, aktif bölüm vurgulanır. Sağ: dil seçici + birincil buton Get the app.
• Mobil: logo + hamburger; menü tam ekran sheet olarak açılır, focus tuzağı ve Esc ile kapanma vardır.
5.2 Hero (hero.*)
• Düzen: masaüstünde sol 5 kolon metin, sağ 7 kolon telefon; mobilde metin üstte, telefon altta ve alt kenardan kesilmiş.
• Eyebrow: Plans, not promises
• H1: Less “we should hang out.” More cheers.
• Lead: Beer Together turns good intentions into real plans. Invite a friend, pick a spot, show up, and keep the memory.
• Butonlar: App Store ve Google Play resmi rozetleri (resmi boyut ve boşluk kurallarına uygun, yan yana). Masaüstünde yanında küçük QR kod (indirme sayfasına gider).
• Mikro metin: Free · 18+ only · No ads
• Görsel: tek bir PhoneFrame içinde "randevu oluştur" ekranı. Gerçek ekran görüntüsü gelene kadar HTML/CSS ile çizilmiş temiz bir arayüz kullanılır; bira bardağı fotoğrafı, clipart, stok görsel yok. Telefonun arkasında tek, çok hafif kehribar radyal ışık.
5.3 Nasıl çalışır (how.*)
• Eyebrow How it works, H2 Three steps from “we should” to “we did.”
• Üç adım, masaüstünde yatay, mobilde dikey; her adımda büyük numara (01, 02, 03), başlık, 1-2 cümle ve altında küçük bir arayüz parçası (UI snippet).
    ◦ Plan — Pick a friend, a place and a time. Send the invite in the app or on WhatsApp.
    ◦ Meet — We remind you an hour before. Check in when you arrive.
    ◦ Remember — Snap a photo as proof and add it to your timeline.
5.4 Özellikler / Bento (features.*)
• H2 Everything you need. Nothing you don’t. Altı kart, bento düzeni: ilk kart 2 kolon genişliğinde büyük, diğerleri 1 kolon. Hepsi aynı boyutta 6 kart yan yana yasak.
    1. Invite in one tap (büyük) — Share a link on WhatsApp. It opens the app, or the download page if they don’t have it yet.
    2. Smart reminders — A nudge an hour before, so plans don’t die in the group chat.
    3. Photo check-in — Prove you actually showed up.
    4. Venues near you — Find bars and pubs around you, powered by open data.
    5. You decide who sees it — Keep it private, or make it public.
    6. Friends’ timeline — Relive every night out in one place.
• Her kartta ikon (Lucide, 1.5 stroke, 24px) ve altında küçük bir arayüz görseli bulunur; ikonlar tek stilde.
5.5 Paylaşılabilir anlar (public.*)
• Sol metin, sağ EventCard önizlemesi. H2 Your night, shareable.
• Metin: Make a meetup public and it gets its own page — easy to share and easy to find. Keep it private and it never leaves your circle.
• EventCard örneği: mekan adı, tarih-saat, katılımcı avatarları, kanıt fotoğrafı yeri. Örnek veri açıkça "örnek" olarak işaretlenir (gerçek kişi adı/foto kullanılmaz).
5.6 Güven & gizlilik (trust.*) — id="safety"
• Koyu olmayan, --surface-2 zeminde üç sütun.
    ◦ 18+ only — Beer Together is for adults. We verify your age at sign-up.
    ◦ Location only when you choose — Live location is off by default and only works during your meetup.
    ◦ Your photos, your call — Delete a photo or your whole account any time.
• Altında ince satır: Please drink responsibly.
5.7 Diller (langs.*)
• Tek satırlık şerit: Available in + altı dilin kendi adıyla yazılmış rozetleri (Türkçe, English, Español, 日本語, العربية, Italiano). Tıklanınca o dile geçer.
5.8 SSS (faq.*) — id="faq"
• Native <details>/<summary> tabanlı accordion; tek seferde bir tanesi açık. Altı-yedi soru:
    1. Is Beer Together free? — Yes. No ads, no paid tiers at launch.
    2. Do I need WhatsApp? — No. WhatsApp is just the quickest way to send an invite link.
    3. Is there a chat? — No. We hand off to WhatsApp in one tap, so you keep using the app you already use.
    4. Who can see my photos? — Only people you invite, unless you make a meetup public.
    5. How does location work? — Only during a meetup, only if you turn it on.
    6. Do I have to drink beer? — (Ürün kararı bekliyor: marka konumlandırması netleşince bu cevap güncellenir; o zamana kadar bu soru eklenmez.)
• Sayfa FAQPage JSON-LD üretir (Bölüm 10).
5.9 Son CTA bandı (cta.*)
• --dark-bg zemin, büyük yuvarlatılmış kart (radius-xl). H2 Your next round is one invite away. Alt satır Download Beer Together — it’s free. Store rozetleri.
5.10 Footer (footer.*)
• --dark-bg zemin, dört sütun: Product (How it works, Features, FAQ) · Company (About, Contact) · Legal (Privacy, Terms, Cookies, Delete my account) · Language (dil seçici).
• Alt satır: © 2026 Beer Together · 18+ only · Please drink responsibly. (yıl dinamik)
Çerez bildirimi: Sadece zorunlu çerez kullanılıyorsa banner gösterilmez. Analitik eklenirse küçük, hero'yu kapatmayan bir alt bildirim kullanılır.
6. Ek Sayfalar: Davet ve Public Etkinlik
İki sayfa büyüme mekaniğinin kalbidir; ana sayfa kadar özenle tasarlanır, ama çok daha sade olur.
6.1 Davet sayfası /[locale]/i/[token]
WhatsApp'tan linke tıklayan ve uygulaması olmayan kişinin gördüğü sayfa. Tek ekran, tek amaç: uygulamayı indirtmek.
• Üstte küçük logo, ortada kart: davet edenin adı, mekan adı, tarih-saat. Başlık: “{name} invited you for a beer.”
• Büyük birincil buton: platforma göre App Store ya da Google Play (cihaz algılanır; masaüstünde iki rozet + QR).
• Altında ikincil bağlantı: Already have the app? Open it (Universal/App Link ile uygulamayı açar).
• Süresi dolmuş/geçersiz token: sakin bir boş durum — This invite is no longer available. + ana sayfaya link. Hata sayfası gibi görünmez.
• noindex: davet sayfaları arama motoruna açılmaz.
• Sayfada kişisel veri sadece davet eden adı ve mekan/zaman bilgisidir; telefon numarası, e-posta, tam adres gösterilmez.
6.2 Public etkinlik sayfası /[locale]/e/[slug]
Sadece "public" işaretlenmiş ve tamamlanmış buluşmalar. Google'da çıkacak sayfa budur.
• Düzen: sol/üstte kanıt fotoğrafı (en-boy 4:3, next/image, AVIF, blur placeholder), yanında başlık, mekan, tarih, katılımcı avatarları (en fazla 5 + "+N").
• Altında Plan your own with Beer Together bloğu ve store rozetleri.
• schema.org/Event JSON-LD, her dil için hreflang, kanonik URL, OG görseli (Bölüm 10).
• Kullanıcı etkinliği private'a çevirirse sayfa 404/410 döner ve sitemap'ten düşer.
• Kullanıcı üretimi içerik (isim, mekan adı) çevrilmez; sadece arayüz etiketleri çevrilir.
7. Bileşen Kütüphanesi
Davranışlı bileşenler (accordion, dialog, dropdown, menü) Radix UI primitives ile kurulur ve token'larla stillenir; hazır bir UI kitinin varsayılan görünümü (örn. shadcn varsayılanı) olduğu gibi kullanılmaz. İkonlar yalnızca Lucide (1.5px stroke, 20 veya 24px). Emoji ikon olarak kullanılmaz.
Bileşen
Spesifikasyon
Button
Yükseklik 44px (küçük) / 52px (büyük), radius-md, yatay padding 20-28px, ağırlık 600. Varyantlar: primary (accent dolgu, ink metin), secondary (surface + border), ghost. Hover: bir ton koyu + translateY(-1px). Active: translateY(0). Disabled: %45 opaklık.
Focus durumu
Tüm etkileşimli öğelerde outline: 2px solid var(--focus-ring); outline-offset: 3px. Focus asla gizlenmez.
Card
--surface zemin, 1px --border, radius-lg, padding 24px (mobil) / 32px (masaüstü), --shadow-md. Hover (sadece tıklanabilir kartlarda): gölge --shadow-lg, 250ms.
Badge
Pill, accent-soft zemin, accent-text metin, 13px, ağırlık 600, dikey padding 4px.
StoreBadge
App Store ve Google Play resmi rozet dosyaları, yerel dil varyantıyla. Yükseklik 48px, rozetler arası 12px, resmi boşluk kurallarına uyulur; yeniden çizilmez, renkleri değiştirilmez.
PhoneFrame
Sadece CSS ile çizilen cihaz çerçevesi: radius-xl, 10px koyu kenarlık, üstte dinamik ada, --shadow-lg. İçinde next/image ile ekran görüntüsü veya HTML arayüz. Ağır PNG çerçeve görseli kullanılmaz.
EventCard
Public etkinlik önizlemesi: kapak foto, başlık, mekan, tarih-saat, avatar yığını. Aynı bileşen ana sayfada ve /e/[slug] sayfasında kullanılır.
Accordion
<details> semantiği, ikon (chevron) 200ms döner, içerik yüksekliği animasyonu grid-template-rows hilesiyle. Açık öğe kenarlığı accent.
LanguageSwitcher
Buton + menü; seçenekler kendi dillerinde yazılır, güncel dil işaretli. Seçim yol segmentini değiştirir (/ja/...), ?lang= kullanılmaz. Bayrak emojisi kullanılmaz (dil ≠ ülke).
Eyebrow
Bölüm başlığı üstü küçük etiket, accent-text, Latin'de büyük harf.
Görsel dil: köşeler tutarlı yuvarlak (8/12/20/28), çizgi kalınlıkları 1px, gölgeler yumuşak. Bir bölümde en fazla bir görsel vurgu (büyük telefon, büyük kart ya da büyük sayı) olur.
8. Hareket & Etkileşim
Hareket bilgi verir, süs olmaz. Sadece transform ve opacity animasyonlanır; width, height, top, left animasyonlanmaz.
Token
Değer
Kullanım
--dur-fast
150ms
hover, focus, buton
--dur-base
250ms
kart, accordion, menü
--dur-slow
500ms
bölüm girişi
--ease-out
cubic-bezier(.2, .8, .2, 1)
tüm çıkış hareketleri
• Bölüm girişi: her bölüm görünür alana girince bir kez, 12px aşağıdan yukarı + opaklık 0→1 (500ms). Aynı grup içindeki öğeler 60ms aralıkla sırayla gelir. Tekrar tetiklenmez. Tetikleme IntersectionObserver ile; JS kapalıysa içerik zaten görünür olmalıdır (içerik varsayılan görünür, animasyon üzerine eklenir).
• Hero telefonu: yüklemede bir kez hafif yükselerek belirir; sonsuz "havada süzülme" döngüsü yok.
• prefers-reduced-motion: reduce: tüm giriş animasyonları kapanır, geçişler anlıktır. Bu kural test edilir.
• Yasaklar: parallax, otomatik dönen carousel, kayan arka planlar, animasyonlu gradient, imleci takip eden efektler, sayfa yüklenirken tam ekran spinner, otomatik oynayan ses/video.
• Header: kaydırınca yalnızca alt çizgi ve blur belirir; yükseklik değişmez (layout kayması yaratmaz).
9. i18n, RTL & Erişilebilirlik
Diller: tr, en, es, ja, ar, it. Varsayılan ve yedek dil en. Yönlendirme path tabanlıdır (/tr/, /en/ …); kök / adresi Accept-Language başlığına göre uygun dile yönlendirir. Kütüphane: next-intl.
Metin yapısı: translations.ts bir barrel dosyasıdır; her dil kendi dosyasında (locales/tr.ts …) tutulur ve en dosyasından türeyen TypeScript tipine uymak zorundadır. Bir anahtar eksikse derleme hata verir (sessizce İngilizceye düşmez).
Metin uzunluğu: İspanyolca ve İtalyanca İngilizceden yaklaşık %25 uzundur. Düğmeler ve kartlar sabit genişlik varsaymaz, min-width + padding ile genişler; başlıklar 3 satıra taşsa bile bozulmaz. Tasarım her dilde 390px'te kontrol edilir.
RTL (Arapça):
• <html lang="ar" dir="rtl">; Bölüm 4'teki mantıksal CSS sayesinde layout kendiliğinden aynalanır.
• Aynalanan: yerleşim, ok/chevron ikonları, accordion ikonu, form hizası. Aynalanmayan: logo, saat/rakam, telefon ekran görüntüsü içeriği, store rozetleri.
• Arapça ekran görüntüleri ayrı dosyalardır (uygulama arayüzü de aynalanmıştır).
Erişilebilirlik (WCAG 2.2 AA):
• Sayfa başında "İçeriğe geç" (skip link). Tek <h1>, başlık hiyerarşisi atlamaz. Landmark'lar: header, nav, main, footer.
• Tüm dokunma hedefleri ≥ 44×44px. Odak halkası her zaman görünür. Klavye ile tüm sayfa ve menü gezilebilir.
• Görsellerde anlamlı alt; süs görselleri alt="". Telefon içindeki arayüz metni ekran okuyucudan gizlenir ve yerine kısa bir açıklama verilir.
• Renk tek başına anlam taşımaz. lang özniteliği her dil değişiminde doğru ayarlanır.
• axe taramasında sıfır kritik/ciddi ihlal şarttır.
10. SEO, Performans & Teknik Yığın
Yığın: Next.js (App Router) + TypeScript (strict) + Tailwind CSS (token'lara bağlı) + Radix UI + next-intl + next/font + next/image. Ana sayfa ve /e/[slug] statik üretilir (SSG/ISR); /i/[token] dinamik, noindex.
Performans bütçesi (mobil, 4G, Lighthouse):
Metrik
Hedef
Performance / Accessibility / Best Practices / SEO
her biri ≥ 95
LCP
< 2.0 sn
CLS
< 0.05
INP
< 200 ms
İlk yükte JS
< 120 KB (gzip)
• Hero görseli priority ile yüklenir, diğer görseller lazy. Tüm görseller AVIF/WebP, boyutları belirtilmiş (CLS yok). Üçüncü taraf script (analitik hariç) yok; analitik defer.
• Fontlar self-host, preload sadece Latin kritik ağırlıklar.
SEO (her locale için ayrı):
• generateMetadata ile dil başına title (≤ 60 karakter), description (≤ 155), kanonik URL, og:* ve twitter:* etiketleri. OG görseli dil başına dinamik üretilir (1200×630).
• hreflang alternates: tüm 6 dil + x-default (= en). sitemap.xml her dil için URL içerir; robots.txt davet sayfalarını engeller.
• JSON-LD: ana sayfada Organization + MobileApplication (kategori: Social Networking, contentRating 18+) + FAQPage; /e/[slug] sayfasında Event.
• iOS için <meta name="apple-itunes-app"> (Smart App Banner). Universal Links / App Links için /.well-known/apple-app-site-association ve /.well-known/assetlinks.json servis edilir.
• Semantik HTML: bölümler <section aria-labelledby>, FAQ <details>; metin görselin içine gömülmez.
11. Yasaklar (AI Tasarım Klişeleri)
Bunlar, otomatik üretilen sayfaları "ucuz" gösteren kalıplardır. Hiçbiri sayfada bulunmaz; ajan bitirmeden önce listeyi tek tek tarar.
• Mor/mavi/pembe gradient arka planlar, neon parıltılar, gradient metin (başlıkta bile).
• Her yerde cam efekti (glassmorphism); blur sadece header'da.
• Emoji ikon (🍺, 🎉, ✨) ya da bira bardağı clipart'ı, stok bira fotoğrafı.
• Aynı boyutta, ikon+başlık+iki satır metinli 3 veya 6 eşit kart sırası (bento düzeni zorunlu).
• Sahte yorum, sahte "10.000+ kullanıcı", sahte logo şeridi, sahte basın alıntısı, 5 yıldız puanı.
• Lorem ipsum veya "Your text here" tipi yer tutucu metin.
• Hero'da yalnızca ortalanmış başlık + gradient + tek buton; her bölümün ortalanmış olması.
• Otomatik dönen carousel, parallax, ekranda sürekli süzülen şekiller, "blob" arka planlar.
• Ağır, çok katmanlı siyah gölgeler, 2px üstü kalın çerçeveler, her şeyin aşırı yuvarlak olması.
• Metnin görsel içine gömülmesi, düşük kontrastlı gri üstü gri metin.
• Sabit left/right/margin-left gibi yönlü CSS; sabit piksel değerleri; token dışı renkler.
• Bileşen içinde sabit İngilizce metin.
• Çerez/pop-up'ın hero'yu kapatması, sayfa açılışında modal.
• Sayfaya katkısı olmayan "Coming soon", "Subscribe to newsletter" blokları.
• Alkolü yücelten ya da aşırı tüketimi öven dil; reşit olmayanlara hitap eden görsel/dil.
12. Kabul Kriterleri & Ajan Promptu
Teslim kontrol listesi. Ajan her maddeyi kanıtıyla (ekran görüntüsü veya komut çıktısı) işaretlemeden iş bitmiş sayılmaz.
[ ] 390, 768, 1024 ve 1440px'te ekran görüntüsü alındı; yatay kaydırma yok, taşan metin yok.
[ ] ar locale'inde layout aynalandı; ok ikonları döndü, rakamlar ve logo döndürülmedi.
[ ] Altı dilde sayfa açılıyor; hiçbir bileşende sabit metin kalmadı (grep ile doğrulandı).
[ ] Token dışı hex rengi ve sabit px yok (grep ile doğrulandı).
[ ] Light ve dark tema ikisi de kontrast AA sağlıyor.
[ ] Lighthouse mobil: Performance, Accessibility, Best Practices, SEO ≥ 95.
[ ] axe taramasında kritik/ciddi ihlal yok; tüm sayfa klavye ile gezilebiliyor.
[ ] prefers-reduced-motion açıkken animasyon yok.
[ ] hreflang, kanonik URL, JSON-LD (Organization, MobileApplication, FAQPage) doğrulandı.
[ ] Bölüm 11'deki yasak listesi tek tek tarandı, hiçbiri yok.
[ ] Sayfada sahte veri, sahte yorum, yer tutucu metin yok.
[ ] 18+ ibaresi ve sorumlu içiş notu hero altında ve footer'da görünüyor.
Ajana yapıştırılacak başlangıç promptu:
Sen kıdemli bir ürün tasarımcısı + front-end mühendisisin. Ekteki "Beer Together — Landing Page Web UI Spesifikasyonu" dokümanını BAŞTAN SONA oku. Kod yazmadan önce:

1. Dokümanı kendi cümlelerinle 15 satırı geçmeyecek şekilde özetle ve hangi kuralları en kritik bulduğunu yaz.
2. Dosya/klasör planını ve bileşen listesini çıkar.

Sonra bu sırayla ilerle ve HER adımın sonunda dur, 390px ve 1440px ekran görüntüsü al, Bölüm 12 kontrol listesine göre kendini denetle, eksikleri düzeltmeden sonraki adıma geçme:

Adım 1: Token'lar (globals.css), font kurulumu, Tailwind config, translations.ts iskeleti (6 dil).
Adım 2: Temel bileşenler (Button, Card, Badge, StoreBadge, PhoneFrame, Accordion, LanguageSwitcher).
Adım 3: Header + Hero.
Adım 4: Nasıl çalışır + Özellikler (bento).
Adım 5: Paylaşılabilir anlar + Güven + Diller.
Adım 6: SSS + Son CTA + Footer.
Adım 7: /i/[token] ve /e/[slug] sayfaları.
Adım 8: SEO (metadata, hreflang, JSON-LD, sitemap), performans ve erişilebilirlik denetimi.

Kurallar: Dokümandaki token'lar dışına çıkma. Metin, istatistik, yorum, logo UYDURMA. Bölüm 11'deki yasaklardan hiçbirini kullanma. Belirsiz bir şey olursa tahmin etmeden önce bana sor. Dokümanda olmayan bölüm, animasyon ya da süs ekleme.
Açık ürün kararı: SSS'deki "Do I have to drink beer?" cevabı, markanın yalnızca bira mı yoksa her içecek buluşması mı olacağı kararına bağlı (ana mimari dokümanı, Bölüm 20). Karar verilene kadar bu soru sayfaya eklenmez.
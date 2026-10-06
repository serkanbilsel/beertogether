Beer Together — Mobil UI/UX Spesifikasyonu (Liquid Glass)
6 Eki 2026 · Hazırlayan: @SERKAN
1. Amaç & Ajan İçin Değişmez Kurallar
Bu doküman, Beer Together mobil uygulamasının (React Native + Expo, iOS öncelikli) arayüzünü Apple'ın kendi uygulamaları kalitesinde üretmek için yazıldı. Referans: iOS 26'nın Liquid Glass tasarım dili, Apple Human Interface Guidelines ve Apple Photos / Music / Wallet gibi sistem uygulamalarının sadeliği. Ajan bu dokümanı baştan sona okumadan kod yazmaz.
Uygulamanın tek cümlesi: arkadaşınla bir buluşma planla, o plan büyük, güzel, dikey bir posterle hayat bulsun, buluşunca fotoğrafla kanıtla ve timeline'ında yaşat.
Kullanıcının 3 saniyede anlaması gerekenler: (1) Alt barda ne var, (2) sağ altta yüzen kehribar düğme yeni plan başlatır, (3) timeline'daki her büyük kart gerçek bir buluşma.
Değişmez kurallar:
1. Cam sadece kontrol katmanındadır. Liquid Glass tab bar, üst bar, yüzen düğmeler ve sheet'lerde kullanılır; içerikte (kartlar, posterler, listeler) kullanılmaz. İçerik net ve zengin, kontroller içeriğin üstünde yüzen cam. (Bölüm 2)
2. Cam üstüne cam yok. Cam bir yüzeyin üstüne ikinci bir cam yüzey konmaz.
3. Sistem öncelikli. Mümkün olan her yerde native bileşen (native tab bar, native sheet, SF Symbols, sistem haptiği) kullanılır; özel çizim ancak native karşılığı yoksa.
4. Light ve Dark ikisi de birinci sınıf. Her ekran iki temada tasarlanır ve doğrulanır; sistem ayarını takip eder.
5. Token dışına çıkma. Renk, boşluk, radius, süre sadece Bölüm 4-5 ve 11'deki token'lardan gelir.
6. Metin uydurma yok. Tüm metin translations.ts'ten gelir (tr, en, es, ja, ar, it); sahte kullanıcı, sahte etkinlik, sahte istatistik yok. Geliştirme verisi açıkça __DEV__ altında ve "örnek" işaretli olur.
7. Tek el, tek başparmak. Tüm birincil eylemler ekranın alt yarısında, başparmak erişimindedir.
8. Az ekran, net hiyerarşi. Bu dokümanda tanımlanmayan ekran, sekme veya özellik eklenmez.
9. Planla, sonra kodla. Ajan önce dokümanı özetleyen bir plan yazar; her ekranı bitirince hem Light hem Dark ekran görüntüsü alıp Bölüm 13 listesiyle kendini denetler.
10. Alkol uyumluluğu: Uygulama 18+ yaş doğrulamalıdır (Bölüm 10.1); alkol tüketimini öven veya zorlayan dil/görsel kullanılmaz.
2. Liquid Glass: Nerede Kullanılır, Nerede Kullanılmaz
Apple'ın kuralı net: Liquid Glass, içeriğin üstünde yüzen kontrol ve navigasyon katmanıdır; içerik katmanında kullanılmaz (Apple HIG — Materials, metni bu aynadan okundu). Bu uygulamada sonuç şu: kartlar ve posterler net, zengin ve renkli; cam sadece onları çerçeveleyen kontroller.
Katman
Ne içerir
Malzeme
Cam katmanı (üstte, yüzer)
Tab bar, üst navigasyon düğmeleri, yüzen eylem düğmeleri (FAB), sheet'ler, menüler, segmented control, toast
Liquid Glass
İçerik katmanı (altta)
Timeline kartları, etkinlik posterleri, fotoğraflar, listeler, form alanları, arka plan
Düz renk / standart materyal (opak)
Kullanım kuralları:
• Sadece en önemli kontroller cam olur. Apple'a göre özel kontrollerde cam "idareli" kullanılır; bu uygulamada cam elemanlar: tab bar, yüzen Yeni Plan düğmesi, üst bardaki yuvarlak düğmeler, sheet'ler. Başka bir şey cam yapılmaz.
• Cam üstüne cam yok. Cam bir sheet'in içindeki düğmeler cam olmaz; dolgulu/düz düğme kullanılır.
• Renk (tint) sadece anlam için. Her ekranda tek bir tint'li eylem olur (ana CTA: kehribar). Her şeyi renklendirmek hiçbir şeyi öne çıkarmaz.
• Durağan haldeyken cam içeriği kesmez. Tab bar'ın arkasında içerik kayabilir (bu cama derinlik verir), ama ekran dururken önemli içerik (örn. kartın başlığı, CTA) cam altında kalmaz; alt boşluk (contentInset) buna göre bırakılır.
• Cam sürekli animasyonlanmaz. Pil ve ısı maliyeti vardır; sadece etkileşimde (dokunma, morph, kaydırma) hareket eder.
• Okunabilirlik önce gelir. Cam üstündeki metin label renginde, yeterli kontrastta olur. Tam renkli görsel cam üstüne konmaz; görsel üstüne cam konur, tersi değil.
• Varyant: varsayılan regular. clear sadece medya (fotoğraf/poster) üstünde yüzen kontroller için, altına hafif karartma katmanıyla birlikte.
Erişilebilirlik uyumu: Kullanıcı Saydamlığı Azalt (Reduce Transparency) açtığında cam elemanlar opak, ince çerçeveli düz yüzeylere döner; Hareketi Azalt açıkken morph animasyonları anlık olur. Bu iki durum da test edilir.
3. Uygulama: React Native / Expo ile Cam
Karar: Cam, mümkün olduğunca sistemin kendisinden gelir. Native tab bar ve sheet iOS 26'da otomatik Liquid Glass olur; özel cam gereken birkaç yer için tek bir GlassSurface bileşeni yazılır ve uygulamanın geri kalanı cam için yalnızca onu kullanır.
İhtiyaç
Araç
Not
Tab bar
Expo Router NativeTabs
Sistem çizer; iOS 26+'da tab bar arka planını sistem çizer ve backgroundColor etkisizdir. minimizeBehavior ile kaydırınca küçülür (iOS 26+).
Özel cam yüzey
expo-glass-effect (GlassView, GlassContainer)
Native UIVisualEffectView kullanır. GlassContainer yakın cam öğeleri birleştirir (morph).
Cam var mı kontrolü
isLiquidGlassAvailable()
Uygulama Liquid Glass tasarımıyla çalışıyor mu. Saydamlık azaltma için AccessibilityInfo.isReduceTransparencyEnabled().
Eski iOS fallback
expo-blur (BlurView, systemMaterial)
iOS 18-25
Sheet
Expo Router presentation: 'formSheet'
Native; sheet'e özel arka plan verilmez, sistem cam uygular
İkonlar
expo-symbols (SF Symbols)
Android'de yedek ikon seti (Lucide)
Haptik
expo-haptics
Bölüm 11
Animasyon
react-native-reanimated + react-native-gesture-handler
Spring tabanlı
Görsel
expo-image
blurhash/thumbhash placeholder, önbellek
Uzun liste
@shopify/flash-list
Timeline için
Poster dışa aktarma
react-native-view-shot + expo-sharing
Bölüm 9
Kaynaklar: Expo GlassEffect ve Expo Router Native tabs dokümanları.
Önemli — sürüm kontrolü: Native tabs'in import yolu SDK sürümüne göre değişti (expo-router/unstable-native-tabs → yeni sürümlerde expo-router/native-tabs). Ajan, projedeki Expo SDK sürümünü okur ve o sürümün dokümanındaki import yolunu ve prop adlarını kullanır; aşağıdaki kod yapıyı gösterir, birebir kopyalanacak bir şey değildir. Liquid Glass'ın görünmesi için uygulamanın iOS 26 SDK'sıyla (Xcode 26) derlenmesi gerekir.
Platform davranışı:
• iOS 26+: tam Liquid Glass (sistem + GlassView).
• iOS 18-25: BlurView ile ince çerçeveli yarı saydam yüzey; hareket ve yerleşim aynı kalır.
• Android: cam taklit edilmez. Material 3 mantığında opak/hafif saydam yüzey, aynı yerleşim ve aynı token'lar. Ekran görüntüsü iOS ile aynı hissi vermeli, aynı efekti değil.
Tek cam bileşeni (yapı örneği):
// components/ui/GlassSurface.tsx
import { useEffect, useState } from 'react';
import { AccessibilityInfo, Platform, StyleSheet, View, useColorScheme } from 'react-native';
import { BlurView } from 'expo-blur';
import { GlassView, isLiquidGlassAvailable } from 'expo-glass-effect';
import { tokens } from '@/theme/tokens';

type Props = {
  variant?: 'regular' | 'clear';
  tint?: string;            // sadece ana CTA için
  interactive?: boolean;
  radius?: number;
  children?: React.ReactNode;
  style?: object;
};

export function GlassSurface({ variant = 'regular', tint, interactive, radius = 24, children, style }: Props) {
  const scheme = useColorScheme() ?? 'light';
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    AccessibilityInfo.isReduceTransparencyEnabled().then(setReduce);
    const sub = AccessibilityInfo.addEventListener('reduceTransparencyChanged', setReduce);
    return () => sub.remove();
  }, []);

  const shape = { borderRadius: radius, borderCurve: 'continuous' as const, overflow: 'hidden' as const };

  if (Platform.OS === 'ios' && isLiquidGlassAvailable() && !reduce) {
    return (
      <GlassView glassEffectStyle={variant} tintColor={tint} isInteractive={interactive} style={[shape, style]}>
        {children}
      </GlassView>
    );
  }
  if (Platform.OS === 'ios' && !reduce) {
    return (
      <BlurView intensity={60} tint={scheme === 'dark' ? 'systemMaterialDark' : 'systemMaterialLight'}
               style={[shape, styles.hairline(scheme), style]}>
        {children}
      </BlurView>
    );
  }
  // Android + Saydamlığı Azalt: opak yüzey
  return <View style={[shape, { backgroundColor: tokens[scheme].glassFallback }, styles.hairline(scheme), style]}>{children}</View>;
}

const styles = {
  hairline: (s: 'light' | 'dark') => ({ borderWidth: StyleSheet.hairlineWidth, borderColor: tokens[s].separator }),
};
Prop adları (glassEffectStyle, tintColor, isInteractive) kurulu expo-glass-effect sürümünün dokümanından doğrulanır. Şekiller her yerde continuous (squircle) köşe kullanır (borderCurve: 'continuous').
4. Renk & Light/Dark Tema
Kimlik: web sitesiyle aynı — sıcak kırık beyaz zemin, koyu kahverengimsi mürekkep, tek vurgu rengi kehribar. Cam, arkasındaki içeriğin renklerini taşıdığı için uygulamanın "rengi" büyük ölçüde posterlerden ve fotoğraflardan gelir; arayüz sakin kalır.
// theme/tokens.ts
export const tokens = {
  light: {
    bg: '#FAF8F5', surface: '#FFFFFF', surface2: '#F3EFE9',
    label: '#1A1612', label2: '#5C544B', label3: '#8A8176',
    separator: 'rgba(26,22,18,0.12)',
    accent: '#E8A33D', accentInk: '#1A1612',     // kehribar dolgu + üstündeki metin
    accentText: '#8F5A0F',                       // kehribar renkli METİN/link
    accentSoft: '#FBEBD0',
    danger: '#D6453D', success: '#2E7D4F',
    glassFallback: 'rgba(250,248,245,0.94)',     // cam yokken opak yüzey
    scrim: 'rgba(0,0,0,0.28)',                   // medya üstü karartma
  },
  dark: {
    bg: '#0F0D0B', surface: '#1A1713', surface2: '#221E19',
    label: '#F5F1EA', label2: '#B8AFA2', label3: '#8A8176',
    separator: 'rgba(245,241,234,0.14)',
    accent: '#F0B65A', accentInk: '#1A1612',
    accentText: '#F0B65A',
    accentSoft: '#3A2B12',
    danger: '#FF6B61', success: '#4CC38A',
    glassFallback: 'rgba(26,23,19,0.94)',
    scrim: 'rgba(0,0,0,0.45)',
  },
} as const;
Kurallar:
• Tema sistem ayarını takip eder (userInterfaceStyle: "automatic"); uygulama içinde ayrı bir tema anahtarı yoktur (Ayarlar'da sistem temasına bağlı olduğu yazar).
• Dark mode, light'ın tersi değildir. Zemin saf siyah değil sıcak koyu (#0F0D0B); yükselen yüzeyler daha açık olur (bg → surface → surface2). Dark'ta gölge yerine yüzey tonu ve ince çerçeve ile derinlik kurulur.
• Kehribar metin olarak sadece accentText ile kullanılır. Kehribar dolgunun üzerindeki metin her iki temada accentInk.
• Birincil eylem: kehribar dolgulu, accentInk metinli düğme. Ekranda aynı anda en fazla bir kehribar dolgulu düğme görünür.
• Her metin/zemin çifti WCAG AA (≥ 4.5:1; büyük metin ≥ 3:1) sağlar. Cam üstü metinler her zaman label rengindedir; ajan cam üstünde label3 kullanmaz.
• Medya (poster/foto) üstündeki metin ve düğmeler, altına scrim katmanı konarak okunabilir tutulur; beyaz metin için kontrast poster üzerinde de doğrulanır.
• Durum renkleri (danger, success) yalnızca anlam taşıyan yerlerde (hata, onay) kullanılır, dekoratif değil.
5. Tipografi, Boşluk & Şekil
Yazı tipi: arayüz metni iOS'ta sistem fontu (SF Pro), Android'de sistem fontudur — fontFamily verilmez. Japonca ve Arapça de sistem fontlarıyla çalışır. Tek istisna poster başlıkları: paylaşılan görsel her cihazda aynı görünsün diye Inter Tight (800) paketlenir; JA/AR başlıklarda sistem fontuna düşer.
Tip ölçeği (iOS metin stilleriyle uyumlu; hepsi Dynamic Type ile ölçeklenir):
Stil
Boyut / satır
Ağırlık
Kullanım
largeTitle
34 / 41
700
Ekran başlığı (Timeline)
title1
28 / 34
700
Poster altı başlık, boş durum başlığı
title2
22 / 28
600
Bölüm başlığı, sheet başlığı
title3
20 / 25
600
Kart başlığı
headline
17 / 22
600
Liste satırı başlığı, düğme
body
17 / 22
400
Gövde
callout
16 / 21
400
Açıklamalar
subheadline
15 / 20
400
İkincil metin, meta
footnote
13 / 18
400
Tarih, küçük bilgi
caption
12 / 16
500
Rozet, etiket
• Dinamik yazı boyutu kapatılmaz. Düzen accessibility boyutlarında bozulmamalı: metinler satır atlar, sabit yükseklik kullanılmaz; poster üstü metin maxFontSizeMultiplier={1.3} ile sınırlanır (poster kompozisyonu bozulmasın diye, sadece orada).
• Sayılar ve saat tabular-nums (fontVariant: ['tabular-nums']).
• Arapçada negatif letter-spacing yok; Japoncada satır yüksekliği +%10.
Boşluk (4pt tabanlı): 4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 56. Ekran yatay kenar boşluğu 20 (≤ 375pt genişlikte 16). Kart içi padding 16-20. Bölümler arası 32. Dokunma hedefi en az 44×44pt.
Şekil: köşeler her yerde borderCurve: 'continuous' (squircle).
Token
Değer
Kullanım
radius.sm
10
rozet, küçük girdi
radius.md
16
düğme, form alanı
radius.lg
24
kart, sheet içi bloklar
radius.xl
32
poster, büyük timeline kartı
radius.full
999
tab bar, yüzen düğme, avatar
Eşmerkezli köşe kuralı: iç şeklin radius'u = dış radius − aradaki boşluk (örn. 32'lik kartın içinde 8 boşlukla duran görsel 24). Bu, Liquid Glass'ın karakteristik uyumunu verir.
Gölge: Light'ta içerik kartlarında tek, yumuşak gölge (y: 8, blur: 24, opacity: 0.10); Dark'ta gölge yok, ince separator çerçevesi var. Cam elemanlara elle gölge eklenmez (sistem halleder).
6. Navigasyon & Ekran Haritası
Yapı: dört sekmeli native tab bar + her sekmede stack navigasyonu. Yeni plan başlatmak bir sekme değil bir eylemdir; Apple'ın tab bar kuralına uygun olarak tab bar'ın üstünde, sağ altta yüzen kehribar cam düğmeyle (+ Yeni Plan) yapılır. Kaydırırken düğme sadece ikona küçülür, yukarı kaydırınca geri açılır. Hamburger menü, drawer ve ekranın ortasındaki özel "+" düğmesi yoktur.
Sekme
SF Symbol
Ne gösterir
Timeline
rectangle.stack
Arkadaşlarının ve senin tamamlanmış buluşmaların büyük dikey kartları
Planlar
calendar
Yaklaşan planlar, bekleyen davetler, geçmiş planlar
Arkadaşlar
person.2
Arkadaş listesi, arkadaş ekleme, rehberden bulma
Profil
person.crop.circle
Kendi timeline'ın, ayarlar
Ekran envanteri:
Ekran
Rota
Sunum
Not
Karşılama + yaş doğrulama + giriş
/(onboarding)
Tam ekran, sekmesiz
Bölüm 10.1
Timeline
/(tabs)/index
Sekme kökü
Bölüm 7
Planlar
/(tabs)/plans
Sekme kökü
Yaklaşan / Davetler / Geçmiş segmentleri
Arkadaşlar
/(tabs)/friends
Sekme kökü

Profil
/(tabs)/profile
Sekme kökü

Yeni plan akışı
/create
Tam ekran modal, aşağı çekerek kapanır (değişiklik varsa onay)
Bölüm 8
Plan oluştu (poster)
/event/[id]/created
Modal akışın devamı
Bölüm 9
Etkinlik detay
/event/[id]
Stack push, kaydırarak geri
Bölüm 10.2
Check-in & kanıt
/event/[id]/checkin
Tam ekran modal
Bölüm 10.3
Davet cevabı
/invite/[token]
Deep link ile açılır
Bölüm 10.4
Mekan seç
(sheet)
formSheet, orta + büyük detent
Bölüm 8
Ayarlar
/settings
Stack push (Profil'den)
Dil, bildirimler, hesabı sil
Kurallar:
• Üst bar büyük başlık (large title) kullanır ve kaydırınca küçülür (native). Üst bardaki eylemler yuvarlak cam düğmelerdir (bildirim, ayarlar).
• Geri hareketi her stack ekranında çalışır (soldan kaydırma; RTL'de sağdan).
• Sekme değiştirince her sekme kendi kaydırma konumunu korur. Aktif sekmeye tekrar dokununca listenin başına gider.
• Derin bağlantılar (davet linki, bildirim) doğru ekrana, doğru sekme geçmişiyle açılır; geri tuşu kullanıcıyı sekme köküne götürür.
• Boş sekme ekranı asla boş kalmaz: her birinde tek cümle + tek eylem içeren bir boş durum vardır (örn. Timeline: Henüz buluşma yok. İlk planını yap. + Yeni Plan).
7. Timeline Ekranı
Fikir: timeline, zaman sırasıyla akan büyük dikey kartlardır. Her kart bir buluşmanın poster ya da fotoğraf hâlidir. Ekranda aynı anda neredeyse tek kart görünür; kullanıcı kaydırdıkça "bir albüm sayfalıyor" hissi alır. Kalabalık liste, küçük küçük kare görseller ve gri satırlar yoktur.
┌─────────────────────────────┐
│ Timeline          (bildirim)│  large title + yuvarlak cam düğme
│ [ Arkadaşlar | Ben ]        │  segmented control (native)
│ EKİM 2026                   │  yapışan ay başlığı
│ Cmt, 3 Eki                  │  gün etiketi (footnote, label2)
│ ┌─────────────────────────┐ │
│ │                         │ │
│ │   poster / foto  4:5    │ │  radius 32, tam genişlik
│ │                         │ │
│ │ ░░░░ alt karartma ░░░░░ │ │
│ │ Hakan'la bira      (pub)│ │  title2, beyaz, en çok 2 satır
│ │ Bomonti · 21:00  ●●● +2 │ │  footnote + avatar yığını
│ └─────────────────────────┘ │
│  [cheers 12]  [paylaş]  [⋯] │  eylem satırı, kartın DIŞINDA
│                             │
│  (+ Yeni Plan)              │  yüzen cam düğme, sağ alt
│ ════ cam tab bar ═══════════│
└─────────────────────────────┘
Kart ölçüleri: genişlik = ekran − 40; yükseklik = genişlik × 1.25 (4:5 dikey); radius 32; kartlar arası 24; gün etiketi kartın 8pt üstünde. Kartın içi cam değildir (Bölüm 2): alttaki okunabilirlik için doğrusal karartma (alt %45'te 0→%55 siyah), üstünde başlık ve meta.
Kart içeriği (üstten alta):
• Sol üst: tarih/durum rozeti — opak surface zeminli kapsül (cam değil). Örn. Yarın 21:00, Tamamlandı, Fotoğraf bekleniyor.
• Sağ üst: görünürlük ikonu (globe public / lock.fill private), 20pt, beyaz.
• Alt: başlık (title2, beyaz, ≤ 2 satır), mekan · saat (footnote, beyaz %85), sağda avatar yığını (28pt, −8pt bindirme, 2pt bg renkli halka, en fazla 3 + "+N").
Eylem satırı (kartın dışında, altta): Cheers (mug.fill, çift dokunma da tetikler; sayı yanında), Paylaş (square.and.arrow.up), Daha fazla (ellipsis, native menü: Paylaş, Gizle, Şikayet et). Yorum ve mesajlaşma yoktur.
Kart durumları:
Durum
Görsel
Rozet
Dokunma
Tamamlandı
Kanıt fotoğrafı
Tamamlandı
Detay
Yaklaşan
Etkinlik posteri
Yarın 21:00 / Bugün 21:00
Detay
Fotoğraf bekleniyor (sadece katılımcıya)
Poster
Fotoğraf bekleniyor + kartın içinde Fotoğraf ekle düğmesi
Check-in akışı
Bekleyen davet (sadece davetliye)
Poster
Davet
Davet cevabı
Etkileşimler:
• Dokunma → detay; poster/foto paylaşılan öğe geçişiyle (shared element) detay ekranının hero'suna büyür.
• Uzun basma → native bağlam menüsü (Paylaş, Gizle, Şikayet et) + hafif haptik.
• Çift dokunma → Cheers (kalp yerine kupa simgesi büyüyüp söner, impactLight).
• Aşağı çekme → yenile (native RefreshControl).
• Üst segment Arkadaşlar / Ben: Arkadaşlar herkesin (arkadaşlarının ve public) buluşmaları, Ben sadece seninkiler.
• Ay başlıkları kaydırırken üstte yapışır (sticky), altına kart akarken tab bar gibi cam değil, düz bg zemin üstündedir.
Performans & yükleme:
• FlashList, sayfalama 10'ar kart (cursor). Sonraki 3 kartın görseli önceden yüklenir (expo-image prefetch).
• Görseller genişliğe göre boyutlandırılmış sürümle (en fazla 1080px) servis edilir; placeholder olarak thumbhash/blurhash. Shimmer/iskelet animasyonu yok, placeholder durağan.
• Çevrimdışıyken son yüklenen sayfa gösterilir, üstte sakin bir Çevrimdışısın şeridi.
Boş durum: poster stilinde tek bir yer tutucu kart (çizilmiş, "örnek" değil, açıkça boş durum): Henüz buluşma yok. + İlk planını yap (kehribar düğme).
8. Etkinlik Oluşturma Akışı
Hedef: 4 ekran, ortalama 20 saniye, tek elle. Her ekranda tek soru, büyük dokunma alanları ve altta sabit tek bir ana düğme. Akış tam ekran modaldir; kullanıcı istediği an kapatabilir (değişiklik varsa Planı sil / Devam et onayı).
Ortak iskelet (4 adımın hepsi):
• Üstte solda geri (chevron.backward), sağda kapat (xmark): yuvarlak cam düğmeler. Altlarında 4 segmentli ince ilerleme çubuğu (düz, accent).
• Başlık largeTitle, altında tek satır açıklama (callout, label2).
• Altta, safe area'nın üstünde sabit Devam düğmesi: tam genişlik, 56pt yükseklik, radius.full, kehribar tint'li interaktif cam. Adım geçerli olana kadar pasif (%45).
• Klavye açıldığında düğme klavyenin üstüne çıkar. Seçimlerde selection haptiği.
Adım 1 — Kiminle?
1. Üstte arama alanı, altında arkadaşlar: büyük satırlar (avatar 48pt + ad), sağda seçim dairesi. Çoklu seçim; seçilenler üstte yatay avatar şeridinde görünür.
2. Listenin sonunda Arkadaşın uygulamada değil mi? WhatsApp'tan davet et satırı (paylaşım sheet'ini açar, Bölüm 9'daki davet linkini kullanır).
3. En az 1 kişi seçilmeden Devam pasif.
Adım 2 — Nerede?
1. Üç büyük seçenek kartı (içerik, cam değil): Bir mekanda (mappin.and.ellipse), Bende (house), Onda (house.and.flag; seçili tek kişinin evi).
2. Bir mekanda seçilince Mekan seç sheet'i açılır (formSheet, orta detent → büyük detent): üstte harita önizlemesi, altında yakındaki mekanlar listesi (ad, mesafe, kategori), arama alanı, kategori çipleri (Hepsi · Bar · Pub · Kafe). Listede yoksa Mekan ekle.
3. Bende / Onda seçildiğinde adres istenmez ve saklanmaz; yalnızca isteğe bağlı kısa not (Kapı kodu 4B gibi) alanı vardır ve bu not sadece davetlilere gider.
Adım 3 — Ne zaman?
1. Üstte hızlı çipler: Bu akşam 21:00, Yarın akşam, Cumartesi akşamı (kullanıcının dilinde ve bugünün tarihine göre üretilir).
2. Altında native tarih-saat seçici (inline takvim + tekerlek saat). Geçmiş ve şu andan 30 dakika öncesi seçilemez; en fazla 90 gün ileri.
3. Seçilen zaman büyük, okunaklı tek satırda özetlenir (Cumartesi, 3 Ekim · 21:00).
Adım 4 — Poster ve gizlilik
1. Üstte canlı poster önizlemesi (Bölüm 9'daki bileşen, 4:5, ekranın ~%45'i): önceki adımlardaki seçimlerden anında oluşur.
2. Altında yatay tema seçici (6 poster teması), isteğe bağlı başlık alanı (varsayılan "{Ad}'la bira"; dilde uygun biçimde), isteğe bağlı kapak fotoğrafı seç (Fotoğraf ekle).
3. Görünürlük: iki seçenekli segmented control: Özel (varsayılan) / Herkese açık. Herkese açık seçilince tek satır açıklama çıkar: Tamamlandıktan sonra bu buluşma web'de bulunabilir olur.
4. Düğme etiketi Planı oluştur.
Oluşturma anı: düğmeye basınca success haptiği, davetler gönderilir ve ekran Plan oluştu ekranına (Bölüm 9) geçer. Ağ hatasında plan yerelde taslak olarak kalır, Tekrar dene sunulur; kullanıcı veri kaybetmez.
Kurallar: Her adımda geri gidildiğinde seçimler korunur. Hiçbir adımda 4'ten fazla birincil seçenek yan yana gösterilmez. Dokunma hedefleri 44pt altına düşmez, seçici ve çipler 8pt boşlukla ayrılır.
9. Etkinlik Posteri & "Plan Oluştu" Ekranı
Fikir: plan oluşturulduğu an, kullanıcı tek bir büyük dikey poster görür. Bu poster hem planın "gerçek olduğunu" hissettirir hem paylaşılacak görsel hem de timeline kartıdır. Poster stok fotoğraf değil, tipografiyle kurulmuş bir kompozisyondur (veri: tarih, saat, başlık, mekan, kişiler) — böylece her zaman doğru, güzel ve marka tutarlıdır. Kullanıcı isterse kapak fotoğrafı ekler.
┌─────────────────────────────┐
│ BEER TOGETHER               │  wordmark (%70 opak)
│                             │
│ 03                          │  dev tarih rakamı (genişliğin %44'ü)
│ EKİM · CUMARTESİ · 21:00    │
│                             │
│                             │
│ Hakan'la bira               │  başlık, ağır (800)
│ Bomonti, Şişli              │  mekan
│ (●)(●)  Serkan, Hakan       │  avatarlar + adlar
└─────────────────────────────┘
   4:5 dikey · radius 32 · cam YOK
Tek bileşen: EventPoster({ event, theme, width }). Boyutların hepsi width'in oranıdır; böylece aynı çizim timeline'da, "Plan oluştu" ekranında, detayda ve dışa aktarımda birebir aynı görünür.
Öğe
Oran (poster genişliği W)
İç boşluk
0.07 W
Wordmark
0.032 W
Tarih rakamı (Inter Tight 800)
0.44 W
Ay · gün · saat satırı
0.045 W, 700, harf aralığı +0.06em (Latin)
Başlık (en çok 2 satır)
0.095 W, 800
Mekan
0.045 W, 500, %85 opak
Avatar
0.075 W, 2pt halka
Uzun başlık/mekan 2 satırda biter, sonra …. Çok katılımcıda adlar kısaltılır (Serkan, Hakan +2). JA/AR'da metinler aynı oranlarla, sistem fontunda dizilir; Arapçada tüm kompozisyon aynalanır (rakam ve saat hariç).
6 poster teması (poster, uygulama temasından bağımsız bir "baskı"dır; Light/Dark'ta aynı görünür):
Tema
Zemin
Metin
Vurgu (tarih rakamı)
Amber
#E8A33D
#1A1612
#1A1612
Midnight
#101A33
#F5F1EA
#F0B65A
Forest
#16352A
#F2EFE6
#E8A33D
Brick
#8A2F22
#FBEBD0
#F0B65A
Cream
#F3E9D8
#1A1612
#B8741A
Graphite
#1F1D1B
#F5F1EA
#E8A33D
Zemin düz renktir; üstüne tek tonal radyal ışık (zeminin bir ton açığı) (sağ üst, %12 opak) eklenebilir. Başka gradient, desen, illüstrasyon, bira bardağı görseli yoktur. Varsayılan tema, etkinlik kimliğinden deterministik seçilir (Timeline'da çeşitlilik); kullanıcı Adım 4'te değiştirebilir. Kapak fotoğrafı seçilirse tam kaplayan görsel + alt karartma kullanılır, metin beyaz, tarih rakamı Amber vurgusunda olur.
"Plan oluştu" ekranı (/event/[id]/created)
┌─────────────────────────────┐
│                     (kapat) │  yuvarlak cam düğme
│   ┌─────────────────────┐   │
│   │                     │   │
│   │   EventPoster 4:5   │   │  genişlik = ekran − 48
│   │   (büyük, ortada)   │   │
│   │                     │   │
│   └─────────────────────┘   │
│   ✓ Davet gönderildi · 2    │  opak kapsül
│                             │
│ [ WhatsApp'ta paylaş ]      │  kehribar tint'li cam, 56pt
│ [ Görseli paylaş ] [Takvim] │  cam, ikincil
│          Bitti              │  düz metin düğmesi
└─────────────────────────────┘
Giriş hareketi (tek seferlik, 500ms): poster scale 0.92 → 1, translateY 24 → 0, opacity 0 → 1, spring (damping 18, stiffness 160); aynı anda success haptiği. 300ms sonra Davet gönderildi kapsülü opacity ile gelir. Konfeti, parıltı, havai fişek yok.
Poster etkileşimi: parmakla sürüklenince rotateX/rotateY en fazla ±6° eğilir ve bırakınca spring ile düzelir (Hareketi Azalt açıkken devre dışı). Uzun basma → Görseli kaydet.
Paylaşma:
1. WhatsApp'ta paylaş: native paylaşım sheet'i ya da whatsapp://send ile hazır metin + davet linki (beertogether.app/i/<token>). Metin dile uygun, nazik ve kısa: "{Ad}, seni {Tarih} {Mekan} buluşmasına davet ediyorum. {Link}".
2. Görseli paylaş: react-native-view-shot ile poster 1080×1350 (4:5) ve 1080×1920 (9:16, Story) olarak dışa aktarılır; 9:16 sürümde poster ortalanır, altına küçük marka ve (public ise) kısa link eklenir. expo-sharing ile paylaşılır / fotoğraflara kaydedilir.
3. Takvime ekle: native takvim sheet'i (başlık, mekan, başlangıç, 2 saatlik süre).
4. Sunucu aynı tema token'larıyla link önizleme görseli (OG, 1200×630) üretir; WhatsApp'ta link atılınca poster stilinde bir önizleme çıkar.
Erişilebilirlik: poster tek bir accessibilityLabel ile okunur ("Cumartesi 3 Ekim saat 21:00, Bomonti'de Hakan'la bira. Katılımcılar: Serkan, Hakan"); içindeki metin parçaları tek tek odaklanmaz.
10. Diğer Ekranlar
10.1 Onboarding & yaş doğrulama
En fazla 3 ekran, her biri tek amaçlı.
1. Karşılama: ortada, hafif eğimli ve üst üste duran 3 poster (açıkça tasarım örneği; gerçek kişi/mekan yok), başlık Planlar gerçek olsun., altta Başla.
2. Doğum tarihi (yaş kapısı): native tarih tekerleği, açıklama "Beer Together 18 yaş ve üzeri içindir; alkol içerir." 18 yaşından küçükse: sakin bir engel ekranı (Bu uygulama 18 yaş ve üzeri içindir.), geri dönüş yok; engel cihazda 24 saat tutulur ve sunucuda da doğrulanır (istemci kontrolü tek başına yeterli sayılmaz). Doğum tarihi yalnızca yaş doğrulaması için kullanılır, profilde gösterilmez.
3. Giriş: Sign in with Apple (native düğme, ilk sırada), Google, Telefon (OTP). Üçü aynı boyut ve ağırlıkta.
İzinler bağlamında istenir, açılışta değil: bildirim izni ilk plan oluşturulduktan sonra (Davet cevabını kaçırma), konum ilk mekan seçiminde (kullanım sırasında), rehber Arkadaş bul'a dokunulunca. Sistem izin penceresinden önce kısa bir açıklama sheet'i gösterilir; reddedilirse uygulama yine tam çalışır ve ilgili yerde sakin bir Ayarlar'dan aç bağlantısı çıkar.
10.2 Etkinlik detayı (/event/[id])
• Üstte tam genişlik poster/foto (4:5), paylaşılan öğe geçişiyle timeline kartından büyür; içerikle birlikte kayar. Geri ve Daha fazla düğmeleri hero üstünde yuvarlak clear cam düğmelerdir (altlarında karartma).
• Altında bilgi satırları (düz zemin, cam değil): Tarih & saat, Mekan (dokununca Apple/Google Maps), Katılımcılar (avatar + durum: Geliyor / Bekliyor / Gelemiyor), Not.
• WhatsApp'ta yaz satırı (katılımcı başına): sohbeti WhatsApp'ta açar; uygulama içinde mesajlaşma yoktur.
• Canlı konum satırı, randevu penceresinde görünür, varsayılan kapalı anahtar + tek cümle açıklama.
• Altta yüzen cam eylem çubuğu, duruma göre tek ana eylem: ev sahibi → Düzenle; bekleyen davetli → Geliyorum / Gelemem; pencere açıkken → Check-in; tamamlandı → Cheers + Paylaş.
10.3 Check-in & kanıt (/event/[id]/checkin)
• Check-in düğmesi randevudan 30 dk önce aktifleşir (öncesinde pasif ve neden yazar).
• Tam ekran kamera (expo-camera), vizör 4:5. Kontroller (deklanşör, çevir, flaş, kapat) medya üstünde yüzdüğü için clear cam; deklanşör 76pt, çevresinde ince halka. Kanıt sadece kameradan çekilir (MVP'de galeriden seçim yok).
• Çekimden sonra önizleme (4:5) + Tekrar çek / Kullan. Kullan → yükleme: dairesel ilerleme (belirli), bitince success haptiği.
• Konum yakınlığı doğrulanırsa üstte sakin bir Mekandasın kapsülü çıkar; doğrulanmazsa engellenmez, sadece kapsül görünmez.
• Tamamlanınca timeline kartındaki poster, kanıt fotoğrafına 400ms çapraz geçişle döner; poster detay ekranında Posteri gör ile hâlâ erişilebilir.
10.4 Davet cevabı (/invite/[token])
• Push veya WhatsApp linkinden açılır. Ekranın %65'i büyük poster, altında "Serkan seni davet etti", iki düğme: Geliyorum (kehribar, birincil) ve Gelemem (ikincil), altında WhatsApp'ta yaz.
• Oturum yoksa önce giriş yapılır, sonra aynı davet ekranına dönülür (derin bağlantı korunur).
• Süresi dolmuş davet: sakin boş durum, hata gibi görünmez.
10.5 Arkadaşlar, Profil, Ayarlar
• Arkadaşlar: büyük satırlar (avatar 48pt), arama, Arkadaş ekle (kullanıcı adı / rehberden / davet linki). İstekler ayrı segment.
• Profil: avatar 96pt, ad, kullanıcı adı; altında kendi buluşmaların 2 kolonlu poster/foto ızgarası (radius 24, aralık 12). Sadece gerçek sayılar (örn. 12 buluşma); sahte rozet/seviye yok.
• Ayarlar: Dil (6 dil, kendi adlarıyla), Bildirim tercihleri (davet, hatırlatma, Cheers ayrı ayrı), Varsayılan görünürlük (Özel/Herkese açık), Konum, Hesabı sil (kalıcı, açık onaylı), Çıkış, Yasal metinler.
11. Hareket, Haptik, Erişilebilirlik & Dil
Hareket
Hareket fiziksel ve kısa olur: yaylı (spring), asla yavaş doğrusal geçiş değil. Sadece transform ve opacity Reanimated ile UI thread'inde animasyonlanır.
Token
Değer
Kullanım
spring.snappy
damping 20, stiffness 260
düğme basma, seçim, çip
spring.smooth
damping 22, stiffness 180
kart, sheet içi geçiş
spring.poster
damping 18, stiffness 160
poster girişi (Bölüm 9)
dur.fade
200ms
opaklık geçişleri
dur.crossfade
400ms
poster → kanıt foto
• Dokunma geri bildirimi: basılan öğe scale 0.97'ye iner, bırakınca snappy ile döner. Cam düğmeler interactive olduğundan sistemin kendi basma efektini kullanır; üstüne ikinci bir efekt eklenmez.
• Cam morph: birbirine yakın cam öğeler (örn. üst bardaki iki yuvarlak düğme) GlassContainer ile gruplanır; sistemin morph davranışı kullanılır, elle animasyon yazılmaz.
• Geçişler: stack push/pop native; timeline → detay paylaşılan öğe geçişi; modal aşağı çekerek kapanır.
• Yasak: sürekli dönen/süzülen animasyon, sonsuz shimmer, parallax, 400ms üstü süslü giriş, her liste öğesine ayrı giriş animasyonu.
Haptik (expo-haptics)
Olay
Haptik
Seçici/çip/arkadaş seçimi
selection
Cheers (çift dokunma/düğme)
impactLight
Uzun basma menüsü açıldı
impactMedium
Plan oluşturuldu, check-in tamam, davet kabul
notificationSuccess
Hata (ağ, doğrulama)
notificationError
Kaydırma sırasında, otomatik güncellemelerde ve ardışık olarak haptik verilmez. Haptik asla tek geri bildirim değildir; görsel karşılığı da vardır.
Erişilebilirlik
• VoiceOver/TalkBack: her etkileşimli öğenin accessibilityLabel'ı ve rolü var. Timeline kartı tek öğe olarak okunur ("Cumartesi 3 Ekim, Bomonti'de Hakan'la bira, 12 Cheers, düğme"); özel eylemler (Cheers, Paylaş) accessibilityActions ile sunulur.
• Dynamic Type: tüm metin ölçeklenir; en büyük erişilebilirlik boyutunda düzen taşmaz (Bölüm 5).
• Saydamlığı Azalt / Kontrastı Artır: cam, opak ve çerçeveli yüzeye döner (Bölüm 3'teki GlassSurface). Her iki ayar ekran görüntüsüyle test edilir.
• Hareketi Azalt: spring girişler anlık/opaklığa indirilir; poster eğilmesi ve morph kapanır.
• Kalın Metin desteklenir. Renk tek başına anlam taşımaz (durumlar ikon + metinle de belirtilir). Dokunma hedefleri ≥ 44pt.
Dil & RTL
• Diller: tr, en, es, ja, ar, it. Tüm metin translations.ts'ten gelir (her dil locales/<kod>.ts; en dosyasından türeyen tip, eksik anahtar derlemeyi bozar). expo-localization cihaz dilini algılar; Ayarlar'dan değiştirilebilir. Bileşenlerde sabit metin yok.
• Tarih, saat, sayı: Intl.DateTimeFormat / Intl.NumberFormat ile locale'e göre. Hızlı tarih çipleri (Bu akşam, Yarın akşam…) çeviri anahtarıdır, elle birleştirilmez.
• Metin uzunluğu: İspanyolca/İtalyanca ~%25 uzar; düğmeler ve çipler içeriğe göre genişler, sabit genişlik yok.
• RTL (Arapça): I18nManager.allowRTL(true) ve dile göre forceRTL; yön değişimi uygulamayı yeniden yüklemeyi gerektirir (Expo'da Updates.reloadAsync()), bu yüzden dil değiştirme akışı "Uygulama yeniden başlatılıyor" geçişi gösterir. Stillerde marginLeft/Right, left/right yasak; marginStart/End, paddingStart/End, start/end kullanılır. Yön bildiren ikonlar (geri, ileri chevron) aynalanır; saat, rakam, logo, kamera ve harita aynalanmaz. Poster kompozisyonu Arapçada aynalanır.
• Her ekranın Arapça ve Japonca ekran görüntüsü, en uzun çeviriyle (İspanyolca) 390pt genişlikte de alınır.
12. Yasaklar (Mobil Tasarım Klişeleri)
Ajan bitirmeden önce bu listeyi ekran ekran tarar; hiçbiri uygulamada bulunmaz.
• Her yerde cam: kartlarda, listelerde, posterlerde, form alanlarında, sheet içindeki düğmelerde cam. Cam üstüne cam. Cam sürekli animasyonu.
• Taklit cam: iOS 26'da sistem camı varken elle çizilmiş sahte "frosted" efektler; Android'de cam taklidi.
• Tab bar'ı elle yeniden çizmek (native varken), ekranın ortasında özel "+" düğmesi, hamburger menü, drawer.
• Mor/mavi/pembe gradient, neon parıltı, gradient metin; posterlerde gradient/desen/illüstrasyon (tek tonal ışık hariç).
• Emoji ikon (🍺🎉✨), bira bardağı clipart'ı, stok bira fotoğrafı. İkonlar yalnızca SF Symbols (iOS) / tutarlı tek set (Android).
• Konfeti, havai fişek, sonsuz dönen/süzülen/titreyen animasyon, sonsuz shimmer, parallax.
• Sahte kullanıcı, sahte etkinlik, sahte istatistik, sahte rozet/seviye/puan, lorem ipsum. Geliştirme verisi __DEV__ altında ve işaretli.
• Kalabalık timeline: küçük kare görseller, 2-3 kolonlu akış, gri satır listeleri. Timeline kartı 4:5 dikey ve ekran genişliğindedir.
• Aynı ekranda birden fazla kehribar dolgulu düğme; her şeyi kehribarla boyamak.
• Token dışı renk/boşluk/radius; sabit px'e bağlı düzen; keskin (continuous olmayan) köşe.
• Sabit metin (çeviri dışı); marginLeft/Right gibi yönlü stiller; sabit genişlikli düğmeler.
• Açılışta izin yağmuru (bildirim + konum + rehber aynı anda), açılışta modal/pop-up.
• Uygulama içi mesajlaşma/DM, yorum alanı (WhatsApp'a yönlendirme vardır).
• Alkolü yücelten ya da aşırı tüketimi öven dil; reşit olmayanlara hitap eden görsel/dil. Yaş doğrulamasını atlayan yol.
13. Kabul Kriterleri & Ajan Promptu
Teslim kontrol listesi. Her madde kanıtıyla (ekran görüntüsü, kayıt veya komut çıktısı) işaretlenmeden iş bitmiş sayılmaz.
[ ] Her ekran Light ve Dark temada, iPhone SE (375pt), iPhone 15 Pro (393pt) ve Pro Max (430pt) boyutlarında ekran görüntüsüyle doğrulandı.
[ ] iOS 26'da sistem camı çalışıyor; iOS 18-25'te BlurView fallback'i, Android'de opak yüzey doğru görünüyor.
[ ] Saydamlığı Azalt, Hareketi Azalt, Kontrastı Artır ve en büyük Dynamic Type açıkken hiçbir ekran bozulmuyor.
[ ] Cam sadece Bölüm 2'deki öğelerde var; kartlarda, posterlerde, listelerde yok; cam üstüne cam yok (Bölüm 12 taraması yapıldı).
[ ] Timeline kartları 4:5, tam genişlik, radius 32; 100+ kartlık listede kaydırma akıcı (hedef 60fps, takılma yok).
[ ] EventPoster tek bileşen; timeline, "Plan oluştu", detay ve dışa aktarımda birebir aynı görünüyor; 6 tema ve kapak fotoğraflı hâl test edildi.
[ ] Plan oluşturma akışı 4 adımda tamamlanıyor, geri gidildiğinde seçimler korunuyor, ağ hatasında taslak kayboluyor değil.
[ ] "Plan oluştu" ekranında poster girişi, haptik, WhatsApp paylaşımı, 4:5 ve 9:16 görsel dışa aktarımı çalışıyor.
[ ] Yaş kapısı: 18 yaş altı engelleniyor, sunucu tarafında da doğrulanıyor.
[ ] ar (RTL) ve ja ekran görüntüleri alındı; hiçbir yönlü stil, taşan ya da sabit metin yok (grep ile doğrulandı).
[ ] Token dışı renk/boşluk yok (grep ile doğrulandı); tüm metin translations.ts'ten geliyor.
[ ] VoiceOver ile Timeline → Detay → Check-in akışı baştan sona kullanılabiliyor.
[ ] Sahte veri, sahte yorum, lorem ipsum yok; boş durumlar tasarlandı.
Önerilen yapım sırası (ajan bu sırayı izler, her adımda durup ekran görüntüsü alır ve listeyle kendini denetler):
1. Token'lar, tema, translations.ts iskeleti (6 dil), tipografi.
2. GlassSurface + native tab bar + yüzen Yeni Plan düğmesi + ekran iskeletleri.
3. EventPoster (6 tema, kapak foto, ölçek oranları) — uygulamanın kalbi; önce tek başına bir test ekranında mükemmelleştirilir.
4. Timeline (kart, durumlar, sticky ay başlıkları, Cheers, FlashList, görsel önyükleme).
5. Yeni plan akışı (4 adım) + mekan seç sheet'i.
6. "Plan oluştu" ekranı + paylaşım/dışa aktarma.
7. Etkinlik detayı, davet cevabı, check-in & kanıt.
8. Onboarding + yaş kapısı, Arkadaşlar, Profil, Ayarlar.
9. Erişilebilirlik, RTL/JA denetimi, performans, Bölüm 12 taraması.
Ajana yapıştırılacak başlangıç promptu:
Sen kıdemli bir iOS ürün tasarımcısı + React Native (Expo) mühendisisin. Ekteki "Beer Together — Mobil UI/UX Spesifikasyonu (Liquid Glass)" dokümanını BAŞTAN SONA oku. Kod yazmadan önce:

1. Dokümanı 15 satırı geçmeyecek şekilde kendi cümlelerinle özetle; en kritik 5 kuralı listele.
2. Projedeki Expo SDK sürümünü oku. expo-glass-effect ve Expo Router native tabs için O SÜRÜMÜN dokümanındaki import yollarını ve prop adlarını doğrula; farklı çıkarsa bana söyle.
3. Dosya/klasör planını ve bileşen listesini çıkar.

Sonra "Önerilen yapım sırası"nı izle. HER adımın sonunda dur; Light ve Dark ekran görüntüsü al (iOS 26 simülatörü varsa onda; yoksa bunu açıkça söyle), Bölüm 13 listesine göre kendini denetle, eksikleri düzeltmeden sonraki adıma geçme.

Değişmez kurallar: Cam SADECE kontrol katmanında (tab bar, yüzen düğmeler, üst bar düğmeleri, sheet); kartlarda/posterlerde/listelerde ASLA. Cam üstüne cam yok. Cam için yalnızca GlassSurface bileşenini kullan. Token'lar dışına çıkma. Metin, kullanıcı, etkinlik, istatistik UYDURMA; tüm metin translations.ts'ten gelsin (tr, en, es, ja, ar, it). Bölüm 12'deki yasaklardan hiçbirini kullanma. Dokümanda olmayan ekran, sekme ya da süs ekleme. Belirsiz bir şey olursa tahmin etmeden önce bana sor.
Açık ürün kararları: (1) Marka yalnızca bira mı, yoksa her içecek buluşması mı (kategori çipleri ve metinler buna göre değişir; ana mimari dokümanı Bölüm 20). (2) Kanıt fotoğrafı MVP'de yalnızca kameradan mı kalsın, galeriden seçim eklensin mi.
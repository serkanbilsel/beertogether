'use client';

import React, { useEffect, useRef, useState } from 'react';
import { TranslationType } from '@/lib/translations/en';
import {
  Layers,
  Calendar,
  Users,
  UserCircle2,
  Bell,
  Plus,
  Share2,
  MoreHorizontal,
  Beer,
  Globe,
  Settings,
  X,
  ChevronLeft,
  ChevronRight,
  Check,
  Search,
  MapPin,
  Clock,
  ShieldCheck,
  Camera,
} from 'lucide-react';

interface IPhone3DProps {
  t: TranslationType;
  theme?: 'light' | 'dark';
  locale?: string;
}

type Tab = 'timeline' | 'plans' | 'friends' | 'profile';

const phoneDict: Record<string, {
  tabTimeline: string;
  tabPlans: string;
  tabFriends: string;
  tabProfile: string;
  timelineTitle: string;
  friendsScope: string;
  meScope: string;
  tonightTag: string;
  myPlanTag: string;
  tonightTitle: string;
  myPlanTitle: string;
  locationTonight: string;
  partyLabel: string;
  myPartyLabel: string;
  friendsStream: string;
  myStream: string;
  livePlans: string;
  myActivePlans: string;
  cheersBtn: string;
  fridayTitle: string;
  fridayTime: string;
  fridayStatus: string;
  sundayTitle: string;
  sundayTime: string;
  sundayStatus: string;
  myEventTitle: string;
  myEventTime: string;
  myEventStatus: string;
  myEventSub: string;
  inviteTitle: string;
  inviteTime: string;
  inviteStatus: string;
  inviteSub: string;
  acceptBtn: string;
  declineBtn: string;
  plansTitle: string;
  segUpcoming: string;
  segInvites: string;
  segPast: string;
  friendsTitle: string;
  searchPlaceholder: string;
  planBtn: string;
  editProfile: string;
  statMeetups: string;
  statVenues: string;
  statCheers: string;
  newPlanFab: string;
  createStep1Title: string;
  createStep1Sub: string;
  createStep2Title: string;
  createStep3Title: string;
  todayOption: string;
  tomorrowOption: string;
  saturdayOption: string;
  continueBtn: string;
  sendBtn: string;
  verifiedMemory: string;
  verifiedSub: string;
}> = {
  tr: {
    tabTimeline: 'Zaman Tüneli',
    tabPlans: 'Planlar',
    tabFriends: 'Arkadaşlar',
    tabProfile: 'Profil',
    timelineTitle: 'Zaman Tüneli',
    friendsScope: 'Arkadaşlar',
    meScope: 'Ben',
    tonightTag: 'Bu Akşam · 21:00',
    myPlanTag: 'Senin Planın · 21:00',
    tonightTitle: "Hakan'la bira",
    myPlanTitle: 'Senin Cuma Buluşman',
    locationTonight: 'The Populist · Bomonti',
    partyLabel: 'Serkan, Hakan +2',
    myPartyLabel: 'Sen ve 3 Arkadaşın',
    friendsStream: 'Arkadaşlarımın Akışı',
    myStream: 'Kişisel Buluşmalarım',
    livePlans: '3 Canlı Plan',
    myActivePlans: '2 Aktif Plan',
    cheersBtn: 'Şerefe',
    fridayTitle: 'Ekiple Haftasonu',
    fridayTime: 'Cuma · 20:30',
    fridayStatus: 'Onaylandı',
    sundayTitle: 'Craft Bira Tadımı',
    sundayTime: 'Pazar · 18:00',
    sundayStatus: 'Davet',
    myEventTitle: 'The Populist Buluşman',
    myEventTime: 'Bu Akşam · 21:00',
    myEventStatus: 'Sen Başlattın',
    myEventSub: 'Hakan, Mert ve Can masada',
    inviteTitle: 'Belfast Irish Pub',
    inviteTime: 'Cumartesi · 21:30',
    inviteStatus: 'Cevap Bekliyor',
    inviteSub: 'Mert seni davet etti',
    acceptBtn: 'Katılıyorum',
    declineBtn: 'Gelemem',
    plansTitle: 'Planlar',
    segUpcoming: 'Yaklaşan',
    segInvites: 'Davetler',
    segPast: 'Geçmiş',
    friendsTitle: 'Arkadaşlar (24)',
    searchPlaceholder: 'Arkadaş veya mekan ara...',
    planBtn: 'Planla',
    editProfile: 'Profili Düzenle',
    statMeetups: 'Buluşma',
    statVenues: 'Mekan',
    statCheers: 'Şerefe',
    newPlanFab: 'Yeni Plan',
    createStep1Title: 'Kiminle buluşacaksın?',
    createStep1Sub: 'Arkadaşını seç veya davet et.',
    createStep2Title: 'Nerede buluşacaksınız?',
    createStep3Title: 'Ne zaman?',
    todayOption: 'Bu akşam 21:00',
    tomorrowOption: 'Yarın akşam 20:30',
    saturdayOption: 'Cumartesi akşamı',
    continueBtn: 'Devam Et',
    sendBtn: 'Planı Oluştur ve Gönder',
    verifiedMemory: 'Geçen Cuma Belfast Pub',
    verifiedSub: '150m GPS ile doğrulandı · 4 Pint',
  },
  en: {
    tabTimeline: 'Timeline',
    tabPlans: 'Plans',
    tabFriends: 'Friends',
    tabProfile: 'Profile',
    timelineTitle: 'Timeline',
    friendsScope: 'Friends',
    meScope: 'Me',
    tonightTag: 'Tonight · 21:00',
    myPlanTag: 'Your Plan · 21:00',
    tonightTitle: 'Beer with Hakan',
    myPlanTitle: 'Your Friday Night',
    locationTonight: 'The Populist · Bomonti',
    partyLabel: 'Serkan, Hakan +2',
    myPartyLabel: 'You + 3 Friends',
    friendsStream: 'Friends Stream',
    myStream: 'My Meetups',
    livePlans: '3 Live Plans',
    myActivePlans: '2 Active Plans',
    cheersBtn: 'Cheers',
    fridayTitle: 'Weekend Crew',
    fridayTime: 'Friday · 20:30',
    fridayStatus: 'Confirmed',
    sundayTitle: 'Craft Tasting',
    sundayTime: 'Sunday · 18:00',
    sundayStatus: 'Invite',
    myEventTitle: 'The Populist Session',
    myEventTime: 'Tonight · 21:00',
    myEventStatus: 'Created by you',
    myEventSub: 'Hakan, Mert & Can RSVP’d',
    inviteTitle: 'Belfast Irish Pub',
    inviteTime: 'Saturday · 21:30',
    inviteStatus: 'Pending',
    inviteSub: 'Mert invited you',
    acceptBtn: 'Accept',
    declineBtn: 'Decline',
    plansTitle: 'Plans',
    segUpcoming: 'Upcoming',
    segInvites: 'Invites',
    segPast: 'Past',
    friendsTitle: 'Friends (24)',
    searchPlaceholder: 'Search friends or venues...',
    planBtn: 'Plan',
    editProfile: 'Edit Profile',
    statMeetups: 'Meetups',
    statVenues: 'Venues',
    statCheers: 'Cheers',
    newPlanFab: 'New Plan',
    createStep1Title: 'Who are you meeting?',
    createStep1Sub: 'Select a friend or invite someone.',
    createStep2Title: 'Where are you meeting?',
    createStep3Title: 'When?',
    todayOption: 'Tonight 21:00',
    tomorrowOption: 'Tomorrow 20:30',
    saturdayOption: 'Saturday night',
    continueBtn: 'Continue',
    sendBtn: 'Send Plan Invite',
    verifiedMemory: 'Last Friday · Belfast Pub',
    verifiedSub: '150m GPS verified · 4 Pints',
  },
  es: {
    tabTimeline: 'Muro',
    tabPlans: 'Planes',
    tabFriends: 'Amigos',
    tabProfile: 'Perfil',
    timelineTitle: 'Muro',
    friendsScope: 'Amigos',
    meScope: 'Yo',
    tonightTag: 'Esta Noche · 21:00',
    myPlanTag: 'Tu Plan · 21:00',
    tonightTitle: 'Cerveza con Hakan',
    myPlanTitle: 'Tu Viernes Noche',
    locationTonight: 'The Populist · Bomonti',
    partyLabel: 'Serkan, Hakan +2',
    myPartyLabel: 'Tú y 3 amigos',
    friendsStream: 'Actividad de Amigos',
    myStream: 'Mis Encuentros',
    livePlans: '3 Planes Activos',
    myActivePlans: '2 Planes Activos',
    cheersBtn: 'Salud',
    fridayTitle: 'Cerveza de Fin de Semana',
    fridayTime: 'Viernes · 20:30',
    fridayStatus: 'Confirmado',
    sundayTitle: 'Cata Artesanal',
    sundayTime: 'Domingo · 18:00',
    sundayStatus: 'Invitación',
    myEventTitle: 'Encuentro The Populist',
    myEventTime: 'Esta Noche · 21:00',
    myEventStatus: 'Iniciado por ti',
    myEventSub: 'Hakan, Mert y Can confirmaron',
    inviteTitle: 'Belfast Irish Pub',
    inviteTime: 'Sábado · 21:30',
    inviteStatus: 'Pendiente',
    inviteSub: 'Mert te ha invitado',
    acceptBtn: 'Aceptar',
    declineBtn: 'Rechazar',
    plansTitle: 'Planes',
    segUpcoming: 'Próximos',
    segInvites: 'Invitaciones',
    segPast: 'Pasados',
    friendsTitle: 'Amigos (24)',
    searchPlaceholder: 'Buscar amigos o bares...',
    planBtn: 'Planear',
    editProfile: 'Editar Perfil',
    statMeetups: 'Quedadas',
    statVenues: 'Locales',
    statCheers: 'Salud',
    newPlanFab: 'Nuevo Plan',
    createStep1Title: '¿Con quién quedas?',
    createStep1Sub: 'Elige un amigo o invita.',
    createStep2Title: '¿Dónde quedarán?',
    createStep3Title: '¿Cuándo?',
    todayOption: 'Esta noche 21:00',
    tomorrowOption: 'Mañana noche 20:30',
    saturdayOption: 'Sábado noche',
    continueBtn: 'Continuar',
    sendBtn: 'Enviar Plan',
    verifiedMemory: 'Último Viernes Belfast Pub',
    verifiedSub: '150m GPS verificado · 4 Pintas',
  },
  ja: {
    tabTimeline: 'タイムライン',
    tabPlans: '予定',
    tabFriends: '友だち',
    tabProfile: 'プロフィール',
    timelineTitle: 'タイムライン',
    friendsScope: '友だち',
    meScope: '自分',
    tonightTag: '今夜 · 21:00',
    myPlanTag: 'あなたの予定 · 21:00',
    tonightTitle: 'ハカンとビール',
    myPlanTitle: '金曜日の飲み会',
    locationTonight: 'The Populist · Bomonti',
    partyLabel: 'Serkan, Hakan +2',
    myPartyLabel: 'あなたと3人',
    friendsStream: '友だちのアクティビティ',
    myStream: '自分の飲み会',
    livePlans: '3つの予定',
    myActivePlans: '2つの予定',
    cheersBtn: '乾杯',
    fridayTitle: '週末の集まり',
    fridayTime: '金曜 · 20:30',
    fridayStatus: '確定',
    sundayTitle: 'クラフトビール試飲',
    sundayTime: '日曜 · 18:00',
    sundayStatus: '招待',
    myEventTitle: 'The Populistでの集まり',
    myEventTime: '今夜 · 21:00',
    myEventStatus: 'あなたが作成',
    myEventSub: 'Hakan, Mert, Canが参加',
    inviteTitle: 'Belfast Irish Pub',
    inviteTime: '土曜 · 21:30',
    inviteStatus: '返信待ち',
    inviteSub: 'Mertから招待されました',
    acceptBtn: '参加する',
    declineBtn: '不参加',
    plansTitle: '予定リスト',
    segUpcoming: '今後の予定',
    segInvites: '招待一覧',
    segPast: '過去の記録',
    friendsTitle: '友だち (24人)',
    searchPlaceholder: '友だちや店舗を検索...',
    planBtn: '計画',
    editProfile: 'プロフィール編集',
    statMeetups: '飲み会数',
    statVenues: '店舗数',
    statCheers: '乾杯数',
    newPlanFab: '新しい予定',
    createStep1Title: '誰と飲みますか？',
    createStep1Sub: '友だちを選択または招待',
    createStep2Title: 'どこで飲みますか？',
    createStep3Title: 'いつにしますか？',
    todayOption: '今夜 21:00',
    tomorrowOption: '明日 20:30',
    saturdayOption: '土曜の夜',
    continueBtn: '次へ進む',
    sendBtn: '予定を作成して送信',
    verifiedMemory: '先週金曜 Belfast Pub',
    verifiedSub: '150m GPS確認済み · 4パイント',
  },
  ar: {
    tabTimeline: 'الجدول الزمني',
    tabPlans: 'الخطط',
    tabFriends: 'الأصدقاء',
    tabProfile: 'الملف',
    timelineTitle: 'الجدول الزمني',
    friendsScope: 'الأصدقاء',
    meScope: 'أنا',
    tonightTag: 'الليلة · 21:00',
    myPlanTag: 'خطتك · 21:00',
    tonightTitle: 'لقاء مع هاكان',
    myPlanTitle: 'لقاء ليلة الجمعة',
    locationTonight: 'The Populist · Bomonti',
    partyLabel: 'سركان، هاكان +2',
    myPartyLabel: 'أنت و 3 أصدقاء',
    friendsStream: 'تحديثات الأصدقاء',
    myStream: 'لقاءاتي',
    livePlans: '3 خطط جارية',
    myActivePlans: 'خطتان نشطتان',
    cheersBtn: 'في صحتك',
    fridayTitle: 'عطلة نهاية الأسبوع',
    fridayTime: 'الجمعة · 20:30',
    fridayStatus: 'مؤكد',
    sundayTitle: 'تذوق المشروبات',
    sundayTime: 'الأحد · 18:00',
    sundayStatus: 'دعوة',
    myEventTitle: 'لقاء The Populist',
    myEventTime: 'الليلة · 21:00',
    myEventStatus: 'أنشأته أنت',
    myEventSub: 'أكد هاكان، ميرت وكان',
    inviteTitle: 'Belfast Irish Pub',
    inviteTime: 'السبت · 21:30',
    inviteStatus: 'في الانتظار',
    inviteSub: 'دعاك ميرت',
    acceptBtn: 'موافقة',
    declineBtn: 'اعتذار',
    plansTitle: 'الخطط',
    segUpcoming: 'القادمة',
    segInvites: 'الدعوات',
    segPast: 'السابقة',
    friendsTitle: 'الأصدقاء (24)',
    searchPlaceholder: 'ابحث عن صديق أو مكان...',
    planBtn: 'خطط',
    editProfile: 'تعديل الملف',
    statMeetups: 'لقاءات',
    statVenues: 'أماكن',
    statCheers: 'تحيات',
    newPlanFab: 'خطة جديدة',
    createStep1Title: 'مع من ستلتقي؟',
    createStep1Sub: 'اختر صديقاً أو وجه دعوة.',
    createStep2Title: 'أين ستلتقون؟',
    createStep3Title: 'متى؟',
    todayOption: 'الليلة 21:00',
    tomorrowOption: 'غداً 20:30',
    saturdayOption: 'مساء السبت',
    continueBtn: 'متابعة',
    sendBtn: 'إنشاء وإرسال الخطة',
    verifiedMemory: 'الجمعة الماضية Belfast Pub',
    verifiedSub: 'تم التحقق بنظام GPS 150م',
  },
  it: {
    tabTimeline: 'Timeline',
    tabPlans: 'Piani',
    tabFriends: 'Amici',
    tabProfile: 'Profilo',
    timelineTitle: 'Timeline',
    friendsScope: 'Amici',
    meScope: 'Io',
    tonightTag: 'Stasera · 21:00',
    myPlanTag: 'Il tuo Piano · 21:00',
    tonightTitle: 'Birra con Hakan',
    myPlanTitle: 'Il tuo Venerdì Sera',
    locationTonight: 'The Populist · Bomonti',
    partyLabel: 'Serkan, Hakan +2',
    myPartyLabel: 'Tu e 3 Amici',
    friendsStream: 'Attività Amici',
    myStream: 'I Miei Incontri',
    livePlans: '3 Piani Attivi',
    myActivePlans: '2 Piani Attivi',
    cheersBtn: 'Salute',
    fridayTitle: 'Weekend di Gruppo',
    fridayTime: 'Venerdì · 20:30',
    fridayStatus: 'Confermato',
    sundayTitle: 'Degustazione Artigianale',
    sundayTime: 'Domenica · 18:00',
    sundayStatus: 'Invito',
    myEventTitle: 'Incontro The Populist',
    myEventTime: 'Stasera · 21:00',
    myEventStatus: 'Creato da te',
    myEventSub: 'Hakan, Mert e Can confermati',
    inviteTitle: 'Belfast Irish Pub',
    inviteTime: 'Sabato · 21:30',
    inviteStatus: 'In Attesa',
    inviteSub: 'Mert ti ha invitato',
    acceptBtn: 'Accetta',
    declineBtn: 'Rifiuta',
    plansTitle: 'Piani',
    segUpcoming: 'In arrivo',
    segInvites: 'Inviti',
    segPast: 'Passati',
    friendsTitle: 'Amici (24)',
    searchPlaceholder: 'Cerca amici o locali...',
    planBtn: 'Pianifica',
    editProfile: 'Modifica Profilo',
    statMeetups: 'Incontri',
    statVenues: 'Locali',
    statCheers: 'Salute',
    newPlanFab: 'Nuovo Piano',
    createStep1Title: 'Con chi ti vedi?',
    createStep1Sub: 'Seleziona un amico o invita.',
    createStep2Title: 'Dove vi vedete?',
    createStep3Title: 'Quando?',
    todayOption: 'Stasera 21:00',
    tomorrowOption: 'Domani 20:30',
    saturdayOption: 'Sabato sera',
    continueBtn: 'Continua',
    sendBtn: 'Invia Invito',
    verifiedMemory: 'Venerdì Scorso Belfast Pub',
    verifiedSub: '150m GPS verificato · 4 Pinte',
  },
};

export const IPhone3D: React.FC<IPhone3DProps> = ({ t, theme = 'dark', locale = 'tr' }) => {
  const [rotate, setRotate] = useState({ x: 2, y: -3 });
  const [tab, setTab] = useState<Tab>('timeline');
  const [scope, setScope] = useState<'friends' | 'me'>('friends');
  const [planSeg, setPlanSeg] = useState<'upcoming' | 'invites' | 'past'>('upcoming');
  const [cheers, setCheers] = useState({ a: 14, b: 22, c: 9 });
  const [cheered, setCheered] = useState({ a: false, b: false, c: false });
  const [create, setCreate] = useState(0); // 0 = closed, 1..3 steps
  const [picked, setPicked] = useState<string[]>(['Hakan']);
  const [when, setWhen] = useState(0);
  const [clock, setClock] = useState('21:00');
  const [fabOpen, setFabOpen] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const isDark = theme === 'dark';
  const pd = phoneDict[locale] || phoneDict.tr;

  // Live dynamic clock
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setClock(`${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const r = containerRef.current.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width - 0.5;
    const ny = (e.clientY - r.top) / r.height - 0.5;
    setRotate({ x: -ny * 6, y: nx * 6 });
  };

  // mobiledesing.md tokens
  const k = isDark
    ? {
        bg: '#0F0D0B',
        surface: '#1A1713',
        surface2: '#221E19',
        label: '#F5F1EA',
        label2: '#B8AFA2',
        label3: '#8A8176',
        accent: '#F0B65A',
        accentInk: '#1A1612',
        accentText: '#F0B65A',
        accentSoft: '#3A2B12',
        success: '#4CC38A',
      }
    : {
        bg: '#FAF8F5',
        surface: '#FFFFFF',
        surface2: '#F3EFE9',
        label: '#1A1612',
        label2: '#5C544B',
        label3: '#8A8176',
        accent: '#E8A33D',
        accentInk: '#1A1612',
        accentText: '#8F5A0F',
        accentSoft: '#FBEBD0',
        success: '#2E7D4F',
      };

  // Borderless Liquid Glass Surface: pure refraction, zero stroke lines
  const glass: React.CSSProperties = {
    background: isDark ? 'rgba(26,23,19,0.72)' : 'rgba(255,255,255,0.75)',
    backdropFilter: 'blur(28px) saturate(210%)',
    WebkitBackdropFilter: 'blur(28px) saturate(210%)',
    border: 'none',
    boxShadow: isDark
      ? '0 12px 36px rgba(0,0,0,0.55)'
      : '0 10px 30px rgba(26,22,18,0.12)',
  };

  const tabs: { id: Tab; label: string; Icon: React.ElementType }[] = [
    { id: 'timeline', label: pd.tabTimeline, Icon: Layers },
    { id: 'plans', label: pd.tabPlans, Icon: Calendar },
    { id: 'friends', label: pd.tabFriends, Icon: Users },
    { id: 'profile', label: pd.tabProfile, Icon: UserCircle2 },
  ];

  const friends = [
    { n: 'Hakan', u: '@hakan', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80' },
    { n: 'Mert', u: '@mert', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80' },
    { n: 'Can', u: '@can', img: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&auto=format&fit=crop&q=80' },
    { n: 'Elif', u: '@elif', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80' },
  ];

  return (
    <div
      ref={containerRef}
      onMouseMove={onMove}
      onMouseLeave={() => setRotate({ x: 2, y: -3 })}
      className="relative w-full max-w-[290px] sm:max-w-[320px] md:max-w-[340px] lg:max-w-[355px] xl:max-w-[365px] mx-auto flex items-center justify-center select-none py-1"
      style={{ perspective: '1200px' }}
    >
      {/* Studio Contact Shadows */}
      <div
        className={`absolute -bottom-2 w-[85%] h-[24px] rounded-[100%] blur-xl pointer-events-none -z-10 ${
          isDark ? 'bg-black/80' : 'bg-black/35'
        }`}
      />
      <div
        className={`absolute -bottom-1 w-[65%] h-[14px] rounded-[100%] blur-md pointer-events-none -z-10 ${
          isDark ? 'bg-black/95' : 'bg-black/50'
        }`}
      />

      {/* 3D Phone Chassis (Sunset Orange Titanium) */}
      <div
        className="relative w-full rounded-[50px] p-[10px] transition-transform duration-300 ease-out shadow-[0_25px_65px_-12px_rgba(0,0,0,0.55),0_12px_28px_-6px_rgba(0,0,0,0.35)]"
        style={{
          aspectRatio: '9 / 18.8',
          transformStyle: 'preserve-3d',
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          background: 'linear-gradient(135deg, #FF8C42 0%, #EA580C 20%, #9A3412 45%, #F97316 70%, #FFB074 100%)',
        }}
      >
        {/* Specular Chamfer */}
        <div className="absolute inset-0 rounded-[50px] ring-1 ring-inset ring-white/40 pointer-events-none" />

        {/* Physical Buttons */}
        <div className="absolute -left-[4.5px] top-[95px] w-[4px] h-[26px] bg-gradient-to-r from-[#9A3412] to-[#EA580C] rounded-l-sm" />
        <div className="absolute -left-[4.5px] top-[135px] w-[4px] h-[48px] bg-gradient-to-r from-[#9A3412] to-[#EA580C] rounded-l-sm" />
        <div className="absolute -left-[4.5px] top-[195px] w-[4px] h-[48px] bg-gradient-to-r from-[#9A3412] to-[#EA580C] rounded-l-sm" />
        <div className="absolute -right-[4.5px] top-[145px] w-[4px] h-[65px] bg-gradient-to-l from-[#9A3412] to-[#EA580C] rounded-r-sm" />

        {/* OLED SCREEN (50px outer - 10px chassis = 40px screen radius) */}
        <div
          className="relative w-full h-full rounded-[40px] overflow-hidden ring-1 ring-black/80 flex flex-col justify-between"
          style={{
            background: k.bg,
            color: k.label,
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", Inter, sans-serif',
          }}
        >
          {/* iOS Status Bar (Always on top) */}
          <div
            className="absolute top-0 inset-x-0 z-30 pt-3 px-6 flex items-center justify-between pointer-events-none drop-shadow-sm"
            style={{ fontSize: 12, fontWeight: 800, color: '#FFFFFF' }}
          >
            <span style={{ fontVariantNumeric: 'tabular-nums' }}>{clock}</span>
            <div className="w-[88px] h-[24px] bg-black rounded-full flex items-center justify-end px-2.5">
              <div className="w-2 h-2 rounded-full bg-[#0B1226] ring-1 ring-zinc-700" />
            </div>
            <div className="flex items-center gap-1">
              <span style={{ fontSize: 9, fontWeight: 700 }}>5G</span>
              <div className="w-[18px] h-[9px] rounded-[3px] p-[1px] border border-white/80">
                <div className="h-full w-[75%] rounded-[1.5px] bg-white" />
              </div>
            </div>
          </div>

          {/* MAIN SCROLLABLE CONTENT */}
          <div
            className="absolute inset-0 overflow-y-auto text-start"
            style={{ paddingBottom: 110, scrollbarWidth: 'none' }}
            onScroll={(e) => setFabOpen((e.target as HTMLDivElement).scrollTop < 20)}
          >
            {/* ===================== TAB 1: ZAMAN TÜNELİ ===================== */}
            {tab === 'timeline' && (
              <div className="relative w-full">
                {/* 1. HERO IMAGE: Bleeds all the way up to top of screen behind status bar */}
                <div className="relative w-full h-[360px] overflow-hidden">
                  <img
                    src="/photos/pub.jpg"
                    alt="The Populist"
                    className="w-full h-full object-cover object-center scale-105"
                  />

                  {/* Gradient Fade Cutoff: Transitions seamlessly into theme background */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: `linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 30%, rgba(0,0,0,0.4) 65%, ${k.bg} 98%)`,
                    }}
                  />

                  {/* FLOATING HEADER DIRECTLY ON TOP OF IMAGE */}
                  <div className="absolute top-0 inset-x-0 pt-11 px-4 z-20">
                    <div className="flex items-center justify-between mb-3">
                      <h1 className="text-2xl font-black tracking-tight text-white drop-shadow-md">
                        {pd.timelineTitle}
                      </h1>
                      {/* Notification Button: Borderless Liquid Glass */}
                      <button
                        aria-label="Bildirimler"
                        className="w-9 h-9 rounded-full flex items-center justify-center text-white active:scale-90 transition-transform"
                        style={{
                          background: 'rgba(0,0,0,0.28)',
                          backdropFilter: 'blur(20px)',
                          WebkitBackdropFilter: 'blur(20px)',
                          border: 'none',
                        }}
                      >
                        <Bell className="w-4 h-4" />
                      </button>
                    </div>

                    {/* [ Arkadaşlar | Ben ] Segmented Pill: Translucent Borderless Glass with visible active pill */}
                    <div
                      className="flex p-1 rounded-full relative overflow-hidden pointer-events-auto"
                      style={{
                        background: 'rgba(0,0,0,0.36)',
                        backdropFilter: 'blur(24px) saturate(200%)',
                        WebkitBackdropFilter: 'blur(24px) saturate(200%)',
                        border: 'none',
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => setScope('friends')}
                        className={`flex-1 py-1.5 rounded-full text-xs cursor-pointer transition-all duration-200 select-none ${
                          scope === 'friends'
                            ? 'bg-white/35 text-white font-black shadow-sm scale-[1.02]'
                            : 'text-white/70 hover:text-white font-semibold'
                        }`}
                      >
                        {pd.friendsScope}
                      </button>
                      <button
                        type="button"
                        onClick={() => setScope('me')}
                        className={`flex-1 py-1.5 rounded-full text-xs cursor-pointer transition-all duration-200 select-none ${
                          scope === 'me'
                            ? 'bg-white/35 text-white font-black shadow-sm scale-[1.02]'
                            : 'text-white/70 hover:text-white font-semibold'
                        }`}
                      >
                        {pd.meScope}
                      </button>
                    </div>
                  </div>

                  {/* HERO EVENT METADATA (Dynamically updates between Arkadaşlar & Ben) */}
                  <div className="absolute bottom-3 inset-x-4 z-10 text-white">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-black uppercase tracking-wider bg-black/60 backdrop-blur-md px-2.5 py-0.5 rounded-full text-amber-300">
                        {scope === 'friends' ? pd.tonightTag : pd.myPlanTag}
                      </span>
                      <div className="flex items-center gap-1 text-[10px] font-bold text-white/80">
                        <MapPin className="w-3.5 h-3.5 text-amber-400" />
                        <span>Kadıköy</span>
                      </div>
                    </div>

                    <h2 className="text-xl font-black tracking-tight leading-tight drop-shadow-sm">
                      {scope === 'friends' ? pd.tonightTitle : pd.myPlanTitle}
                    </h2>
                    <p className="text-xs font-semibold text-white/85">
                      {pd.locationTonight}
                    </p>
                  </div>
                </div>

                {/* HERO ACTION ROW */}
                <div className="px-4 pt-1 pb-4 flex items-center justify-between">
                  {/* Overlapping Avatars */}
                  <div className="flex items-center -space-x-2">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                      alt="Serkan"
                      className="w-7 h-7 rounded-full border-2 border-amber-500 object-cover shadow-xs"
                    />
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                      alt="Hakan"
                      className="w-7 h-7 rounded-full border-2 border-white object-cover shadow-xs"
                    />
                    <div className="w-7 h-7 rounded-full bg-amber-500 text-zinc-950 font-black text-[9px] flex items-center justify-center border-2 border-white shadow-xs">
                      +2
                    </div>
                    <span className="ps-3 text-xs font-bold" style={{ color: k.label2 }}>
                      {scope === 'friends' ? pd.partyLabel : pd.myPartyLabel}
                    </span>
                  </div>

                  {/* Şerefe Button */}
                  <button
                    type="button"
                    onClick={() => {
                      setCheered((c) => ({ ...c, a: !c.a }));
                      setCheers((c) => ({ ...c, a: c.a + (cheered.a ? -1 : 1) }));
                    }}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black transition-all active:scale-95 cursor-pointer ${
                      cheered.a
                        ? 'bg-amber-500 text-zinc-950 shadow-sm'
                        : 'bg-zinc-200/70 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200'
                    }`}
                  >
                    <Beer className="w-3.5 h-3.5" />
                    <span style={{ fontVariantNumeric: 'tabular-nums' }}>{cheers.a} {pd.cheersBtn}</span>
                  </button>
                </div>

                {/* 2. SUBSEQUENT TIMELINE ENTRIES (Visibly changes when switching scope) */}
                <div className="px-4 space-y-4 pt-2">
                  <div className="flex items-center justify-between pt-2 border-t" style={{ borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)' }}>
                    <span className="text-[11px] font-black uppercase tracking-wider" style={{ color: k.label3 }}>
                      {scope === 'friends' ? pd.friendsStream : pd.myStream}
                    </span>
                    <span className="text-xs font-bold" style={{ color: k.accentText }}>
                      {scope === 'friends' ? pd.livePlans : pd.myActivePlans}
                    </span>
                  </div>

                  {scope === 'friends' ? (
                    <>
                      {/* Event 2: Friday Event */}
                      <div
                        className="p-3.5 rounded-[24px] overflow-hidden flex gap-3.5 items-center shadow-xs animate-fade-in"
                        style={{ background: k.surface }}
                      >
                        <div className="w-18 h-18 rounded-[18px] overflow-hidden shrink-0 relative">
                          <img
                            src="/photos/pub2.jpg"
                            alt="Belfast"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/25" />
                          <span className="absolute bottom-1 start-1.5 text-[8px] font-black text-amber-300 uppercase">
                            {pd.fridayStatus}
                          </span>
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400">
                              {pd.fridayTime}
                            </span>
                            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                              {pd.fridayStatus}
                            </span>
                          </div>
                          <h3 className="text-sm font-black truncate mt-0.5" style={{ color: k.label }}>
                            {pd.fridayTitle}
                          </h3>
                          <p className="text-[11px] truncate" style={{ color: k.label2 }}>
                            Belfast Irish Pub · Kadıköy
                          </p>

                          <div className="flex items-center justify-between pt-1.5 mt-1 border-t" style={{ borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)' }}>
                            <span className="text-[10px]" style={{ color: k.label3 }}>Mert, Can, Elif</span>
                            <button
                              type="button"
                              onClick={() => {
                                setCheered((c) => ({ ...c, b: !c.b }));
                                setCheers((c) => ({ ...c, b: c.b + (cheered.b ? -1 : 1) }));
                              }}
                              className="flex items-center gap-1 text-[11px] font-bold text-amber-600 dark:text-amber-400 cursor-pointer"
                            >
                              <Beer className="w-3 h-3" />
                              <span>{cheers.b}</span>
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Event 3: Sunday Tasting */}
                      <div
                        className="p-3.5 rounded-[24px] overflow-hidden flex gap-3.5 items-center shadow-xs animate-fade-in"
                        style={{ background: k.surface }}
                      >
                        <div className="w-18 h-18 rounded-[18px] overflow-hidden shrink-0 relative">
                          <img
                            src="/photos/pub3.jpg"
                            alt="Craft Beer"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/25" />
                          <span className="absolute bottom-1 start-1.5 text-[8px] font-black text-amber-300 uppercase">
                            {pd.sundayStatus}
                          </span>
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400">
                              {pd.sundayTime}
                            </span>
                            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400">
                              {pd.sundayStatus}
                            </span>
                          </div>
                          <h3 className="text-sm font-black truncate mt-0.5" style={{ color: k.label }}>
                            {pd.sundayTitle}
                          </h3>
                          <p className="text-[11px] truncate" style={{ color: k.label2 }}>
                            Craft Beer Lab · Beşiktaş
                          </p>

                          <div className="flex items-center justify-between pt-1.5 mt-1 border-t" style={{ borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)' }}>
                            <span className="text-[10px]" style={{ color: k.label3 }}>Canberk, Can</span>
                            <button
                              type="button"
                              onClick={() => {
                                setCheered((c) => ({ ...c, c: !c.c }));
                                setCheers((c) => ({ ...c, c: c.c + (cheered.c ? -1 : 1) }));
                              }}
                              className="flex items-center gap-1 text-[11px] font-bold text-amber-600 dark:text-amber-400 cursor-pointer"
                            >
                              <Beer className="w-3 h-3" />
                              <span>{cheers.c}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Scope "Ben" - My Personal Events */}
                      <div
                        className="p-3.5 rounded-[24px] overflow-hidden flex gap-3.5 items-center shadow-xs animate-fade-in"
                        style={{ background: k.surface }}
                      >
                        <div className="w-18 h-18 rounded-[18px] overflow-hidden shrink-0 relative">
                          <img
                            src="/photos/pub.jpg"
                            alt="The Populist"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/25" />
                          <span className="absolute bottom-1 start-1.5 text-[8px] font-black text-emerald-300 uppercase">
                            VIP
                          </span>
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                              {pd.myEventTime}
                            </span>
                            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                              {pd.myEventStatus}
                            </span>
                          </div>
                          <h3 className="text-sm font-black truncate mt-0.5" style={{ color: k.label }}>
                            {pd.myEventTitle}
                          </h3>
                          <p className="text-[11px] truncate" style={{ color: k.label2 }}>
                            {pd.myEventSub}
                          </p>
                          <div className="pt-1.5 mt-1 border-t flex items-center justify-between text-[10px]" style={{ borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)' }}>
                            <span className="font-bold text-amber-600 dark:text-amber-400">WhatsApp RSVP</span>
                            <span style={{ color: k.label3 }}>4/4</span>
                          </div>
                        </div>
                      </div>

                      {/* Scope "Ben" - Incoming Invite */}
                      <div
                        className="p-3.5 rounded-[24px] overflow-hidden flex gap-3.5 items-center shadow-xs animate-fade-in"
                        style={{ background: k.surface }}
                      >
                        <div className="w-18 h-18 rounded-[18px] overflow-hidden shrink-0 relative">
                          <img
                            src="/photos/pub2.jpg"
                            alt="Belfast"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/25" />
                          <span className="absolute bottom-1 start-1.5 text-[8px] font-black text-amber-300 uppercase">
                            {pd.inviteStatus}
                          </span>
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400">
                              {pd.inviteTime}
                            </span>
                            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400">
                              {pd.inviteStatus}
                            </span>
                          </div>
                          <h3 className="text-sm font-black truncate mt-0.5" style={{ color: k.label }}>
                            {pd.inviteTitle}
                          </h3>
                          <p className="text-[11px] truncate" style={{ color: k.label2 }}>
                            {pd.inviteSub}
                          </p>
                          <div className="pt-1.5 mt-1 border-t flex items-center gap-2" style={{ borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)' }}>
                            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">{pd.acceptBtn}</span>
                            <span className="text-[10px] text-zinc-400">·</span>
                            <span className="text-[10px] text-zinc-400">{pd.declineBtn}</span>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Past Verified Memory */}
                  <div
                    className="p-3 rounded-[20px] flex items-center justify-between"
                    style={{ background: k.surface2 }}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold leading-tight" style={{ color: k.label }}>
                          {pd.verifiedMemory}
                        </p>
                        <p className="text-[10px]" style={{ color: k.label3 }}>
                          {pd.verifiedSub}
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400">
                      GPS ✓
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* ===================== TAB 2: PLANLAR ===================== */}
            {tab === 'plans' && (
              <div className="pt-12 px-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-black tracking-tight" style={{ color: k.label }}>
                    {pd.plansTitle}
                  </h1>
                </div>

                {/* Segmented Control */}
                <div
                  className="flex p-1 rounded-full"
                  style={{ background: k.surface2 }}
                >
                  {(['upcoming', 'invites', 'past'] as const).map((seg) => {
                    const titles = { upcoming: pd.segUpcoming, invites: pd.segInvites, past: pd.segPast };
                    return (
                      <button
                        key={seg}
                        onClick={() => setPlanSeg(seg)}
                        className={`flex-1 py-1.5 rounded-full text-xs font-bold transition-all ${
                          planSeg === seg
                            ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-xs'
                            : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
                        }`}
                      >
                        {titles[seg]}
                      </button>
                    );
                  })}
                </div>

                <div className="space-y-3">
                  {[
                    { title: pd.tonightTitle, venue: 'The Populist · Bomonti', time: pd.tonightTag, status: pd.fridayStatus, img: '/photos/pub.jpg' },
                    { title: pd.fridayTitle, venue: 'Belfast Irish Pub', time: pd.fridayTime, status: pd.fridayStatus, img: '/photos/pub2.jpg' },
                    { title: pd.sundayTitle, venue: 'Craft Beer Lab', time: pd.sundayTime, status: pd.sundayStatus, img: '/photos/pub3.jpg' },
                  ].map((p, i) => (
                    <div
                      key={p.title + i}
                      className="p-3.5 rounded-[24px] flex items-center gap-3.5 shadow-xs"
                      style={{ background: k.surface }}
                    >
                      <img src={p.img} alt="" className="w-14 h-14 rounded-[16px] object-cover" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400">{p.time}</span>
                          <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400">{p.status}</span>
                        </div>
                        <h4 className="text-sm font-black truncate mt-0.5" style={{ color: k.label }}>{p.title}</h4>
                        <p className="text-[11px] truncate" style={{ color: k.label2 }}>{p.venue}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ===================== TAB 3: ARKADAŞLAR ===================== */}
            {tab === 'friends' && (
              <div className="pt-12 px-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-black tracking-tight" style={{ color: k.label }}>
                    {pd.friendsTitle}
                  </h1>
                </div>

                <div className="flex items-center gap-2.5 px-4 h-10 rounded-full" style={{ background: k.surface2 }}>
                  <Search className="w-4 h-4" style={{ color: k.label3 }} />
                  <span className="text-xs" style={{ color: k.label3 }}>{pd.searchPlaceholder}</span>
                </div>

                <div className="space-y-2">
                  {friends.map((f) => (
                    <div
                      key={f.u}
                      className="p-3 rounded-[20px] flex items-center justify-between shadow-xs"
                      style={{ background: k.surface }}
                    >
                      <div className="flex items-center gap-3">
                        <img src={f.img} alt={f.n} className="w-10 h-10 rounded-full object-cover" />
                        <div>
                          <p className="text-sm font-black leading-tight" style={{ color: k.label }}>{f.n}</p>
                          <p className="text-xs" style={{ color: k.label3 }}>{f.u}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setCreate(1)}
                        className="px-3.5 py-1.5 rounded-full text-xs font-black bg-amber-500/15 text-amber-700 dark:text-amber-400 hover:bg-amber-500/25 transition-colors"
                      >
                        {pd.planBtn}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ===================== TAB 4: PROFİL ===================== */}
            {tab === 'profile' && (
              <div className="relative w-full">
                {/* Profile Cover Photo */}
                <div className="relative w-full h-[180px]">
                  <img src="/photos/pub.jpg" alt="" className="w-full h-full object-cover opacity-80" />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, ${k.bg} 100%)`,
                    }}
                  />
                  <div className="absolute top-12 end-4">
                    <button
                      aria-label="Settings"
                      className="w-9 h-9 rounded-full flex items-center justify-center text-white bg-black/30 backdrop-blur-xl border-none"
                    >
                      <Settings className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Profile Avatar and Details */}
                <div className="px-5 -mt-10 relative z-10 text-start">
                  <div className="flex items-end justify-between">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80"
                      alt="Serkan"
                      className="w-20 h-20 rounded-full border-4 object-cover shadow-md"
                      style={{ borderColor: k.bg }}
                    />
                    <button
                      className="px-4 py-1.5 rounded-full text-xs font-bold"
                      style={{ background: k.surface2, color: k.label }}
                    >
                      {pd.editProfile}
                    </button>
                  </div>

                  <h2 className="text-xl font-black tracking-tight mt-2.5" style={{ color: k.label }}>
                    Serkan Bilsel
                  </h2>
                  <p className="text-xs" style={{ color: k.label3 }}>@serkanbilsel · İstanbul</p>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-2.5 mt-4">
                    <div className="p-3 rounded-[20px] text-center" style={{ background: k.surface }}>
                      <div className="text-lg font-black text-amber-500">12</div>
                      <div className="text-[10px] font-bold" style={{ color: k.label2 }}>{pd.statMeetups}</div>
                    </div>
                    <div className="p-3 rounded-[20px] text-center" style={{ background: k.surface }}>
                      <div className="text-lg font-black" style={{ color: k.label }}>8</div>
                      <div className="text-[10px] font-bold" style={{ color: k.label2 }}>{pd.statVenues}</div>
                    </div>
                    <div className="p-3 rounded-[20px] text-center" style={{ background: k.surface }}>
                      <div className="text-lg font-black text-emerald-500">45</div>
                      <div className="text-[10px] font-bold" style={{ color: k.label2 }}>{pd.statCheers}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* FLOATING ACTION BUTTON (FAB: + Yeni Plan - Pure Borderless Amber Glass) */}
          <button
            onClick={() => setCreate(1)}
            aria-label={pd.newPlanFab}
            className="absolute z-30 flex items-center justify-center active:scale-95 transition-all duration-300"
            style={{
              right: 16,
              bottom: 84,
              height: 44,
              minWidth: 44,
              padding: fabOpen ? '0 16px 0 12px' : 0,
              gap: 6,
              borderRadius: 999,
              background: isDark ? 'rgba(240,182,90,0.92)' : 'rgba(232,163,61,0.94)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              color: k.accentInk,
              boxShadow: '0 8px 24px rgba(232,163,61,0.45)',
              border: 'none',
              fontSize: 13,
              fontWeight: 800,
            }}
          >
            <Plus className="w-4.5 h-4.5 stroke-[3]" />
            {fabOpen && <span>{pd.newPlanFab}</span>}
          </button>

          {/* TAB BAR: Liquid Glass Capsule - 100% BORDERLESS */}
          <div className="absolute z-20 inset-x-3 bottom-3 pointer-events-auto">
            <div
              className="relative h-[60px] rounded-full px-2 flex items-center justify-between overflow-hidden"
              style={glass}
            >
              {tabs.map(({ id, label, Icon }) => {
                const active = tab === id;
                return (
                  <button
                    key={id}
                    onClick={() => setTab(id)}
                    aria-label={label}
                    className="relative flex-1 h-[48px] rounded-full flex flex-col items-center justify-center gap-[2px] transition-all active:scale-95"
                    style={{
                      color: active ? k.accentText : k.label2,
                      background: active
                        ? isDark
                          ? 'rgba(240,182,90,0.18)'
                          : 'rgba(232,163,61,0.18)'
                        : 'transparent',
                    }}
                  >
                    <Icon className="w-[19px] h-[19px]" strokeWidth={active ? 2.5 : 2} />
                    <span style={{ fontSize: 9, fontWeight: active ? 800 : 600, letterSpacing: '-0.01em' }}>
                      {label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* INTERACTIVE CREATE PLAN SHEET */}
          {create > 0 && (
            <div
              className="absolute inset-0 z-40 flex flex-col px-4 pt-12 pb-5 text-start"
              style={{ background: k.bg }}
            >
              <div className="flex items-center justify-between">
                <button
                  aria-label="Geri"
                  onClick={() => setCreate(create > 1 ? create - 1 : 0)}
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: k.surface2, color: k.label }}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  aria-label="Kapat"
                  onClick={() => setCreate(0)}
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: k.surface2, color: k.label }}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex gap-1.5 mt-3">
                {[1, 2, 3].map((s) => (
                  <div
                    key={s}
                    className="flex-1 h-1 rounded-full transition-colors"
                    style={{ background: s <= create ? k.accent : k.surface2 }}
                  />
                ))}
              </div>

              <div className="flex-1 overflow-y-auto pt-5" style={{ scrollbarWidth: 'none' }}>
                {create === 1 && (
                  <>
                    <h2 className="text-xl font-black tracking-tight" style={{ color: k.label }}>
                      {pd.createStep1Title}
                    </h2>
                    <p className="text-xs mt-1" style={{ color: k.label2 }}>
                      {pd.createStep1Sub}
                    </p>
                    <div className="rounded-[24px] overflow-hidden mt-4" style={{ background: k.surface }}>
                      {friends.map((f, i) => {
                        const on = picked.includes(f.n);
                        return (
                          <button
                            key={f.u}
                            onClick={() => setPicked(on ? picked.filter((p) => p !== f.n) : [...picked, f.n])}
                            className="w-full flex items-center gap-3 px-3.5 py-3 text-start"
                            style={{ borderTop: i ? `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)'}` : 'none' }}
                          >
                            <img src={f.img} alt="" className="w-9 h-9 rounded-full object-cover" />
                            <span className="flex-1 text-sm font-bold" style={{ color: k.label }}>{f.n}</span>
                            <span
                              className="w-5 h-5 rounded-full flex items-center justify-center"
                              style={{ background: on ? k.accent : k.surface2, color: on ? k.accentInk : k.label2 }}
                            >
                              {on && <Check className="w-3.5 h-3.5 stroke-[3.5]" />}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </>
                )}

                {create === 2 && (
                  <>
                    <h2 className="text-xl font-black tracking-tight" style={{ color: k.label }}>
                      {pd.createStep2Title}
                    </h2>
                    <div className="space-y-2 mt-4">
                      {[
                        ['The Populist', 'Kadıköy Moda · 350 m'],
                        ['Belfast Irish Pub', 'Kadıköy · 600 m'],
                        ['Craft Beer Lab', 'Beşiktaş · 1,2 km'],
                      ].map(([n, d], i) => (
                        <div
                          key={n}
                          className="flex items-center gap-3 p-3.5 rounded-[20px]"
                          style={{ background: i === 0 ? k.accentSoft : k.surface, color: i === 0 ? k.accentText : k.label }}
                        >
                          <MapPin className="w-4 h-4" />
                          <div className="flex-1">
                            <div className="text-sm font-black">{n}</div>
                            <div className="text-xs opacity-80">{d}</div>
                          </div>
                          {i === 0 && <Check className="w-4 h-4 stroke-[3]" />}
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {create === 3 && (
                  <>
                    <h2 className="text-xl font-black tracking-tight" style={{ color: k.label }}>
                      {pd.createStep3Title}
                    </h2>
                    <div className="flex flex-col gap-2 mt-4">
                      {[pd.todayOption, pd.tomorrowOption, pd.saturdayOption].map((w, i) => (
                        <button
                          key={w}
                          onClick={() => setWhen(i)}
                          className="px-4 h-12 rounded-[18px] text-start flex items-center justify-between text-sm font-bold"
                          style={{
                            background: when === i ? k.accentSoft : k.surface,
                            color: when === i ? k.accentText : k.label,
                          }}
                        >
                          <span>{w}</span>
                          {when === i && <Check className="w-4 h-4 stroke-[3]" />}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              <button
                onClick={() => setCreate(create < 3 ? create + 1 : 0)}
                className="w-full h-11 rounded-full text-xs font-black active:scale-[0.98] transition-transform mt-3"
                style={{
                  background: k.accent,
                  color: k.accentInk,
                  border: 'none',
                  boxShadow: '0 8px 24px rgba(232,163,61,0.35)',
                }}
              >
                {create === 3 ? pd.sendBtn : pd.continueBtn}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

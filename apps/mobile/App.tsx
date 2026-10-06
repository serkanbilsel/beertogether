import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Modal,
  Alert,
} from 'react-native';
import {
  Layers,
  Calendar,
  Users,
  UserCircle2,
  Beer,
  Share2,
  MoreHorizontal,
  Plus,
  ShieldCheck,
  Check,
  MapPin,
  X,
  Search,
  Sun,
  Moon,
  Globe,
} from 'lucide-react-native';
import { tokens, radius, ThemeMode } from './src/theme/tokens';
import { translations, Locale } from './src/locales/translations';
import { EventPoster, PosterThemeKey } from './src/components/EventPoster';
import { GlassSurface } from './src/components/GlassSurface';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const POSTER_WIDTH = Math.min(SCREEN_WIDTH - 40, 360);

type TabType = 'timeline' | 'plans' | 'friends' | 'profile';

export default function App() {
  const [themeMode, setThemeMode] = useState<ThemeMode>('dark');
  const [locale, setLocale] = useState<Locale>('tr');
  const [activeTab, setActiveTab] = useState<TabType>('timeline');
  const [scope, setScope] = useState<'friends' | 'me'>('friends');
  const [cheersCount, setCheersCount] = useState(14);
  const [hasCheered, setHasCheered] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createStep, setCreateStep] = useState(1);
  const [selectedFriends, setSelectedFriends] = useState<string[]>(['Hakan']);
  const [selectedTheme, setSelectedTheme] = useState<PosterThemeKey>('amber');
  const [planCreated, setPlanCreated] = useState(false);

  const t = tokens[themeMode];
  const tr = translations[locale] || translations.tr;

  const toggleTheme = () => {
    setThemeMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const cycleLocale = () => {
    const langs: Locale[] = ['tr', 'en', 'es', 'ja', 'ar', 'it'];
    const nextIdx = (langs.indexOf(locale) + 1) % langs.length;
    setLocale(langs[nextIdx]);
  };

  const handleCheers = () => {
    setHasCheered(!hasCheered);
    setCheersCount((prev) => prev + (hasCheered ? -1 : 1));
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: t.bg }]}>
      <StatusBar
        barStyle={themeMode === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={t.bg}
      />

      {/* Top Header - Glass Floating Controls */}
      <View style={[styles.header, { borderColor: t.separator }]}>
        <View style={styles.brandGroup}>
          <Text style={[styles.brandWordmark, { color: t.label }]}>
            BEER <Text style={{ color: t.accent }}>TOGETHER</Text>
          </Text>
        </View>

        <View style={styles.headerActions}>
          {/* Language Switcher */}
          <TouchableOpacity
            style={[styles.glassCircleBtn, { backgroundColor: t.surface2, borderColor: t.separator }]}
            onPress={cycleLocale}
            activeOpacity={0.7}
          >
            <Text style={[styles.localeTag, { color: t.label }]}>{locale.toUpperCase()}</Text>
          </TouchableOpacity>

          {/* Theme Switcher */}
          <TouchableOpacity
            style={[styles.glassCircleBtn, { backgroundColor: t.surface2, borderColor: t.separator }]}
            onPress={toggleTheme}
            activeOpacity={0.7}
          >
            {themeMode === 'dark' ? (
              <Sun size={17} color={t.accent} />
            ) : (
              <Moon size={17} color={t.label} />
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content Area */}
      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 110 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* ==================== TAB 1: TIMELINE ==================== */}
        {activeTab === 'timeline' && (
          <View style={styles.tabSection}>
            {/* Friends / Me Segmented Control (Liquid Glass) */}
            <View style={[styles.segmentedWrapper, { backgroundColor: t.surface2 }]}>
              <TouchableOpacity
                style={[
                  styles.segmentedItem,
                  scope === 'friends' && { backgroundColor: t.surface, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4 },
                ]}
                onPress={() => setScope('friends')}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.segmentedText,
                    { color: scope === 'friends' ? t.label : t.label3, fontWeight: scope === 'friends' ? '800' : '600' },
                  ]}
                >
                  {tr.friendsTab}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.segmentedItem,
                  scope === 'me' && { backgroundColor: t.surface, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4 },
                ]}
                onPress={() => setScope('me')}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.segmentedText,
                    { color: scope === 'me' ? t.label : t.label3, fontWeight: scope === 'me' ? '800' : '600' },
                  ]}
                >
                  {tr.meTab}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Date Footnote */}
            <View style={styles.dateHeaderRow}>
              <Text style={[styles.stickyMonth, { color: t.label3 }]}>{tr.october2026}</Text>
              <Text style={[styles.stickyDay, { color: t.label2 }]}>{tr.saturday3Oct}</Text>
            </View>

            {/* Main 4:5 Poster Card */}
            <EventPoster
              themeKey={selectedTheme}
              width={POSTER_WIDTH}
              title={scope === 'friends' ? tr.beerWithHakan : tr.beerWithHakan}
              venue={tr.venueTonight}
              participants={['Serkan', 'Hakan', 'Mert']}
            />

            {/* Card Action Row (Outside Card per mobiledesing.md Section 7) */}
            <View style={[styles.actionRow, { width: POSTER_WIDTH }]}>
              <TouchableOpacity
                style={[
                  styles.cheersBtn,
                  {
                    backgroundColor: hasCheered ? t.accent : t.surface2,
                    borderColor: t.separator,
                  },
                ]}
                onPress={handleCheers}
                activeOpacity={0.7}
              >
                <Beer size={16} color={hasCheered ? t.accentInk : t.accent} />
                <Text
                  style={[
                    styles.cheersText,
                    { color: hasCheered ? t.accentInk : t.label },
                  ]}
                >
                  {cheersCount} {tr.cheers}
                </Text>
              </TouchableOpacity>

              <View style={styles.minorActions}>
                <TouchableOpacity
                  style={[styles.iconCircleBtn, { backgroundColor: t.surface2, borderColor: t.separator }]}
                  onPress={() => Alert.alert(tr.share, 'beertogether.app/e/hakan-bira')}
                  activeOpacity={0.7}
                >
                  <Share2 size={16} color={t.label} />
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.iconCircleBtn, { backgroundColor: t.surface2, borderColor: t.separator }]}
                  onPress={() => Alert.alert(tr.more, '1. Paylaş\n2. Takvime Ekle\n3. Şikayet Et')}
                  activeOpacity={0.7}
                >
                  <MoreHorizontal size={16} color={t.label} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Past GPS Verified Memory Block */}
            <View style={[styles.verifiedCard, { backgroundColor: t.surface, borderColor: t.separator, width: POSTER_WIDTH }]}>
              <View style={[styles.verifiedIconBox, { backgroundColor: 'rgba(46,125,79,0.15)' }]}>
                <ShieldCheck size={20} color={t.success} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.verifiedTitle, { color: t.label }]}>{tr.lastFridayMemory}</Text>
                <Text style={[styles.verifiedSub, { color: t.label3 }]}>{tr.gpsVerified}</Text>
              </View>
            </View>
          </View>
        )}

        {/* ==================== TAB 2: PLANS ==================== */}
        {activeTab === 'plans' && (
          <View style={styles.tabSection}>
            <Text style={[styles.sectionTitle, { color: t.label }]}>{tr.plans}</Text>
            
            <View style={[styles.planCard, { backgroundColor: t.surface, borderColor: t.separator }]}>
              <View style={styles.planCardHeader}>
                <Text style={[styles.planTime, { color: t.accent }]}>Bugün · 21:00</Text>
                <View style={[styles.statusBadge, { backgroundColor: 'rgba(46,125,79,0.15)' }]}>
                  <Text style={[styles.statusText, { color: t.success }]}>{tr.confirmed}</Text>
                </View>
              </View>
              <Text style={[styles.planTitle, { color: t.label }]}>{tr.beerWithHakan}</Text>
              <Text style={[styles.planVenue, { color: t.label2 }]}>The Populist · Bomonti</Text>
            </View>

            <View style={[styles.planCard, { backgroundColor: t.surface, borderColor: t.separator }]}>
              <View style={styles.planCardHeader}>
                <Text style={[styles.planTime, { color: t.accent }]}>Cuma · 20:30</Text>
                <View style={[styles.statusBadge, { backgroundColor: 'rgba(232,163,61,0.15)' }]}>
                  <Text style={[styles.statusText, { color: t.accent }]}>{tr.invite}</Text>
                </View>
              </View>
              <Text style={[styles.planTitle, { color: t.label }]}>Belfast Irish Pub</Text>
              <Text style={[styles.planVenue, { color: t.label2 }]}>Kadıköy Moda · Mert davet etti</Text>
            </View>
          </View>
        )}

        {/* ==================== TAB 3: FRIENDS ==================== */}
        {activeTab === 'friends' && (
          <View style={styles.tabSection}>
            <Text style={[styles.sectionTitle, { color: t.label }]}>{tr.friends} (24)</Text>

            <View style={[styles.searchBar, { backgroundColor: t.surface2, borderColor: t.separator }]}>
              <Search size={16} color={t.label3} />
              <Text style={[styles.searchText, { color: t.label3 }]}>{tr.searchFriends}</Text>
            </View>

            {['Hakan', 'Mert', 'Can', 'Elif'].map((name) => (
              <View key={name} style={[styles.friendRow, { backgroundColor: t.surface, borderColor: t.separator }]}>
                <View style={[styles.friendAvatar, { backgroundColor: t.accentSoft }]}>
                  <Text style={[styles.friendAvatarText, { color: t.accentText }]}>{name[0]}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.friendName, { color: t.label }]}>{name}</Text>
                  <Text style={[styles.friendHandle, { color: t.label3 }]}>@{name.toLowerCase()}</Text>
                </View>
                <TouchableOpacity
                  style={[styles.smallPlanBtn, { backgroundColor: t.accentSoft }]}
                  onPress={() => setShowCreateModal(true)}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.smallPlanBtnText, { color: t.accentText }]}>+ Planla</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {/* ==================== TAB 4: PROFILE ==================== */}
        {activeTab === 'profile' && (
          <View style={styles.tabSection}>
            <View style={styles.profileHeader}>
              <View style={[styles.profileAvatar, { backgroundColor: t.accent, borderColor: t.bg }]}>
                <Text style={[styles.profileAvatarLetter, { color: t.accentInk }]}>S</Text>
              </View>
              <Text style={[styles.profileName, { color: t.label }]}>Serkan Bilsel</Text>
              <Text style={[styles.profileHandle, { color: t.label3 }]}>@serkanbilsel · İstanbul</Text>
              <Text style={[styles.ageBadge, { color: t.label2 }]}>{tr.ageWarning}</Text>
            </View>

            {/* Real Stats Grid per mobiledesing.md */}
            <View style={styles.statsRow}>
              <View style={[styles.statCard, { backgroundColor: t.surface, borderColor: t.separator }]}>
                <Text style={[styles.statNum, { color: t.accent }]}>12</Text>
                <Text style={[styles.statLabel, { color: t.label2 }]}>{tr.meetupsCount}</Text>
              </View>
              <View style={[styles.statCard, { backgroundColor: t.surface, borderColor: t.separator }]}>
                <Text style={[styles.statNum, { color: t.label }]}>8</Text>
                <Text style={[styles.statLabel, { color: t.label2 }]}>{tr.venuesCount}</Text>
              </View>
              <View style={[styles.statCard, { backgroundColor: t.surface, borderColor: t.separator }]}>
                <Text style={[styles.statNum, { color: t.success }]}>45</Text>
                <Text style={[styles.statLabel, { color: t.label2 }]}>{tr.cheersCount}</Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Floating Action Button (+ Yeni Plan) - Liquid Glass Amber per Section 6 */}
      <TouchableOpacity
        style={[
          styles.fabBtn,
          {
            backgroundColor: t.accent,
            shadowColor: t.accent,
          },
        ]}
        onPress={() => {
          setCreateStep(1);
          setPlanCreated(false);
          setShowCreateModal(true);
        }}
        activeOpacity={0.85}
      >
        <Plus size={18} color={t.accentInk} strokeWidth={3} />
        <Text style={[styles.fabText, { color: t.accentInk }]}>{tr.newPlan}</Text>
      </TouchableOpacity>

      {/* Bottom Liquid Glass Tab Bar per Section 2 & 6 */}
      <View style={styles.tabBarContainer}>
        <GlassSurface
          theme={themeMode}
          variant="clear"
          borderRadius={radius.full}
          style={styles.tabBarGlass}
        >
          <TouchableOpacity
            style={[styles.tabItem, activeTab === 'timeline' && { backgroundColor: t.accentSoft }]}
            onPress={() => setActiveTab('timeline')}
            activeOpacity={0.7}
          >
            <Layers size={20} color={activeTab === 'timeline' ? t.accentText : t.label2} />
            <Text style={[styles.tabLabel, { color: activeTab === 'timeline' ? t.accentText : t.label2 }]}>
              {tr.timeline}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabItem, activeTab === 'plans' && { backgroundColor: t.accentSoft }]}
            onPress={() => setActiveTab('plans')}
            activeOpacity={0.7}
          >
            <Calendar size={20} color={activeTab === 'plans' ? t.accentText : t.label2} />
            <Text style={[styles.tabLabel, { color: activeTab === 'plans' ? t.accentText : t.label2 }]}>
              {tr.plans}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabItem, activeTab === 'friends' && { backgroundColor: t.accentSoft }]}
            onPress={() => setActiveTab('friends')}
            activeOpacity={0.7}
          >
            <Users size={20} color={activeTab === 'friends' ? t.accentText : t.label2} />
            <Text style={[styles.tabLabel, { color: activeTab === 'friends' ? t.accentText : t.label2 }]}>
              {tr.friends}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabItem, activeTab === 'profile' && { backgroundColor: t.accentSoft }]}
            onPress={() => setActiveTab('profile')}
            activeOpacity={0.7}
          >
            <UserCircle2 size={20} color={activeTab === 'profile' ? t.accentText : t.label2} />
            <Text style={[styles.tabLabel, { color: activeTab === 'profile' ? t.accentText : t.label2 }]}>
              {tr.profile}
            </Text>
          </TouchableOpacity>
        </GlassSurface>
      </View>

      {/* 4-Step Create Plan Modal per mobiledesing.md Section 8 & 9 */}
      <Modal visible={showCreateModal} animationType="slide" transparent={false}>
        <SafeAreaView style={[styles.modalContainer, { backgroundColor: t.bg }]}>
          <View style={styles.modalHeader}>
            <TouchableOpacity
              style={[styles.glassCircleBtn, { backgroundColor: t.surface2 }]}
              onPress={() => setShowCreateModal(false)}
            >
              <X size={18} color={t.label} />
            </TouchableOpacity>

            {/* 4 Step Progress Bar */}
            <View style={styles.stepProgressBar}>
              {[1, 2, 3, 4].map((step) => (
                <View
                  key={step}
                  style={[
                    styles.stepBarSegment,
                    {
                      backgroundColor: step <= createStep ? t.accent : t.surface2,
                    },
                  ]}
                />
              ))}
            </View>
          </View>

          <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
            {!planCreated ? (
              <>
                {createStep === 1 && (
                  <View style={styles.stepBox}>
                    <Text style={[styles.modalStepTitle, { color: t.label }]}>{tr.whoMeeting}</Text>
                    <Text style={[styles.modalStepSub, { color: t.label2 }]}>{tr.whoSub}</Text>

                    {['Hakan', 'Mert', 'Can'].map((name) => {
                      const isSelected = selectedFriends.includes(name);
                      return (
                        <TouchableOpacity
                          key={name}
                          style={[
                            styles.friendSelectItem,
                            { backgroundColor: t.surface, borderColor: t.separator },
                          ]}
                          onPress={() => {
                            setSelectedFriends((prev) =>
                              isSelected ? prev.filter((n) => n !== name) : [...prev, name]
                            );
                          }}
                        >
                          <Text style={[styles.friendSelectName, { color: t.label }]}>{name}</Text>
                          <View
                            style={[
                              styles.checkCircle,
                              { backgroundColor: isSelected ? t.accent : t.surface2 },
                            ]}
                          >
                            {isSelected && <Check size={14} color={t.accentInk} />}
                          </View>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                )}

                {createStep === 2 && (
                  <View style={styles.stepBox}>
                    <Text style={[styles.modalStepTitle, { color: t.label }]}>{tr.whereMeeting}</Text>
                    <View style={[styles.venueOption, { backgroundColor: t.accentSoft, borderColor: t.accent }]}>
                      <MapPin size={18} color={t.accentText} />
                      <View style={{ flex: 1 }}>
                        <Text style={[styles.venueOptionTitle, { color: t.accentText }]}>The Populist</Text>
                        <Text style={[styles.venueOptionSub, { color: t.accentText, opacity: 0.8 }]}>Kadıköy Moda · 350m</Text>
                      </View>
                      <Check size={18} color={t.accentText} />
                    </View>
                  </View>
                )}

                {createStep === 3 && (
                  <View style={styles.stepBox}>
                    <Text style={[styles.modalStepTitle, { color: t.label }]}>{tr.whenMeeting}</Text>
                    {[tr.tonightOption, tr.tomorrowOption, tr.saturdayOption].map((opt, i) => (
                      <TouchableOpacity
                        key={opt}
                        style={[
                          styles.timeChip,
                          { backgroundColor: i === 0 ? t.accentSoft : t.surface, borderColor: t.separator },
                        ]}
                      >
                        <Text style={[styles.timeChipText, { color: i === 0 ? t.accentText : t.label }]}>{opt}</Text>
                        {i === 0 && <Check size={16} color={t.accentText} />}
                      </TouchableOpacity>
                    ))}
                  </View>
                )}

                {createStep === 4 && (
                  <View style={styles.stepBox}>
                    <Text style={[styles.modalStepTitle, { color: t.label }]}>Poster Teması</Text>
                    <View style={{ marginVertical: 12 }}>
                      <EventPoster
                        themeKey={selectedTheme}
                        width={260}
                        title={tr.beerWithHakan}
                        venue="The Populist · Bomonti"
                        participants={selectedFriends}
                      />
                    </View>

                    {/* 6 Theme Selector Pills */}
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.themeSelector}>
                      {(['amber', 'midnight', 'forest', 'brick', 'cream', 'graphite'] as PosterThemeKey[]).map((themeKey) => (
                        <TouchableOpacity
                          key={themeKey}
                          style={[
                            styles.themePill,
                            {
                              borderColor: selectedTheme === themeKey ? t.accent : t.separator,
                              backgroundColor: selectedTheme === themeKey ? t.accentSoft : t.surface,
                            },
                          ]}
                          onPress={() => setSelectedTheme(themeKey)}
                        >
                          <Text style={[styles.themePillText, { color: t.label }]}>{themeKey.toUpperCase()}</Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
                )}
              </>
            ) : (
              /* Plan Created Success Screen per Section 9 */
              <View style={[styles.stepBox, { alignItems: 'center', paddingTop: 20 }]}>
                <EventPoster
                  themeKey={selectedTheme}
                  width={290}
                  title={tr.beerWithHakan}
                  venue="The Populist · Bomonti"
                  participants={selectedFriends}
                />
                <View style={[styles.inviteBadge, { backgroundColor: 'rgba(46,125,79,0.15)' }]}>
                  <Text style={[styles.inviteBadgeText, { color: t.success }]}>{tr.inviteSent}</Text>
                </View>

                <TouchableOpacity
                  style={[styles.primaryModalBtn, { backgroundColor: t.accent, marginTop: 16 }]}
                  onPress={() => Alert.alert(tr.shareWhatsApp, 'Bağlantı panoya kopyalandı!')}
                >
                  <Text style={[styles.primaryModalBtnText, { color: t.accentInk }]}>{tr.shareWhatsApp}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.secondaryModalBtn, { backgroundColor: t.surface2, marginTop: 8 }]}
                  onPress={() => setShowCreateModal(false)}
                >
                  <Text style={[styles.secondaryModalBtnText, { color: t.label }]}>{tr.done}</Text>
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>

          {/* Bottom Step Progression Button */}
          {!planCreated && (
            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={[styles.primaryModalBtn, { backgroundColor: t.accent }]}
                onPress={() => {
                  if (createStep < 4) {
                    setCreateStep(createStep + 1);
                  } else {
                    setPlanCreated(true);
                  }
                }}
                activeOpacity={0.85}
              >
                <Text style={[styles.primaryModalBtnText, { color: t.accentInk }]}>
                  {createStep === 4 ? tr.createPlan : tr.continue}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  brandGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandWordmark: {
    fontSize: 17,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  glassCircleBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: StyleSheet.hairlineWidth,
  },
  localeTag: {
    fontSize: 11,
    fontWeight: '800',
  },
  scrollContent: {
    paddingTop: 12,
    alignItems: 'center',
  },
  tabSection: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  segmentedWrapper: {
    flexDirection: 'row',
    borderRadius: radius.full,
    padding: 3,
    marginBottom: 16,
    width: POSTER_WIDTH,
  },
  segmentedItem: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.full,
  },
  segmentedText: {
    fontSize: 13,
  },
  dateHeaderRow: {
    width: POSTER_WIDTH,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 4,
  },
  stickyMonth: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  stickyDay: {
    fontSize: 12,
    fontWeight: '600',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
    marginBottom: 16,
  },
  cheersBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: radius.full,
    borderWidth: StyleSheet.hairlineWidth,
  },
  cheersText: {
    fontSize: 13,
    fontWeight: '800',
    fontVariant: ['tabular-nums'],
  },
  minorActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconCircleBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: StyleSheet.hairlineWidth,
  },
  verifiedCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    borderRadius: radius.lg,
    borderWidth: StyleSheet.hairlineWidth,
  },
  verifiedIconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  verifiedTitle: {
    fontSize: 13,
    fontWeight: '700',
  },
  verifiedSub: {
    fontSize: 11,
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '900',
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  planCard: {
    width: '100%',
    padding: 16,
    borderRadius: radius.lg,
    borderWidth: StyleSheet.hairlineWidth,
    marginBottom: 12,
  },
  planCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  planTime: {
    fontSize: 12,
    fontWeight: '800',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.full,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '800',
  },
  planTitle: {
    fontSize: 16,
    fontWeight: '800',
  },
  planVenue: {
    fontSize: 13,
    marginTop: 2,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 14,
    height: 42,
    borderRadius: radius.full,
    borderWidth: StyleSheet.hairlineWidth,
    width: '100%',
    marginBottom: 16,
  },
  searchText: {
    fontSize: 13,
  },
  friendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderRadius: radius.md,
    borderWidth: StyleSheet.hairlineWidth,
    width: '100%',
    marginBottom: 8,
  },
  friendAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  friendAvatarText: {
    fontSize: 16,
    fontWeight: '800',
  },
  friendName: {
    fontSize: 14,
    fontWeight: '700',
  },
  friendHandle: {
    fontSize: 11,
  },
  smallPlanBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radius.full,
  },
  smallPlanBtnText: {
    fontSize: 11,
    fontWeight: '800',
  },
  profileHeader: {
    alignItems: 'center',
    marginVertical: 12,
  },
  profileAvatar: {
    width: 76,
    height: 76,
    borderRadius: 38,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    marginBottom: 10,
  },
  profileAvatarLetter: {
    fontSize: 32,
    fontWeight: '900',
  },
  profileName: {
    fontSize: 20,
    fontWeight: '900',
  },
  profileHandle: {
    fontSize: 13,
    marginTop: 2,
  },
  ageBadge: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 6,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
    marginTop: 16,
  },
  statCard: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: radius.lg,
    borderWidth: StyleSheet.hairlineWidth,
  },
  statNum: {
    fontSize: 20,
    fontWeight: '900',
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },
  fabBtn: {
    position: 'absolute',
    right: 20,
    bottom: 84,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    height: 46,
    paddingHorizontal: 18,
    borderRadius: radius.full,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 8,
    zIndex: 99,
  },
  fabText: {
    fontSize: 13,
    fontWeight: '900',
  },
  tabBarContainer: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 12,
    zIndex: 50,
  },
  tabBarGlass: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 60,
    paddingHorizontal: 8,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: radius.full,
    gap: 2,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '700',
  },
  modalContainer: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  stepProgressBar: {
    flex: 1,
    flexDirection: 'row',
    gap: 6,
  },
  stepBarSegment: {
    flex: 1,
    height: 4,
    borderRadius: 2,
  },
  modalBody: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  stepBox: {
    width: '100%',
  },
  modalStepTitle: {
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 4,
  },
  modalStepSub: {
    fontSize: 13,
    marginBottom: 16,
  },
  friendSelectItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
    borderRadius: radius.md,
    borderWidth: StyleSheet.hairlineWidth,
    marginBottom: 8,
  },
  friendSelectName: {
    fontSize: 15,
    fontWeight: '700',
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  venueOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderRadius: radius.lg,
    borderWidth: 1.5,
  },
  venueOptionTitle: {
    fontSize: 15,
    fontWeight: '800',
  },
  venueOptionSub: {
    fontSize: 12,
    marginTop: 2,
  },
  timeChip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
    borderRadius: radius.md,
    borderWidth: StyleSheet.hairlineWidth,
    marginBottom: 8,
  },
  timeChipText: {
    fontSize: 14,
    fontWeight: '700',
  },
  themeSelector: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
    marginBottom: 20,
  },
  themePill: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: radius.full,
    borderWidth: 1,
    marginRight: 8,
  },
  themePillText: {
    fontSize: 11,
    fontWeight: '800',
  },
  modalFooter: {
    padding: 20,
  },
  primaryModalBtn: {
    height: 52,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  primaryModalBtnText: {
    fontSize: 15,
    fontWeight: '800',
  },
  secondaryModalBtn: {
    height: 48,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  secondaryModalBtnText: {
    fontSize: 14,
    fontWeight: '700',
  },
  inviteBadge: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: radius.full,
    marginTop: 14,
  },
  inviteBadgeText: {
    fontSize: 12,
    fontWeight: '800',
  },
});

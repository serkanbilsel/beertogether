import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import {
  Calendar,
  MapPin,
  Users,
  ShieldCheck,
  Send,
  Camera,
  Check,
  User,
  Clock,
  Compass,
} from 'lucide-react-native';
import { theme } from './src/theme';

export default function App() {
  const [activeTab, setActiveTab] = useState<'timeline' | 'meetups' | 'profile'>('timeline');
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [proofUploaded, setProofUploaded] = useState(false);

  const handleCreateMeetup = () => {
    Alert.alert(
      'WhatsApp Davet Bağlantısı',
      'beertogether.app/i/x9f2 bağlantısı kopyalandı ve WhatsApp ile paylaşıma hazır.',
      [{ text: 'Tamam' }]
    );
  };

  const handleCheckIn = () => {
    Alert.alert(
      '150m GPS Doğrulaması',
      'Konumunuz Belfast Irish Pub ile eşleşti (85m). Kanıt fotoğrafını çekebilirsiniz.',
      [
        {
          text: 'Fotoğraf Çek',
          onPress: () => {
            setIsCheckedIn(true);
            setProofUploaded(true);
            Alert.alert('Tamamlandı', 'Kanıt fotoğrafı yüklendi ve buluşma onaylandı.');
          },
        },
        { text: 'İptal', style: 'cancel' },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.bg} />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerBrand}>
          <View style={styles.logoBox}>
            <Text style={styles.logoText}>BT</Text>
          </View>
          <View>
            <Text style={styles.headerTitle}>Beer Together</Text>
            <Text style={styles.headerSubtitle}>Sözler değil, planlar</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.primaryActionBtn}
          onPress={handleCreateMeetup}
          activeOpacity={0.8}
        >
          <Text style={styles.primaryActionText}>+ Planla</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content Area */}
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Active Meetup Card (Hero Section on Mobile) */}
        {activeTab === 'timeline' && (
          <>
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={styles.badgeSoft}>
                  <Text style={styles.badgeSoftText}>Sıradaki Buluşma</Text>
                </View>
                <View style={styles.timeBadge}>
                  <Clock size={12} color={theme.colors.ink2} />
                  <Text style={styles.timeBadgeText}>Bugün 20:00</Text>
                </View>
              </View>

              <Text style={styles.meetupTitle}>Cuma Akşamı Buluşması</Text>

              <View style={styles.venueRow}>
                <MapPin size={16} color={theme.colors.accentText} />
                <Text style={styles.venueText}>Belfast Irish Pub (Kadıköy)</Text>
                <View style={styles.distancePill}>
                  <Text style={styles.distanceText}>150 m</Text>
                </View>
              </View>

              <View style={styles.participantsBox}>
                <View style={styles.participantItem}>
                  <View style={styles.avatarCircle}>
                    <Text style={styles.avatarLetter}>S</Text>
                  </View>
                  <Text style={styles.participantName}>Serkan (Kurucu)</Text>
                  <Check size={14} color={theme.colors.success} style={styles.checkIcon} />
                </View>

                <View style={styles.participantItem}>
                  <View style={styles.avatarCircle}>
                    <Text style={styles.avatarLetter}>H</Text>
                  </View>
                  <Text style={styles.participantName}>Hakan</Text>
                  <Check size={14} color={theme.colors.success} style={styles.checkIcon} />
                </View>
              </View>

              <View style={styles.cardActions}>
                <TouchableOpacity
                  style={[styles.checkInBtn, isCheckedIn && styles.checkInBtnDone]}
                  onPress={handleCheckIn}
                  activeOpacity={0.8}
                  disabled={isCheckedIn}
                >
                  <Camera size={16} color={isCheckedIn ? theme.colors.success : theme.colors.accentInk} />
                  <Text style={[styles.checkInBtnText, isCheckedIn && styles.checkInBtnTextDone]}>
                    {isCheckedIn ? 'Check-in Doğrulandı' : '150m Check-in & Kanıt Fotoğrafı'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Timeline Feed Card */}
            <View style={styles.feedCard}>
              <View style={styles.feedHeader}>
                <View style={styles.feedAuthorRow}>
                  <View style={styles.avatarCircle}>
                    <Text style={styles.avatarLetter}>S</Text>
                  </View>
                  <View>
                    <Text style={styles.feedAuthorName}>Serkan & Hakan</Text>
                    <Text style={styles.feedVenueName}>Belfast Irish Pub • Kadıköy</Text>
                  </View>
                </View>
                <View style={styles.verifiedBadge}>
                  <ShieldCheck size={12} color={theme.colors.success} />
                  <Text style={styles.verifiedText}>GPS Onaylı</Text>
                </View>
              </View>

              {/* Photo Proof Area */}
              <View style={styles.proofPhotoPlaceholder}>
                <ShieldCheck size={32} color={theme.colors.accentText} />
                <Text style={styles.proofPhotoTitle}>Fotoğraflı Buluşma Kanıtı</Text>
                <Text style={styles.proofPhotoSubtitle}>150 m GPS doğrulandı · Cuma 21:14</Text>
              </View>

              <View style={styles.feedFooter}>
                <View style={styles.tagPill}>
                  <Text style={styles.tagPillText}>Herkese Açık</Text>
                </View>
                <Text style={styles.feedDateText}>5 Ekim 2026</Text>
              </View>
            </View>
          </>
        )}

        {activeTab === 'meetups' && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionHeading}>Randevularım</Text>
            <View style={styles.card}>
              <Text style={styles.meetupTitle}>Cuma Akşamı Buluşması</Text>
              <Text style={styles.venueText}>Belfast Irish Pub (Kadıköy)</Text>
              <Text style={styles.statusSuccess}>Tamamlandı · Kanıt Fotoğrafı Zaman Tünelinde</Text>
            </View>
          </View>
        )}

        {activeTab === 'profile' && (
          <View style={styles.profileSection}>
            <View style={styles.bigAvatarCircle}>
              <User size={36} color={theme.colors.accentText} />
            </View>
            <Text style={styles.profileFullName}>Serkan Kaya</Text>
            <Text style={styles.profileHandle}>@serkan · 18+ Doğrulandı</Text>

            <View style={styles.statsRow}>
              <View style={styles.statBox}>
                <Text style={styles.statValue}>12</Text>
                <Text style={styles.statLabel}>Buluşma</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statValue}>28</Text>
                <Text style={styles.statLabel}>Şerefe</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statValue}>8</Text>
                <Text style={styles.statLabel}>Arkadaş</Text>
              </View>
            </View>

            <View style={styles.disclaimerBox}>
              <Text style={styles.disclaimerText}>
                Beer Together · Yalnızca 18+ · Lütfen sorumlu içiniz.
              </Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Bottom Tab Bar */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'timeline' && styles.tabButtonActive]}
          onPress={() => setActiveTab('timeline')}
        >
          <Compass size={18} color={activeTab === 'timeline' ? theme.colors.accentText : theme.colors.ink3} />
          <Text style={[styles.tabLabel, activeTab === 'timeline' && styles.tabLabelActive]}>
            Akış
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'meetups' && styles.tabButtonActive]}
          onPress={() => setActiveTab('meetups')}
        >
          <Calendar size={18} color={activeTab === 'meetups' ? theme.colors.accentText : theme.colors.ink3} />
          <Text style={[styles.tabLabel, activeTab === 'meetups' && styles.tabLabelActive]}>
            Randevular
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'profile' && styles.tabButtonActive]}
          onPress={() => setActiveTab('profile')}
        >
          <Users size={18} color={activeTab === 'profile' ? theme.colors.accentText : theme.colors.ink3} />
          <Text style={[styles.tabLabel, activeTab === 'profile' && styles.tabLabelActive]}>
            Profil
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.bg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    backgroundColor: theme.colors.bg,
  },
  headerBrand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoBox: {
    width: 32,
    height: 32,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    color: theme.colors.accentInk,
    fontWeight: '700',
    fontSize: 14,
  },
  headerTitle: {
    color: theme.colors.ink,
    fontSize: 16,
    fontWeight: '700',
  },
  headerSubtitle: {
    color: theme.colors.ink2,
    fontSize: 11,
  },
  primaryActionBtn: {
    backgroundColor: theme.colors.accent,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: theme.radius.md,
  },
  primaryActionText: {
    color: theme.colors.accentInk,
    fontWeight: '600',
    fontSize: 13,
  },
  scrollContainer: {
    padding: 16,
    gap: 16,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  badgeSoft: {
    backgroundColor: theme.colors.accentSoft,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: theme.radius.pill,
  },
  badgeSoftText: {
    color: theme.colors.accentText,
    fontSize: 11,
    fontWeight: '600',
  },
  timeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timeBadgeText: {
    color: theme.colors.ink2,
    fontSize: 12,
  },
  meetupTitle: {
    color: theme.colors.ink,
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 6,
  },
  venueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
  },
  venueText: {
    color: theme.colors.ink2,
    fontSize: 13,
  },
  distancePill: {
    backgroundColor: theme.colors.surface2,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: theme.radius.sm,
  },
  distanceText: {
    color: theme.colors.accentText,
    fontSize: 10,
    fontWeight: '700',
  },
  participantsBox: {
    backgroundColor: theme.colors.surface2,
    borderRadius: theme.radius.md,
    padding: 10,
    gap: 8,
    marginBottom: 14,
  },
  participantItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  avatarCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: theme.colors.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarLetter: {
    color: theme.colors.accentText,
    fontWeight: '700',
    fontSize: 12,
  },
  participantName: {
    color: theme.colors.ink,
    fontSize: 13,
    fontWeight: '500',
    flex: 1,
  },
  checkIcon: {
    marginLeft: 'auto',
  },
  cardActions: {
    marginTop: 4,
  },
  checkInBtn: {
    backgroundColor: theme.colors.accent,
    borderRadius: theme.radius.md,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  checkInBtnDone: {
    backgroundColor: theme.colors.surface2,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  checkInBtnText: {
    color: theme.colors.accentInk,
    fontWeight: '600',
    fontSize: 13,
  },
  checkInBtnTextDone: {
    color: theme.colors.success,
  },
  feedCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    overflow: 'hidden',
  },
  feedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
  },
  feedAuthorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  feedAuthorName: {
    color: theme.colors.ink,
    fontSize: 14,
    fontWeight: '600',
  },
  feedVenueName: {
    color: theme.colors.ink2,
    fontSize: 11,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: theme.colors.successSoft,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: theme.radius.pill,
  },
  verifiedText: {
    color: theme.colors.success,
    fontSize: 10,
    fontWeight: '600',
  },
  proofPhotoPlaceholder: {
    height: 180,
    backgroundColor: theme.colors.surface2,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: theme.colors.border,
  },
  proofPhotoTitle: {
    color: theme.colors.ink,
    fontSize: 13,
    fontWeight: '600',
    marginTop: 6,
  },
  proofPhotoSubtitle: {
    color: theme.colors.ink3,
    fontSize: 11,
  },
  feedFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  tagPill: {
    backgroundColor: theme.colors.surface2,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: theme.radius.sm,
  },
  tagPillText: {
    color: theme.colors.ink2,
    fontSize: 11,
    fontWeight: '500',
  },
  feedDateText: {
    color: theme.colors.ink3,
    fontSize: 11,
  },
  sectionContainer: {
    gap: 12,
  },
  sectionHeading: {
    color: theme.colors.ink,
    fontSize: 18,
    fontWeight: '700',
  },
  statusSuccess: {
    color: theme.colors.success,
    fontSize: 12,
    marginTop: 6,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  bigAvatarCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: theme.colors.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: theme.colors.accent,
  },
  profileFullName: {
    color: theme.colors.ink,
    fontSize: 18,
    fontWeight: '700',
  },
  profileHandle: {
    color: theme.colors.ink2,
    fontSize: 12,
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 40,
    marginBottom: 24,
  },
  statBox: {
    alignItems: 'center',
  },
  statValue: {
    color: theme.colors.accentText,
    fontSize: 18,
    fontWeight: '700',
  },
  statLabel: {
    color: theme.colors.ink2,
    fontSize: 11,
    marginTop: 2,
  },
  disclaimerBox: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  disclaimerText: {
    color: theme.colors.ink3,
    fontSize: 11,
    textAlign: 'center',
  },
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    backgroundColor: theme.colors.bg,
    paddingVertical: 8,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    gap: 3,
  },
  tabButtonActive: {},
  tabLabel: {
    color: theme.colors.ink3,
    fontSize: 11,
    fontWeight: '500',
  },
  tabLabelActive: {
    color: theme.colors.accentText,
    fontWeight: '700',
  },
});

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { radius } from '../theme/tokens';

export type PosterThemeKey = 'amber' | 'midnight' | 'forest' | 'brick' | 'cream' | 'graphite';

export interface PosterTheme {
  bg: string;
  text: string;
  accent: string;
}

export const posterThemes: Record<PosterThemeKey, PosterTheme> = {
  amber: { bg: '#E8A33D', text: '#1A1612', accent: '#1A1612' },
  midnight: { bg: '#101A33', text: '#F5F1EA', accent: '#F0B65A' },
  forest: { bg: '#16352A', text: '#F2EFE6', accent: '#E8A33D' },
  brick: { bg: '#8A2F22', text: '#FBEBD0', accent: '#F0B65A' },
  cream: { bg: '#F3E9D8', text: '#1A1612', accent: '#B8741A' },
  graphite: { bg: '#1F1D1B', text: '#F5F1EA', accent: '#E8A33D' },
};

interface EventPosterProps {
  themeKey?: PosterThemeKey;
  width?: number;
  dayNumber?: string;
  dateLine?: string;
  title?: string;
  venue?: string;
  participants?: string[];
}

export const EventPoster: React.FC<EventPosterProps> = ({
  themeKey = 'amber',
  width = 330,
  dayNumber = '03',
  dateLine = 'EKİM · CUMARTESİ · 21:00',
  title = "Hakan'la bira",
  venue = 'The Populist · Bomonti',
  participants = ['Serkan', 'Hakan', 'Mert'],
}) => {
  const theme = posterThemes[themeKey] || posterThemes.amber;
  const height = width * 1.25; // 4:5 vertical aspect ratio
  const pad = width * 0.07;
  const numSize = width * 0.40;

  return (
    <View
      style={[
        styles.card,
        {
          width,
          height,
          backgroundColor: theme.bg,
          padding: pad,
        },
      ]}
    >
      {/* Radial soft lighting effect */}
      <View
        style={[
          styles.radialGlow,
          {
            backgroundColor: theme.accent,
            opacity: 0.12,
            right: -width * 0.2,
            top: -width * 0.2,
            width: width * 0.8,
            height: width * 0.8,
            borderRadius: width * 0.4,
          },
        ]}
      />

      {/* Top Wordmark */}
      <View style={styles.topRow}>
        <Text style={[styles.wordmark, { color: theme.text, opacity: 0.75 }]}>
          BEER TOGETHER
        </Text>
      </View>

      {/* Giant Typography Date */}
      <View style={styles.dateBlock}>
        <Text style={[styles.dayNumber, { color: theme.accent, fontSize: numSize, lineHeight: numSize * 0.95 }]}>
          {dayNumber}
        </Text>
        <Text style={[styles.dateLine, { color: theme.text, opacity: 0.85 }]}>
          {dateLine}
        </Text>
      </View>

      {/* Bottom Event Meta */}
      <View style={styles.bottomBlock}>
        <Text style={[styles.title, { color: theme.text }]} numberOfLines={2}>
          {title}
        </Text>
        <Text style={[styles.venue, { color: theme.text, opacity: 0.85 }]} numberOfLines={1}>
          {venue}
        </Text>

        <View style={styles.avatarRow}>
          <View style={styles.avatarPile}>
            {participants.slice(0, 3).map((p, idx) => (
              <View
                key={p + idx}
                style={[
                  styles.avatar,
                  {
                    backgroundColor: theme.accent,
                    borderColor: theme.bg,
                    marginStart: idx === 0 ? 0 : -8,
                  },
                ]}
              >
                <Text style={[styles.avatarText, { color: theme.bg }]}>
                  {p[0]}
                </Text>
              </View>
            ))}
          </View>
          <Text style={[styles.names, { color: theme.text, opacity: 0.9 }]}>
            {participants.join(', ')}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.xl,
    justifyContent: 'space-between',
    overflow: 'hidden',
    position: 'relative',
    alignSelf: 'center',
  },
  radialGlow: {
    position: 'absolute',
  },
  topRow: {
    zIndex: 2,
  },
  wordmark: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  dateBlock: {
    zIndex: 2,
    marginVertical: 'auto',
  },
  dayNumber: {
    fontWeight: '900',
    letterSpacing: -2,
    fontVariant: ['tabular-nums'],
  },
  dateLine: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    marginTop: 4,
  },
  bottomBlock: {
    zIndex: 2,
    gap: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  venue: {
    fontSize: 13,
    fontWeight: '600',
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 6,
  },
  avatarPile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 11,
    fontWeight: '800',
  },
  names: {
    fontSize: 12,
    fontWeight: '700',
  },
});

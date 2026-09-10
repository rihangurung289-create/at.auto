// Design Tokens based on The Golden Rule (60-30-10 Rule)
// 60% Dominant: Slate Mist Canvas (#F1F5F9) & Crisp Pure Card (#FFFFFF)
// 30% Secondary: Deep Academic Navy (#0F1E36 / #17284A) for Sidebar, structural cards, headers & typography
// 10% Accent Pop: Sapphire Blue (#2563EB), Emerald Green (#10B981), Warm Amber/Gold (#F59E0B), Crimson (#EF4444)

export const colors = {
  // 30% Secondary Brand & Structure
  navy: "#0F1E36",
  navyLight: "#17284A",
  navyBorder: "#1E3A5F",
  ink: "#0F172A",
  slate: "#334155",
  sub: "#64748B",
  muted: "#94A3B8",

  // 60% Base Canvas & Surfaces
  canvas: "#F1F5F9",
  card: "#FFFFFF",
  cardSubtle: "#F8FAFC",
  border: "#E2E8F0",
  borderStrong: "#CBD5E1",

  // 10% Accents (The Pop)
  sapphire: "#2563EB",
  sapphireLight: "#EFF6FF",
  sapphireBorder: "#BFDBFE",

  emerald: "#10B981",
  emeraldDark: "#047857",
  emeraldLight: "#ECFDF5",
  emeraldBorder: "#A7F3D0",

  amber: "#F59E0B",
  amberDark: "#B45309",
  amberLight: "#FFFBEB",
  amberBorder: "#FDE68A",

  coral: "#EF4444",
  coralDark: "#B91C1C",
  coralLight: "#FEF2F2",
  coralBorder: "#FECACA",

  purple: "#8B5CF6",
  purpleLight: "#F5F3FF"
};

export const cardBase = {
  background: colors.card,
  border: `1px solid ${colors.border}`,
  borderRadius: 12,
  boxShadow: "0 1px 3px 0 rgba(15, 23, 42, 0.06), 0 1px 2px -1px rgba(15, 23, 42, 0.06)",
};

export const statusColors = {
  present: { bg: colors.emeraldLight, fg: colors.emeraldDark, border: colors.emeraldBorder },
  absent: { bg: colors.coralLight, fg: colors.coralDark, border: colors.coralBorder },
  late: { bg: colors.amberLight, fg: colors.amberDark, border: colors.amberBorder },
  flagged: { bg: "#FEE2E2", fg: "#991B1B", border: "#FCA5A5" },
};

export const fonts = {
  headline: "'Poppins', sans-serif",
  body: "'Inter', sans-serif",
  mono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
};

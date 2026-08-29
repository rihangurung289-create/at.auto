// Design Tokens for NSS Smart Attendance Intelligence Dashboard

export const colors = {
  navy: "#17284A",
  ink: "#101B2D",
  red: "#B23A2E",
  amber: "#DD7E22",
  green: "#1C9B6B",
  canvas: "#F5F6F9",
  card: "#FFFFFF",
  border: "#E3E7EE",
  sub: "#5B6472",
  muted: "#8E96A3",
};

export const cardBase = {
  background: colors.card,
  border: `1px solid ${colors.border}`,
  borderRadius: 14,
  boxShadow: "0 1px 2px rgba(16,27,45,0.04), 0 6px 16px rgba(16,27,45,0.05)",
};

export const statusColors = {
  present: { bg: "#E3F5EC", fg: "#127A50" },
  absent: { bg: "#F1F2F4", fg: "#5B6472" },
  late: { bg: "#FCF1E4", fg: "#A15E12" },
  flagged: { bg: "#FBEAE8", fg: "#8F2A20" },
};

export const badgeTints = {
  present: { bg: "#E3F5EC", icon: "#1C9B6B" },
  absent: { bg: "#F1F2F4", icon: "#5B6472" },
  devices: { bg: "#E7EBF3", icon: "#17284A" },
};

export const fonts = {
  headline: "'Poppins', sans-serif",
  body: "'Inter', sans-serif",
  mono: "ui-monospace, SFMono-Regular, Menlo, monospace",
};

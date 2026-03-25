export interface ThemeTokens {
  // ── Colors ──
  bgPrimary: string
  bgSecondary: string
  bgPanel: string
  bgSurface: string
  bgSurfaceHover: string

  accent: string
  accentDim: string
  accentActive: string

  textPrimary: string
  textSecondary: string
  textMuted: string

  borderColor: string
  borderColorStrong: string

  bubbleIn: string
  bubbleOut: string

  avatarBg: string
  avatarColor: string
  scrollbarColor: string

  // ── Fonts ──
  fontFamily: string
  fontHeading: string
  fontMono: string

  // ── Global Layout ──
  fontSize: number
  borderRadius: number
  borderWidth: number         // px
  avatarSize: number          // px
  iconSize: number            // px

  // ── Sidebar ──
  sidebarWidth: number        // px
  sidebarPaddingX: number     // px
  sidebarPaddingY: number     // px
  sidebarGap: number          // px - gap between nav items
  navItemPaddingX: number     // px
  navItemPaddingY: number     // px
  logoFontSize: number        // px

  // ── Header ──
  headerPaddingX: number      // px
  headerPaddingY: number      // px
  headerFontSize: number      // px

  // ── Chat ──
  messageGap: number          // px - vertical gap between messages
  messagePaddingX: number     // px - horizontal padding of message area
  bubbleMaxWidth: number      // % - max width of chat bubbles
  bubblePaddingX: number      // px
  bubblePaddingY: number      // px
  bubbleGap: number           // px - gap between avatar and bubble

  // ── Message Input ──
  inputPaddingX: number       // px
  inputPaddingY: number       // px
  inputMinHeight: number      // px
  inputFontSize: number       // px

  // ── Notes ──
  noteListWidth: number       // px
  noteItemPaddingX: number    // px
  noteItemPaddingY: number    // px
  editorPadding: number       // px

  // ── Files ──
  fileGridCols: number        // number of columns
  fileGridGap: number         // px
  fileGridPadding: number     // px
  uploadAreaPaddingY: number  // px

  // ── User Footer ──
  footerPaddingX: number
  footerPaddingY: number
}

export const FONT_OPTIONS = [
  { label: 'System', value: 'system-ui, -apple-system, sans-serif' },
  { label: 'Inter', value: "'Inter', system-ui, sans-serif" },
  { label: 'Roboto', value: "'Roboto', system-ui, sans-serif" },
  { label: 'Open Sans', value: "'Open Sans', system-ui, sans-serif" },
  { label: 'Lato', value: "'Lato', system-ui, sans-serif" },
  { label: 'Poppins', value: "'Poppins', system-ui, sans-serif" },
  { label: 'Nunito', value: "'Nunito', system-ui, sans-serif" },
  { label: 'Montserrat', value: "'Montserrat', system-ui, sans-serif" },
  { label: 'Source Sans 3', value: "'Source Sans 3', system-ui, sans-serif" },
  { label: 'IBM Plex Sans', value: "'IBM Plex Sans', system-ui, sans-serif" },
  { label: 'DM Sans', value: "'DM Sans', system-ui, sans-serif" },
  { label: 'Geist', value: "'Geist', system-ui, sans-serif" },
]

export const MONO_FONT_OPTIONS = [
  { label: 'System Mono', value: 'ui-monospace, monospace' },
  { label: 'JetBrains Mono', value: "'JetBrains Mono', ui-monospace, monospace" },
  { label: 'Fira Code', value: "'Fira Code', ui-monospace, monospace" },
  { label: 'Source Code Pro', value: "'Source Code Pro', ui-monospace, monospace" },
  { label: 'IBM Plex Mono', value: "'IBM Plex Mono', ui-monospace, monospace" },
  { label: 'Geist Mono', value: "'Geist Mono', ui-monospace, monospace" },
]

export const defaultTheme: ThemeTokens = {
  // Colors
  bgPrimary: '#070810',
  bgSecondary: '#0C0D18',
  bgPanel: 'rgba(16,18,31,1)',
  bgSurface: 'rgba(22,24,38,1)',
  bgSurfaceHover: 'rgba(28,32,53,1)',

  accent: '#FF3355',
  accentDim: 'rgba(255,51,85,0.05)',
  accentActive: 'rgba(68,136,255,0.06)',

  textPrimary: '#DDE4FF',
  textSecondary: '#8A95C0',
  textMuted: '#424870',

  borderColor: '#1C2035',
  borderColorStrong: '#2A3055',

  bubbleIn: 'transparent',
  bubbleOut: 'transparent',

  avatarBg: 'rgba(68,136,255,0.12)',
  avatarColor: '#4488FF',
  scrollbarColor: 'rgba(42,48,85,1)',

  // Fonts
  fontFamily: "'Fira Code', 'Courier New', monospace",
  fontHeading: "'Syne', sans-serif",
  fontMono: "'Fira Code', 'Courier New', monospace",

  // Global
  fontSize: 15,
  borderRadius: 0,
  borderWidth: 1,
  avatarSize: 28,
  iconSize: 15,

  // Sidebar
  sidebarWidth: 200,
  sidebarPaddingX: 8,
  sidebarPaddingY: 12,
  sidebarGap: 2,
  navItemPaddingX: 12,
  navItemPaddingY: 8,
  logoFontSize: 19,

  // Header
  headerPaddingX: 20,
  headerPaddingY: 12,
  headerFontSize: 14,

  // Chat
  messageGap: 3,
  messagePaddingX: 32,
  bubbleMaxWidth: 100,
  bubblePaddingX: 18,
  bubblePaddingY: 12,
  bubbleGap: 18,

  // Input
  inputPaddingX: 0,
  inputPaddingY: 8,
  inputMinHeight: 42,
  inputFontSize: 15,

  // Notes
  noteListWidth: 260,
  noteItemPaddingX: 18,
  noteItemPaddingY: 13,
  editorPadding: 26,

  // Files
  fileGridCols: 3,
  fileGridGap: 8,
  fileGridPadding: 16,
  uploadAreaPaddingY: 16,

  // Footer
  footerPaddingX: 12,
  footerPaddingY: 12,
}

export const TOKEN_TO_VAR: Record<keyof ThemeTokens, string> = {
  bgPrimary: '--m-bg',
  bgSecondary: '--m-bg2',
  bgPanel: '--m-panel',
  bgSurface: '--m-surface',
  bgSurfaceHover: '--m-surface-hover',
  accent: '--m-accent',
  accentDim: '--m-accent-dim',
  accentActive: '--m-accent-active',
  textPrimary: '--m-text',
  textSecondary: '--m-text2',
  textMuted: '--m-text3',
  borderColor: '--m-border',
  borderColorStrong: '--m-border2',
  bubbleIn: '--m-bubble-in',
  bubbleOut: '--m-bubble-out',
  avatarBg: '--m-avatar-bg',
  avatarColor: '--m-avatar-color',
  scrollbarColor: '--m-scrollbar',
  fontFamily: '--m-font',
  fontHeading: '--m-font-heading',
  fontMono: '--m-font-mono',
  fontSize: '--m-font-size',
  borderRadius: '--m-radius',
  borderWidth: '--m-border-w',
  avatarSize: '--m-avatar-size',
  iconSize: '--m-icon-size',
  sidebarWidth: '--m-sidebar-w',
  sidebarPaddingX: '--m-sidebar-px',
  sidebarPaddingY: '--m-sidebar-py',
  sidebarGap: '--m-sidebar-gap',
  navItemPaddingX: '--m-nav-px',
  navItemPaddingY: '--m-nav-py',
  logoFontSize: '--m-logo-fs',
  headerPaddingX: '--m-header-px',
  headerPaddingY: '--m-header-py',
  headerFontSize: '--m-header-fs',
  messageGap: '--m-msg-gap',
  messagePaddingX: '--m-msg-px',
  bubbleMaxWidth: '--m-bubble-max',
  bubblePaddingX: '--m-bubble-px',
  bubblePaddingY: '--m-bubble-py',
  bubbleGap: '--m-bubble-gap',
  inputPaddingX: '--m-input-px',
  inputPaddingY: '--m-input-py',
  inputMinHeight: '--m-input-h',
  inputFontSize: '--m-input-fs',
  noteListWidth: '--m-notelist-w',
  noteItemPaddingX: '--m-note-px',
  noteItemPaddingY: '--m-note-py',
  editorPadding: '--m-editor-p',
  fileGridCols: '--m-grid-cols',
  fileGridGap: '--m-grid-gap',
  fileGridPadding: '--m-grid-p',
  uploadAreaPaddingY: '--m-upload-py',
  footerPaddingX: '--m-footer-px',
  footerPaddingY: '--m-footer-py',
}

// Which tokens are unitless (no "px" suffix)
const UNITLESS = new Set<keyof ThemeTokens>(['fileGridCols', 'bubbleMaxWidth'])

const STORAGE_KEY = 'matrix-theme'

export function loadTheme(): ThemeTokens {
  if (typeof window === 'undefined') return defaultTheme
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultTheme
    return { ...defaultTheme, ...JSON.parse(raw) }
  } catch {
    return defaultTheme
  }
}

export function saveTheme(tokens: ThemeTokens) {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tokens))
}

export function clearTheme() {
  if (typeof window === 'undefined') return
  localStorage.removeItem(STORAGE_KEY)
}

export function applyThemeToDOM(tokens: ThemeTokens) {
  const root = document.documentElement
  for (const [key, varName] of Object.entries(TOKEN_TO_VAR)) {
    const k = key as keyof ThemeTokens
    const value = tokens[k]
    if (typeof value === 'number') {
      if (UNITLESS.has(k)) {
        root.style.setProperty(varName, String(value))
      } else {
        root.style.setProperty(varName, `${value}px`)
      }
    } else {
      root.style.setProperty(varName, value as string)
    }
  }
}

/* ─── rgba helpers ─── */
export function parseRgba(rgba: string): { hex: string; opacity: number } {
  const m = rgba.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+))?\s*\)/)
  if (!m) return { hex: '#ffffff', opacity: 0.1 }
  const r = parseInt(m[1]), g = parseInt(m[2]), b = parseInt(m[3])
  const a = m[4] !== undefined ? parseFloat(m[4]) : 1
  const hex = '#' + [r, g, b].map(c => c.toString(16).padStart(2, '0')).join('')
  return { hex, opacity: a }
}

export function toRgba(hex: string, opacity: number): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r},${g},${b},${parseFloat(opacity.toFixed(3))})`
}

'use client'

import { useState } from 'react'
import { X, RotateCcw, Paintbrush, ChevronDown, ChevronRight, Copy, Check } from 'lucide-react'
import { useTheme } from './ThemeProvider'
import {
  defaultTheme,
  type ThemeTokens,
  parseRgba,
  toRgba,
  FONT_OPTIONS,
  MONO_FONT_OPTIONS,
} from '@/lib/theme'

/* ─── Tabs ─── */
const TABS = ['Farben', 'Schrift', 'Layout', 'Chat', 'Notizen', 'Dateien'] as const
type Tab = typeof TABS[number]

/* ─── Section ─── */
function Section({ title, defaultOpen = true, children }: { title: string; defaultOpen?: boolean; children: React.ReactNode }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div>
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-1.5 py-2 text-xs font-semibold uppercase tracking-wider"
        style={{ color: 'var(--m-text2)' }}
      >
        {open ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
        {title}
      </button>
      {open && <div className="flex flex-col gap-3 pb-4">{children}</div>}
    </div>
  )
}

/* ─── Hex color picker ─── */
function ColorRow({ label, tokenKey }: { label: string; tokenKey: keyof ThemeTokens }) {
  const { tokens, update } = useTheme()
  const value = tokens[tokenKey] as string
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-xs" style={{ color: 'var(--m-text)' }}>{label}</span>
      <div className="flex items-center gap-1.5">
        <input
          type="color"
          value={value}
          onChange={e => update({ [tokenKey]: e.target.value })}
          className="w-7 h-7 rounded cursor-pointer border-0 p-0"
          style={{ background: 'transparent' }}
        />
        <input
          type="text"
          value={value}
          onChange={e => update({ [tokenKey]: e.target.value })}
          className="w-[72px] text-[10px] px-1.5 py-1 rounded font-mono"
          style={{ background: 'var(--m-surface)', border: '1px solid var(--m-border)', color: 'var(--m-text)' }}
        />
      </div>
    </div>
  )
}

/* ─── RGBA color + opacity ─── */
function RgbaRow({ label, tokenKey }: { label: string; tokenKey: keyof ThemeTokens }) {
  const { tokens, update } = useTheme()
  const value = tokens[tokenKey] as string
  const { hex, opacity } = parseRgba(value)
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs" style={{ color: 'var(--m-text)' }}>{label}</span>
        <div className="flex items-center gap-1.5">
          <input type="color" value={hex} onChange={e => update({ [tokenKey]: toRgba(e.target.value, opacity) })}
            className="w-7 h-7 rounded cursor-pointer border-0 p-0" style={{ background: 'transparent' }} />
          <div className="w-7 h-7 rounded" style={{ background: value, border: '1px solid var(--m-border)' }} title={value} />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-[10px] w-14 flex-shrink-0" style={{ color: 'var(--m-text3)' }}>Deckkraft</span>
        <input type="range" min={0} max={1} step={0.005} value={opacity}
          onChange={e => update({ [tokenKey]: toRgba(hex, Number(e.target.value)) })}
          className="flex-1 h-1 rounded appearance-none cursor-pointer"
          style={{ background: 'var(--m-border2)', accentColor: 'var(--m-accent)' }} />
        <span className="text-[10px] font-mono w-8 text-right" style={{ color: 'var(--m-text2)' }}>{Math.round(opacity * 100)}%</span>
      </div>
    </div>
  )
}

/* ─── Slider ─── */
function SliderRow({ label, tokenKey, min, max, step = 1, unit = 'px' }: {
  label: string; tokenKey: keyof ThemeTokens; min: number; max: number; step?: number; unit?: string
}) {
  const { tokens, update } = useTheme()
  const value = tokens[tokenKey] as number
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <span className="text-xs" style={{ color: 'var(--m-text)' }}>{label}</span>
        <span className="text-[10px] font-mono" style={{ color: 'var(--m-text2)' }}>{value}{unit}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={e => update({ [tokenKey]: Number(e.target.value) })}
        className="w-full h-1 rounded appearance-none cursor-pointer"
        style={{ background: 'var(--m-border2)', accentColor: 'var(--m-accent)' }} />
    </div>
  )
}

/* ─── Font select ─── */
function FontSelect({ label, tokenKey, options }: {
  label: string; tokenKey: keyof ThemeTokens; options: { label: string; value: string }[]
}) {
  const { tokens, update } = useTheme()
  const value = tokens[tokenKey] as string
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs" style={{ color: 'var(--m-text)' }}>{label}</span>
      <select value={value} onChange={e => update({ [tokenKey]: e.target.value })}
        className="w-full text-xs px-2 py-1.5 rounded cursor-pointer outline-none"
        style={{ background: 'var(--m-surface)', border: '1px solid var(--m-border)', color: 'var(--m-text)', fontFamily: value }}>
        {options.map(o => <option key={o.label} value={o.value} style={{ fontFamily: o.value }}>{o.label}</option>)}
      </select>
    </div>
  )
}

/* ─── Presets ─── */
const presets: { name: string; tokens: Partial<ThemeTokens> }[] = [
  { name: 'Matrix', tokens: { ...defaultTheme } },
  { name: 'Purple', tokens: { bgPrimary:'#0D0818',bgSecondary:'#100B1F',accent:'#a855f7',accentDim:'rgba(168,85,247,0.05)',accentActive:'rgba(168,85,247,0.06)',avatarBg:'rgba(168,85,247,0.12)',avatarColor:'#a855f7',textPrimary:'#d4c4e8',textSecondary:'#7c6a8f',textMuted:'#5a4870',borderColor:'#1E1535',borderColorStrong:'#2E2555' } },
  { name: 'Ocean', tokens: { bgPrimary:'#060D18',bgSecondary:'#0A1220',accent:'#3b82f6',accentDim:'rgba(59,130,246,0.05)',accentActive:'rgba(59,130,246,0.06)',avatarBg:'rgba(59,130,246,0.12)',avatarColor:'#3b82f6',textPrimary:'#b8d0e8',textSecondary:'#5a7a96',textMuted:'#3a5570',borderColor:'#152035',borderColorStrong:'#253055' } },
  { name: 'Forest', tokens: { bgPrimary:'#060F0A',bgSecondary:'#0A1510',accent:'#22c55e',accentDim:'rgba(34,197,94,0.05)',accentActive:'rgba(34,197,94,0.06)',avatarBg:'rgba(34,197,94,0.12)',avatarColor:'#22c55e',textPrimary:'#b8d8c8',textSecondary:'#5c8070',textMuted:'#3a6050',borderColor:'#152520',borderColorStrong:'#253530' } },
  { name: 'Rose', tokens: { bgPrimary:'#100610',bgSecondary:'#150A15',accent:'#f43f5e',accentDim:'rgba(244,63,94,0.05)',accentActive:'rgba(244,63,94,0.06)',avatarBg:'rgba(244,63,94,0.12)',avatarColor:'#f43f5e',textPrimary:'#d8b8c4',textSecondary:'#806070',textMuted:'#604050',borderColor:'#251520',borderColorStrong:'#352530' } },
  { name: 'Warm', tokens: { bgPrimary:'#0F0C08',bgSecondary:'#141010',accent:'#f59e0b',accentDim:'rgba(245,158,11,0.05)',accentActive:'rgba(245,158,11,0.06)',avatarBg:'rgba(245,158,11,0.12)',avatarColor:'#f59e0b',textPrimary:'#d8cbb8',textSecondary:'#807060',textMuted:'#605040',borderColor:'#201A10',borderColorStrong:'#302A20' } },
]

/* ─── Tab Content ─── */
function TabFarben() {
  const { update } = useTheme()
  return (
    <>
      <Section title="Presets">
        <div className="grid grid-cols-3 gap-1.5">
          {presets.map(p => (
            <button key={p.name} onClick={() => update(p.tokens)}
              className="px-2 py-1.5 rounded text-[11px] transition-colors"
              style={{ background:'var(--m-surface)', border:'1px solid var(--m-border)', color:'var(--m-text)' }}>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: p.tokens.accent ?? 'var(--m-accent)' }} />
                {p.name}
              </div>
            </button>
          ))}
        </div>
      </Section>
      <Section title="Hintergrund">
        <ColorRow label="Haupt" tokenKey="bgPrimary" />
        <ColorRow label="Content" tokenKey="bgSecondary" />
        <RgbaRow label="Panel" tokenKey="bgPanel" />
        <RgbaRow label="Oberfläche" tokenKey="bgSurface" />
        <RgbaRow label="Oberfläche Hover" tokenKey="bgSurfaceHover" />
      </Section>
      <Section title="Akzent">
        <ColorRow label="Akzent" tokenKey="accent" />
        <RgbaRow label="Gedimmt" tokenKey="accentDim" />
        <RgbaRow label="Aktiv" tokenKey="accentActive" />
      </Section>
      <Section title="Text">
        <ColorRow label="Primär" tokenKey="textPrimary" />
        <ColorRow label="Sekundär" tokenKey="textSecondary" />
        <ColorRow label="Gedämpft" tokenKey="textMuted" />
      </Section>
      <Section title="Rahmen">
        <ColorRow label="Rahmen" tokenKey="borderColor" />
        <ColorRow label="Rahmen stark" tokenKey="borderColorStrong" />
      </Section>
      <Section title="Chat Bubbles">
        <RgbaRow label="Eingehend" tokenKey="bubbleIn" />
        <RgbaRow label="Ausgehend" tokenKey="bubbleOut" />
      </Section>
      <Section title="Avatar">
        <RgbaRow label="Hintergrund" tokenKey="avatarBg" />
        <ColorRow label="Textfarbe" tokenKey="avatarColor" />
      </Section>
      <Section title="Scrollbar" defaultOpen={false}>
        <RgbaRow label="Farbe" tokenKey="scrollbarColor" />
      </Section>
    </>
  )
}

function TabSchrift() {
  return (
    <>
      <Section title="Schriftarten">
        <FontSelect label="Text" tokenKey="fontFamily" options={FONT_OPTIONS} />
        <FontSelect label="Überschriften" tokenKey="fontHeading" options={FONT_OPTIONS} />
        <FontSelect label="Monospace" tokenKey="fontMono" options={MONO_FONT_OPTIONS} />
      </Section>
      <Section title="Größen">
        <SliderRow label="Basis-Schriftgröße" tokenKey="fontSize" min={11} max={20} />
        <SliderRow label="Logo-Schriftgröße" tokenKey="logoFontSize" min={10} max={24} />
        <SliderRow label="Header-Schriftgröße" tokenKey="headerFontSize" min={11} max={20} />
        <SliderRow label="Input-Schriftgröße" tokenKey="inputFontSize" min={11} max={20} />
      </Section>
    </>
  )
}

function TabLayout() {
  return (
    <>
      <Section title="Global">
        <SliderRow label="Eckenradius" tokenKey="borderRadius" min={0} max={24} />
        <SliderRow label="Rahmenbreite" tokenKey="borderWidth" min={0} max={4} />
        <SliderRow label="Avatar-Größe" tokenKey="avatarSize" min={16} max={48} />
        <SliderRow label="Icon-Größe" tokenKey="iconSize" min={10} max={24} />
      </Section>
      <Section title="Sidebar">
        <SliderRow label="Breite" tokenKey="sidebarWidth" min={120} max={350} />
        <SliderRow label="Padding X" tokenKey="sidebarPaddingX" min={0} max={24} />
        <SliderRow label="Padding Y" tokenKey="sidebarPaddingY" min={0} max={24} />
        <SliderRow label="Nav-Abstand" tokenKey="sidebarGap" min={0} max={12} />
        <SliderRow label="Nav-Item Padding X" tokenKey="navItemPaddingX" min={4} max={24} />
        <SliderRow label="Nav-Item Padding Y" tokenKey="navItemPaddingY" min={2} max={16} />
      </Section>
      <Section title="Header">
        <SliderRow label="Padding X" tokenKey="headerPaddingX" min={8} max={40} />
        <SliderRow label="Padding Y" tokenKey="headerPaddingY" min={4} max={24} />
      </Section>
      <Section title="User-Bereich (Footer)">
        <SliderRow label="Padding X" tokenKey="footerPaddingX" min={4} max={24} />
        <SliderRow label="Padding Y" tokenKey="footerPaddingY" min={4} max={24} />
      </Section>
    </>
  )
}

function TabChat() {
  return (
    <>
      <Section title="Nachrichten">
        <SliderRow label="Abstand zwischen Nachrichten" tokenKey="messageGap" min={0} max={20} />
        <SliderRow label="Padding seitlich" tokenKey="messagePaddingX" min={4} max={40} />
        <SliderRow label="Abstand Avatar ↔ Bubble" tokenKey="bubbleGap" min={2} max={20} />
      </Section>
      <Section title="Bubbles">
        <SliderRow label="Max-Breite" tokenKey="bubbleMaxWidth" min={40} max={100} unit="%" />
        <SliderRow label="Padding X" tokenKey="bubblePaddingX" min={4} max={24} />
        <SliderRow label="Padding Y" tokenKey="bubblePaddingY" min={2} max={16} />
      </Section>
      <Section title="Eingabefeld">
        <SliderRow label="Padding X" tokenKey="inputPaddingX" min={4} max={24} />
        <SliderRow label="Padding Y" tokenKey="inputPaddingY" min={2} max={16} />
        <SliderRow label="Min-Höhe" tokenKey="inputMinHeight" min={24} max={60} />
      </Section>
    </>
  )
}

function TabNotizen() {
  return (
    <>
      <Section title="Notizliste">
        <SliderRow label="Breite" tokenKey="noteListWidth" min={140} max={400} />
        <SliderRow label="Item Padding X" tokenKey="noteItemPaddingX" min={4} max={32} />
        <SliderRow label="Item Padding Y" tokenKey="noteItemPaddingY" min={2} max={20} />
      </Section>
      <Section title="Editor">
        <SliderRow label="Padding" tokenKey="editorPadding" min={8} max={48} />
      </Section>
    </>
  )
}

function TabDateien() {
  return (
    <>
      <Section title="Bildergalerie">
        <SliderRow label="Spalten" tokenKey="fileGridCols" min={1} max={6} unit="" />
        <SliderRow label="Abstand" tokenKey="fileGridGap" min={0} max={24} />
        <SliderRow label="Padding" tokenKey="fileGridPadding" min={0} max={32} />
      </Section>
      <Section title="Upload-Bereich">
        <SliderRow label="Padding Y" tokenKey="uploadAreaPaddingY" min={4} max={48} />
      </Section>
    </>
  )
}

/* ─── Export ─── */
function ExportButton() {
  const { tokens } = useTheme()
  const [copied, setCopied] = useState(false)
  function handleCopy() {
    navigator.clipboard.writeText(JSON.stringify(tokens, null, 2))
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }
  return (
    <button onClick={handleCopy}
      className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded text-xs transition-colors"
      style={{ background:'var(--m-surface)', border:'1px solid var(--m-border)', color:'var(--m-text2)' }}>
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {copied ? 'Kopiert!' : 'Exportieren (JSON)'}
    </button>
  )
}

/* ─── Main Panel ─── */
export default function EditPanel() {
  const { editorOpen, setEditorOpen, reset } = useTheme()
  const [tab, setTab] = useState<Tab>('Farben')

  if (!editorOpen) return null

  return (
    <>
      <div className="fixed inset-0 z-[90]" style={{ background:'rgba(0,0,0,0.3)' }} onClick={() => setEditorOpen(false)} />

      <div className="fixed top-0 right-0 z-[100] h-full w-[360px] flex flex-col overflow-hidden shadow-2xl"
        style={{ background:'var(--m-bg)', borderLeft:'1px solid var(--m-border)' }}>

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 flex-shrink-0"
          style={{ borderBottom:'1px solid var(--m-border)' }}>
          <div className="flex items-center gap-2">
            <Paintbrush size={14} style={{ color:'var(--m-accent)' }} />
            <span className="text-sm font-semibold" style={{ color:'var(--m-text)' }}>Design Editor</span>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={reset} title="Reset" className="p-1.5 rounded" style={{ color:'var(--m-text2)' }}><RotateCcw size={13} /></button>
            <button onClick={() => setEditorOpen(false)} className="p-1.5 rounded" style={{ color:'var(--m-text2)' }}><X size={14} /></button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-shrink-0 overflow-x-auto" style={{ borderBottom:'1px solid var(--m-border)' }}>
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)}
              className="px-3 py-2 text-[11px] font-medium whitespace-nowrap transition-colors"
              style={{
                color: tab === t ? 'var(--m-accent)' : 'var(--m-text2)',
                borderBottom: tab === t ? '2px solid var(--m-accent)' : '2px solid transparent',
              }}>
              {t}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-1">
          {tab === 'Farben' && <TabFarben />}
          {tab === 'Schrift' && <TabSchrift />}
          {tab === 'Layout' && <TabLayout />}
          {tab === 'Chat' && <TabChat />}
          {tab === 'Notizen' && <TabNotizen />}
          {tab === 'Dateien' && <TabDateien />}

          <div className="pt-2 pb-4">
            <ExportButton />
          </div>
        </div>
      </div>
    </>
  )
}

/* ─── Toggle button ─── */
export function EditToggle() {
  const { editorOpen, setEditorOpen } = useTheme()
  return (
    <button onClick={() => setEditorOpen(!editorOpen)}
      className="fixed bottom-4 right-4 z-[80] w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110"
      style={{ background:'var(--m-accent)', color:'var(--m-bg)' }} title="Design Editor">
      <Paintbrush size={16} />
    </button>
  )
}

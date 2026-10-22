import { BrandAssetCard } from '../../components/branding/BrandAssetCard';
import { brandAssets } from '../../components/branding/brandAssets';
import { brandColors } from '../../components/branding/brandColors';
import { BrandRule } from '../../components/branding/BrandRule';
import { BrandSection } from '../../components/branding/BrandSection';
import { BrandTabs } from '../../components/branding/BrandTabs';
import { ColorSwatch } from '../../components/branding/ColorSwatch';
import { Lockup } from '../../components/logos/Lockup';
import { LogoMark10 } from '../../components/logos/LogoMark10';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Brand · AwaitIO',
  description: 'The AwaitIO logo, name, colors and type, with files to download.',
};

const sections = [
  { id: 'logo', label: 'Logo' },
  { id: 'clear-space', label: 'Clear space' },
  { id: 'name', label: 'Name' },
  { id: 'colors', label: 'Colors' },
  { id: 'typography', label: 'Typography' },
];

const BrandingPage = () => {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <p className="font-mono text-sm font-medium tracking-widest text-orange-500 uppercase">Brand</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-[-0.02em] sm:text-5xl">The AwaitIO brand</h1>
      <p className="mt-4 max-w-2xl text-lg text-gray-600">The logo, the name and the colors, with files to download. The mark is a loading arc with a dot at its end: an await in progress.</p>
      <BrandTabs sections={sections} />

      <BrandSection
        id="logo"
        title="Logo"
        description="Use the logo with the wordmark wherever there is room, the icon alone where there is not. Download the SVG for the web and print, the PNG where SVG is not accepted."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {brandAssets.map((asset) => {
            return <BrandAssetCard key={asset.file} asset={asset} />;
          })}
        </div>
      </BrandSection>

      <BrandSection
        id="clear-space"
        title="Clear space and minimum size"
        description="Keep free space around the logo at least as wide as the dot is tall, a quarter of the icon. The icon stays legible down to 16 px, the favicon size; below 24 px leave out the wordmark."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex h-56 items-center justify-center rounded-2xl border border-gray-200 bg-white">
            <div className="relative p-4 outline-2 sm:p-6 outline-offset-0 outline-orange-300 outline-dashed">
              <div className="outline-1 outline-gray-300 outline-dashed">
                <Lockup size={56} tone="light" Mark={LogoMark10} />
              </div>
            </div>
          </div>
          <div className="flex h-56 items-end justify-center gap-5 rounded-2xl sm:gap-8 border border-gray-200 bg-white pb-12">
            {[64, 32, 24, 16].map((size) => {
              return (
                <div key={size} className="flex flex-col items-center gap-3">
                  <LogoMark10 size={size} tone="light" />
                  <span className="font-mono text-xs text-gray-500">{size} px</span>
                </div>
              );
            })}
          </div>
        </div>
      </BrandSection>

      <BrandSection id="name" title="Name" description="AwaitIO is one word with a capital A, I and O, everywhere people read it: in text, in the UI, in titles and in slides.">
        <div className="grid gap-4 sm:grid-cols-2">
          <BrandRule verdict="do" label="AwaitIO in text and titles">
            <span className="text-3xl font-semibold tracking-[-0.02em]">AwaitIO</span>
          </BrandRule>
          <BrandRule verdict="do" label="awaitio only in code, npm and the domain">
            <span className="font-mono text-lg text-gray-800">npm install awaitio</span>
          </BrandRule>
          <BrandRule verdict="dont" label="Two words">
            <span className="text-3xl font-semibold tracking-[-0.02em] text-gray-400 line-through">Await IO</span>
          </BrandRule>
          <BrandRule verdict="dont" label="Lowercase or all caps in prose">
            <span className="text-3xl font-semibold tracking-[-0.02em] text-gray-400 line-through">Awaitio · AWAITIO</span>
          </BrandRule>
        </div>
      </BrandSection>

      <BrandSection id="colors" title="Colors" description="Mostly ink on paper, with orange as the only accent. Click a value to copy it.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {brandColors.map((color) => {
            return <ColorSwatch key={color.hex} color={color} />;
          })}
        </div>
      </BrandSection>

      <BrandSection id="typography" title="Typography" description="IBM Plex Mono for the wordmark only, Geist Sans for everything people read and Geist Mono for code and small labels.">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-6">
            <span className="text-xs tracking-wider text-gray-500 uppercase">Wordmark</span>
            <span className="text-4xl leading-none" style={{ fontFamily: 'var(--font-wordmark), ui-monospace, monospace', letterSpacing: '0.08em' }}>
              <span style={{ fontWeight: 600 }}>Await</span>
              <span style={{ fontWeight: 400 }}>IO</span>
            </span>
            <span className="text-gray-600">IBM Plex Mono, &quot;Await&quot; semibold and &quot;IO&quot; regular, tracking 0.08em, one color.</span>
            <code className="mt-2 text-xs break-words whitespace-normal text-gray-500">&apos;IBM Plex Mono&apos;, 600 + 400</code>
          </div>
          <div className="flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-6">
            <span className="text-xs tracking-wider text-gray-500 uppercase">Geist Sans · headings and text</span>
            <span className="text-4xl font-semibold tracking-[-0.02em]">Your code awaits</span>
            <span className="text-gray-600">The browser answers, and your function goes on.</span>
            <code className="mt-2 text-xs break-words whitespace-normal text-gray-500">&apos;Geist&apos;, ui-sans-serif, system-ui, sans-serif</code>
          </div>
          <div className="flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-6">
            <span className="text-xs tracking-wider text-gray-500 uppercase">Geist Mono · code and labels</span>
            <span className="font-mono text-2xl">await io.input.text()</span>
            <span className="font-mono text-sm text-gray-600">const email = await io.input.text(&apos;Email&apos;);</span>
            <code className="mt-2 text-xs break-words whitespace-normal text-gray-500">&apos;Geist Mono&apos;, ui-monospace, &apos;SF Mono&apos;, Menlo, monospace</code>
          </div>
        </div>
      </BrandSection>
    </div>
  );
};

// Next.js requires page files to default-export their component.
// eslint-disable-next-line import/no-default-export
export default BrandingPage;

import { AnimatedMark } from '../../components/branding/AnimatedMark';
import { BrandAssetCard } from '../../components/branding/BrandAssetCard';
import { brandAssets } from '../../components/branding/brandAssets';
import { brandColors } from '../../components/branding/brandColors';
import { BrandIconGrid } from '../../components/branding/BrandIconGrid';
import { BrandRule } from '../../components/branding/BrandRule';
import { BrandSection } from '../../components/branding/BrandSection';
import { BrandTabs } from '../../components/branding/BrandTabs';
import { ColorSwatch } from '../../components/branding/ColorSwatch';
import { Lockup } from '../../components/logos/Lockup';
import { LogoMark } from '../../components/logos/LogoMark';
import { FadeIn } from '../../components/motion/FadeIn';
import { Page } from '../../components/Page';

const sections = [
  { id: 'logo', label: 'Logo' },
  { id: 'clear-space', label: 'Clear space' },
  { id: 'states', label: 'States' },
  { id: 'icons', label: 'Icons' },
  { id: 'name', label: 'Name' },
  { id: 'colors', label: 'Colors' },
  { id: 'typography', label: 'Typography' },
];

const BrandingPage = () => {
  return (
    <Page title="Brand – AwaitIO" description="The AwaitIO logo, name, colors and type, with files to download." ogImage="brand" canonicalPath="/brand/">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <FadeIn on="load">
          <p className="font-mono text-base font-semibold tracking-widest text-orange-500 uppercase">Brand</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.02em] sm:text-5xl">The AwaitIO brand</h1>
          <p className="mt-4 max-w-2xl text-lg text-gray-600">
            The logo, the name, the colors and the type, with files to download. The mark is a ring of pixels that fills while it waits, with the orange dot at its end: an await in progress.
          </p>
        </FadeIn>
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
            <div className="flex h-56 items-center justify-center offset-card bg-white">
              <div className="relative p-4 outline-2 sm:p-6 outline-offset-0 outline-orange-300 outline-dashed">
                <div className="outline-1 outline-gray-300 outline-dashed">
                  <Lockup size={56} tone="light" />
                </div>
              </div>
            </div>
            <div className="flex h-56 items-end justify-center gap-5 offset-card bg-white sm:gap-8 pb-12">
              {[64, 32, 24, 16].map((size) => {
                return (
                  <div key={size} className="flex flex-col items-center gap-3">
                    <LogoMark size={size} tone="light" />
                    <span className="font-mono text-xs text-gray-500">{size} px</span>
                  </div>
                );
              })}
            </div>
          </div>
        </BrandSection>

        <BrandSection
          id="states"
          title="States"
          description="The mark doubles as the loader of the app and the favicon: it waits with the dot, fills while a step runs and turns green with a check when the step is done. Green appears nowhere else."
        >
          <div className="mb-4 flex h-72 flex-col items-center justify-center gap-5 offset-card bg-white">
            <AnimatedMark size={128} />
            <span className="font-mono text-xs text-gray-500">The loop: waiting, running, done</span>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { label: 'Waiting', progress: 0, done: false },
              { label: 'Running', progress: 0.6, done: false },
              { label: 'Done', progress: 1, done: true },
            ].map((state) => {
              return (
                <div key={state.label} className="offset-card flex h-48 flex-col items-center justify-center gap-4 bg-white">
                  <LogoMark size={88} tone="light" progress={state.progress} done={state.done} />
                  <span className="font-mono text-xs text-gray-500">{state.label}</span>
                </div>
              );
            })}
          </div>
        </BrandSection>

        <BrandSection
          id="icons"
          title="Icons"
          description="Every icon is drawn in the same square pixels as the mark and the sun. Large icons of cards and sections use the 32 × 32 grid with the gap showing, mid-sized icons of lists and buttons the 24 × 24 grid, small icons next to text the 16 × 16 grid."
        >
          <BrandIconGrid />
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

        <BrandSection id="colors" title="Colors" description="Ink on warm sand, with the sun orange as the only accent and green only for a finished step. Click a value to copy it.">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {brandColors.map((color) => {
              return <ColorSwatch key={color.hex} color={color} />;
            })}
          </div>
        </BrandSection>

        <BrandSection
          id="typography"
          title="Typography"
          description="IBM Plex Mono for the wordmark only, Silkscreen pixels for section headings, Geist Sans for everything people read and Geist Mono for code and small labels."
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col gap-3 offset-card bg-white p-6">
              <span className="text-xs tracking-wider text-gray-500 uppercase">Wordmark</span>
              <span className="text-4xl leading-none" style={{ fontFamily: 'var(--font-wordmark), ui-monospace, monospace', letterSpacing: '0.08em' }}>
                <span style={{ fontWeight: 600 }}>Await</span>
                <span style={{ fontWeight: 400 }}>IO</span>
              </span>
              <span className="text-gray-600">IBM Plex Mono, &quot;Await&quot; semibold and &quot;IO&quot; regular, tracking 0.08em, one color.</span>
              <code className="mt-2 text-xs break-words whitespace-normal text-gray-500">&apos;IBM Plex Mono&apos;, 600 + 400</code>
            </div>
            <div className="flex flex-col gap-3 offset-card bg-white p-6">
              <span className="text-xs tracking-wider text-gray-500 uppercase">Silkscreen · section headings</span>
              <span className="font-pixel text-2xl leading-tight">How to get a license</span>
              <span className="text-gray-600">Pixels like the ring of the logo, only for headings of sections, never for long text.</span>
              <code className="mt-2 text-xs break-words whitespace-normal text-gray-500">&apos;Silkscreen&apos;, 400</code>
            </div>
            <div className="flex flex-col gap-3 offset-card bg-white p-6">
              <span className="text-xs tracking-wider text-gray-500 uppercase">Geist Sans · headings and text</span>
              <span className="text-4xl font-semibold tracking-[-0.02em]">Your code awaits</span>
              <span className="text-gray-600">The browser answers, and your function goes on.</span>
              <code className="mt-2 text-xs break-words whitespace-normal text-gray-500">&apos;Geist&apos;, ui-sans-serif, system-ui, sans-serif</code>
            </div>
            <div className="flex flex-col gap-3 offset-card bg-white p-6">
              <span className="text-xs tracking-wider text-gray-500 uppercase">Geist Mono · code and labels</span>
              <span className="font-mono text-2xl">await io.input.text()</span>
              <span className="font-mono text-sm text-gray-600">const email = await io.input.text(&apos;Email&apos;);</span>
              <code className="mt-2 text-xs break-words whitespace-normal text-gray-500">&apos;Geist Mono&apos;, ui-monospace, &apos;SF Mono&apos;, Menlo, monospace</code>
            </div>
          </div>
        </BrandSection>
      </div>
    </Page>
  );
};

// Next.js requires page files to default-export their component.
// eslint-disable-next-line import/no-default-export
export default BrandingPage;

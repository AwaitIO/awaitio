import { ComponentTile } from '../../components/ComponentTile';
import { FadeIn } from '../../components/motion/FadeIn';
import { Page } from '../../components/Page';
import { componentShowcases } from '../../utils/componentShowcases';

// Every io component as a tile, each opening its own page, in the order of the docs.
const ComponentsIndexPage = () => {
  return (
    <Page
      title="Components – AwaitIO"
      description="Every io component of AwaitIO: inputs, selects, confirm, group and display components, each a call that shows a control and returns a typed value."
      ogImage="home"
      canonicalPath="/components/"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 py-20">
        <FadeIn on="load" className="flex max-w-2xl flex-col gap-4">
          <p className="font-pixel text-xl text-orange-500 uppercase">Components</p>
          <h1 className="text-4xl font-semibold tracking-[-0.02em] sm:text-5xl">Everything you can await</h1>
          <p className="text-lg text-gray-600">Each one is a call on io that shows a control and returns a typed value. Each page shows what it is, the simplest code and what you can set.</p>
        </FadeIn>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {componentShowcases.map((component, index) => {
            return (
              <FadeIn key={component.slug} on="load" className="grid" delay={0.1 + (index % 4) * 0.1}>
                <ComponentTile component={component} />
              </FadeIn>
            );
          })}
        </div>
      </div>
    </Page>
  );
};

// eslint-disable-next-line import/no-default-export
export default ComponentsIndexPage;

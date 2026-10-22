import { ComponentsSection } from '../components/ComponentsSection';
import { FeatureGrid } from '../components/FeatureGrid';
import { Hero } from '../components/Hero';
import { HowItWorksSection } from '../components/HowItWorksSection';
import { Page } from '../components/Page';
import { UseCasesSection } from '../components/UseCasesSection';

const HomePage = () => {
  return (
    <Page
      title="AwaitIO – backoffice written just like regular API routes"
      description="Backoffice written just like regular API routes. Each action is an async TypeScript function and every await io asks a person in the browser. No frontend to build."
      ogImage="home"
      canonicalPath="/"
    >
      <Hero />
      <HowItWorksSection />
      <ComponentsSection />
      <UseCasesSection />
      <FeatureGrid />
    </Page>
  );
};

// Next.js requires page files to default-export their component.
// eslint-disable-next-line import/no-default-export
export default HomePage;

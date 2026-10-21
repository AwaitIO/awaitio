import { ClosingCta } from '../components/ClosingCta';
import { ComponentsSection } from '../components/ComponentsSection';
import { FeatureGrid } from '../components/FeatureGrid';
import { Hero } from '../components/Hero';
import { HowItWorksSection } from '../components/HowItWorksSection';
import { UseCasesSection } from '../components/UseCasesSection';

const HomePage = () => {
  return (
    <>
      <Hero />
      <HowItWorksSection />
      <ComponentsSection />
      <UseCasesSection />
      <FeatureGrid />
      <ClosingCta />
    </>
  );
};

// Next.js requires page files to default-export their component.
// eslint-disable-next-line import/no-default-export
export default HomePage;

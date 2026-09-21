import { getHomeContent } from '@/content/home';
import { useStyle } from '@/context/global/style-context';
import Hero from './hero/hero';
import Intro from './intro/intro';
import Expertise from './expertise/expertise';
import Spotlight from './spotlight/spotlight';
import Connect from './connect/connect';

export default function MinimalMiniHome() {
  const { styleId } = useStyle();
  const content = getHomeContent(styleId);

  return (
    <div data-component="minimalmini-home">
      <section data-component="home-section-1">
        <Hero content={content.hero} />
      </section>
      <section data-component="home-section-2">
        <Intro content={content.intro} />
      </section>
      <section data-component="home-section-3">
        <Expertise content={content.expertise} />
      </section>
      <section data-component="home-section-4">
        <Spotlight content={content.spotlight} />
      </section>
      <section data-component="home-section-5">
        <Connect content={content.connect} />
      </section>
    </div>
  );
}

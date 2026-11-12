import { SiteHeader } from '@/ui/landing/site-header';
import { EmojiSection, PointsSection, RanksSection } from '@/ui/landing/sections-power';
import { CloakSection, ExposureSection, PureSoulsSection } from '@/ui/landing/sections-hunt';
import { ExpressionSection, HeroSection, IdentitySection, SocialSection } from '@/ui/landing/sections-intro';
import {
  FinaleSection,
  LeaderboardSection,
  MissionsSection,
  SafetySection,
  SiteFooter,
} from '@/ui/landing/sections-closing';

/** The Ghost Mode landing page: the 14 sections from docs/draft.md Q12, in order. */
export default function LandingPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <IdentitySection />
        <ExpressionSection />
        <SocialSection />
        <PointsSection />
        <RanksSection />
        <EmojiSection />
        <PureSoulsSection />
        <ExposureSection />
        <CloakSection />
        <MissionsSection />
        <LeaderboardSection />
        <SafetySection />
        <FinaleSection />
      </main>
      <SiteFooter />
    </>
  );
}

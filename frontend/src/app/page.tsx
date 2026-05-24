/**
 * Homepage
 */

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

import { HeroSection } from "@/components/sections/home/HeroSection";
import { CategoriesSection } from "@/components/sections/home/CategoriesSection";
import { FeaturesSection } from "@/components/sections/home/FeaturesSection";
import { SafetySection } from "@/components/sections/home/SafetySection";
import { HowItWorksSection } from "@/components/sections/home/HowItWorksSection";
import { ShowcaseSection } from "@/components/sections/home/ShowcaseSection";
import { CTASection } from "@/components/sections/home/CTASection";

export default function HomePage() {
  return (
    <main className="relative overflow-hidden bg-slate-50">
      {/* Navigation */}
      <Navbar />

      {/* Hero */}
      <HeroSection />

      {/* Categories */}
      <CategoriesSection />

      {/* Features */}
      <FeaturesSection />

      {/* Safety */}
      <SafetySection />

      {/* How It Works */}
      <HowItWorksSection />

      {/* Showcase */}
      <ShowcaseSection />

      {/* CTA */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
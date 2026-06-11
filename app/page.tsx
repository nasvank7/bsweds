'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import weddingConfig from '@/config/wedding.json';
import { WeddingConfig } from '@/lib/types';
import { LanguageProvider } from '@/lib/LanguageContext';

import SplashScreen from '@/components/SplashScreen';
import SideNavigation from '@/components/SideNavigation';
import ScrollProgress from '@/components/ui/ScrollProgress';
import MusicPlayer from '@/components/ui/MusicPlayer';

import HeroSection from '@/components/sections/HeroSection';
import QuranVerseSection from '@/components/sections/QuranVerseSection';
import BrideGroomSection from '@/components/sections/BrideGroomSection';
import EventDetailsSection from '@/components/sections/EventDetailsSection';
import CountdownTimer from '@/components/sections/CountdownTimer';
import TimelineSection from '@/components/sections/TimelineSection';
import VenueSection from '@/components/sections/VenueSection';
import FamilySection from '@/components/sections/FamilySection';
import FooterSection from '@/components/sections/FooterSection';

const config = weddingConfig as WeddingConfig;

export default function Page() {
  const [splashDone, setSplashDone] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (sessionStorage.getItem('wedding_opened')) setSplashDone(true);
  }, []);

  const handleOpen = () => {
    sessionStorage.setItem('wedding_opened', '1');
    setSplashDone(true);
  };

  if (!mounted) return null;

  return (
    <>
      <AnimatePresence>
        {!splashDone && <SplashScreen onOpen={handleOpen} />}
      </AnimatePresence>

      {splashDone && (
        <LanguageProvider>
          <ScrollProgress />
          <SideNavigation />
          {/* {config.music.enabled && <MusicPlayer src={config.music.src} />} */}
          <main>
            <HeroSection config={config} />
            <QuranVerseSection />
            <BrideGroomSection config={config} />
            <EventDetailsSection config={config} />
            <CountdownTimer weddingDate={config.weddingDate} />
            <TimelineSection config={config} />
            <VenueSection config={config} />
            <FamilySection config={config} />
            <FooterSection config={config} />
          </main>
        </LanguageProvider>
      )}
    </>
  );
}

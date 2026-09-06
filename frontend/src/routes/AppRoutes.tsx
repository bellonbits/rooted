import { Route, Routes } from 'react-router-dom'
import { PublicLayout } from '@/layouts/PublicLayout'
import { AppLayout } from '@/layouts/AppLayout'
import { RequireAuth } from '@/components/layout/RequireAuth'
import { PageTransition } from '@/components/layout/PageTransition'

import { Home } from '@/pages/public/Home'
import { About } from '@/pages/public/About'
import { HowItWorks } from '@/pages/public/HowItWorks'
import { BiblePreview } from '@/pages/public/BiblePreview'
import { Contact } from '@/pages/public/Contact'
import { NotFound } from '@/pages/public/NotFound'
import { AICompanionPage } from '@/pages/public/AICompanionPage'
import { KidsModePage } from '@/pages/public/KidsModePage'

import { Login } from '@/pages/auth/Login'
import { Register } from '@/pages/auth/Register'
import { ForgotPassword } from '@/pages/auth/ForgotPassword'

import { Splash } from '@/pages/onboarding/Splash'
import { OnboardingIntro } from '@/pages/onboarding/OnboardingIntro'
import { Personalize } from '@/pages/onboarding/Personalize'
import { Interests } from '@/pages/onboarding/Interests'

import { Dashboard } from '@/pages/app/Dashboard'
import { TodaysJourney } from '@/pages/app/TodaysJourney'
import { AICompanion } from '@/pages/app/AICompanion'
import { ReadingPlans } from '@/pages/app/ReadingPlans'
import { Journal } from '@/pages/app/Journal'
import { PrayerRoom } from '@/pages/app/PrayerRoom'
import { Progress } from '@/pages/app/Progress'
import { Discover } from '@/pages/app/Discover'
import { KidsMode } from '@/pages/app/KidsMode'
import { DiscipleshipCourses } from '@/pages/app/DiscipleshipCourses'
import { Devotional } from '@/pages/app/Devotional'
import { BibleBooks } from '@/pages/app/BibleBooks'
import { BibleChapterPicker } from '@/pages/app/BibleChapterPicker'
import { BibleReader } from '@/pages/app/BibleReader'
import { BibleSearch } from '@/pages/app/BibleSearch'
import { BibleTranslations } from '@/pages/app/BibleTranslations'
import { Prayer } from '@/pages/app/Prayer'
import { Community } from '@/pages/app/Community'
import { ReadArticle } from '@/pages/app/ReadArticle'
import { Resources } from '@/pages/app/Resources'
import { Profile } from '@/pages/app/Profile'
import { Notifications } from '@/pages/app/Notifications'
import { Settings } from '@/pages/app/Settings'

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/bible-preview" element={<BiblePreview />} />
        <Route path="/ai-companion" element={<AICompanionPage />} />
        <Route path="/kids" element={<KidsModePage />} />
        <Route path="/kids-mode" element={<KidsModePage />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
      <Route path="/register" element={<PageTransition><Register /></PageTransition>} />
      <Route path="/forgot-password" element={<PageTransition><ForgotPassword /></PageTransition>} />

      <Route path="/onboarding/splash" element={<Splash />} />
      <Route path="/onboarding" element={<PageTransition><OnboardingIntro /></PageTransition>} />
      <Route path="/onboarding/personalize" element={<PageTransition><Personalize /></PageTransition>} />
      <Route path="/onboarding/interests" element={<PageTransition><Interests /></PageTransition>} />

      {/* Special Fullscreen Experience for Kids Mode */}
      <Route path="/app/kids" element={<KidsMode />} />

      <Route element={<RequireAuth />}>
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="journey" element={<TodaysJourney />} />
          <Route path="ai" element={<AICompanion />} />
          <Route path="plans" element={<ReadingPlans />} />
          <Route path="journal" element={<Journal />} />
          <Route path="prayer" element={<PrayerRoom />} />
          <Route path="prayer-wall" element={<Prayer />} />
          <Route path="progress" element={<Progress />} />
          <Route path="discover" element={<Discover />} />
          <Route path="courses" element={<DiscipleshipCourses />} />

          <Route path="devotionals" element={<Devotional />} />
          <Route path="bible" element={<BibleBooks />} />
          <Route path="bible/search" element={<BibleSearch />} />
          <Route path="bible/translations" element={<BibleTranslations />} />
          <Route path="bible/:book" element={<BibleChapterPicker />} />
          <Route path="bible/:book/:chapter" element={<BibleReader />} />
          <Route path="community" element={<Community />} />
          <Route path="community/:id" element={<ReadArticle />} />
          <Route path="resources" element={<Resources />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="settings" element={<Settings />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

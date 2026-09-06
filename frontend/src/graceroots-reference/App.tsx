import { HashRouter, Routes, Route } from "react-router-dom";
import Splash from "./pages/Splash";
import Loading from "./pages/Loading";
import Onboarding1 from "./pages/Onboarding1";
import Onboarding2 from "./pages/Onboarding2";
import Onboarding3 from "./pages/Onboarding3";
import CreateAccount from "./pages/CreateAccount";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import Devotional from "./pages/Devotional";
import Community from "./pages/Community";
import ReadArticle from "./pages/ReadArticle";
import PrayerWall from "./pages/PrayerWall";
import Resources from "./pages/Resources";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/onboarding/1" element={<Onboarding1 />} />
        <Route path="/onboarding/2" element={<Onboarding2 />} />
        <Route path="/onboarding/3" element={<Onboarding3 />} />
        <Route path="/signup" element={<CreateAccount />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/home" element={<Home />} />
        <Route path="/devotionals" element={<Devotional />} />
        <Route path="/community" element={<Community />} />
        <Route path="/community/article" element={<ReadArticle />} />
        <Route path="/prayer" element={<PrayerWall />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </HashRouter>
  );
}

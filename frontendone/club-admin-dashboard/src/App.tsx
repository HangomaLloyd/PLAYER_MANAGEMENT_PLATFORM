import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import LandingPage from "./pages/LandingPage.tsx"; // Import the new LandingPage with .tsx extension
import Index from "./pages/Index";
import Players from "./pages/Players";
import Transfers from "./pages/Transfers";
import PlayersPublic from "./pages/PlayersPublic";
import TransfersPublic from "./pages/TransfersPublic";
import Matches from "./pages/Matches";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import AuthPage from "./pages/AuthPage.tsx";
import Clubs from "./pages/Clubs";
import News from "./pages/News";
import Statistics from "./pages/Statistics";
import Injuries from "./pages/Injuries";
import Leagues from "./pages/Leagues";
import About from "./pages/About";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Landing Page */}
          <Route path="/" element={<LandingPage />} />

          {/* Public pages from navbar */}
          <Route path="/clubs" element={<Clubs />} />
          <Route path="/news" element={<News />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/injuries" element={<Injuries />} />
          <Route path="/leagues" element={<Leagues />} />
          <Route path="/about" element={<About />} />

          {/* Public Players and Transfers pages */}
          <Route path="/players" element={<PlayersPublic />} />
          <Route path="/transfers" element={<TransfersPublic />} />

          {/* Auth page */}
          <Route path="/auth" element={<AuthPage />} />

          {/* Main dashboard routes under /dashboard, protected by auth */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            <Route index element={<Index />} />
            <Route path="players" element={<Players />} />
            <Route path="players/:playerId" element={<Players />} />
            <Route path="transfers" element={<Transfers />} />
            <Route path="matches" element={<Matches />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import LandingPage from "./pages/LandingPage.tsx"; // Import the new LandingPage with .tsx extension
import Index from "./pages/Index";
import Players from "./pages/Players";
import Transfers from "./pages/Transfers";
import Matches from "./pages/Matches";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import AuthPage from "./pages/AuthPage"; // Added import for the new AuthPage

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* New route for the Landing Page */}
          <Route path="/" element={<LandingPage />} />
          
          {/* Added a new route for the authentication page */}
          <Route path="/auth" element={<AuthPage />} />

          {/* Main dashboard routes now under /dashboard */}
          <Route path="/dashboard" element={<Layout />}>
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

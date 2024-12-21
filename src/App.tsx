import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SeasonalBackground } from "@/components/SeasonalBackground";
import Index from "./pages/Index";
import ArticlePage from "./pages/ArticlePage";
import AdminPage from "./pages/AdminPage";
import TechPersonalitiesPage from "./pages/TechPersonalitiesPage";
import TechPersonalityDetailPage from "./pages/TechPersonalityDetailPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <SeasonalBackground />
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/category/:category" element={<Index />} />
          <Route path="/tech-personalities" element={<TechPersonalitiesPage />} />
          <Route path="/tech-personality/:slug" element={<TechPersonalityDetailPage />} />
          <Route path="/article/:slug" element={<ArticlePage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
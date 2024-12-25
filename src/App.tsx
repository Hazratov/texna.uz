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
import { useTheme } from "@/hooks/use-theme";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const AppContent = () => {
  // Initialize theme
  useTheme();

  return (
    <>
      <SeasonalBackground />
      <Toaster />
      <Sonner />
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/category/:category" element={<Index />} />
          <Route path="/tech-personalities" element={<TechPersonalitiesPage />} />
          <Route path="/tech-personality/:slug" element={<TechPersonalityDetailPage />} />
          <Route path="/article/:slug" element={<ArticlePage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AppContent />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "./pages/Index";
import ArticlePage from "./pages/ArticlePage";
import AdminPage from "./pages/AdminPage";
import DailyNewsPage from "./pages/DailyNewsPage";
import DailyNewsDetailPage from "./pages/DailyNewsDetailPage";
import AdminDailyNewsPage from "./pages/AdminDailyNewsPage";
import TechPersonalitiesPage from "./pages/TechPersonalitiesPage";
import TechPersonalityDetailPage from "./pages/TechPersonalityDetailPage";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/article/:slug" element={<ArticlePage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/daily-news" element={<AdminDailyNewsPage />} />
          <Route path="/daily-news" element={<DailyNewsPage />} />
          <Route path="/daily-news/:slug" element={<DailyNewsDetailPage />} />
          <Route path="/tech-personalities" element={<TechPersonalitiesPage />} />
          <Route path="/tech-personalities/:slug" element={<TechPersonalityDetailPage />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ArticlePage from "./pages/ArticlePage";
import AdminPage from "./pages/AdminPage";
import TechPersonalitiesPage from "./pages/TechPersonalitiesPage";
import TechPersonalityDetailPage from "./pages/TechPersonalityDetailPage";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/article/:slug" element={<ArticlePage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/tech-personalities" element={<TechPersonalitiesPage />} />
        <Route path="/tech-personality/:slug" element={<TechPersonalityDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
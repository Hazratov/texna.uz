import { useEffect, useState } from "react";
import { FeaturedArticle } from "@/components/FeaturedArticle";
import { ArticleCard } from "@/components/ArticleCard";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useParams, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  slug: string;
  source?: string;
  created_at: string;
}

// Category-specific placeholder images
const categoryImages = {
  smartphones: [
    "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085"
  ],
  computers: [
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    "https://images.unsplash.com/photo-1605810230434-7631ac76ec81"
  ],
  software: [
    "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    "https://images.unsplash.com/photo-1497604401993-f2e922e5cb0a",
    "https://images.unsplash.com/photo-1518005020951-eccb494ad742"
  ]
};

const getRandomImageForCategory = (category: string) => {
  const images = categoryImages[category as keyof typeof categoryImages] || categoryImages.software;
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
};

const Index = () => {
  const { category } = useParams();
  const location = useLocation();
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetchArticles();
    
    // Subscribe to realtime changes
    const channel = supabase
      .channel('articles_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'articles'
        },
        (payload) => {
          console.log('Change received!', payload);
          fetchArticles();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [category]);

  const fetchArticles = async () => {
    try {
      let query = supabase.from('articles').select('*');
      
      if (category) {
        query = query.eq('category', category);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      // Assign random category-specific images to articles
      const articlesWithImages = (data || []).map(article => ({
        ...article,
        image: getRandomImageForCategory(article.category)
      }));
      
      setArticles(articlesWithImages);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  // Filter latest articles (within 24 hours)
  const latestArticles = articles.filter(article => {
    const articleDate = new Date(article.created_at);
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    return articleDate >= twentyFourHoursAgo;
  });

  // Featured article will be the most recent article
  const featuredArticle = latestArticles[0] || articles[0];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {location.pathname === "/" && featuredArticle && (
            <div className="mb-12">
              <FeaturedArticle {...featuredArticle} />
            </div>
          )}
          
          {location.pathname === "/" && latestArticles.length > 0 && (
            <>
              <h2 className="text-2xl font-bold mb-6">So'nggi 24 soat ichidagi yangiliklar</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {latestArticles.slice(1).map((article) => (
                  <ArticleCard key={article.id} {...article} />
                ))}
              </div>
            </>
          )}

          <h2 className="text-2xl font-bold mb-6">
            {category ? `${category.charAt(0).toUpperCase() + category.slice(1)} bo'yicha maqolalar` : "Barcha maqolalar"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles
              .filter(article => !category || article.category === category)
              .map((article) => (
                <ArticleCard key={article.id} {...article} />
              ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
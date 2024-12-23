import { useEffect, useState } from "react";
import { FeaturedArticle } from "@/components/FeaturedArticle";
import { ArticleCard } from "@/components/ArticleCard";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SubscriptionModal } from "@/components/SubscriptionModal";
import { useParams, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { getRandomImageForCategory } from "@/utils/imageUtils";

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

const Index = () => {
  const { category } = useParams();
  const location = useLocation();
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetchArticles();
    
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
      
      const articlesWithImages = (data || []).map(article => ({
        ...article,
        image: getRandomImageForCategory(article.category, article.title, article.slug)
      }));
      
      setArticles(articlesWithImages);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  const latestArticles = articles.filter(article => {
    const articleDate = new Date(article.created_at);
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    return articleDate >= twentyFourHoursAgo;
  });

  const featuredArticle = latestArticles[0] || articles[0];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <SubscriptionModal />
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
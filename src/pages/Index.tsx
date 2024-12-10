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

const Index = () => {
  const { category } = useParams();
  const location = useLocation();
  const [articles, setArticles] = useState<Article[]>([]);
  const [comments, setComments] = useState<Array<{ author: string; text: string; date: string }>>([
    {
      author: "Aziz",
      text: "Juda foydali maqola, rahmat!",
      date: "2024-03-20"
    },
    {
      author: "Dilshod",
      text: "Yangiliklar uchun rahmat",
      date: "2024-03-19"
    }
  ]);

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
      
      setArticles(data || []);
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

  const handleCommentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const author = (form.elements.namedItem('author') as HTMLInputElement).value;
    const text = (form.elements.namedItem('comment') as HTMLTextAreaElement).value;
    
    setComments(prev => [...prev, {
      author,
      text,
      date: new Date().toISOString().split('T')[0]
    }]);
    
    form.reset();
  };

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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {articles
              .filter(article => !category || article.category === category)
              .map((article) => (
                <ArticleCard key={article.id} {...article} />
              ))}
          </div>

          {/* Comments section */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold mb-6">Sharhlar va maslahatlar</h2>
            
            {/* Comment form */}
            <form onSubmit={handleCommentSubmit} className="mb-8">
              <div className="mb-4">
                <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
                  Ismingiz
                </label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  required
                  className="w-full px-4 py-2 border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
                  Izoh
                </label>
                <textarea
                  id="comment"
                  name="comment"
                  required
                  rows={4}
                  className="w-full px-4 py-2 border rounded-md"
                />
              </div>
              <button
                type="submit"
                className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90"
              >
                Yuborish
              </button>
            </form>

            {/* Comments list */}
            <div className="space-y-4">
              {comments.map((comment, index) => (
                <div key={index} className="border-b pb-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold">{comment.author}</h3>
                    <span className="text-sm text-gray-500">{comment.date}</span>
                  </div>
                  <p className="text-gray-600">{comment.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
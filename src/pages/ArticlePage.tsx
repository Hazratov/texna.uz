import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";

interface Article {
  title: string;
  content: string;
  image: string;
  category: string;
  source?: string;
  created_at: string;
}

const ArticlePage = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const { data, error } = await supabase
          .from('articles')
          .select('*')
          .eq('slug', slug)
          .single();

        if (error) throw error;
        setArticle(data);

        // Fetch related articles from the same category
        if (data) {
          const { data: related } = await supabase
            .from('articles')
            .select('*')
            .eq('category', data.category)
            .neq('slug', slug)
            .limit(3);
          
          setRelatedArticles(related || []);
        }
      } catch (error) {
        console.error('Error fetching article:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-xl">Yuklanmoqda...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-xl">Maqola topilmadi</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <span className="text-sm font-medium text-primary uppercase tracking-wider">
              {article.category}
            </span>
            <h1 className="mt-2 text-4xl font-bold text-gray-900">{article.title}</h1>
            <div className="mt-4 flex items-center text-gray-500 text-sm">
              <time dateTime={article.created_at}>
                {new Date(article.created_at).toLocaleDateString('uz-UZ', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
              {article.source && (
                <>
                  <span className="mx-2">•</span>
                  <span>Manba: {article.source}</span>
                </>
              )}
            </div>
          </div>

          <div className="relative h-[400px] rounded-xl overflow-hidden mb-8">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="prose prose-lg max-w-none">
            {article.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-6 text-gray-700 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* SEO Meta Keywords */}
          <div className="mt-8">
            <Separator className="my-8" />
            <div className="flex flex-wrap gap-2">
              {article.category === "smartphones" && (
                <>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">smartfon</span>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">mobil qurilma</span>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">telefon yangiliklari</span>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">texnologiya</span>
                </>
              )}
              {article.category === "computers" && (
                <>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">kompyuter</span>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">noutbuk</span>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">texnik yangiliklar</span>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">IT yangiliklar</span>
                </>
              )}
              {article.category === "software" && (
                <>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">dasturiy ta'minot</span>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">dasturlash</span>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">yangi dasturlar</span>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">IT texnologiyalar</span>
                </>
              )}
            </div>
          </div>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">O'xshash maqolalar</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map((related) => (
                  <Card key={related.slug} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <img
                        src={related.image}
                        alt={related.title}
                        className="w-full h-48 object-cover rounded-md mb-4"
                      />
                      <h3 className="font-semibold text-lg mb-2">{related.title}</h3>
                      <p className="text-sm text-gray-600">{related.excerpt}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default ArticlePage;
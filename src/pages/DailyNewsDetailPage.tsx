import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { formatDate } from "@/lib/utils";

interface DailyNews {
  title: string;
  content: string;
  image: string;
  created_at: string;
}

const DailyNewsDetailPage = () => {
  const { slug } = useParams();
  const [news, setNews] = useState<DailyNews | null>(null);

  useEffect(() => {
    fetchDailyNews();
  }, [slug]);

  const fetchDailyNews = async () => {
    try {
      const { data, error } = await supabase
        .from('daily_news')
        .select('*')
        .eq('slug', slug)
        .single();
      
      if (error) throw error;
      setNews(data);
    } catch (error) {
      console.error('Error fetching daily news:', error);
    }
  };

  if (!news) {
    return (
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <p>Loading...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <article className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">{news.title}</h1>
          <time className="text-muted-foreground block mb-8">
            {formatDate(news.created_at)}
          </time>
          <div className="relative h-[400px] rounded-xl overflow-hidden mb-8">
            <img
              src={news.image}
              alt={news.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            {news.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}

export default DailyNewsDetailPage;
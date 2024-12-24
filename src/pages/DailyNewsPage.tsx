import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { DailyNewsCard } from "@/components/DailyNewsCard";
import { supabase } from "@/integrations/supabase/client";

interface DailyNews {
  id: string;
  title: string;
  content: string;
  image: string;
  created_at: string;
  slug: string;
}

const DailyNewsPage = () => {
  const [news, setNews] = useState<DailyNews[]>([]);

  useEffect(() => {
    fetchDailyNews();
    
    const channel = supabase
      .channel('daily_news_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'daily_news'
        },
        () => {
          fetchDailyNews();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchDailyNews = async () => {
    try {
      const { data, error } = await supabase
        .from('daily_news')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setNews(data || []);
    } catch (error) {
      console.error('Error fetching daily news:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Kunlik Yangiliklar</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item) => (
            <DailyNewsCard key={item.id} {...item} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DailyNewsPage;
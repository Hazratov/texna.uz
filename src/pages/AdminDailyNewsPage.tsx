import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { DailyNewsForm } from "@/components/admin/DailyNewsForm";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { formatDate } from "@/lib/utils";

interface DailyNews {
  id: string;
  title: string;
  created_at: string;
  slug: string;
}

const AdminDailyNewsPage = () => {
  const [news, setNews] = useState<DailyNews[]>([]);

  useEffect(() => {
    fetchDailyNews();
  }, []);

  const fetchDailyNews = async () => {
    try {
      const { data, error } = await supabase
        .from('daily_news')
        .select('id, title, created_at, slug')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setNews(data || []);
    } catch (error) {
      console.error('Error fetching daily news:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('daily_news')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast.success("Yangilik o'chirildi!");
      fetchDailyNews();
    } catch (error) {
      console.error('Error deleting daily news:', error);
      toast.error("Xatolik yuz berdi!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Kunlik Yangiliklar Boshqaruvi</h1>
          
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Yangi Yangilik Qo'shish</h2>
            <DailyNewsForm />
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-6">Mavjud Yangiliklar</h2>
            <div className="space-y-4">
              {news.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 bg-card rounded-lg dark:bg-card dark:border dark:border-border"
                >
                  <div>
                    <h3 className="font-medium">{item.title}</h3>
                    <time className="text-sm text-muted-foreground">
                      {formatDate(item.created_at)}
                    </time>
                  </div>
                  <div className="flex gap-4">
                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(item.id)}
                    >
                      O'chirish
                    </Button>
                  </div>
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

export default AdminDailyNewsPage;
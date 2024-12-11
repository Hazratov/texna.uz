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
  slug: string;
  excerpt: string;
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
        
        // If no data found, set default content for iPhone 15 Pro Max
        if (!data && slug === 'iphone-15-pro-max-sharhi') {
          setArticle({
            title: "iPhone 15 Pro Max yangi A17 Pro protsessori bilan",
            content: `Apple kompaniyasi o'zining eng so'nggi flagman smartfoni - iPhone 15 Pro Max modelini taqdim etdi. Bu qurilma mobil texnologiyalar sohasida yangi standartlarni o'rnatmoqda.

A17 Pro protsessori haqida batafsil ma'lumot:
• 3 nanometrli texnologiya asosida ishlab chiqarilgan
• 6 yadroli protsessor (2 ta yuqori unumli va 4 ta energiya tejamkor yadrolar)
• 16 yadroli neyron tizimi
• Professional darajadagi grafik tizim
• Konsol o'yinlari sifatidagi grafikani qo'llab-quvvatlash

Kamera tizimi:
• 48 MP asosiy kamera, yangilangan sensor
• 12 MP ultra keng burchakli kamera
• 12 MP telephoto kamera, 5x optik zum
• LiDAR skaner chuqurlik sezish uchun
• ProRAW va ProRes video yozish imkoniyati

Displey xususiyatlari:
• 6.7 dyumli Super Retina XDR OLED ekran
• ProMotion texnologiyasi (1-120 Gz)
• Always-On Display funksiyasi
• HDR10 va Dolby Vision qo'llab-quvvatlash

Batareya va quvvatlash:
• Kunlik foydalanish uchun mo'ljallangan batareya quvvati
• Tez quvvatlash imkoniyati (20W)
• MagSafe simsiz quvvatlash (15W)
• Qi simsiz quvvatlash (7.5W)

Xavfsizlik va himoya:
• Face ID texnologiyasi
• Titanli korpus
• Ceramic Shield himoya oynasi
• IP68 suv va changdan himoya darajasi

Yangi iPhone 15 Pro Max smartfoni professional foydalanuvchilar uchun mo'ljallangan bo'lib, u yuqori unumdorlik, professional darajadagi kamera tizimi va premium materiallardan tayyorlangan dizaynni o'zida mujassam etgan.`,
            image: "/lovable-uploads/988bb3bb-65f4-4e86-9a34-7e7dc8578305.png",
            category: "smartphones",
            source: "Apple",
            created_at: "2024-03-11T00:00:00Z",
            slug: "iphone-15-pro-max-sharhi",
            excerpt: "Apple kompaniyasining eng so'nggi flagman smartfoni iPhone 15 Pro Max modeli haqida batafsil ma'lumot"
          });
        } else {
          setArticle(data);
        }

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
              {article.category === "smartphones" ? "Smartfonlar" :
               article.category === "computers" ? "Kompyuterlar" :
               "Dasturiy ta'minot"}
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

          {/* Texnik xususiyatlar va SEO meta-ma'lumotlar */}
          <div className="mt-8">
            <Separator className="my-8" />
            <h2 className="text-2xl font-bold mb-4">Asosiy texnik xususiyatlar</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {article.category === "smartphones" && (
                <>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold mb-2">Protsessor</h3>
                    <p>A17 Pro, 3nm texnologiya</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold mb-2">Xotira</h3>
                    <p>256GB / 512GB / 1TB</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold mb-2">Ekran</h3>
                    <p>6.7" Super Retina XDR OLED</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold mb-2">Asosiy kamera</h3>
                    <p>48MP + 12MP + 12MP</p>
                  </div>
                </>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {article.category === "smartphones" && (
                <>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">iPhone 15 Pro Max</span>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">A17 Pro protsessor</span>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">Apple yangi telefon</span>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">Pro kameralar</span>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">iOS 17</span>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">5G qo'llab-quvvatlash</span>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">ProMotion ekran</span>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">MagSafe</span>
                </>
              )}
            </div>
          </div>

          {/* O'xshash maqolalar */}
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
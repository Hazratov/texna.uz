import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { ArticleHeader } from "@/components/article/ArticleHeader";
import { ArticleImage } from "@/components/article/ArticleImage";
import { RelatedArticles } from "@/components/article/RelatedArticles";
import { SeasonalBackground } from "@/components/SeasonalBackground";
import "../styles/seasonal.css";

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
        
        // Default content for different categories
        if (!data) {
          if (slug === 'macbook-pro-16-2024') {
            setArticle({
              title: "MacBook Pro 16 2024 - Professional darajadagi noutbuk",
              content: `Apple kompaniyasi o'zining eng so'nggi MacBook Pro 16 modelini taqdim etdi. Bu qurilma professional foydalanuvchilar uchun mo'ljallangan bo'lib, yuqori unumdorlik va mukammal dizaynni o'zida mujassam etgan.

Protsessor va xotira:
• M3 Pro/Max protsessori - 12-yadroli CPU, 38-yadroli GPU
• 32 GB dan 128 GB gacha tezkor xotira
• 512 GB dan 8 TB gacha SSD xotira
• ProRes tezlatgichi va Media Engine

Displey xususiyatlari:
• 16.2 dyumli Liquid Retina XDR displey
• 3456 x 2234 piksel o'lchamli ekran
• ProMotion texnologiyasi (120 Gts)
• True Tone va P3 rang gamuti
• HDR kontenti uchun 1600 nit maksimal yorqinlik
• Mini-LED orqa yorug'lik

Ulanish imkoniyatlari:
• 3 ta Thunderbolt 4 (USB-C) port
• HDMI 2.1 porti
• SDXC kart o'quvchisi
• MagSafe 3 quvvatlash porti
• Wi-Fi 6E va Bluetooth 5.3

Audio tizimi:
• 6 ta yuqori safarli dinamiklar
• Studio sifatidagi mikrofonlar
• 3.5mm audio port professional qurilmalar uchun

Batareya va quvvatlash:
• 100 Wh sig'imli batareya
• 22 soatgacha video ko'rish
• 140W tez quvvatlash adapteri

Xavfsizlik:
• Touch ID skaneri
• Apple T2 xavfsizlik chipi
• FileVault ma'lumotlarni shifrlash

Qo'shimcha xususiyatlar:
• Force Touch trekped
• Magic Keyboard to'liq o'lchamli
• 1080p FaceTime HD kamera
• macOS Sonoma operatsion tizimi`,
              image: "/lovable-uploads/988bb3bb-65f4-4e86-9a34-7e7dc8578305.png",
              category: "computers",
              source: "Apple",
              created_at: new Date().toISOString(),
              slug: "macbook-pro-16-2024",
              excerpt: "Apple kompaniyasining eng so'nggi MacBook Pro 16 modeli haqida batafsil ma'lumot"
            });
          } else if (slug === 'visual-studio-code-2024') {
            setArticle({
              title: "Visual Studio Code 2024 - Zamonaviy kod muharriri",
              content: `Microsoft tomonidan ishlab chiqilgan Visual Studio Code (VS Code) - bu zamonaviy dasturchilar uchun eng ommabop va qulay kod muharriri hisoblanadi. 2024-yilgi yangilanish yanada ko'proq imkoniyatlarni taqdim etmoqda.

Asosiy xususiyatlar:
• Ko'p platformali qo'llab-quvvatlash (Windows, macOS, Linux)
• Intellisense code completion tizimi
• Live Share hamkorlikdagi dasturlash
• Git integratsiyasi
• Debug qilish vositalari
• Terminal integratsiyasi
• Kengaytirilgan kengaytmalar tizimi

Yangi qo'shilgan imkoniyatlar:
• AI-powered coding assistants
• Remote development
• Workspace trust
• Timeline view
• Settings sync
• Semantic highlighting

Qo'llab-quvvatlanadigan dasturlash tillari:
• JavaScript va TypeScript
• Python
• Java
• C va C++
• PHP
• Go
• Ruby
• Rust
• Va boshqa ko'plab tillar

Maxsus xususiyatlar:
• GitHub Copilot integratsiyasi
• Docker konteynerlar bilan ishlash
• WSL (Windows Subsystem for Linux) qo'llab-quvvatlash
• Jupyter Notebooks integratsiyasi
• Azure integratsiyasi

Interfeys va foydalanish qulayligi:
• Mavzular va ranglar sozlash
• Keyboard shortcuts sozlash
• Snippets yaratish
• Multi-cursor tahrirlash
• Minimap ko'rinishi
• Zen Mode

Kengaytmalar ekotizimi:
• 30,000+ kengaytmalar
• Til paketi va debuggerlar
• Mavzu va ikonkalar
• Linting va formatting tools
• Test framework integratsiyasi

Performance optimizatsiyasi:
• Startup time yaxshilangan
• Memory usage optimallashtirilgan
• Large file handling
• Search va replace tezligi
• Extension host isolation`,
              image: "/lovable-uploads/988bb3bb-65f4-4e86-9a34-7e7dc8578305.png",
              category: "software",
              source: "Microsoft",
              created_at: new Date().toISOString(),
              slug: "visual-studio-code-2024",
              excerpt: "Microsoft Visual Studio Code 2024 yangilangan versiyasi haqida batafsil ma'lumot"
            });
          } else if (slug === 'samsung-s24-ultra') {
            setArticle({
              title: "Samsung Galaxy S24 Ultra - Yangi avlod flagmani",
              content: `Samsung kompaniyasi o'zining eng so'nggi flagman smartfoni - Galaxy S24 Ultra modelini taqdim etdi. Bu qurilma AI texnologiyalari va mukammal kamera tizimi bilan jihozlangan.

Protsessor va xotira:
• Snapdragon 8 Gen 3 protsessori
• 12 GB tezkor xotira
• 256/512 GB/1TB ichki xotira
• UFS 4.0 tezkor xotira

Kamera tizimi:
• 200 MP asosiy kamera, f/1.7
• 12 MP ultra keng burchakli
• 50 MP telephoto (5x optical zoom)
• 10 MP telephoto (3x optical zoom)
• 12 MP selfie kamera
• 8K/30fps video yozish
• Pro Video mode

Displey:
• 6.8" Dynamic AMOLED 2X
• QHD+ (3088 x 1440) o'lcham
• 1-120 Hz yangilanish tezligi
• HDR10+ va Always-On Display
• 2600 nit maksimal yorqinlik
• Gorilla Glass Armor himoya

AI xususiyatlari:
• Galaxy AI integration
• Real-time tarjima
• Chat assist
• Generative edit
• Live translate calls
• Note assist

S Pen xususiyatlari:
• 2.8ms latency
• Air commands
• Screen off memo
• Samsung Notes integration
• Handwriting to text
• PENUP creative tools

Batareya va quvvatlash:
• 5000 mAh batareya
• 45W tez quvvatlash
• 15W simsiz quvvatlash
• Reverse wireless charging

Xavfsizlik:
• Ultrasonic fingerprint sensor
• Samsung Knox
• Secure folder
• Private share
• Maintenance mode

Qo'shimcha xususiyatlar:
• IP68 suv va changdan himoya
• Titanium frame
• UWB texnologiyasi
• DeX mode
• Wi-Fi 7
• 5G support`,
              image: "/lovable-uploads/988bb3bb-65f4-4e86-9a34-7e7dc8578305.png",
              category: "smartphones",
              source: "Samsung",
              created_at: new Date().toISOString(),
              slug: "samsung-s24-ultra",
              excerpt: "Samsung Galaxy S24 Ultra flagman smartfoni haqida batafsil ma'lumot"
            });
          }
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
    <div className="min-h-screen flex flex-col bg-gray-50 relative">
      <SeasonalBackground />
      <Navbar />
      <main className="flex-grow relative z-10">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg">
          <ArticleHeader
            title={article.title}
            category={article.category}
            created_at={article.created_at}
            source={article.source}
          />
          <ArticleImage image={article.image} title={article.title} />
          <div className="prose prose-lg max-w-none">
            {article.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-6 text-gray-700 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
          <RelatedArticles articles={relatedArticles} />
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default ArticlePage;

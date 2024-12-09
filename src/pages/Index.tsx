import { FeaturedArticle } from "@/components/FeaturedArticle";
import { ArticleCard } from "@/components/ArticleCard";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Index = () => {
  const { category } = useParams();
  const location = useLocation();

  // Mock data - in real app this would come from an API
  const allArticles = [
    {
      title: "iPhone 15 Pro Max: Yangi avlod flagmani",
      excerpt: "Apple kompaniyasining eng so'nggi flagman smartfoni haqida batafsil ma'lumot",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      slug: "iphone-15-pro-max-review",
      category: "smartphones",
      createdAt: new Date().toISOString() // Today's date
    },
    {
      title: "Windows 11 yangilanishi",
      excerpt: "Microsoft yangi funksiyalarni taqdim etdi",
      category: "software",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
      slug: "windows-11-update",
      createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString() // 12 hours ago
    },
    {
      title: "MacBook Air M3",
      excerpt: "Apple yangi noutbuklarni taqdim etdi",
      category: "computers",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      slug: "macbook-air-m3",
      createdAt: new Date(Date.now() - 25 * 60 * 60 * 1000).toISOString() // 25 hours ago
    },
    {
      title: "Android 14 yangiliklari",
      excerpt: "Google yangi operatsion tizimni ishga tushirdi",
      category: "software",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      slug: "android-14-features",
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() // 2 hours ago
    }
  ];

  // Filter articles based on category and time
  const filteredArticles = allArticles.filter(article => {
    if (category && article.category !== category) {
      return false;
    }
    return true;
  });

  // Get latest articles (within 24 hours)
  const latestArticles = allArticles.filter(article => {
    const articleDate = new Date(article.createdAt);
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    return articleDate >= twentyFourHoursAgo;
  });

  // Featured article will be the most recent article
  const featuredArticle = latestArticles[0] || allArticles[0];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {location.pathname === "/" && (
            <div className="mb-12">
              <FeaturedArticle {...featuredArticle} />
            </div>
          )}
          
          {location.pathname === "/" && latestArticles.length > 0 && (
            <>
              <h2 className="text-2xl font-bold mb-6">So'nggi 24 soat ichidagi yangiliklar</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {latestArticles.slice(1).map((article, index) => (
                  <ArticleCard key={index} {...article} />
                ))}
              </div>
            </>
          )}

          <h2 className="text-2xl font-bold mb-6">
            {category ? `${category.charAt(0).toUpperCase() + category.slice(1)} bo'yicha maqolalar` : "Barcha maqolalar"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article, index) => (
              <ArticleCard key={index} {...article} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
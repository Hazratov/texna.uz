import { FeaturedArticle } from "@/components/FeaturedArticle";
import { ArticleCard } from "@/components/ArticleCard";
import { Navbar } from "@/components/Navbar";

const Index = () => {
  const featuredArticle = {
    title: "iPhone 15 Pro Max: Yangi avlod flagmani",
    excerpt: "Apple kompaniyasining eng so'nggi flagman smartfoni haqida batafsil ma'lumot",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    slug: "iphone-15-pro-max-review"
  };

  const latestArticles = [
    {
      title: "Windows 11 yangilanishi",
      excerpt: "Microsoft yangi funksiyalarni taqdim etdi",
      category: "Dasturiy ta'minot",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
      slug: "windows-11-update"
    },
    {
      title: "MacBook Air M3",
      excerpt: "Apple yangi noutbuklarni taqdim etdi",
      category: "Kompyuterlar",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      slug: "macbook-air-m3"
    },
    {
      title: "Android 14 yangiliklari",
      excerpt: "Google yangi operatsion tizimni ishga tushirdi",
      category: "Dasturiy ta'minot",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      slug: "android-14-features"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <FeaturedArticle {...featuredArticle} />
        
        <h2 className="text-2xl font-bold mt-12 mb-6">So'nggi yangiliklar</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestArticles.map((article, index) => (
            <ArticleCard key={index} {...article} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;
import { FeaturedArticle } from "@/components/FeaturedArticle";
import { ArticleCard } from "@/components/ArticleCard";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const Index = () => {
  const { category } = useParams();
  const location = useLocation();
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

  // Mock data - in real app this would come from an API
  const allArticles = [
    {
      title: "iPhone 15 Pro Max: Yangi avlod flagmani",
      excerpt: "Apple kompaniyasining eng so'nggi flagman smartfoni haqida batafsil ma'lumot",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      slug: "iphone-15-pro-max-review",
      category: "smartphones",
      source: "Apple.com",
      createdAt: new Date().toISOString()
    },
    {
      title: "Windows 11 yangilanishi",
      excerpt: "Microsoft yangi funksiyalarni taqdim etdi",
      category: "software",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
      slug: "windows-11-update",
      source: "Microsoft Blog",
      createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString()
    },
    {
      title: "MacBook Air M3",
      excerpt: "Apple yangi noutbuklarni taqdim etdi",
      category: "computers",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      slug: "macbook-air-m3",
      source: "TechCrunch",
      createdAt: new Date(Date.now() - 25 * 60 * 60 * 1000).toISOString()
    },
    {
      title: "Android 14 yangiliklari",
      excerpt: "Google yangi operatsion tizimni ishga tushirdi",
      category: "software",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      slug: "android-14-features",
      source: "Google Blog",
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
    },
    {
      title: "Samsung Galaxy S24 Ultra taqdimoti",
      excerpt: "Samsung'ning eng so'nggi flagmani haqida batafsil ma'lumot",
      category: "smartphones",
      image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf",
      slug: "samsung-s24-ultra",
      source: "Samsung Newsroom",
      createdAt: "2024-03-15T10:00:00Z"
    },
    {
      title: "ChatGPT-5 AI modeli",
      excerpt: "OpenAI yangi sun'iy intellekt modelini taqdim etdi",
      category: "software",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
      slug: "chatgpt-5-release",
      source: "OpenAI Blog",
      createdAt: "2024-03-10T15:30:00Z"
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredArticles.map((article, index) => (
              <ArticleCard key={index} {...article} />
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
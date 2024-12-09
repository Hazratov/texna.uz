import { useParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const ArticlePage = () => {
  const { slug } = useParams();

  // This is a mock article data - in a real app, you would fetch this from an API
  const article = {
    title: "iPhone 15 Pro Max: Yangi avlod flagmani",
    content: `
      Apple kompaniyasining eng so'nggi flagman smartfoni haqida batafsil ma'lumot.
      
      Yangi iPhone 15 Pro Max o'zining titanli korpusi, yangilangan kamera tizimi va 
      A17 Pro protsessori bilan ajralib turadi. Qurilma 6.7 dyumli Super Retina XDR 
      OLED displey bilan jihozlangan bo'lib, 120 Gts yangilanish tezligini taqdim etadi.
      
      Asosiy kamera tizimi 48 MP asosiy sensor, 12 MP ultra keng burchakli va 12 MP 
      telephoto kameralardan iborat. 5x optical zoom imkoniyati bilan jihozlangan.
    `,
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    date: "2024-03-15",
    category: "Smartfonlar"
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-[400px] object-cover rounded-xl mb-8"
          />
          <div className="space-y-4">
            <span className="text-sm font-semibold text-primary">
              {article.category}
            </span>
            <h1 className="text-4xl font-bold text-gray-900">{article.title}</h1>
            <time className="text-sm text-gray-500">{article.date}</time>
            <div className="prose prose-lg max-w-none">
              {article.content.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4">{paragraph}</p>
              ))}
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default ArticlePage;
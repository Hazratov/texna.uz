import { useParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const ArticlePage = () => {
  const { slug } = useParams();

  // Mock articles data - real application would fetch from API
  const articles = {
    "iphone-15-pro-max-review": {
      title: "iPhone 15 Pro Max: Yangi avlod flagmani",
      content: `
        Apple kompaniyasining eng so'nggi flagman smartfoni haqida batafsil ma'lumot.
        
        Yangi iPhone 15 Pro Max o'zining titanli korpusi, yangilangan kamera tizimi va 
        A17 Pro protsessori bilan ajralib turadi. Qurilma 6.7 dyumli Super Retina XDR 
        OLED displey bilan jihozlangan bo'lib, 120 Gts yangilanish tezligini taqdim etadi.
        
        Asosiy kamera tizimi 48 MP asosiy sensor, 12 MP ultra keng burchakli va 12 MP 
        telephoto kameralardan iborat. 5x optical zoom imkoniyati bilan jihozlangan.

        Batareya quvvati oldingi modelga nisbatan 10% ga oshirilgan. USB-C porti 
        orqali tez quvvatlash imkoniyati mavjud.
      `,
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      date: "2024-03-15",
      category: "Smartfonlar",
      source: "Apple.com",
      specs: {
        display: "6.7\" Super Retina XDR OLED",
        processor: "A17 Pro",
        camera: "48MP + 12MP + 12MP",
        battery: "4422 mAh",
        storage: "128GB/256GB/512GB/1TB"
      }
    },
    "windows-11-update": {
      title: "Windows 11 yangilanishi",
      content: `
        Microsoft Windows 11 operatsion tizimi uchun yangi funksiyalarni taqdim etdi.
        
        Yangi versiyada sun'iy intellekt imkoniyatlari kengaytirilgan. Windows Copilot 
        yordamchi tizimi orqali foydalanuvchilar turli vazifalarni osonroq bajarishi mumkin.
        
        Tizimning yangi versiyasi Android ilovalarni yanada yaxshiroq qo'llab-quvvatlaydi 
        va foydalanuvchi interfeysida ham sezilarli o'zgarishlar mavjud.
      `,
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
      date: "2024-03-18",
      category: "Software",
      source: "Microsoft Blog",
      specs: {
        version: "Windows 11 23H2",
        requirements: "TPM 2.0, 4GB RAM, 64GB storage",
        features: "Windows Copilot, Android app support",
        release: "2024 March Update"
      }
    },
    "macbook-air-m3": {
      title: "MacBook Air M3",
      content: `
        Apple yangi MacBook Air noutbuklarini M3 protsessori bilan taqdim etdi.
        
        Yangi MacBook Air M3 avvalgi versiyaga nisbatan 60% tezroq ishlaydi. 
        Grafik tizimi ham sezilarli darajada yaxshilangan.
        
        Qurilma 18 soatgacha batareya quvvatida ishlashi mumkin. Yangi versiya 
        Wi-Fi 6E va yaxshilangan veb-kamerani o'z ichiga oladi.
      `,
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      date: "2024-03-17",
      category: "Computers",
      source: "TechCrunch",
      specs: {
        processor: "Apple M3",
        memory: "8GB/16GB unified memory",
        storage: "256GB/512GB/1TB SSD",
        display: "13.6\" Liquid Retina"
      }
    }
  };

  const article = articles[slug as keyof typeof articles];

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Maqola topilmadi</h1>
            <p className="mt-2 text-gray-600">Kechirasiz, so'ralgan maqola mavjud emas.</p>
          </div>
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
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-[400px] object-cover rounded-xl mb-8"
          />
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                {article.category}
              </span>
              <time className="text-sm text-gray-500">{article.date}</time>
            </div>
            <h1 className="text-4xl font-bold text-gray-900">{article.title}</h1>
            {article.source && (
              <p className="text-sm text-gray-500">
                Manba: {article.source}
              </p>
            )}
            <div className="prose prose-lg max-w-none">
              {article.content.split('\n').map((paragraph, index) => (
                paragraph.trim() && <p key={index} className="mb-4">{paragraph}</p>
              ))}
            </div>
            {article.specs && (
              <div className="mt-8 bg-gray-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Texnik xususiyatlar</h2>
                <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {Object.entries(article.specs).map(([key, value]) => (
                    <div key={key} className="border-b border-gray-200 pb-2">
                      <dt className="font-medium text-gray-500 capitalize">{key}</dt>
                      <dd className="mt-1 text-gray-900">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default ArticlePage;
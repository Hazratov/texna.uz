import { useParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const ArticlePage = () => {
  const { slug } = useParams();

  // Mock data - real application would fetch from API
  const articles = {
    "iphone-15-pro-max-review": {
      title: "iPhone 15 Pro Max: Yangi avlod flagmani",
      content: `
        Apple kompaniyasi o'zining eng so'nggi iPhone 15 Pro Max modelini taqdim etdi. 
        Bu smartfon titanli korpus, yangilangan kamera tizimi va A17 Pro protsessori bilan jihozlangan.

        Asosiy xususiyatlari:
        - 6.7 dyumli Super Retina XDR OLED ekran
        - A17 Pro protsessor
        - 48MP asosiy kamera
        - 5x optik zum
        - USB-C port
        - Titanli ramka
        - iOS 17

        Batareya quvvati 4422 mAh bo'lib, 20W tezlikda quvvatlanadi. 
        Smartfon 128GB, 256GB, 512GB va 1TB xotira variantlarida taqdim etilgan.
      `,
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      category: "smartphones",
      source: "Apple.com",
      publishDate: "2024-03-20",
      specs: {
        processor: "A17 Pro",
        ram: "8GB",
        storage: "128GB-1TB",
        display: "6.7\" Super Retina XDR",
        battery: "4422 mAh"
      }
    },
    "windows-11-update": {
      title: "Windows 11 yangilanishi",
      content: `
        Microsoft Windows 11 operatsion tizimi uchun yangi katta yangilanishni e'lon qildi.
        Bu yangilanish foydalanuvchi interfeysini yangilaydi va yangi xavfsizlik funksiyalarini qo'shadi.

        Asosiy yangiliklar:
        - Yangilangan Start menyu
        - Copilot AI yordamchisi
        - Yangi xavfsizlik funksiyalari
        - Tezroq ishlash
        - Android ilovalarni qo'llab-quvvatlash

        Yangilanish barcha Windows 11 qurilmalariga bepul taqdim etiladi.
      `,
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
      category: "software",
      source: "Microsoft Blog",
      publishDate: "2024-03-19",
      specs: {
        version: "23H2",
        size: "3.5GB",
        requirements: "TPM 2.0, 4GB RAM, 64GB storage"
      }
    },
    "macbook-air-m3": {
      title: "MacBook Air M3",
      content: `
        Apple yangi MacBook Air M3 noutbuklarini taqdim etdi. 
        Yangi model M3 protsessori bilan jihozlangan bo'lib, oldingi avlodga nisbatan 60% tezroq ishlaydi.

        Asosiy xususiyatlari:
        - M3 protsessor
        - 13.6" va 15.3" ekran o'lchamlari
        - 18 soatgacha batareya ishlash vaqti
        - MagSafe 3 quvvatlash
        - 2 ta Thunderbolt portlari

        Noutbuk 8GB, 16GB va 24GB operativ xotira variantlarida taqdim etilgan.
      `,
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      category: "computers",
      source: "TechCrunch",
      publishDate: "2024-03-18",
      specs: {
        processor: "M3",
        ram: "8GB-24GB",
        storage: "256GB-2TB",
        display: "13.6\" or 15.3\" Liquid Retina",
        battery: "18 hours"
      }
    },
    "android-14-features": {
      title: "Android 14 yangiliklari",
      content: `
        Google Android 14 operatsion tizimini ishga tushirdi. 
        Yangi versiya ko'plab yangiliklar va yaxshilanishlarni o'z ichiga oladi.

        Asosiy yangiliklar:
        - Yangilangan dizayn
        - Yaxshilangan batareya optimizatsiyasi
        - Yangi xavfsizlik funksiyalari
        - Health Connect integratsiyasi
        - Yaxshilangan kamera API

        Android 14 dastlab Pixel qurilmalariga, keyin boshqa ishlab chiqaruvchilar smartfonlariga taqdim etiladi.
      `,
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      category: "software",
      source: "Google Blog",
      publishDate: "2024-03-17",
      specs: {
        version: "14.0",
        requirements: "4GB RAM minimum",
        features: "AI enhancements, Better privacy controls"
      }
    },
    "samsung-s24-ultra": {
      title: "Samsung Galaxy S24 Ultra taqdimoti",
      content: `
        Samsung o'zining eng so'nggi flagman smartfoni Galaxy S24 Ultra'ni taqdim etdi.
        Qurilma Snapdragon 8 Gen 3 protsessori va yangilangan AI funksiyalari bilan jihozlangan.

        Asosiy xususiyatlari:
        - 6.8" Dynamic AMOLED 2X ekran
        - 200MP asosiy kamera
        - S Pen qalamli
        - 5000 mAh batareya
        - Galaxy AI funksiyalari

        Smartfon 256GB, 512GB va 1TB xotira variantlarida taqdim etilgan.
      `,
      image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf",
      category: "smartphones",
      source: "Samsung Newsroom",
      publishDate: "2024-03-15",
      specs: {
        processor: "Snapdragon 8 Gen 3",
        ram: "12GB",
        storage: "256GB-1TB",
        display: "6.8\" QHD+ Dynamic AMOLED 2X",
        battery: "5000 mAh"
      }
    },
    "chatgpt-5-release": {
      title: "ChatGPT-5 AI modeli",
      content: `
        OpenAI kompaniyasi ChatGPT-5 sun'iy intellekt modelini taqdim etdi.
        Yangi model oldingi versiyaga nisbatan ancha kuchli va yangi imkoniyatlarga ega.

        Asosiy yangiliklar:
        - Yaxshilangan matn generatsiyasi
        - Ko'p tilli qo'llab-quvvatlash
        - Kontekstni yaxshiroq tushunish
        - Yangi API imkoniyatlari
        - Xavfsizlik yaxshilanishlari

        Model ChatGPT Plus va Enterprise foydalanuvchilariga taqdim etiladi.
      `,
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
      category: "software",
      source: "OpenAI Blog",
      publishDate: "2024-03-10",
      specs: {
        parameters: "1.5 trillion",
        languages: "95+ languages",
        features: "Advanced reasoning, Code generation, Creative writing"
      }
    }
  };

  const article = articles[slug as keyof typeof articles];

  if (!article) {
    return (
      <div>
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-2xl font-bold text-red-600">Maqola topilmadi</h1>
          <p className="mt-4">Kechirasiz, so'ralgan maqola mavjud emas.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="prose lg:prose-xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
          <div className="mb-6">
            <span className="text-sm text-gray-500">
              Manba: {article.source} | Sana: {article.publishDate}
            </span>
          </div>
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-96 object-cover rounded-lg mb-8"
          />
          <div className="whitespace-pre-line">{article.content}</div>
          
          {article.specs && (
            <div className="mt-8 p-6 bg-gray-50 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Texnik xususiyatlari</h2>
              <dl className="grid grid-cols-1 gap-4">
                {Object.entries(article.specs).map(([key, value]) => (
                  <div key={key} className="flex border-b pb-2">
                    <dt className="font-semibold w-1/3 capitalize">
                      {key}:
                    </dt>
                    <dd className="w-2/3">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default ArticlePage;
import { useEffect, useState } from "react";
import { FeaturedArticle } from "@/components/FeaturedArticle";
import { ArticleCard } from "@/components/ArticleCard";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SubscriptionModal } from "@/components/SubscriptionModal";
import { useParams, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  slug: string;
  source?: string;
  created_at: string;
}

type SoftwareImages = {
  "windows-11": string;
  "telegram-premium": string;
  chatgpt: string;
  vscode: string;
  "android-studio": string;
  github: string;
  default: string[];
}

type CategoryImages = {
  smartphones: string[];
  computers: string[];
  software: SoftwareImages;
}

// Category-specific placeholder images with more options
const categoryImages: CategoryImages = {
  smartphones: [
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
    "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd",
    "https://images.unsplash.com/photo-1598327105666-5b89351aff97",
    "https://images.unsplash.com/photo-1585060544812-6b45742d762f",
    "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb",
    "https://images.unsplash.com/photo-1567581935884-3349723552ca",
    "https://images.unsplash.com/photo-1523206489230-c012c64b2b48"
  ],
  computers: [
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
    "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2",
    "https://images.unsplash.com/photo-1537498425277-c283d32ef9db",
    "https://images.unsplash.com/photo-1547082299-de196ea013d6",
    "https://images.unsplash.com/photo-1593640495253-23196b27a87f",
    "https://images.unsplash.com/photo-1602080858428-57174f9431cf",
    "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed"
  ],
  software: {
    "windows-11": "https://images.unsplash.com/photo-1624571409108-e9d6c6436833",
    "telegram-premium": "https://images.unsplash.com/photo-1636751364472-12bfad09b451",
    "chatgpt": "https://images.unsplash.com/photo-1676320831562-1dd59d8cc5c4",
    "vscode": "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    "android-studio": "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2",
    "github": "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb",
    "default": [
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea",
      "https://images.unsplash.com/photo-1607799279861-4dd421887fb3",
    ]
  }
};

// Keep track of used images per category
const usedImages: { [key: string]: Set<string> } = {
  smartphones: new Set(),
  computers: new Set(),
  software: new Set()
};

const getImageForSoftwareArticle = (title: string, slug: string): string => {
  const softwareImages = categoryImages.software;
  const lowerTitle = title.toLowerCase();
  
  // Check for specific software mentions in the title or slug
  if (lowerTitle.includes('windows') || slug.includes('windows')) {
    return softwareImages["windows-11"];
  }
  if (lowerTitle.includes('telegram') || slug.includes('telegram')) {
    return softwareImages["telegram-premium"];
  }
  if (lowerTitle.includes('gpt') || lowerTitle.includes('chatgpt') || slug.includes('gpt')) {
    return softwareImages["chatgpt"];
  }
  if (lowerTitle.includes('vscode') || lowerTitle.includes('visual studio code')) {
    return softwareImages["vscode"];
  }
  if (lowerTitle.includes('android studio') || lowerTitle.includes('android-studio')) {
    return softwareImages["android-studio"];
  }
  if (lowerTitle.includes('github') || slug.includes('github')) {
    return softwareImages["github"];
  }

  // If no specific match, use a default image
  const defaultImages = softwareImages.default;
  const randomIndex = Math.floor(Math.random() * defaultImages.length);
  return defaultImages[randomIndex];
};

const getRandomImageForCategory = (category: string, title: string = '', slug: string = ''): string => {
  if (category === 'software') {
    return getImageForSoftwareArticle(title, slug);
  }

  const images = categoryImages[category as keyof typeof categoryImages] || categoryImages.software.default;
  
  // Handle array type images (smartphones and computers categories)
  if (Array.isArray(images)) {
    const usedImagesForCategory = usedImages[category] || new Set();

    // Reset used images if all images for this category have been used
    if (usedImagesForCategory.size >= images.length) {
      usedImagesForCategory.clear();
    }

    // Filter out already used images
    const availableImages = images.filter(img => !usedImagesForCategory.has(img));
    
    // Get random image from available images
    const randomIndex = Math.floor(Math.random() * availableImages.length);
    const selectedImage = availableImages[randomIndex];
    
    // Mark image as used
    usedImagesForCategory.add(selectedImage);
    usedImages[category] = usedImagesForCategory;

    return selectedImage;
  }

  // Fallback to default software images if category is not found
  const defaultImages = categoryImages.software.default;
  const randomIndex = Math.floor(Math.random() * defaultImages.length);
  return defaultImages[randomIndex];
};

const Index = () => {
  const { category } = useParams();
  const location = useLocation();
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetchArticles();
    
    // Subscribe to realtime changes
    const channel = supabase
      .channel('articles_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'articles'
        },
        (payload) => {
          console.log('Change received!', payload);
          fetchArticles();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [category]);

  const fetchArticles = async () => {
    try {
      let query = supabase.from('articles').select('*');
      
      if (category) {
        query = query.eq('category', category);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      // Reset used images when fetching new articles
      Object.values(usedImages).forEach(set => set.clear());
      
      // Assign specific images based on article content
      const articlesWithImages = (data || []).map(article => ({
        ...article,
        image: getRandomImageForCategory(article.category, article.title, article.slug)
      }));
      
      setArticles(articlesWithImages);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  // Filter latest articles (within 24 hours)
  const latestArticles = articles.filter(article => {
    const articleDate = new Date(article.created_at);
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    return articleDate >= twentyFourHoursAgo;
  });

  // Featured article will be the most recent article
  const featuredArticle = latestArticles[0] || articles[0];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <SubscriptionModal />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {location.pathname === "/" && featuredArticle && (
            <div className="mb-12">
              <FeaturedArticle {...featuredArticle} />
            </div>
          )}
          
          {location.pathname === "/" && latestArticles.length > 0 && (
            <>
              <h2 className="text-2xl font-bold mb-6">So'nggi 24 soat ichidagi yangiliklar</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {latestArticles.slice(1).map((article) => (
                  <ArticleCard key={article.id} {...article} />
                ))}
              </div>
            </>
          )}

          <h2 className="text-2xl font-bold mb-6">
            {category ? `${category.charAt(0).toUpperCase() + category.slice(1)} bo'yicha maqolalar` : "Barcha maqolalar"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles
              .filter(article => !category || article.category === category)
              .map((article) => (
                <ArticleCard key={article.id} {...article} />
              ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;

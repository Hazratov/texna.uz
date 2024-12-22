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

export const categoryImages: CategoryImages = {
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
    "windows-11": "https://pub-c2c1d9230f0b4abb9b0d2d95e06fd4ef.r2.dev/sites/620/2021/09/Hero-Bloom-Logo-800x533.jpg",
    "telegram-premium": "https://frankfurt.apollo.olxcdn.com/v1/files/8hciynkgzwlt-UZ/image",
    "chatgpt": "https://daryo.uz/static/2023/09/6512acda9e2bb.jpg",
    "vscode": "https://miro.medium.com/v2/resize:fit:1012/1*vqugCcVCqfb-HSA0p-1Wiw.png",
    "android-studio": "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2",
    "github": "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb",
    "default": [
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea",
      "https://images.unsplash.com/photo-1607799279861-4dd421887fb3",
    ]
  }
};

const usedImages: { [key: string]: Set<string> } = {
  smartphones: new Set(),
  computers: new Set(),
  software: new Set()
};

export const getImageForSoftwareArticle = (title: string, slug: string): string => {
  const softwareImages = categoryImages.software;
  const lowerTitle = title.toLowerCase();
  
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

  const defaultImages = softwareImages.default;
  const randomIndex = Math.floor(Math.random() * defaultImages.length);
  return defaultImages[randomIndex];
};

export const getRandomImageForCategory = (category: string, title: string = '', slug: string = ''): string => {
  if (category === 'software') {
    return getImageForSoftwareArticle(title, slug);
  }

  const images = categoryImages[category as keyof typeof categoryImages];
  
  if (Array.isArray(images)) {
    const usedImagesForCategory = usedImages[category] || new Set();

    if (usedImagesForCategory.size >= images.length) {
      usedImagesForCategory.clear();
    }

    const availableImages = images.filter(img => !usedImagesForCategory.has(img));
    const randomIndex = Math.floor(Math.random() * availableImages.length);
    const selectedImage = availableImages[randomIndex];
    
    usedImagesForCategory.add(selectedImage);
    usedImages[category] = usedImagesForCategory;

    return selectedImage;
  }

  return categoryImages.software.default[0];
};
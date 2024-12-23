type SoftwareImages = {
  "windows-11": string;
  "telegram-premium": string;
  chatgpt: string;
  vscode: string;
  "android-studio": string;
  github: string;
  default: string[];
}

type SmartphoneImages = {
  iphone: string;
  samsung: string;
  xiaomi: string;
  huawei: string;
  realme: string;
  poco: string;
  oneplus: string;
  default: string[];
}

type ComputerImages = {
  mac: string;
  macbook: string;
  lenovo: string;
  hp: string;
  dell: string;
  acer: string;
  asus: string;
  default: string[];
}

type CategoryImages = {
  smartphones: SmartphoneImages;
  computers: ComputerImages;
  software: SoftwareImages;
}

export const categoryImages: CategoryImages = {
  smartphones: {
    iphone: "https://images.unsplash.com/photo-1591337676887-a217a6970a8a",
    samsung: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c",
    xiaomi: "https://images.unsplash.com/photo-1598327105666-5b89351aff97",
    huawei: "https://images.unsplash.com/photo-1595941069915-4ebc5197c14a",
    realme: "https://images.unsplash.com/photo-1610945264803-c22b62d2a7b3",
    poco: "https://images.unsplash.com/photo-1598524374912-6b0b0bdd0b09",
    oneplus: "https://images.unsplash.com/photo-1637786698427-6b6da8b9b855",
    default: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd",
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97"
    ]
  },
  computers: {
    mac: "https://www.notebookcheck-ru.com/fileadmin/Notebooks/Apple/MacBook_Pro_16_2023_M3_Pro/IMG_1241.JPG",
    macbook: "https://static.insales-cdn.com/files/1/2643/23415379/original/hero_intro_endframe__e6khcva4hkeq_large.jpg",
    lenovo: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2",
    hp: "https://images.unsplash.com/photo-1537498425277-c283d32ef9db",
    dell: "https://images.unsplash.com/photo-1593640495253-23196b27a87f",
    acer: "https://images.unsplash.com/photo-1602080858428-57174f9431cf",
    asus: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed",
    default: [
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
      "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2",
      "https://images.unsplash.com/photo-1537498425277-c283d32ef9db"
    ]
  },
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

const getImageForComputerArticle = (title: string, slug: string): string => {
  const computers = categoryImages.computers;
  const lowerTitle = title.toLowerCase();
  const lowerSlug = slug.toLowerCase();

  if (lowerTitle.includes('mac') || lowerSlug.includes('mac')) {
    return computers.mac;
  }
  if (lowerTitle.includes('macbook') || lowerSlug.includes('macbook')) {
    return computers.macbook;
  }
  if (lowerTitle.includes('lenovo') || lowerSlug.includes('lenovo')) {
    return computers.lenovo;
  }
  if (lowerTitle.includes('hp') || lowerSlug.includes('hp')) {
    return computers.hp;
  }
  if (lowerTitle.includes('dell') || lowerSlug.includes('dell')) {
    return computers.dell;
  }
  if (lowerTitle.includes('acer') || lowerSlug.includes('acer')) {
    return computers.acer;
  }
  if (lowerTitle.includes('asus') || lowerSlug.includes('asus')) {
    return computers.asus;
  }

  return computers.default[0];
};

const getImageForSmartphoneArticle = (title: string, slug: string): string => {
  const smartphones = categoryImages.smartphones;
  const lowerTitle = title.toLowerCase();
  const lowerSlug = slug.toLowerCase();

  if (lowerTitle.includes('iphone') || lowerSlug.includes('iphone')) {
    return smartphones.iphone;
  }
  if (lowerTitle.includes('samsung') || lowerSlug.includes('samsung')) {
    return smartphones.samsung;
  }
  if (lowerTitle.includes('xiaomi') || lowerSlug.includes('xiaomi')) {
    return smartphones.xiaomi;
  }
  if (lowerTitle.includes('huawei') || lowerSlug.includes('huawei')) {
    return smartphones.huawei;
  }
  if (lowerTitle.includes('realme') || lowerSlug.includes('realme')) {
    return smartphones.realme;
  }
  if (lowerTitle.includes('poco') || lowerSlug.includes('poco')) {
    return smartphones.poco;
  }
  if (lowerTitle.includes('oneplus') || lowerSlug.includes('oneplus')) {
    return smartphones.oneplus;
  }

  return smartphones.default[0];
};

const getImageForSoftwareArticle = (title: string, slug: string): string => {
  const software = categoryImages.software;
  const lowerTitle = title.toLowerCase();
  const lowerSlug = slug.toLowerCase();

  if (lowerTitle.includes('windows') || lowerSlug.includes('windows')) {
    return software["windows-11"];
  }
  if (lowerTitle.includes('telegram') || lowerSlug.includes('telegram')) {
    return software["telegram-premium"];
  }
  if (lowerTitle.includes('gpt') || lowerSlug.includes('gpt')) {
    return software.chatgpt;
  }
  if (lowerTitle.includes('vscode') || lowerTitle.includes('visual studio code')) {
    return software.vscode;
  }
  if (lowerTitle.includes('android studio')) {
    return software["android-studio"];
  }
  if (lowerTitle.includes('github')) {
    return software.github;
  }

  return software.default[0];
};

export const getRandomImageForCategory = (category: string, title: string = '', slug: string = ''): string => {
  if (category === 'smartphones') {
    return getImageForSmartphoneArticle(title, slug);
  }
  
  if (category === 'computers') {
    return getImageForComputerArticle(title, slug);
  }
  
  if (category === 'software') {
    return getImageForSoftwareArticle(title, slug);
  }

  // Default image if category doesn't match
  return categoryImages.computers.default[0];
};
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
    iphone: "/lovable-uploads/988bb3bb-65f4-4e86-9a34-7e7dc8578305.png",
    samsung: "/lovable-uploads/988bb3bb-65f4-4e86-9a34-7e7dc8578305.png",
    xiaomi: "/lovable-uploads/988bb3bb-65f4-4e86-9a34-7e7dc8578305.png",
    huawei: "/lovable-uploads/988bb3bb-65f4-4e86-9a34-7e7dc8578305.png",
    realme: "/lovable-uploads/988bb3bb-65f4-4e86-9a34-7e7dc8578305.png",
    poco: "/lovable-uploads/988bb3bb-65f4-4e86-9a34-7e7dc8578305.png",
    oneplus: "/lovable-uploads/988bb3bb-65f4-4e86-9a34-7e7dc8578305.png",
    default: [
      "/lovable-uploads/988bb3bb-65f4-4e86-9a34-7e7dc8578305.png",
      "/lovable-uploads/988bb3bb-65f4-4e86-9a34-7e7dc8578305.png",
      "/lovable-uploads/988bb3bb-65f4-4e86-9a34-7e7dc8578305.png"
    ]
  },
  computers: {
    mac: "/lovable-uploads/988bb3bb-65f4-4e86-9a34-7e7dc8578305.png",
    macbook: "/lovable-uploads/988bb3bb-65f4-4e86-9a34-7e7dc8578305.png",
    lenovo: "/lovable-uploads/988bb3bb-65f4-4e86-9a34-7e7dc8578305.png",
    hp: "/lovable-uploads/988bb3bb-65f4-4e86-9a34-7e7dc8578305.png",
    dell: "/lovable-uploads/988bb3bb-65f4-4e86-9a34-7e7dc8578305.png",
    acer: "/lovable-uploads/988bb3bb-65f4-4e86-9a34-7e7dc8578305.png",
    asus: "/lovable-uploads/988bb3bb-65f4-4e86-9a34-7e7dc8578305.png",
    default: [
      "/lovable-uploads/988bb3bb-65f4-4e86-9a34-7e7dc8578305.png",
      "/lovable-uploads/988bb3bb-65f4-4e86-9a34-7e7dc8578305.png",
      "/lovable-uploads/988bb3bb-65f4-4e86-9a34-7e7dc8578305.png"
    ]
  },
  software: {
    "windows-11": "/lovable-uploads/988bb3bb-65f4-4e86-9a34-7e7dc8578305.png",
    "telegram-premium": "/lovable-uploads/988bb3bb-65f4-4e86-9a34-7e7dc8578305.png",
    "chatgpt": "/lovable-uploads/988bb3bb-65f4-4e86-9a34-7e7dc8578305.png",
    "vscode": "/lovable-uploads/988bb3bb-65f4-4e86-9a34-7e7dc8578305.png",
    "android-studio": "/lovable-uploads/988bb3bb-65f4-4e86-9a34-7e7dc8578305.png",
    "github": "/lovable-uploads/988bb3bb-65f4-4e86-9a34-7e7dc8578305.png",
    "default": [
      "/lovable-uploads/988bb3bb-65f4-4e86-9a34-7e7dc8578305.png",
      "/lovable-uploads/988bb3bb-65f4-4e86-9a34-7e7dc8578305.png",
      "/lovable-uploads/988bb3bb-65f4-4e86-9a34-7e7dc8578305.png",
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

  return categoryImages.computers.default[0];
};
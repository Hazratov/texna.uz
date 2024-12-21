interface ArticleContentProps {
  content: string;
  category: string;
}

export function ArticleContent({ content, category }: ArticleContentProps) {
  const getAdditionalInfo = (category: string) => {
    switch (category) {
      case 'smartphones':
        return `
Smartfonlar haqida qo'shimcha ma'lumot:

• Zamonaviy smartfonlar nafaqat aloqa vositasi, balki ko'p funksiyali kompyuter hisoblanadi
• Asosiy komponentlar: protsessor, xotira, kamera tizimi, displey va batareya
• Operatsion tizimlar: Android va iOS
• Xavfsizlik: biometrik autentifikatsiya (barmoq izi, yuz tanish)
• Kamera imkoniyatlari: ko'p linzali tizimlar, sun'iy intellekt
• Batareya: tez quvvatlash, simsiz quvvatlash
• Connectivity: 5G, Wi-Fi 6, Bluetooth, NFC
• Displey texnologiyalari: OLED, AMOLED, ProMotion
• Gaming va AR/VR imkoniyatlari
• Ekologik va qayta ishlanadigan materiallar`;
      case 'computers':
        return `
Kompyuterlar haqida qo'shimcha ma'lumot:

• Zamonaviy kompyuterlarning asosiy turlari: desktop, laptop, tablet va all-in-one
• Asosiy komponentlar: CPU, GPU, RAM, storage, motherboard
• Operatsion tizimlar: Windows, macOS, Linux
• Performance kategoriyalari: office, gaming, workstation
• Xotira turlari: SSD, HDD, hybrid storage
• Displey texnologiyalari: LED, IPS, OLED
• Connectivity: Thunderbolt, USB, HDMI, DisplayPort
• Cooling systems: air cooling, liquid cooling
• Quvvat samaradorligi va eco-friendly texnologiyalar
• Xavfsizlik: TPM, encryption, biometrics`;
      case 'software':
        return `
Dasturiy ta'minot haqida qo'shimcha ma'lumot:

• Dasturiy ta'minot turlari: tizim, amaliy va development tools
• Zamonaviy dasturlash tillari va framework'lar
• Cloud computing va SaaS yechimlar
• Artificial Intelligence va Machine Learning
• DevOps va CI/CD pipeline
• Xavfsizlik va encryption
• Open source va proprietary software
• Mobile app development
• Web technologies va progressive web apps
• Database management systems`;
      default:
        return '';
    }
  };

  return (
    <div className="prose prose-lg max-w-none">
      {content.split('\n').map((paragraph, index) => (
        <p key={index} className="mb-6 text-gray-700 leading-relaxed">
          {paragraph}
        </p>
      ))}
      <div className="mt-12 p-6 bg-gray-50 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Qo'shimcha ma'lumot</h3>
        {getAdditionalInfo(category).split('\n').map((paragraph, index) => (
          <p key={index} className="mb-4 text-gray-700">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}
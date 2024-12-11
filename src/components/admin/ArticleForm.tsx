import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const categories = [
  { value: "smartphones", label: "Smartfonlar" },
  { value: "computers", label: "Kompyuterlar" },
  { value: "software", label: "Dasturiy ta'minot" },
];

export function ArticleForm() {
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    image: "",
    source: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Sarlavhadan slug yaratish
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '') // Faqat harflar, raqamlar va chiziqchalarni qoldirish
        .replace(/\s+/g, '-') // Bo'shliqlarni chiziqchaga almashtirish
        .replace(/-+/g, '-') // Ketma-ket kelgan chiziqchalarni bitta qilish
        .trim(); // Boshi va oxiridagi bo'shliqlarni olib tashlash

      // Ma'lumotlarni tekshirish
      if (!formData.title || !formData.excerpt || !formData.content || !formData.category || !formData.image) {
        toast.error("Barcha maydonlarni to'ldiring!");
        return;
      }

      const { error } = await supabase
        .from('articles')
        .insert([{ ...formData, slug }]);

      if (error) throw error;
      
      toast.success("Maqola muvaffaqiyatli saqlandi!");
      
      // Formani tozalash
      setFormData({
        title: "",
        excerpt: "",
        content: "",
        category: "",
        image: "",
        source: "",
      });
    } catch (error) {
      console.error('Error:', error);
      toast.error("Xatolik yuz berdi! Qaytadan urinib ko'ring.");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      category: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Sarlavha
        </label>
        <Input
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          placeholder="Maqola sarlavhasi"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Qisqa matn
        </label>
        <Input
          name="excerpt"
          value={formData.excerpt}
          onChange={handleChange}
          required
          placeholder="Maqola haqida qisqacha ma'lumot"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Kategoriya
        </label>
        <Select
          value={formData.category}
          onValueChange={handleCategoryChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Kategoriyani tanlang" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.value} value={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Rasm URL
        </label>
        <Input
          name="image"
          value={formData.image}
          onChange={handleChange}
          required
          placeholder="Rasmning to'liq URL manzili"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Manba
        </label>
        <Input
          name="source"
          value={formData.source}
          onChange={handleChange}
          placeholder="Maqola manbasi (ixtiyoriy)"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Maqola matni
        </label>
        <Textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          required
          className="h-64"
          placeholder="Maqolaning to'liq matni"
        />
      </div>
      <Button type="submit" className="w-full">
        Maqolani saqlash
      </Button>
    </form>
  );
}
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    image: "",
    source: "",
  });

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const validateForm = () => {
    if (!formData.title) {
      toast.error("Sarlavha kiritilishi shart!");
      return false;
    }
    if (!formData.excerpt) {
      toast.error("Qisqa matn kiritilishi shart!");
      return false;
    }
    if (!formData.content) {
      toast.error("Maqola matni kiritilishi shart!");
      return false;
    }
    if (!formData.category) {
      toast.error("Kategoriya tanlanishi shart!");
      return false;
    }
    if (!formData.image) {
      toast.error("Rasm URL manzili kiritilishi shart!");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      const slug = generateSlug(formData.title);

      // Check if slug already exists
      const { data: existingArticle } = await supabase
        .from('articles')
        .select('slug')
        .eq('slug', slug)
        .single();

      if (existingArticle) {
        toast.error("Bu sarlavha bilan maqola mavjud. Iltimos, boshqa sarlavha tanlang.");
        setIsSubmitting(false);
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
    } finally {
      setIsSubmitting(false);
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
          placeholder="Maqola sarlavhasi"
          disabled={isSubmitting}
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
          placeholder="Maqola haqida qisqacha ma'lumot"
          disabled={isSubmitting}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Kategoriya
        </label>
        <Select
          value={formData.category}
          onValueChange={handleCategoryChange}
          disabled={isSubmitting}
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
          placeholder="Rasmning to'liq URL manzili"
          disabled={isSubmitting}
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
          disabled={isSubmitting}
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
          className="h-64"
          placeholder="Maqolaning to'liq matni"
          disabled={isSubmitting}
        />
      </div>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Saqlanmoqda..." : "Maqolani saqlash"}
      </Button>
    </form>
  );
}
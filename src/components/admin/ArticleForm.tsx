import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { ArticleFormInputs } from "./ArticleFormInputs";
import { ArticleFormContent } from "./ArticleFormContent";
import { generateSlug } from "@/utils/slugUtils";
import { validateArticleForm } from "@/utils/formValidation";
import type { ArticleFormData } from "@/types/article";

export function ArticleForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ArticleFormData>({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    image: "",
    source: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateArticleForm(formData)) return;

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
      
      // Reset form
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

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-card text-card-foreground p-6 rounded-lg shadow">
      <ArticleFormInputs
        formData={formData}
        onChange={handleChange}
        isSubmitting={isSubmitting}
      />
      <ArticleFormContent
        content={formData.content}
        onChange={(value) => handleChange('content', value)}
        isSubmitting={isSubmitting}
      />
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Saqlanmoqda..." : "Maqolani saqlash"}
      </Button>
    </form>
  );
}
import { toast } from "sonner";
import type { ArticleFormData } from "@/types/article";

export function validateArticleForm(formData: ArticleFormData): boolean {
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
  if (formData.content.length < 200) {
    toast.error("Maqola matni kamida 200 ta belgidan iborat bo'lishi kerak!");
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

  // Validate image URL
  try {
    new URL(formData.image);
  } catch {
    toast.error("Noto'g'ri rasm URL manzili!");
    return false;
  }
  
  return true;
}
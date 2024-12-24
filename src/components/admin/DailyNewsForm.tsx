import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { generateSlug } from "@/utils/slugUtils";

interface DailyNewsFormData {
  title: string;
  content: string;
  image: string;
}

export function DailyNewsForm() {
  const [formData, setFormData] = useState<DailyNewsFormData>({
    title: "",
    content: "",
    image: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const slug = generateSlug(formData.title);
      
      const { error } = await supabase
        .from('daily_news')
        .insert({
          ...formData,
          slug,
        });

      if (error) throw error;

      toast.success("Yangilik muvaffaqiyatli qo'shildi!");
      setFormData({ title: "", content: "", image: "" });
    } catch (error) {
      console.error('Error creating daily news:', error);
      toast.error("Xatolik yuz berdi!");
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">
          Sarlavha
        </label>
        <Input
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">
          Matn
        </label>
        <Textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          required
          rows={6}
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">
          Rasm URL
        </label>
        <Input
          name="image"
          value={formData.image}
          onChange={handleChange}
          required
          type="url"
        />
      </div>
      
      <Button type="submit" className="w-full">
        Yangilik qo'shish
      </Button>
    </form>
  );
}
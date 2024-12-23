import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { ArticleFormData } from "@/types/article";

const categories = [
  { value: "smartphones", label: "Smartfonlar" },
  { value: "computers", label: "Kompyuterlar" },
  { value: "software", label: "Dasturiy ta'minot" },
];

interface ArticleFormInputsProps {
  formData: ArticleFormData;
  onChange: (name: string, value: string) => void;
  isSubmitting: boolean;
}

export function ArticleFormInputs({ formData, onChange, isSubmitting }: ArticleFormInputsProps) {
  return (
    <>
      <div>
        <label className="block text-sm font-medium mb-2">
          Sarlavha
        </label>
        <Input
          name="title"
          value={formData.title}
          onChange={(e) => onChange('title', e.target.value)}
          placeholder="Maqola sarlavhasi"
          disabled={isSubmitting}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">
          Qisqa matn
        </label>
        <Input
          name="excerpt"
          value={formData.excerpt}
          onChange={(e) => onChange('excerpt', e.target.value)}
          placeholder="Maqola haqida qisqacha ma'lumot"
          disabled={isSubmitting}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">
          Kategoriya
        </label>
        <Select
          value={formData.category}
          onValueChange={(value) => onChange('category', value)}
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
        <label className="block text-sm font-medium mb-2">
          Rasm URL
        </label>
        <Input
          name="image"
          value={formData.image}
          onChange={(e) => onChange('image', e.target.value)}
          placeholder="Rasmning to'liq URL manzili"
          disabled={isSubmitting}
        />
        <p className="mt-1 text-sm text-muted-foreground">
          Masalan: https://example.com/image.jpg
        </p>
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">
          Manba
        </label>
        <Input
          name="source"
          value={formData.source}
          onChange={(e) => onChange('source', e.target.value)}
          placeholder="Maqola manbasi (ixtiyoriy)"
          disabled={isSubmitting}
        />
      </div>
    </>
  );
}
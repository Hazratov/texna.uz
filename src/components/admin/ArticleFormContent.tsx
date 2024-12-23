import { Textarea } from "@/components/ui/textarea";

interface ArticleFormContentProps {
  content: string;
  onChange: (value: string) => void;
  isSubmitting: boolean;
}

export function ArticleFormContent({ content, onChange, isSubmitting }: ArticleFormContentProps) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        Maqola matni (kamida 200 ta belgi)
      </label>
      <Textarea
        value={content}
        onChange={(e) => onChange(e.target.value)}
        className="h-64"
        placeholder="Maqolaning to'liq matni"
        disabled={isSubmitting}
      />
      <p className="mt-1 text-sm text-muted-foreground">
        Belgilar soni: {content.length}/200
      </p>
    </div>
  );
}
import { Clock, Share2 } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { toast } from "sonner";

interface ArticleMetaProps {
  created_at: string;
  readTime?: number;
}

export function ArticleMeta({ created_at, readTime = 5 }: ArticleMetaProps) {
  const handleShare = async () => {
    const url = window.location.href;
    const title = document.title;

    try {
      if (navigator.share) {
        await navigator.share({
          title,
          url
        });
        toast.success("Muvaffaqiyatli ulashildi");
      } else {
        // Fallback to clipboard copy if Web Share API is not available
        await navigator.clipboard.writeText(url);
        toast.success("Havola nusxalandi");
      }
    } catch (error) {
      console.error("Sharing failed:", error);
      // Try clipboard as final fallback
      try {
        await navigator.clipboard.writeText(url);
        toast.success("Havola nusxalandi");
      } catch (clipboardError) {
        toast.error("Ulashishda xatolik yuz berdi");
      }
    }
  };

  return (
    <div className="flex items-center gap-6 text-sm text-gray-600 mb-8">
      <div className="flex items-center gap-2">
        <Clock className="w-4 h-4" />
        <span>{readTime} daqiqa o'qish</span>
      </div>
      <div className="flex items-center gap-2">
        <time dateTime={created_at}>{formatDate(created_at)}</time>
      </div>
      <button 
        className="flex items-center gap-2 hover:text-primary transition-colors"
        onClick={handleShare}
      >
        <Share2 className="w-4 h-4" />
        <span>Ulashish</span>
      </button>
    </div>
  );
}
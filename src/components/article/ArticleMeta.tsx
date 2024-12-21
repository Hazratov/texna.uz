import { Clock, Share2 } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface ArticleMetaProps {
  created_at: string;
  readTime?: number;
}

export function ArticleMeta({ created_at, readTime = 5 }: ArticleMetaProps) {
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
        onClick={() => {
          if (navigator.share) {
            navigator.share({
              title: document.title,
              url: window.location.href
            });
          }
        }}
      >
        <Share2 className="w-4 h-4" />
        <span>Ulashish</span>
      </button>
    </div>
  );
}
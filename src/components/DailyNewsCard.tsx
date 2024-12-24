import { Link } from "react-router-dom";
import { formatDate } from "@/lib/utils";

interface DailyNewsCardProps {
  title: string;
  content: string;
  image: string;
  created_at: string;
  slug: string;
}

export function DailyNewsCard({ title, content, image, created_at, slug }: DailyNewsCardProps) {
  return (
    <Link to={`/daily-news/${slug}`} className="block h-full">
      <div className="bg-card rounded-lg shadow-sm overflow-hidden h-full transition-all duration-200 hover:shadow-lg dark:bg-card dark:border dark:border-border">
        <div className="relative aspect-video">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/placeholder.svg';
            }}
          />
        </div>
        <div className="p-4">
          <h3 className="text-xl font-semibold text-foreground line-clamp-2 hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="mt-2 text-muted-foreground text-sm line-clamp-3">
            {content}
          </p>
          <time className="mt-4 text-sm text-muted-foreground block">
            {formatDate(created_at)}
          </time>
        </div>
      </div>
    </Link>
  );
}
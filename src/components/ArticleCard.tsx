import { Link } from "react-router-dom";

interface ArticleCardProps {
  title: string;
  excerpt: string;
  category: string;
  image: string;
  slug: string;
  source?: string;
}

export function ArticleCard({ title, excerpt, category, image, slug, source }: ArticleCardProps) {
  return (
    <Link to={`/article/${slug}`} className="article-card block h-full">
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
          <div className="absolute bottom-2 right-2 bg-white/90 dark:bg-black/90 px-2 py-1 text-foreground text-sm font-medium rounded">
            TEXNA.UZ
          </div>
        </div>
        <div className="p-4">
          <span className="text-xs font-semibold text-primary uppercase tracking-wider">
            {category}
          </span>
          <h3 className="mt-2 text-xl font-semibold text-foreground line-clamp-2 hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="mt-2 text-muted-foreground text-sm line-clamp-3">
            {excerpt}
          </p>
          {source && (
            <p className="mt-2 text-sm text-muted-foreground">
              Manba: {source}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
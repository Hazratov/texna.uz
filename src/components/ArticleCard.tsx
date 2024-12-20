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
    <Link to={`/article/${slug}`} className="article-card block">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="relative">
          <img src={image} alt={title} className="w-full h-48 object-cover" />
          <div className="absolute bottom-2 right-2 bg-white/90 px-2 py-1 text-black text-sm font-medium">
            TEXNA.UZ
          </div>
        </div>
        <div className="p-4">
          <span className="text-xs font-semibold text-primary uppercase tracking-wider">
            {category}
          </span>
          <h3 className="mt-2 text-xl font-semibold text-gray-900">{title}</h3>
          <p className="mt-2 text-gray-600 text-sm">{excerpt}</p>
          {source && (
            <p className="mt-2 text-sm text-gray-500">
              Manba: {source}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
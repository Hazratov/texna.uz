import { Link } from "react-router-dom";

interface ArticleCardProps {
  title: string;
  excerpt: string;
  category: string;
  image: string;
  slug: string;
}

export function ArticleCard({ title, excerpt, category, image, slug }: ArticleCardProps) {
  return (
    <Link to={`/article/${slug}`} className="article-card block">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        <div className="p-4">
          <span className="text-xs font-semibold text-primary uppercase tracking-wider">
            {category}
          </span>
          <h3 className="mt-2 text-xl font-semibold text-gray-900">{title}</h3>
          <p className="mt-2 text-gray-600 text-sm">{excerpt}</p>
        </div>
      </div>
    </Link>
  );
}
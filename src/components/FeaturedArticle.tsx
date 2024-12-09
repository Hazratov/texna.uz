import { Link } from "react-router-dom";

interface FeaturedArticleProps {
  title: string;
  excerpt: string;
  image: string;
  slug: string;
}

export function FeaturedArticle({ title, excerpt, image, slug }: FeaturedArticleProps) {
  return (
    <Link to={`/article/${slug}`} className="article-card block">
      <div className="relative h-[500px] rounded-xl overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
          <h2 className="text-3xl font-bold text-white mb-2">{title}</h2>
          <p className="text-gray-200">{excerpt}</p>
        </div>
      </div>
    </Link>
  );
}
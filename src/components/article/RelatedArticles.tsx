import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface Article {
  slug: string;
  image: string;
  title: string;
  excerpt: string;
}

interface RelatedArticlesProps {
  articles: Article[];
}

export function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (articles.length === 0) return null;

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">O'xshash maqolalar</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map((article) => (
          <Link to={`/article/${article.slug}`} key={article.slug}>
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="font-semibold text-lg mb-2">{article.title}</h3>
                <p className="text-sm text-gray-600">{article.excerpt}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
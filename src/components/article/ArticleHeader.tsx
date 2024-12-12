import { formatDate } from "@/lib/utils";

interface ArticleHeaderProps {
  title: string;
  category: string;
  created_at: string;
  source?: string;
}

export function ArticleHeader({ title, category, created_at, source }: ArticleHeaderProps) {
  return (
    <div className="mb-8">
      <span className="text-sm font-medium text-primary uppercase tracking-wider">
        {category === "smartphones" ? "Smartfonlar" :
         category === "computers" ? "Kompyuterlar" :
         "Dasturiy ta'minot"}
      </span>
      <h1 className="mt-2 text-4xl font-bold text-gray-900">{title}</h1>
      <div className="mt-4 flex items-center text-gray-500 text-sm">
        <time dateTime={created_at}>
          {formatDate(created_at)}
        </time>
        {source && (
          <>
            <span className="mx-2">•</span>
            <span>Manba: {source}</span>
          </>
        )}
      </div>
    </div>
  );
}
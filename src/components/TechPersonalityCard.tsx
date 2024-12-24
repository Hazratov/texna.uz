import { Link } from "react-router-dom";

interface TechPersonalityCardProps {
  name: string;
  role: string;
  image: string;
  slug: string;
}

export function TechPersonalityCard({ name, role, image, slug }: TechPersonalityCardProps) {
  return (
    <Link to={`/tech-personality/${slug}`} className="block h-full">
      <div className="bg-card rounded-lg shadow-sm overflow-hidden h-full transition-all duration-200 hover:shadow-lg hover:scale-[1.02] dark:bg-card dark:border dark:border-border">
        <div className="relative aspect-[4/3]">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/placeholder.svg';
            }}
          />
        </div>
        <div className="p-4">
          <h3 className="text-xl font-semibold text-foreground hover:text-primary transition-colors">
            {name}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {role}
          </p>
        </div>
      </div>
    </Link>
  );
}
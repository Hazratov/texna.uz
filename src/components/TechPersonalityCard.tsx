import { Link } from "react-router-dom";

interface TechPersonalityCardProps {
  name: string;
  role: string;
  image: string;
  slug: string;
}

export function TechPersonalityCard({ name, role, image, slug }: TechPersonalityCardProps) {
  return (
    <Link to={`/tech-personality/${slug}`} className="block">
      <div className="bg-card rounded-lg shadow-sm overflow-hidden transition-transform hover:scale-105 dark:bg-card">
        <div className="relative h-64">
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
          <h3 className="text-xl font-semibold text-foreground">{name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{role}</p>
        </div>
      </div>
    </Link>
  );
}
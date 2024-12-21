import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { TechPersonalityCard } from "@/components/TechPersonalityCard";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function TechPersonalitiesPage() {
  const { data: personalities, isLoading } = useQuery({
    queryKey: ["tech-personalities"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("tech_personalities")
        .select("*");
      
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold mb-8">Texnologiya sohasining mashhur insonlari</h1>
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 h-64 rounded-lg"></div>
                  <div className="mt-4 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {personalities?.map((person) => (
                <TechPersonalityCard
                  key={person.id}
                  name={person.name}
                  role={person.role}
                  image={person.image}
                  slug={person.slug}
                />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
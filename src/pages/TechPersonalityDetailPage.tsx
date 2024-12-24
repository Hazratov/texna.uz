import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Skeleton } from "@/components/ui/skeleton";

export default function TechPersonalityDetailPage() {
  const { slug } = useParams();

  const { data: person, isLoading } = useQuery({
    queryKey: ["tech-personality", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("tech_personalities")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();
      
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {isLoading ? (
            <div className="space-y-8">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-64 w-full" />
              <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </div>
          ) : person ? (
            <article className="bg-card rounded-lg shadow-sm overflow-hidden dark:bg-card">
              <div className="relative h-96">
                <img
                  src={person.image}
                  alt={person.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder.svg';
                  }}
                />
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <h1 className="text-3xl font-bold text-foreground">{person.name}</h1>
                  <p className="mt-2 text-xl text-muted-foreground">{person.role}</p>
                </div>
                <div className="prose dark:prose-invert max-w-none">
                  <h2 className="text-2xl font-semibold">Biografiya</h2>
                  <p className="mt-4 text-foreground whitespace-pre-line">{person.bio}</p>
                </div>
                <div className="prose dark:prose-invert max-w-none">
                  <h2 className="text-2xl font-semibold">Yutuqlari</h2>
                  <p className="mt-4 text-foreground whitespace-pre-line">{person.achievements}</p>
                </div>
              </div>
            </article>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold text-foreground">
                Kechirasiz, bunday shaxs topilmadi
              </h2>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
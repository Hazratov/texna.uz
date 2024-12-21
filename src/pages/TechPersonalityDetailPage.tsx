import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function TechPersonalityDetailPage() {
  const { slug } = useParams();

  const { data: person, isLoading } = useQuery({
    queryKey: ["tech-personality", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("tech_personalities")
        .select("*")
        .eq("slug", slug)
        .single();
      
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {isLoading ? (
            <div className="animate-pulse space-y-8">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-64 bg-gray-200 rounded"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          ) : person ? (
            <article className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="relative h-96">
                <img
                  src={person.image}
                  alt={person.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{person.name}</h1>
                  <p className="mt-2 text-xl text-gray-600">{person.role}</p>
                </div>
                <div className="prose max-w-none">
                  <h2 className="text-2xl font-semibold">Biografiya</h2>
                  <p className="mt-4 text-gray-700 whitespace-pre-line">{person.bio}</p>
                </div>
                <div className="prose max-w-none">
                  <h2 className="text-2xl font-semibold">Yutuqlari</h2>
                  <p className="mt-4 text-gray-700 whitespace-pre-line">{person.achievements}</p>
                </div>
              </div>
            </article>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold text-gray-900">
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
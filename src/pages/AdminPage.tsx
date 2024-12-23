import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { LoginForm } from "@/components/admin/LoginForm";
import { ArticleList } from "@/components/admin/ArticleList";
import { ArticleForm } from "@/components/admin/ArticleForm";

const AdminPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <LoginForm onSuccess={() => setIsLoggedIn(true)} />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              {isCreating ? "Yangi maqola yaratish" : "Maqolalar"}
            </h1>
            <div className="space-x-4">
              <Button 
                variant={isCreating ? "outline" : "default"}
                onClick={() => setIsCreating(!isCreating)}
              >
                {isCreating ? "Maqolalar ro'yxati" : "Yangi maqola"}
              </Button>
              <Button 
                variant="outline"
                onClick={() => setIsLoggedIn(false)}
              >
                Chiqish
              </Button>
            </div>
          </div>
          {isCreating ? <ArticleForm /> : <ArticleList />}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminPage;
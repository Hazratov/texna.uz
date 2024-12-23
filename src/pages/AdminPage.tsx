import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { LoginForm } from "@/components/admin/LoginForm";
import { ArticleForm } from "@/components/admin/ArticleForm";

const AdminPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Yangi maqola yaratish
            </h1>
            <Button 
              variant="outline"
              onClick={() => setIsLoggedIn(false)}
            >
              Chiqish
            </Button>
          </div>
          <ArticleForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminPage;
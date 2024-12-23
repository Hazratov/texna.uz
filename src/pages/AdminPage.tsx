import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LoginForm } from "@/components/admin/LoginForm";
import { ArticleForm } from "@/components/admin/ArticleForm";

const AdminPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <LoginForm onSuccess={() => setIsLoggedIn(true)} />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">
              Yangi maqola yaratish
            </h1>
            <button 
              onClick={() => setIsLoggedIn(false)}
              className="px-4 py-2 text-sm font-medium bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-md"
            >
              Chiqish
            </button>
          </div>
          <ArticleForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminPage;
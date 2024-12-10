import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const AdminPage = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    image: "",
    source: "",
  });

  const categories = [
    { value: "smartphones", label: "Smartfonlar" },
    { value: "computers", label: "Kompyuterlar" },
    { value: "software", label: "Dasturiy ta'minot" },
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select()
        .eq('username', loginForm.username)
        .eq('password', loginForm.password)
        .single();

      if (error) throw error;

      if (data) {
        setIsLoggedIn(true);
        toast.success("Muvaffaqiyatli kirdingiz!");
      } else {
        toast.error("Login yoki parol noto'g'ri!");
      }
    } catch (error) {
      toast.error("Xatolik yuz berdi!");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const slug = formData.title.toLowerCase().replace(/ /g, '-');
      const { error } = await supabase
        .from('articles')
        .insert([{ ...formData, slug }]);

      if (error) throw error;
      
      toast.success("Maqola muvaffaqiyatli saqlandi!");
      
      setFormData({
        title: "",
        excerpt: "",
        content: "",
        category: "",
        image: "",
        source: "",
      });
    } catch (error) {
      toast.error("Xatolik yuz berdi!");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLoginChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      category: value,
    }));
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="max-w-md w-full mx-4">
            <h1 className="text-2xl font-bold text-center mb-8">Admin panelga kirish</h1>
            <form onSubmit={handleLogin} className="space-y-4 bg-white p-6 rounded-lg shadow">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <Input
                  name="username"
                  value={loginForm.username}
                  onChange={handleLoginChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <Input
                  type="password"
                  name="password"
                  value={loginForm.password}
                  onChange={handleLoginChange}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Kirish
              </Button>
            </form>
          </div>
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
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sarlavha
              </label>
              <Input
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Qisqa matn
              </label>
              <Input
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kategoriya
              </label>
              <Select
                value={formData.category}
                onValueChange={handleCategoryChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Kategoriyani tanlang" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rasm URL
              </label>
              <Input
                name="image"
                value={formData.image}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Manba
              </label>
              <Input
                name="source"
                value={formData.source}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Maqola matni
              </label>
              <Textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
                className="h-64"
              />
            </div>
            <Button type="submit" className="w-full">
              Maqolani saqlash
            </Button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminPage;
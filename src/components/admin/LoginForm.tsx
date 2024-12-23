import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface LoginFormProps {
  onSuccess: () => void;
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

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
        onSuccess();
        toast.success("Muvaffaqiyatli kirdingiz!");
      } else {
        toast.error("Login yoki parol noto'g'ri!");
      }
    } catch (error) {
      toast.error("Xatolik yuz berdi!");
    }
  };

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
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
  );
}
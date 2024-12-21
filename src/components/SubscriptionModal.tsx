import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

export function SubscriptionModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const handleChannelClick = () => {
    window.open("https://t.me/texna_uz", "_blank", "noopener,noreferrer");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <div className="grid gap-4 py-4">
          <h2 className="text-xl font-bold text-center">
            Texna.uz Kanaliga obuna bo'ling
          </h2>
          <p className="text-center text-gray-600">
            Eng so'nggi texnologik yangiliklar va qiziqarli ma'lumotlardan xabardor bo'lish uchun bizning kanalimizga obuna bo'ling!
          </p>
          <button
            onClick={handleChannelClick}
            className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90 transition-colors"
          >
            Kanalga o'tish
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
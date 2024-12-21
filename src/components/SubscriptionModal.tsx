import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";

export function SubscriptionModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(true);
    }, 10000); // 10 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold">
            Texna.uz Kanaliga obuna bo'ling
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-4 py-4">
          <p className="text-center text-gray-600">
            Eng so'nggi texnologik yangiliklar va qiziqarli ma'lumotlardan xabardor bo'lish uchun bizning kanalimizga obuna bo'ling!
          </p>
          <button
            onClick={() => setOpen(false)}
            className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90 transition-colors"
          >
            Yopish
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
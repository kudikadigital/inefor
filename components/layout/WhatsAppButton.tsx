import React from "react";
import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/244944683483"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-[#25D366] hover:bg-[#20b858] rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-105"
      aria-label="Contactar pelo WhatsApp"
    >
      <MessageCircle className="w-5 h-5 text-white fill-white" />
    </a>
  );
}

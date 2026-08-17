import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg-base pt-24 flex items-center justify-center">
      <div className="max-w-md mx-auto px-4 text-center">
        <p className="text-8xl font-light text-border-strong mb-6">404</p>
        <h1 className="text-2xl font-light text-text-primary mb-3">Página não encontrada</h1>
        <p className="text-text-muted text-sm mb-8">A página que procura não existe ou foi movida.</p>
        <Link href="/"><Button className="gap-2"><ArrowLeft className="w-4 h-4" />Voltar à home</Button></Link>
      </div>
    </div>
  );
}

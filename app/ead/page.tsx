import React from "react";
import Link from "next/link";
import { Monitor, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EADPage() {
  return (
    <div className="min-h-screen bg-bg-base pt-24 flex items-center justify-center">
      <div className="max-w-lg mx-auto px-4 text-center">
        <div className="w-16 h-16 rounded-sm bg-bg-card border border-border-base flex items-center justify-center mx-auto mb-8">
          <Monitor className="w-7 h-7 text-blue-600 dark:text-blue-400" />
        </div>
        <span className="text-xs text-blue-600 dark:text-blue-400 font-medium tracking-widest uppercase border border-blue-500/20 bg-blue-500/5 px-3 py-1 rounded-sm mb-6 inline-block">
          Em desenvolvimento
        </span>
        <h1 className="text-3xl font-light text-text-primary mb-4 mt-4">Plataforma EAD</h1>
        <p className="text-text-muted text-base leading-relaxed mb-8">
          A nossa plataforma de Ensino à Distância está a ser desenvolvida. Em breve terá acesso a todos os cursos do Inefor online, no seu ritmo.
        </p>
        <Link href="/"><Button variant="outline" className="gap-2"><ArrowLeft className="w-4 h-4" />Voltar à home</Button></Link>
      </div>
    </div>
  );
}

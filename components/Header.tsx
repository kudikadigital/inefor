import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Header() {
  return (
    <header className="fixed top-10 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl z-50">
      <div className="flex items-center justify-between px-8 py-6 bg-white/90 backdrop-blur-lg border border-white/20 shadow-xl rounded-4xl">
        
        {/* Logo Baseada no Site */}
        <Link href="/" className="flex items-center gap-2 group">
          {/* <div className="bg-blue-600 p-1.5 rounded-lg group-hover:rotate-3 transition-transform">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
          </div> */}
          <div className="flex flex-col leading-none">
            <Image src="/image.png" alt="INEFOR" className="invert" width={100} height={150} />
            {/* <span className="font-black text-xl tracking-tighter text-slate-900">INEFOR</span>
            <span className="text-[10px] font-bold text-blue-600 tracking-[0.2em] uppercase">Corporate</span> */}
          </div>
        </Link>

        {/* Navegação Focada nos Serviços Reais */}
        <nav className="hidden lg:block">
          <ul className="flex items-center gap-8">
            <li><Link href="/servicos" className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors">Serviços</Link></li>
            <li><Link href="/formacao" className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors">Formação</Link></li>
            <li><Link href="/consultoria" className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors">Consultoria</Link></li>
            <li><Link href="/loja" className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors">Produtos</Link></li>
          </ul>
        </nav>

        {/* Botão de Orçamento (Call to Action real do site) */}
        <div className="flex items-center gap-3">
          <button className="bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 transition-all active:scale-95 flex items-center gap-2">
            Solicitar Orçamento
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </header>
  );
}
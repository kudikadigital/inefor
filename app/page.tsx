import { Header } from "@/components/Header";
import { TopNavigation } from "@/components/TopNavigation";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-white">
      <TopNavigation />
      
      {/* Container do Header para evitar sobreposição inicial */}
      <div className="h-24 md:h-28">
        <Header />
      </div>

      {/* Hero Section Contextualizada */}
      <section className="relative pt-20 pb-32 px-10 max-w-6xl mx-auto flex flex-col items-center text-center">
        {/* Badge de Localização */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
          </span>
          <span className="text-[10px] font-bold text-blue-700 uppercase tracking-widest">Sede em Luanda, Angola</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-[1.1]">
          Engenharia e <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600">
            Telecomunicações.
          </span>
        </h1>
        
        <p className="mt-8 text-lg text-slate-600 max-w-2xl leading-relaxed">
          Especialistas em infraestruturas de Fibra Óptica, Redes Móveis e Formação Tecnológica Avançada para o mercado angolano.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <button className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl">
            Nossos Serviços
          </button>
          <button className="px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-2xl font-bold hover:bg-slate-50 transition-all">
            Ver Cursos
          </button>
        </div>
      </section>
    </main>
  );
}
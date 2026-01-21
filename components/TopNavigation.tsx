import { Mail, Phone, Facebook, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";

export function TopNavigation() {
  return (
    <nav className="w-full border-b border-gray-100 bg-gray-50/80 backdrop-blur-sm">
      <div className="flex items-center justify-between px-10 py-2 max-w-6xl mx-auto">
        
        {/* Contatos Oficiais INEFOR */}
        <div className="flex items-center gap-6">
          <Link 
            href="mailto:treinamento@inefor.ao" 
            className="flex items-center gap-2 text-[11px] font-semibold text-slate-500 hover:text-blue-700 transition-colors uppercase tracking-wider"
          >
            <Mail size={13} className="text-blue-600" />
            treinamento@inefor.ao
          </Link>
          
          <Link 
            href="https://wa.me/244944683483" 
            target="_blank"
            className="flex items-center gap-2 text-[11px] font-semibold text-slate-500 hover:text-green-600 transition-colors uppercase tracking-wider"
          >
            <Phone size={13} className="text-green-500" />
            +244 944 683 483
          </Link>
        </div>

        {/* Redes Sociais */}
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-bold text-slate-400 uppercase mr-2 hidden sm:block">Siga-nos:</span>
          <ul className="flex items-center gap-3">
            <li>
              <Link href="https://facebook.com/inefor" target="_blank" className="text-slate-400 hover:text-[#1877F2] transition-colors">
                <Facebook size={14} />
              </Link>
            </li>
            <li>
              <Link href="https://instagram.com/inefor" target="_blank" className="text-slate-400 hover:text-[#E4405F] transition-colors">
                <Instagram size={14} />
              </Link>
            </li>
            <li>
              <Link href="https://linkedin.com/company/inefor" target="_blank" className="text-slate-400 hover:text-[#0A66C2] transition-colors">
                <Linkedin size={14} />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
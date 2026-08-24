import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-obsidian-950 text-sand-100 flex flex-col items-center justify-center p-6 text-center">
      <div className="w-12 h-12 rounded-full bg-bronze-gradient flex items-center justify-center text-obsidian-950 font-display font-black text-xl mb-6">
        L
      </div>
      <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-3">
        Página Não Encontrada
      </h1>
      <p className="text-sand-400 text-sm sm:text-base max-w-md mb-8 font-light">
        O endereço que você tentou acessar não existe ou foi alterado.
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-xl bg-bronze-gradient text-obsidian-950 font-bold text-xs uppercase tracking-wider shadow-luxury-glow hover:scale-105 transition-transform"
      >
        Voltar para a Página Inicial
      </Link>
    </div>
  );
}

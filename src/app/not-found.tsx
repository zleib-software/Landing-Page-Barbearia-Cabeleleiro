import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-midnight-950 text-ice-100 flex flex-col items-center justify-center p-6 text-center">
      <div className="w-12 h-12 rounded-lg bg-teal-500 flex items-center justify-center text-midnight-950 font-display font-black text-xl mb-6 shadow-lg">
        Z
      </div>
      <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-3">
        Página Não Encontrada
      </h1>
      <p className="text-ice-400 text-sm sm:text-base max-w-md mb-8 font-normal">
        O endereço que você tentou acessar não existe ou foi alterado.
      </p>
      <Link
        href="/"
        className="btn-solid-primary"
      >
        Voltar para a Página Inicial
      </Link>
    </div>
  );
}

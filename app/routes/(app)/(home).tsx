import { Icon } from "@iconify-icon/solid";
import UploadArea from "~/components/UploadArea";

function Header() {
  return (
    <header class="text-center sticky top-0 z-10">
      <h1 class="text-lg font-bold text-center text-orange-500">
        Trilo
      </h1>

      <p class="text-2xl text-black mt-6">
        Restaure suas memórias
      </p>
    </header>
  );
}

export function Security({ class: className }: { class?: string }) {
  return (
    <p class={`flex items-center justify-center gap-1 text-xs text-gray-400 mb-4 ${className}`}>
      <Icon icon="material-symbols:lock-outline" class="text-lg text-warning" />
      Suas fotos são processadas de forma segura e nunca são armazenadas em nossos servidores.
    </p>
  );
}

function Footer() {
  return (
    <footer class="top-[100vh] hidden sm:sticky">
      <Security />
    </footer>
  );
}

function Home() {
  return (
    <div class="min-h-screen p-4 gap-y-4 flex flex-col font-noto">
      <Header />

      <main class="flex-1 flex flex-col items-center justify-end h-full max-w-4xl mx-auto">
        <UploadArea />
      </main>
    </div>
  );
}

export default Home;

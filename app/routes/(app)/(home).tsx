import Security from "~/components/Security";
import UploadArea from "~/components/UploadArea";

function Header({ class: className }: { class?: string }) {
  return (
    <header class={`text-center sticky top-0 z-10 ${className} bg-white py-4`}>
      <h1 class="text-lg font-bold text-center text-orange-500">
        Trilo
      </h1>
    </header>
  );
}

function Footer() {
  return (
    <footer class="hidden sm:block top-[100vh] sticky">
      <Security />
    </footer>
  );
}

function Home() {
  return (
    <div class="min-h-screen px-4 gap-y-4 flex flex-col font-noto bg-white">
      <Header class="block sm:hidden" />

      <main class="py-4 flex-1 flex flex-col items-center justify-end h-full max-w-4xl mx-auto sm:justify-center">
        <h1 class="hidden sm:block text-6xl font-bold text-center text-orange-500 mb-4">
          Trilo
        </h1>

        <UploadArea />
      </main>

      <Footer />
    </div>
  );
}

export default Home;

import { A } from "@solidjs/router";

function NotFound() {
  return (
    <main class="w-full h-full flex items-center justify-center">
      <div class="flex items-center justify-center flex-col">
        <A href="/" class="fixed w-full h-full mt-2 flex items-center justify-center">
          <div class="flex flex-col w-full h-full items-center justify-center p-8">
            <h1 class="w-full text-7xl text-center text-primary mb-6">
              Trilo <span class="text-error">404</span>
            </h1>

            <p class="mb-4">
              Página não encontrada.
            </p>

            <div class="btn btn-ghost btn-lg btn-link">
              Clique em qualquer lugar para voltar para a página inicial
            </div>
          </div>
        </A>
      </div>
    </main>
  );
}


export default NotFound;

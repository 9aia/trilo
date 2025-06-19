import { Icon } from "@iconify-icon/solid";
import { CreateMutationResult } from "@tanstack/solid-query";
import { Setter } from "solid-js";

function ResultsSection(props: {
  file: File;
  restoredImageUrl: string;
  setFile: Setter<File | null>;
  setRestoredImageUrl: Setter<string | null>;
  restoreMutation: CreateMutationResult<string, Error, FormData, unknown>;
}) {
  const downloadImage = () => {
    if (!props.restoredImageUrl) return;

    const link = document.createElement('a');
    link.href = props.restoredImageUrl;
    link.download = `restored_${props.file?.name || 'photo'}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetFile = () => {
    props.setFile(null);
    props.setRestoredImageUrl(null);
    props.restoreMutation.reset();
  };

  return (
    <section class="w-full">
      <div class="flex justify-center items-center gap-4 relative w-fit mx-auto px-16 mb-6">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={resetFile}>
          <Icon icon="material-symbols:close-rounded" class="text-2xl" />
        </button>

        <img
          alt="Foto Original"
          src={URL.createObjectURL(props.file!)}
          class="w-16 h-16 object-cover rounded-lg"
        />

        <h3 class="text-sm text-black flex items-center gap-2 mb-6">
          Foto Restaurada
        </h3>
      </div>

      <div class="w-1/2 mx-auto">
        <img
          alt="Foto Restaurada"
          src={props.restoredImageUrl!}
        />
      </div>

      <div class="flex justify-center items-center mt-4">
        <button class="btn btn-primary" onClick={downloadImage}>
          <Icon icon="material-symbols:download-rounded" class="text-2xl" />
          Baixar Foto Restaurada
        </button>
      </div>
    </section>
  );
}

export default ResultsSection;

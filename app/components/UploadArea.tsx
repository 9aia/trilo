import { Icon } from "@iconify-icon/solid";
import { createMutation } from "@tanstack/solid-query";
import { createSignal, Show } from "solid-js";
import ResultsSection from "./ResultsSection";
import Security from "./Security";

function UploadArea() {
  const [file, setFile] = createSignal<File | null>(null);
  const [restoredImageUrl, setRestoredImageUrl] = createSignal<string | null>(null);

  const handleFileChange = (event: Event) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      console.log("Restoring photo...");
      
      setFile(file);
      // Reset restored image when new file is selected
      setRestoredImageUrl(null);

      const formData = new FormData();
      formData.append("photo", file);
      restoreMutation.mutate(formData);
    }
  };

  const restorePhoto = async (formData: FormData) => {
    const response = await fetch("/api/photo/restore", {
      method: "POST",
      body: formData
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: "Failed to restore photo" })) as { error?: string };
      throw new Error(errorData.error || "Failed to restore photo");
    }

    // Get the image blob from the response
    const blob = await response.blob();
    const imageUrl = URL.createObjectURL(blob);
    return imageUrl;
  }

  const restoreMutation = createMutation(() => ({
    mutationKey: ["restore-photo"],
    mutationFn: restorePhoto,
    onSuccess: (imageUrl) => {
      setRestoredImageUrl(imageUrl);
    },
    onError: (error) => {
      console.error("Error restoring photo:", error);
    }
  }));

  return (
    <div class="w-full flex flex-col items-center justify-end sm:justify-center h-full">
      <p class="text-base text-black text-justify mb-12 sm:mb-4">
        Traga sua foto antiga, danificada ou desbotada de volta à vida com o poder da IA.
      </p>

      <Security class="sm:hidden" />

      <div
        class="w-full flex items-center justify-center gap-2"
      >
        <fieldset class="fieldset w-full">
          <input
            autofocus
            type="file"
            class="file-input file-input-primary rounded-full w-full"
            accept="image/*"
            name="photo"
            onChange={handleFileChange}
          />

          <Show when={restoreMutation.isError}>
            <label class="label text-error">
              {restoreMutation.error!.message}
            </label>
          </Show>

          <Show when={restoreMutation.isPending} fallback={<label class="label invisible" aria-hidden>
            <Icon icon="material-symbols:restore-page-outline-rounded" class="text-2xl" />
            A
          </label>}>
            <label class="label">
              <span class="loading loading-spinner loading-xs"></span>
              Restaurando...
            </label>
          </Show>
        </fieldset>
      </div>

      {/* Results Section */}
      <Show when={restoredImageUrl() && file()}>
        <ResultsSection
          file={file()!}
          restoredImageUrl={restoredImageUrl()!}
          setFile={setFile}
          setRestoredImageUrl={setRestoredImageUrl}
          restoreMutation={restoreMutation}
        />
      </Show>
    </div>
  );
}

export default UploadArea;

import { createSignal, Show } from "solid-js";
import { Security } from "~/routes/(app)/(home)";

interface UploadedFile {
  file: File;
  preview: string;
  status: "uploading" | "processing" | "completed" | "error";
  restoredUrl?: string;
  error?: string;
}

function UploadArea() {
  const [currentFile, setCurrentFile] = createSignal<UploadedFile | null>(null);

  const handleFileSelect = (selectedFiles: FileList | null) => {
    if (!selectedFiles || selectedFiles.length === 0) return;

    const file = selectedFiles[0];
    if (!file.type.startsWith('image/')) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      const preview = e.target?.result as string;
      setCurrentFile({
        file,
        preview,
        status: "uploading"
      });

      // Simulate processing
      setTimeout(() => {
        setCurrentFile(prev => prev ? { ...prev, status: "processing" } : null);

        setTimeout(() => {
          setCurrentFile(prev => prev ? {
            ...prev,
            status: "completed",
            restoredUrl: preview // In real app, this would be the restored image
          } : null);
        }, 2000);
      }, 1000);
    };

    reader.readAsDataURL(file);
  };

  const downloadImage = (file: UploadedFile) => {
    if (!file.restoredUrl) return;

    const link = document.createElement('a');
    link.href = file.restoredUrl;
    link.download = `restored_${file.file.name}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetFile = () => {
    setCurrentFile(null);
  };

  return (
    <div class="w-full flex flex-col items-center justify-end h-full">
      {/* Upload Area */}
      <Show when={!currentFile()}>
        <p class="text-base text-black mb-4 text-justify">
          Traga sua foto antiga, danificada ou desbotada de volta à vida com o poder da IA.
        </p>

        <Security class="sm:hidden" />
        
        <fieldset class="fieldset w-full">
          <legend class="fieldset-legend">Envie sua foto</legend>
          <input type="file" class="file-input file-input-primary rounded-full w-full" accept="image/*" onChange={(e: Event) => handleFileSelect((e.target as HTMLInputElement).files)} />
          <label class="label">Máx. 10MB</label>
        </fieldset>
      </Show>

      {/* File Processing */}
      <Show when={currentFile()}>
        {(file) => (
          <div class="bg-white rounded-xl shadow-sm h-full">
            <div class="flex items-center space-x-4">
              {/* Preview */}
              <div class="flex-shrink-0">
                <img
                  src={file().preview}
                  alt="Preview"
                  class="w-20 h-20 object-cover rounded-lg"
                />
              </div>

              {/* File Info */}
              <div class="flex-1 min-w-0">
                <h4 class="text-sm font-medium text-gray-900 truncate">
                  {file().file.name}
                </h4>
                <p class="text-sm text-gray-500">
                  {(file().file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>

              {/* Status */}
              <div class="flex-shrink-0">
                <Show when={file().status === "uploading"}>
                  <div class="flex items-center space-x-2">
                    <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                    <span class="text-sm text-blue-600">Uploading...</span>
                  </div>
                </Show>

                <Show when={file().status === "processing"}>
                  <div class="flex items-center space-x-2">
                    <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600"></div>
                    <span class="text-sm text-purple-600">Restoring...</span>
                  </div>
                </Show>

                <Show when={file().status === "completed"}>
                  <div class="flex items-center space-x-2">
                    <div class="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                      <svg class="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                    </div>
                    <span class="text-sm text-green-600">Ready!</span>
                  </div>
                </Show>

                <Show when={file().status === "error"}>
                  <div class="flex items-center space-x-2">
                    <div class="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                      <svg class="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                      </svg>
                    </div>
                    <span class="text-sm text-red-600">Error</span>
                  </div>
                </Show>
              </div>

              {/* Actions */}
              <div class="flex-shrink-0 flex space-x-2">
                <Show when={file().status === "completed"}>
                  <button
                    onClick={() => downloadImage(file())}
                    class="btn btn-primary btn-sm"
                  >
                    Download
                  </button>
                </Show>

                <button
                  onClick={resetFile}
                  class="btn btn-ghost btn-sm text-gray-400 hover:text-red-500"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Before/After Comparison */}
            <Show when={file().status === "completed"}>
              <div class="mt-4 pt-4 border-t border-gray-100">
                <div class="flex space-x-4">
                  <div class="flex-1">
                    <h5 class="text-sm font-medium text-gray-700 mb-2">Original</h5>
                    <img
                      src={file().preview}
                      alt="Original"
                      class="w-full h-32 object-cover rounded-lg"
                    />
                  </div>
                  <div class="flex-1">
                    <h5 class="text-sm font-medium text-gray-700 mb-2">Restored</h5>
                    <img
                      src={file().restoredUrl || file().preview}
                      alt="Restored"
                      class="w-full h-32 object-cover rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </Show>
          </div>
        )}
      </Show>
    </div>
  );
}

export default UploadArea;

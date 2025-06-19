import { Icon } from '@iconify-icon/solid'

function Security(props: { class?: string }) {
  return (
    <p class={`flex items-center justify-center gap-1 text-xs text-gray-400 mb-4 ${props.class}`}>
      <Icon icon="material-symbols:lock-outline" class="text-lg text-warning" />
      Suas fotos são processadas de forma segura e nunca são armazenadas em nossos servidores.
    </p>
  )
}

export default Security

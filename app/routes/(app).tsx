import { Meta, Title } from '@solidjs/meta'

export default function RootLayout(props: any) {
  return (
    <>
      <Title>Trilo</Title>
      <Meta name="description" content="Restaure suas fotos antigas ou danificadas com IA." />

      <div class="w-full h-full">
        {props.children}
      </div>
    </>
  )
}

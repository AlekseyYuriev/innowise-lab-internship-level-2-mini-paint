import { type Ref } from 'vue'

export default function useEraser(
  canvas: Ref<HTMLCanvasElement | null>,
  ctx: Ref<CanvasRenderingContext2D | null>
) {
  function eraseImage(evt: MouseEvent): void {
    if (!canvas.value || !ctx.value) return
    ctx.value.lineCap = 'round'
    ctx.value.lineJoin = 'round'
    ctx.value.strokeStyle = '#fff'

    const rect = canvas.value.getBoundingClientRect()
    const scaleX = canvas.value.width / rect.width
    const scaleY = canvas.value.height / rect.height

    ctx.value.lineTo(
      (evt.clientX - rect.left) * scaleX,
      (evt.clientY - rect.top) * scaleY
    )
    ctx.value.stroke()
  }
  return { eraseImage }
}

import { type Ref } from 'vue'

export default function useLine(
  canvas: Ref<HTMLCanvasElement | null>,
  ctx: Ref<CanvasRenderingContext2D | null>,
  prevMouseX: Ref<number | null>,
  prevMouseY: Ref<number | null>,
  snapShot: Ref<ImageData | null>
) {
  function drawLine(evt: MouseEvent): void {
    if (
      !canvas.value ||
      !ctx.value ||
      !snapShot.value ||
      !prevMouseX.value ||
      !prevMouseY.value
    )
      return

    ctx.value.lineCap = 'butt'
    ctx.value.lineJoin = 'miter'

    const rect = canvas.value.getBoundingClientRect()
    const scaleX = canvas.value.width / rect.width
    const scaleY = canvas.value.height / rect.height

    ctx.value.beginPath()
    ctx.value.putImageData(snapShot.value, 0, 0)
    ctx.value.moveTo(prevMouseX.value, prevMouseY.value)
    ctx.value.lineTo(
      (evt.clientX - rect.left) * scaleX,
      (evt.clientY - rect.top) * scaleY
    )
    ctx.value.stroke()
  }

  return { drawLine }
}

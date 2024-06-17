import { type Ref } from 'vue'

export default function useRect(
  canvas: Ref<HTMLCanvasElement | null>,
  ctx: Ref<CanvasRenderingContext2D | null>,
  prevMouseX: Ref<number | null>,
  prevMouseY: Ref<number | null>,
  snapShot: Ref<ImageData | null>,
  fillFigure: Ref<boolean>
) {
  function drawRect(evt: MouseEvent): void {
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

    ctx.value.putImageData(snapShot.value, 0, 0)
    if (fillFigure.value) {
      ctx.value.fillRect(
        prevMouseX.value,
        prevMouseY.value,
        (evt.clientX - rect.left) * scaleX - prevMouseX.value,
        (evt.clientY - rect.top) * scaleY - prevMouseY.value
      )
    } else {
      ctx.value.strokeRect(
        prevMouseX.value,
        prevMouseY.value,
        (evt.clientX - rect.left) * scaleX - prevMouseX.value,
        (evt.clientY - rect.top) * scaleY - prevMouseY.value
      )
    }
  }
  return { drawRect }
}

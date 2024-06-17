import type { Ref } from 'vue'

export default function useCircle(
  canvas: Ref<HTMLCanvasElement | null>,
  ctx: Ref<CanvasRenderingContext2D | null>,
  prevMouseX: Ref<number | null>,
  prevMouseY: Ref<number | null>,
  snapShot: Ref<ImageData | null>,
  fillFigure: Ref<boolean>
) {
  function drawCircle(evt: MouseEvent) {
    if (
      !canvas.value ||
      !ctx.value ||
      !snapShot.value ||
      !prevMouseX.value ||
      !prevMouseY.value
    )
      return
    ctx.value.lineCap = 'round'
    ctx.value.lineJoin = 'round'
    const rect = canvas.value.getBoundingClientRect()
    const scaleX = canvas.value.width / rect.width
    const scaleY = canvas.value.height / rect.height

    const newPositionX = (evt.clientX - rect.left) * scaleX
    const newPositionY = (evt.clientY - rect.top) * scaleY

    const radius =
      Math.abs(prevMouseX.value - newPositionX) / 2 >
      Math.abs(prevMouseY.value - newPositionY) / 2
        ? (prevMouseX.value - newPositionX) / 2
        : (prevMouseY.value - newPositionY) / 2

    if (!radius) return

    ctx.value.beginPath()
    ctx.value.putImageData(snapShot.value, 0, 0)
    ctx.value.arc(
      (prevMouseX.value + newPositionX) / 2,
      (prevMouseY.value + newPositionY) / 2,
      Math.abs(radius),
      0,
      2 * Math.PI
    )
    if (fillFigure.value) {
      ctx.value.fill()
    }
    ctx.value.stroke()
  }
  return { drawCircle }
}

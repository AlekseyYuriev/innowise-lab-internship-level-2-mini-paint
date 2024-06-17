import { type Ref } from 'vue'

export default function usePolygon(
  canvas: Ref<HTMLCanvasElement | null>,
  ctx: Ref<CanvasRenderingContext2D | null>,
  prevMouseX: Ref<number | null>,
  prevMouseY: Ref<number | null>,
  snapShot: Ref<ImageData | null>,
  fillFigure: Ref<boolean>,
  numberOfSides: Ref<number>
) {
  function drawPolygon(evt: MouseEvent): void {
    if (
      !canvas.value ||
      !ctx.value ||
      !snapShot.value ||
      !prevMouseX.value ||
      !prevMouseY.value
    )
      return

    if (numberOfSides.value < 3) return

    ctx.value.lineCap = 'butt'
    ctx.value.lineJoin = 'miter'

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

    const angle = (Math.PI * 2) / numberOfSides.value

    ctx.value.save()

    ctx.value.translate(
      (prevMouseX.value + newPositionX) / 2,
      (prevMouseY.value + newPositionY) / 2
    )
    ctx.value.rotate(0)
    ctx.value.beginPath()
    ctx.value.putImageData(snapShot.value, 0, 0)

    ctx.value.moveTo(radius, 0)
    for (let i = 1; i < numberOfSides.value; i++) {
      ctx.value.lineTo(
        radius * Math.cos(angle * i),
        radius * Math.sin(angle * i)
      )
    }
    ctx.value.closePath()
    ctx.value.restore()

    ctx.value.stroke()
    if (fillFigure.value) {
      ctx.value.fill()
    }
  }
  return { drawPolygon }
}

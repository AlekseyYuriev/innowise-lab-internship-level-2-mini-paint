import { type Ref } from 'vue'

export default function useStar(
  canvas: Ref<HTMLCanvasElement | null>,
  ctx: Ref<CanvasRenderingContext2D | null>,
  prevMouseX: Ref<number | null>,
  prevMouseY: Ref<number | null>,
  snapShot: Ref<ImageData | null>,
  fillFigure: Ref<boolean>
) {
  function drawStar(evt: MouseEvent): void {
    if (
      !ctx.value ||
      !canvas.value ||
      !prevMouseX.value ||
      !prevMouseY.value ||
      !snapShot.value
    )
      return
    ctx.value.lineCap = 'round'
    ctx.value.lineJoin = 'round'
    const rect = canvas.value.getBoundingClientRect()
    const scaleX = canvas.value.width / rect.width
    const scaleY = canvas.value.height / rect.height

    const newPositionX = (evt.clientX - rect.left) * scaleX
    const newPositionY = (evt.clientY - rect.top) * scaleY

    const radiusX = Math.abs((newPositionX - prevMouseX.value) / 2)
    const radiusY = Math.abs((newPositionY - prevMouseY.value) / 2)

    if (!radiusX || !radiusY) return

    const centerX =
      newPositionX > prevMouseX.value
        ? prevMouseX.value + radiusX
        : prevMouseX.value - radiusX
    const centerY =
      newPositionY > prevMouseY.value
        ? prevMouseY.value + radiusY
        : prevMouseY.value - radiusY

    const angleStep = Math.PI / 5
    let currAngle = -Math.PI / 10
    let hypotenuseX = null
    let hypotenuseY = null
    let currX = null
    let currY = null

    ctx.value.beginPath()
    ctx.value.putImageData(snapShot.value, 0, 0)

    for (let point = 0; point < 10; point++) {
      hypotenuseX = point % 2 === 1 ? radiusX / 2 : radiusX
      hypotenuseY = point % 2 === 1 ? radiusY / 2 : radiusY

      currX = centerX + Math.cos(currAngle) * hypotenuseX
      currY = centerY + Math.sin(currAngle) * hypotenuseY

      currAngle += angleStep

      ctx.value.lineTo(currX, currY)
    }

    ctx.value.closePath()
    ctx.value.stroke()
    if (fillFigure.value) ctx.value.fill()
  }

  return { drawStar }
}

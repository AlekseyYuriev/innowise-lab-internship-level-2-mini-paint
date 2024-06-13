import { ref, toValue, type Ref } from 'vue'

export default function usePaint(
  canvas: Ref<HTMLCanvasElement | null>,
  ctx: Ref<CanvasRenderingContext2D | null>,
  color: Ref<string>,
  lineWidth: Ref<number>,
  tool: Ref<string>
) {
  const isDrawing = ref<boolean>(false)
  const prevMouseX = ref<number | null>(null)
  const prevMouseY = ref<number | null>(null)
  const snapShot = ref<ImageData | null>(null)

  function draw(evt: MouseEvent) {
    if (!isDrawing.value) return
    if (toValue(tool) === 'brush') {
      drawBrush(evt)
    } else if (toValue(tool) === 'rectangle') {
      drawRect(evt)
    } else if (toValue(tool) === 'line') {
      //drawing line
    }
  }

  function startDrawing(evt: MouseEvent) {
    if (!canvas.value || !ctx.value) return
    isDrawing.value = true
    const rect = canvas.value.getBoundingClientRect()
    const scaleX = canvas.value.width / rect.width
    const scaleY = canvas.value.height / rect.height
    prevMouseX.value = (evt.clientX - rect.left) * scaleX
    prevMouseY.value = (evt.clientY - rect.top) * scaleY

    ctx.value.strokeStyle = toValue(color)
    ctx.value.lineWidth = toValue(lineWidth)
    ctx.value.beginPath()
    snapShot.value = ctx.value.getImageData(
      0,
      0,
      canvas.value.width,
      canvas.value.height
    )
  }

  function stopDrawing() {
    isDrawing.value = false
    ctx.value?.closePath()
  }

  function drawBrush(evt: MouseEvent) {
    if (!canvas.value || !ctx.value) return
    ctx.value.lineCap = 'round'
    ctx.value.lineJoin = 'round'

    const rect = canvas.value.getBoundingClientRect()
    const scaleX = canvas.value.width / rect.width
    const scaleY = canvas.value.height / rect.height

    ctx.value.lineTo(
      (evt.clientX - rect.left) * scaleX,
      (evt.clientY - rect.top) * scaleY
    )
    ctx.value.stroke()
  }

  function drawRect(evt: MouseEvent) {
    if (
      !canvas.value ||
      !ctx.value ||
      !snapShot.value ||
      !prevMouseX.value ||
      !prevMouseY.value
    )
      return

    const rect = canvas.value.getBoundingClientRect()
    const scaleX = canvas.value.width / rect.width
    const scaleY = canvas.value.height / rect.height

    ctx.value.putImageData(snapShot.value, 0, 0)
    ctx.value.strokeRect(
      prevMouseX.value,
      prevMouseY.value,
      (evt.clientX - rect.left) * scaleX - prevMouseX.value,
      (evt.clientY - rect.top) * scaleY - prevMouseY.value
    )
  }

  return { draw, startDrawing, stopDrawing }
}

import { onMounted, onUnmounted, ref, toValue, type Ref } from 'vue'

export default function usePaint(
  color: Ref<string>,
  lineWidth: Ref<number>,
  tool: Ref<string>
) {
  const canvas = ref<HTMLCanvasElement | null>(null)
  const ctx = ref<CanvasRenderingContext2D | null>(null)
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
    if (evt.target !== canvas.value) return
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
    if (toValue(tool) === 'brush') drawBrush(evt)
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

  onMounted(() => {
    if (canvas.value) {
      ctx.value = canvas.value.getContext('2d', { willReadFrequently: true })
    }
    if (ctx.value) {
      ctx.value.strokeStyle = toValue(color)
      ctx.value.lineWidth = toValue(lineWidth)
    }
    window.addEventListener('mousemove', draw)
    window.addEventListener('mouseup', stopDrawing)
    window.addEventListener('mousedown', startDrawing)
  })

  onUnmounted(() => {
    window.removeEventListener('mousemove', draw)
    window.removeEventListener('mouseup', stopDrawing)
    window.removeEventListener('mousedown', startDrawing)
  })

  return { canvas, ctx, draw, startDrawing, stopDrawing }
}

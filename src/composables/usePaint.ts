import { onMounted, onUnmounted, ref, toValue, type Ref } from 'vue'
import useStar from './tools/useStar'
import useBrush from './tools/useBrush'
import useRect from './tools/useRect'
import useLine from './tools/useLine'
import useCircle from './tools/useCircle'

export default function usePaint(
  color: Ref<string>,
  lineWidth: Ref<number>,
  tool: Ref<string>,
  fillFigure: Ref<boolean>
) {
  const canvas = ref<HTMLCanvasElement | null>(null)
  const ctx = ref<CanvasRenderingContext2D | null>(null)
  const isDrawing = ref<boolean>(false)
  const prevMouseX = ref<number | null>(null)
  const prevMouseY = ref<number | null>(null)
  const snapShot = ref<ImageData | null>(null)
  const { drawBrush } = useBrush(canvas, ctx)
  const { drawRect } = useRect(
    canvas,
    ctx,
    prevMouseX,
    prevMouseY,
    snapShot,
    fillFigure
  )
  const { drawCircle } = useCircle(
    canvas,
    ctx,
    prevMouseX,
    prevMouseY,
    snapShot,
    fillFigure
  )
  const { drawLine } = useLine(canvas, ctx, prevMouseX, prevMouseY, snapShot)
  const { drawStar } = useStar(
    canvas,
    ctx,
    prevMouseX,
    prevMouseY,
    snapShot,
    fillFigure
  )

  function draw(evt: MouseEvent) {
    if (!isDrawing.value) return
    if (toValue(tool) === 'brush') {
      drawBrush(evt)
    } else if (toValue(tool) === 'rectangle') {
      drawRect(evt)
    } else if (toValue(tool) === 'line') {
      drawLine(evt)
    } else if (toValue(tool) === 'circle') {
      drawCircle(evt)
    } else if (toValue(tool) === 'star') {
      drawStar(evt)
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
    ctx.value.fillStyle = toValue(color)
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

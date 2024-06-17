import { onMounted, onUnmounted, ref, toValue, type Ref } from 'vue'
import useStar from './tools/useStar'
import useBrush from './tools/useBrush'
import useRect from './tools/useRect'
import useLine from './tools/useLine'
import useCircle from './tools/useCircle'
import usePolygon from './tools/usePolygon'
import useEraser from './tools/useEraser'

interface UsePaint {
  canvas: Ref<HTMLCanvasElement | null>
  draw: (evt: MouseEvent) => void
  startDrawing: (evt: MouseEvent) => void
  stopDrawing: () => void
  clearCanvas: () => void
  undoLast: () => void
  redoLast: () => void
}

export default function usePaint(
  color: Ref<string>,
  lineWidth: Ref<number>,
  tool: Ref<string>,
  fillFigure: Ref<boolean>,
  numberOfSides: Ref<number>
): UsePaint {
  const canvas = ref<HTMLCanvasElement | null>(null)
  const ctx = ref<CanvasRenderingContext2D | null>(null)
  const isDrawing = ref<boolean>(false)
  const prevMouseX = ref<number | null>(null)
  const prevMouseY = ref<number | null>(null)
  const snapShot = ref<ImageData | null>(null)

  const undoList = ref<string[]>([])
  const redoList = ref<string[]>([])

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

  const { drawPolygon } = usePolygon(
    canvas,
    ctx,
    prevMouseX,
    prevMouseY,
    snapShot,
    fillFigure,
    numberOfSides
  )

  const { eraseImage } = useEraser(canvas, ctx)

  function draw(evt: MouseEvent): void {
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
    } else if (toValue(tool) === 'polygon') {
      drawPolygon(evt)
    } else if (toValue(tool) === 'eraser') {
      eraseImage(evt)
    }
  }

  function startDrawing(evt: MouseEvent): void {
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
    undoList.value.push(canvas.value.toDataURL())
  }

  function stopDrawing(): void {
    isDrawing.value = false
    ctx.value?.closePath()
  }

  function clearCanvas(): void {
    if (canvas.value && ctx.value) {
      ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height)
    }
  }

  function undoLast(): void {
    if (undoList.value.length > 0) {
      const dataUrl: string | undefined = undoList.value.pop()
      redoList.value.push(canvas.value?.toDataURL() ?? '')
      const img: HTMLImageElement = new Image()
      img.src = dataUrl as string
      img.onload = (): void => {
        clearCanvas()
        if (!canvas.value || !ctx.value) return
        ctx.value.drawImage(img, 0, 0, canvas.value.width, canvas.value.height)
      }
    } else {
      clearCanvas()
    }
  }

  function redoLast(): void {
    if (redoList.value.length > 0) {
      const dataUrl: string | undefined = redoList.value.pop()
      undoList.value.push(canvas.value?.toDataURL() ?? '')
      const img: HTMLImageElement = new Image()
      img.src = dataUrl as string
      img.onload = (): void => {
        clearCanvas()
        if (!canvas.value || !ctx.value) return
        ctx.value.drawImage(img, 0, 0, canvas.value.width, canvas.value.height)
      }
    }
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

  return {
    canvas,
    draw,
    startDrawing,
    stopDrawing,
    clearCanvas,
    undoLast,
    redoLast
  }
}

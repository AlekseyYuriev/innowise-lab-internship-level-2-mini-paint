import { ref, type Ref } from 'vue'

export default function useBrush(
  paintingCanvas: Ref<HTMLCanvasElement | null>,
  paintingCanvasCtx: Ref<CanvasRenderingContext2D | null>
) {
  const isDrawing = ref<Boolean>(false)
  // const prevMouseX = ref<number | null>(null)
  // const prevMouseY = ref<number | null>(null)
  // const snapShot = ref<ImageData | null>(null)

  // function listen() {
  //   if (!paintingCanvas.value) return

  //   window.addEventListener('mousemove', mouseMoveHandler)
  //   window.addEventListener('mouseup', mouseUpHandler)
  //   window.addEventListener('mousedown', mouseDownHandler)
  // }

  function mouseUpHandler() {
    if (!paintingCanvasCtx.value) return
    isDrawing.value = false
    paintingCanvasCtx.value.closePath()
  }

  // function mouseDownHandler(e: MouseEvent): void {
  //   if (e.target !== paintingCanvas.value) return
  //   if (!paintingCanvas.value || !paintingCanvasCtx.value) return

  //   isDrawing.value = true

  //   const rect = paintingCanvas.value.getBoundingClientRect()
  //   const scaleX = paintingCanvas.value.width / rect.width
  //   const scaleY = paintingCanvas.value.height / rect.height
  //   prevMouseX.value = (e.clientX - rect.left) * scaleX
  //   prevMouseY.value = (e.clientY - rect.top) * scaleY
  //   // paintingCanvasCtx.value.strokeStyle = color
  //   // paintingCanvasCtx.value.lineWidth = 10
  //   paintingCanvasCtx.value.beginPath()
  //   snapShot.value = paintingCanvasCtx.value.getImageData(
  //     0,
  //     0,
  //     paintingCanvas.value.width,
  //     paintingCanvas.value.height
  //   )
  // }

  function mouseDownHandler(e: MouseEvent) {
    if (e.target !== paintingCanvas.value) return
    if (!paintingCanvas.value || !paintingCanvasCtx.value) return

    isDrawing.value = true
    // paintingCanvasCtx.value.strokeStyle = 'rgba(0,0,0,1)'
    // paintingCanvasCtx.value.lineWidth = 10

    paintingCanvasCtx.value.beginPath()
  }

  function mouseMoveHandler(e: MouseEvent) {
    if (!paintingCanvas.value) return
    if (isDrawing.value) {
      const rect = paintingCanvas.value.getBoundingClientRect()
      const scaleX = paintingCanvas.value.width / rect.width
      const scaleY = paintingCanvas.value.height / rect.height
      draw((e.clientX - rect.left) * scaleX, (e.clientY - rect.top) * scaleY)
    }
  }

  function draw(x: number, y: number) {
    if (!paintingCanvasCtx.value) return
    paintingCanvasCtx.value.lineCap = 'round'
    paintingCanvasCtx.value.lineJoin = 'round'
    paintingCanvasCtx.value.lineTo(x, y)
    paintingCanvasCtx.value.stroke()
  }

  return {
    isDrawing,
    mouseUpHandler,
    mouseDownHandler,
    mouseMoveHandler
  }
}

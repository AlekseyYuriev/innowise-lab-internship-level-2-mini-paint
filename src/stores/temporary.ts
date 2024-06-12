function mousedown(evt: MouseEvent) {
  if (canvas.value) {
    const rect = canvas.value.getBoundingClientRect()
    const x = evt.clientX - rect.left
    const y = evt.clientY - rect.top
    console.log(evt.clientX, x)
    isDrawing.value = true
    startX.value = x
    startY.value = y
    points.value.push({
      x: x,
      y: y
    })
  }
}

function mousemove(evt: MouseEvent) {
  if (canvas.value) {
    const rect = canvas.value.getBoundingClientRect()
    const x = evt.clientX - rect.left
    const y = evt.clientY - rect.top

    if (isDrawing.value && context.value) {
      context.value.beginPath()
      context.value.moveTo(startX.value, startY.value)
      context.value.lineTo(x, y)
      context.value.lineWidth = 1
      context.value.lineCap = 'round'
      context.value.strokeStyle = 'rgba(0,0,0,1)'
      context.value.stroke()

      startX.value = x
      startY.value = y

      points.value.push({
        x: x,
        y: y
      })
    }
  }
}

function mouseup(evt: MouseEvent) {
  isDrawing.value = false
  if (points.value.length > 0) {
    canvasStore.points = points.value
  }
}

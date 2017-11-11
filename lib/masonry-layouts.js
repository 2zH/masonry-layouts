export function pushStack(stack, {
  stackList,
  currentWidth,
  line
}, {
  viewPortWidth,
  spacing
}) {
  const { width, height } = stack
  const vecSpacing = typeof spacing === 'number' ? spacing : spacing.vec || 0
  const horSpacing = typeof spacing === 'number' ? spacing : spacing.hor || 0
  if (currentWidth < width) {
    currentWidth = viewPortWidth,
    line = line + 1
  }
  const nextCurrentWidth = currentWidth - width - vecSpacing
  const targetRange = [viewPortWidth - currentWidth, viewPortWidth - currentWidth + width]
  const prevLineStack = stackList
    .filter(stack => stack.line === line - 1)
    .filter(stack => {
      const pointLeftInTheRange = stack.x >= targetRange[0] && stack.x <=targetRange[1]
      const pointRightInTheRange = (stack.x + stack.width) >= targetRange[0] && (stack.x + stack.width) <=targetRange[1]
      const stackInTheRange = stack.x <= targetRange[0] && (stack.x + stack.width) >= targetRange[1]
      return pointLeftInTheRange || pointRightInTheRange || stackInTheRange
    })
  const computeHeight = (n = 0) => {
    if (line === 0) {
      return 0
    }
    return Math.max(...prevLineStack.map(stack => stack.height + stack.y + horSpacing))
  }

  const newStack = {
    width,
    height,
    line,
    x: viewPortWidth - currentWidth,
    y: computeHeight()
  }
  return { 
    stackList: [
      ...stackList,
      newStack
    ],
    currentWidth: nextCurrentWidth,
    line
  }
}

export const newStack = () => {
  const max = 160
  const min = 95
  const width = Math.floor(Math.random() * (max - min) + min)
  const height = Math.floor(Math.random() * (max - min) + min)
  return { width, height }
}

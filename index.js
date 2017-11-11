import { pushStack, newStack } from './lib/masonry-layouts'
import './component/masonry-stack'

function mapDataToComponent(props) {
  const component = document.createElement('masonry-stack')
  for (const [k, v] of Object.entries(props)) {
    component.setAttribute(k, v)
  }
  return component
}

function DOMRender(root, states) {
  const components = states.map(mapDataToComponent)
  root.append(...components)
}

const Range = { max: 900, min: 727 }
const viewPortWidth = Math.floor(Math.random() * (Range.max - Range.min) + Range.min)
const container = document.createElement('div')
container.style.width = `${viewPortWidth}px`
container.style.position = 'relative'
container.style.padding = '15px'
container.style.border = '1px #ccc solid'
document.body.appendChild(container)

const mockData = Array(20).fill().map(newStack)

const stackSizeList = mockData
  .reduce((result, stack) => {
    const options = {
      spacing: 5,
      viewPortWidth
    }
    return pushStack(stack, result, options)
  }, {
    stackList: [],
    currentWidth: viewPortWidth
  })
container.style.height = `${Math.max(
  ...stackSizeList.stackList
    .map(stack => stack.y + stack.height)
)}px`
DOMRender(container, stackSizeList.stackList)
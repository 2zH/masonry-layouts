import styleSheets from '../lib/css-component'

@styleSheets`
  background-color: gray;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  transform: translate(0);
  color: white;
  font-size: 12px;
  border-radius: 2px;
`
class MasonryStack extends HTMLElement {
  constructor() {
    super()
  }

  static get observedAttributes() {
    return ['width', 'height', 'x', 'y']
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    switch(attr) {
      case 'width': {
        this.style.width = `${newValue}px`
        this.textContent = `w: ${newValue} / h: ${this.getAttribute('height')}`
        break;
      }
      case 'height': {
        this.style.height = `${newValue}px`
        this.textContent = `w: ${this.getAttribute('width')} / h: ${newValue}`
        break;
      }
      case 'x': {
        this.style.transform = `translate(${newValue}px, ${this.getAttribute('y') || 0}px)`
        break;
      }
      case 'y': {
        this.style.transform = `translate(${this.getAttribute('x') || 0}px, ${newValue}px)`
        break;
      }
    }
  }
}

customElements.define('masonry-stack', MasonryStack)
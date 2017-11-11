export default function styleSheets(...css) {
  return function(customElement) {
    const namespace = customElement.name.replace(/([a-z\d])([A-Z])/g, '$1-$2').toLowerCase();
    if (!document.querySelector('style[namespace="css-component"]')) {
      const initalStyleElement = document.createElement('style')
      initalStyleElement.setAttribute('type', 'text/css')
      initalStyleElement.setAttribute('namespace', 'css-component')
      document.head.appendChild(initalStyleElement)
    }
    const cssComponentElement = document.querySelector('style[namespace="css-component"]')
    const prevTextContent = cssComponentElement.textContent
    cssComponentElement.textContent = `${prevTextContent}\n${namespace} { ${css} }`
  }
}
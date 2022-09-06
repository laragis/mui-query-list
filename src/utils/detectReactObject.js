import { isValidElement } from 'react'

function isClassComponent(component) {
  return (
    typeof component === 'function' && !!component.prototype?.isReactComponent
  )
}

function isFunctionComponent(component) {
  return (
    typeof component === 'function' &&
    // && !!String(component).includes('return React.createElement')  // may fails
    isValidElement(component())
  )
}

function isReactComponent(component) {
  return isClassComponent(component) || isFunctionComponent(component)
}

function isElement(element) {
  return isValidElement(element)
}

function isDOMTypeElement(element) {
  return isElement(element) && typeof element.type === 'string'
}

function isCompositeTypeElement(element) {
  return isElement(element) && typeof element.type === 'function'
}

export {
  isClassComponent,
  isFunctionComponent,
  isReactComponent,
  isElement,
  isDOMTypeElement,
  isCompositeTypeElement,
}
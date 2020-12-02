export function createElement(type, attributes, ...children) {
  // 创建元素
  let element;
  if (typeof type === 'string') {
    element = new ElementWrapper(type);
  } else {
    element = new type();
  }

  // 挂上属性
  for (let name in attributes) {
    element.setAttribute(name, attributes[name]);
  }
  // 挂上所有子元素
  for (let child of children) {
    if (typeof child === 'string') child = new TextWrapper(child);
    element.appendChild(child);
  }
  // 最后我们的 element 就是一个节点
  // 所以我们可以直接返回
  return element;
}

export class Component {
  constructor() {}
  // 挂載元素的属性
  setAttribute(name, attribute) {
    this.root.setAttribute(name, attribute);
  }
  // 挂載元素子元素
  appendChild(child) {
    child.mountTo(this.root);
  }
  // 挂載当前元素
  mountTo(parent) {
    parent.appendChild(this.root);
  }
}

class ElementWrapper extends Component {
  // 构造函数
  // 创建 DOM 节点
  constructor(type) {
    this.root = document.createElement(type);
  }
}

class TextWrapper extends Component {
  // 构造函数
  // 创建 DOM 节点
  constructor(content) {
    this.root = document.createTextNode(content);
  }
}

function createElement(type, attributes, ...children) {
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

class ElementWrapper {
  // 构造函数
  // 创建 DOM 节点
  constructor(type) {
    this.root = document.createElement(type);
  }
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

class TextWrapper {
  // 构造函数
  // 创建 DOM 节点
  constructor(content) {
    this.root = document.createTextNode(content);
  }
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

class Div {
  // 构造函数
  // 创建 DOM 节点
  constructor() {
    this.root = document.createElement('div');
  }
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

let a = (
  <Div id="a">
    <span>a</span>
    <span>b</span>
    <span>c</span>
  </Div>
);

// document.body.appendChild(a);
a.mountTo(document.body);

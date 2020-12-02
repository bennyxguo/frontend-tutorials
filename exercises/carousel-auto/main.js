import { Component, createElement } from './framework.js';

class Carousel extends Component {
  // 构造函数
  // 创建 DOM 节点
  constructor() {
    super();
    this.attributes = Object.create(null);
  }
  setAttribute(name, value) {
    this.attributes[name] = value;
  }
  render() {
    this.root = document.createElement('div');
    this.root.classList.add('carousel');

    for (let picture of this.attributes.src) {
      let child = document.createElement('div');
      child.style.backgroundImage = `url('${picture}')`;
      this.root.appendChild(child);
    }

    // 当前图片的 index
    let currentIndex = 0;
    setInterval(() => {
      let children = this.root.children;
      // 下一张图片的 index
      let nextIndex = (currentIndex + 1) % children.length;

      // 当前图片的节点
      let current = children[currentIndex];
      // 下一张图片的节点
      let next = children[nextIndex];

      // 禁用图片的动效
      next.style.transition = 'none';
      // 移动下一张图片到正确的位置
      next.style.transform = `translateX(${-100 * (nextIndex - 1)}%)`;

      // 执行轮播效果，延迟了一帧的时间 16 毫秒
      setTimeout(() => {
        // 启用 CSS 中的动效
        next.style.transition = '';
        // 先移动当前图片离开当前位置
        current.style.transform = `translateX(${-100 * (currentIndex + 1)}%)`;
        // 移动下一张图片到当前显示的位置
        next.style.transform = `translateX(${-100 * nextIndex}%)`;

        // 最后更新当前位置的 index
        currentIndex = nextIndex;
      }, 16);
    }, 3000);

    return this.root;
  }
  mountTo(parent) {
    parent.appendChild(this.render());
  }
}

let gallery = [
  'https://source.unsplash.com/Y8lCoTRgHPE/1600x900',
  'https://source.unsplash.com/v7daTKlZzaw/1600x900',
  'https://source.unsplash.com/DlkF4-dbCOU/1600x900',
  'https://source.unsplash.com/8SQ6xjkxkCo/1600x900',
];

let a = <Carousel src={gallery} />;

// document.body.appendChild(a);
a.mountTo(document.body);

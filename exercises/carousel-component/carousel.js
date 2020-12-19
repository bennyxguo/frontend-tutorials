import { Component } from './framework.js';
import { enableGesture } from './gesture.js';
import { Timeline, Animation } from './animation.js';
import { ease } from './ease.js';

export class Carousel extends Component {
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

    let timeline = new Timeline();
    timeline.start();

    enableGesture(this.root);

    let children = this.root.children;
    let position = 0;
    let t = 0; // 动画开始时间
    let ax = 0; // 动画产生的 x 偏移距离
    let handler = null; // 动画 interval

    this.root.addEventListener('start', event => {
      timeline.pause();
      clearInterval(handler);
      // 获取动画的进度
      if (Date.now() - t < 500) {
        let progress = (Date.now() - t) / 500;
        ax = ease(progress) * 500 - 500; // 获取图片偏移的距离
      } else {
        ax = 0;
      }
    });

    this.root.addEventListener('pan', event => {
      // 之前的 startX 我们可以直接在 event 中取得
      // 因为我们在实现 gesture 的时候就都挂载到 event 中了
      let x = event.clientX - event.startX - ax;
      let current = position - (x - (x % 500)) / 500;

      for (let offset of [-1, 0, 1]) {
        let pos = current + offset;
        // 计算图片所在 index
        pos = ((pos % children.length) + children.length) % children.length;

        children[pos].style.transition = 'none';
        children[pos].style.transform = `translateX(${-pos * 500 + offset * 500 + (x % 500)}px)`;
      }
    });

    this.root.addEventListener('end', event => {
      timeline.reset();
      timeline.start();
      handler = setInterval(nextAnimation, 3000);

      let x = event.clientX - event.startX - ax;
      let current = position - (x - (x % 500)) / 500;
      let direction = Math.round((x % 500) / 500);

      if (event.isFlick) {
        if (event.velocity < 0) {
          direction = Math.ceil((x % 500) / 500);
        } else {
          direction = Math.floor((x % 500) / 500);
        }
      }

      for (let offset of [-1, 0, 1]) {
        let pos = current + offset;
        // 计算图片所在 index
        pos = ((pos % children.length) + children.length) % children.length;

        children[pos].style.transition = 'none';
        timeline.add(
          new Animation(
            children[pos].style,
            'transform',
            -pos * 500 + offset * 500 + (x % 500),
            -pos * 500 + offset * 500 + direction * 500,
            500,
            0,
            ease,
            v => `translateX(${v}px)`
          )
        );
      }

      position = current - direction;
      position = ((position % children.length) + children.length) % children.length;
    });

    let nextAnimation = () => {
      let children = this.root.children;
      // 下一张图片的 index
      let nextIndex = (position + 1) % children.length;

      // 当前图片的节点
      let current = children[position];
      // 下一张图片的节点
      let next = children[nextIndex];

      t = Date.now();

      // 先移动当前图片离开当前位置
      timeline.add(
        new Animation(
          current.style,
          'transform',
          -position * 500,
          -500 * (position + 1),
          500,
          0,
          ease,
          v => `translateX(${v}px)`
        )
      );

      // 移动下一张图片到当前显示的位置
      timeline.add(
        new Animation(
          next.style,
          'transform',
          500 - nextIndex * 500,
          -500 * nextIndex,
          500,
          0,
          ease,
          v => `translateX(${v}px)`
        )
      );

      // 最后更新当前位置的 index
      position = nextIndex;
    };

    // 当前图片的 index
    handler = setInterval(nextAnimation, 3000);

    return this.root;
  }
  mountTo(parent) {
    parent.appendChild(this.render());
  }
}

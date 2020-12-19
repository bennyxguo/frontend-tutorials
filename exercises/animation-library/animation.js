const TICK = Symbol('tick');
const TICK_HANDLER = Symbol('tick-handler');
const ANIMATIONS = Symbol('animations');
const START_TIMES = Symbol('start-times');
const PAUSE_START = Symbol('pause-start');
const PAUSE_TIME = Symbol('pause-time');

export class Timeline {
  constructor() {
    this.state = 'Initiated';
    this[ANIMATIONS] = new Set();
    this[START_TIMES] = new Map();
  }
  start() {
    if (!this.state === 'Initiated') return;
    this.state = 'Started';

    let startTime = Date.now();
    this[PAUSE_TIME] = 0;
    this[TICK] = () => {
      let now = Date.now();
      for (let animation of this[ANIMATIONS]) {
        let t;

        if (this[START_TIMES].get(animation) < startTime) {
          t = now - startTime - animation.delay - this[PAUSE_TIME];
        } else {
          t = now - this[START_TIMES].get(animation) - animation.delay - this[PAUSE_TIME];
        }

        if (t > animation.duration) {
          this[ANIMATIONS].delete(animation);
          t = animation.duration;
        }
        if (t > 0) animation.run(t);
      }
      this[TICK_HANDLER] = requestAnimationFrame(this[TICK]);
    };
    this[TICK]();
  }
  pause() {
    if (!this.state === 'Started') return;
    this.state = 'Paused';

    this[PAUSE_START] = Date.now();
    cancelAnimationFrame(this[TICK_HANDLER]);
  }
  resume() {
    if (!this.state === 'Paused') return;
    this.state = 'Started';

    this[PAUSE_TIME] += Date.now() - this[PAUSE_START];
    this[TICK]();
  }
  reset() {
    this.pause();
    this.state = 'Initiated';
    this[PAUSE_TIME] = 0;
    this[PAUSE_START] = 0;
    this[ANIMATIONS] = new Set();
    this[START_TIMES] = new Map();
    this[TICK_HANDLER] = null;
  }
  add(animation, startTime) {
    if (arguments.length < 2) startTime = Date.now();
    this[ANIMATIONS].add(animation);
    this[START_TIMES].set(animation, startTime);
  }
}

export class Animation {
  constructor(object, property, startValue, endValue, duration, delay, timingFunction, template) {
    timingFunction = timingFunction || (v => v);
    template = template || (v => v);

    this.object = object;
    this.property = property;
    this.startValue = startValue;
    this.endValue = endValue;
    this.duration = duration;
    this.timingFunction = timingFunction;
    this.delay = delay;
    this.template = template;
  }

  run(time) {
    let range = this.endValue - this.startValue;
    let progress = this.timingFunction(time / this.duration);
    this.object[this.property] = this.template(this.startValue + range * progress);
  }
}

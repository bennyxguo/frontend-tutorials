import { Component, createElement } from './framework.js';
import { Carousel } from './carousel.js';
import { Timeline, Animation } from './animation.js';

let gallery = [
  'https://source.unsplash.com/Y8lCoTRgHPE/1600x900',
  'https://source.unsplash.com/v7daTKlZzaw/1600x900',
  'https://source.unsplash.com/DlkF4-dbCOU/1600x900',
  'https://source.unsplash.com/8SQ6xjkxkCo/1600x900',
];

let a = <Carousel src={gallery} />;

// document.body.appendChild(a);
a.mountTo(document.body);

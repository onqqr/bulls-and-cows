import { el, mount } from './ui/dom';

mount(document.body, el('main', { className: 'app' }, el('h1', { text: 'Bulls and Cows' })));

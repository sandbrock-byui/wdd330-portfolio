import AppController from './app.controller.js';

const app = new AppController({
  baseUrl: '/final',
  selectors: {
    hamburger: '.hamburgerButton',
    navigation: '.navigation',
    workspace: '#workspace', 
    footer: '#footer'
  }
});

app.render();

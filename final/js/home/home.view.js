export default class HomeView {
  constructor(config) {
    this.config = config;
    this.rootEl = document.querySelector(config.selectors.workspace);
  }

  render() {
    const homeEl = document.createElement('div');
    homeEl.innerHTML = `
      <h1>Home</h1>
      <h2>Edible Delights</h2>
      <p>
        Welcome to Edible Delights! You have reached the ultimate online recipe tracking software.
        It can be used to easily keep track of your recipes. And you can share them with your friends.
      </p>
    `;
    this.rootEl.innerHTML = homeEl.innerHTML;
    this.rootEl = document.querySelector(this.config.selectors.workspace);
  }
}

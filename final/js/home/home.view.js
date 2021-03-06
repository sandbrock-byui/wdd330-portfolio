export default class HomeView {
  constructor(diService) {
    this.config = diService.get('config');
    this.rootEl = document.querySelector(this.config.selectors.workspace);
  }

  render() {
    const homeEl = document.createElement('div');
    homeEl.innerHTML = `
      <h2>Edible Traditions Home</h2>
      <p>
        Welcome to Edible Traditions! You have reached the ultimate online recipe tracking software.
        It can be used to easily keep track of your recipes. And you can share them with your friends.
      </p>
      <picture>
        <img src="images/home-recipe-001.jpg">
      </picture>
    `;
    this.rootEl.innerHTML = homeEl.innerHTML;
    this.rootEl = document.querySelector(this.config.selectors.workspace);
  }
}

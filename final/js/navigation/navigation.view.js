export default class NavigationView {
  constructor(config, onnavigate) {
    this.config = config;
    this.rootEl = document.querySelector(config.selectors.navigation);
    this.onnavigate = onnavigate;
    if (!this.rootEl) {
      throw new Error(
        `Unable to locate navigation element using selector ${config.selectors.navigation}`
      );
    }
  }

  render(path) {
    this.path = path;
    const navEl = document.createElement('div');
    let innerHTML = this.renderMenu();
    navEl.innerHTML = innerHTML;
    this.rootEl.innerHTML = navEl.innerHTML;
    this.connectListeners(this.rootEl);
  }

  renderMenu() {
    const menu = `
      <ul>
        <li><a href="index.html#home" class="route">Home</a></li>
        <li><a href="index.html#recipes" class="route">Recipes</a></li>
        <li><a href="index.html#nutrition" class="route">Nutrition</a></li>
      </ul>
      <ul>
        <li><a href="index.html#profile" class="route">Profile</a></li>
        <li><a href="index.html#logout" class="route">Logout</a></li>
      </ul>
    `;
    return menu;
  }

  connectListeners(navEl) {
    const routeEls = navEl.querySelectorAll('.route');

    routeEls.forEach((routeEl) => {
      routeEl.addEventListener('click', (e) => {
        e.preventDefault();
        const path = e.target.getAttribute('href');
        if (this.onnavigate) {
          this.onnavigate(path);
        }
      });
    });
  }
}

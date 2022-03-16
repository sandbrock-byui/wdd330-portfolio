export default class ProfileView {
  constructor(config) {
    this.config = config;
    this.rootEl = document.querySelector(config.selectors.workspace);
  }
  
  render() {
    const profileEl = document.createElement('div');
    profileEl.innerHTML = `
      <h1>Profile</h1>
      <h2>Edible Delights</h2>
    `;
    this.rootEl.innerHTML = profileEl.innerHTML;
    this.rootEl = document.querySelector(this.config.selectors.workspace);
  }
};
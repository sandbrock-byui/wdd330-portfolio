export default class ProfileView {
  constructor(diService) {
    this.config = diService.get('config');
    this.rootEl = document.querySelector(this.config.selectors.workspace);
  }
  
  render() {
    const profileEl = document.createElement('div');
    profileEl.innerHTML = `
      <h2>Edible Delights Profile</h2>
    `;
    this.rootEl.innerHTML = profileEl.innerHTML;
    this.rootEl = document.querySelector(this.config.selectors.workspace);
  }
};
export default class LoginView {
  constructor(config) {
    this.config = config;
    this.rootEl = document.querySelector(config.selectors.workspace);
  }
  
  render() {
    const loginEl = document.createElement('div');
    loginEl.innerHTML = `
      <h1>Login</h1>
      <h2>Edible Delights</h2>
    `;
    this.rootEl.innerHTML = loginEl.innerHTML;
    this.rootEl = document.querySelector(this.config.selectors.workspace);
  }
};
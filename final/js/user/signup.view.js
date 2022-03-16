export default class SignupView {
  constructor(config) {
    this.config = config;
    this.rootEl = document.querySelector(config.selectors.workspace);
  }
  
  render() {
    const signupEl = document.createElement('div');
    signupEl.innerHTML = `
      <h1>Signup</h1>
      <h2>Edible Delights</h2>
    `;
    this.rootEl.innerHTML = signupEl.innerHTML;
    this.rootEl = document.querySelector(this.config.selectors.workspace);
  }
};
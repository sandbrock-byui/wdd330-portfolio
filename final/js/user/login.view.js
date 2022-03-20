export default class LoginView {
  constructor(diService) {
    this.config = diService.get('config');
    this.callbacks = diService.get('appCallbacks');
    this.rootEl = document.querySelector(this.config.selectors.workspace);
  }

  connectFormCallbacks() {
    const submitBtn = this.rootEl.querySelector('.submitBtn');
    submitBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.callbacks.onlogin();
    });
  }
  
  render() {
    const loginEl = document.createElement('div');
    loginEl.innerHTML = `
      <form id="input-form">
        <fieldset>
          <legend>Login</legend>
          <label class="label-top">Email: <input type="email" name="username" required></label>
          <label class="label-top">Password: <input type="password" name="password" required></label>
        </fieldset>

        <input class="submitBtn" type="submit" value="Login">
      </form>
    `;
    this.rootEl.innerHTML = loginEl.innerHTML;
    this.rootEl = document.querySelector(this.config.selectors.workspace);
    this.connectFormCallbacks();
  }
};
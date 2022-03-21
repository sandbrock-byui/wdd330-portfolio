export default class LoginView {
  constructor(diService) {
    this.config = diService.get('config');
    this.rootEl = document.querySelector(this.config.selectors.workspace);
  }

  connectFormCallbacks() {
    const submitBtn = this.rootEl.querySelector('.submitBtn');
    submitBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      this.callbacks.onlogin({
        email, 
        password
      });
    });
  }
  
  render() {
    const loginEl = document.createElement('div');
    loginEl.innerHTML = `
      <form id="input-form">
        <fieldset>
          <legend>Login</legend>
          <p class="error-message" id="error-message"><p>
          <label class="label-top">Email: <input type="email" name="email" id="email" required></label>
          <label class="label-top">Password: <input type="password" name="password" id="password" required></label>
        </fieldset>

        <input class="submitBtn" type="submit" value="Login">
      </form>
    `;
    this.rootEl.innerHTML = loginEl.innerHTML;
    this.rootEl = document.querySelector(this.config.selectors.workspace);
    this.connectFormCallbacks();
  }

  renderError(message) {
    const errorEl = this.rootEl.querySelector('#error-message');
    errorEl.innerHTML = message;
    errorEl.classList.add('error-message-active');
  }

  setCallbacks(callbacks) {
    this.callbacks = callbacks;
  }
};
export default class SignupView {
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
      const verify = document.getElementById('verify').value;

      if (password !== verify) {
        this.renderError('Passwords do not match.');
        return;
      }

      this.callbacks.onsignup({
        email, 
        password
      });
    });
  }

  render() {
    const signupEl = document.createElement('div');
    signupEl.innerHTML = `
      <form id="input-form">
        <fieldset>
          <legend>Signup</legend>
          <p class="error-message" id="error-message"><p>
          <p class="success-message" id="success-message"><p>
          <label class="label-top">Email: <input type="email" name="email" id="email" required></label>
          <label class="label-top">Password: <input type="password" name="password" id="password" required></label>
          <label class="label-top">Verify: <input type="password" name="verify" id="verify" required></label>
        </fieldset>

        <input class="submitBtn" type="submit" value="Sign Up">
      </form>
    `;
    this.rootEl.innerHTML = signupEl.innerHTML;
    this.rootEl = document.querySelector(this.config.selectors.workspace);
    this.connectFormCallbacks();
  }

  renderError(message) {
    const errorEl = this.rootEl.querySelector('#error-message');
    errorEl.innerHTML = message;
    if (message) {
      errorEl.classList.add('error-message-active');
    } else {
      errorEl.classList.remove('error-message-active');
    }
  }

  renderSuccess(message) {
    const successEl = this.rootEl.querySelector('#success-message');
    successEl.innerHTML = message;
    if (message) {
      successEl.classList.add('success-message-active');
    } else {
      successEl.classList.remove('success-message-active');
    }
  }

  setCallbacks(callbacks) {
    this.callbacks = callbacks;
  }
};
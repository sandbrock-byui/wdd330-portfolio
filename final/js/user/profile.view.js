export default class ProfileView {
  constructor(diService) {
    this.config = diService.get('config');
    this.rootEl = document.querySelector(this.config.selectors.workspace);
  }

  connectFormCallbacks() {
    const submitBtn = this.rootEl.querySelector('.submitBtn');
    submitBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      const password = document.getElementById('password').value;
      const verify = document.getElementById('verify').value;

      if (password !== verify) {
        this.renderError('Passwords do not match.');
        return;
      }

      this.callbacks.onupdate({
        password
      });
    });
  }
  
  render() {
    const profileEl = document.createElement('div');
    profileEl.innerHTML = `
      <form id="input-form">
        <fieldset>
          <legend>Update Password</legend>
          <p class="error-message" id="error-message"><p>
          <p class="success-message" id="success-message"><p>
          <label class="label-top">Password: <input type="password" name="password" id="password" required></label>
          <label class="label-top">Verify: <input type="password" name="verify" id="verify" required></label>
        </fieldset>

        <input class="submitBtn" type="submit" value="Update">
      </form>
    `;
    this.rootEl.innerHTML = profileEl.innerHTML;
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
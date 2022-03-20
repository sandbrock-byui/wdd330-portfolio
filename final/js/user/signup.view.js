export default class SignupView {
  constructor(diService) {
    this.config = diService.get('config');
    this.rootEl = document.querySelector(this.config.selectors.workspace);
  }
  
  render() {
    const signupEl = document.createElement('div');
    signupEl.innerHTML = `
      <form id="input-form">
        <fieldset>
          <legend>Signup</legend>
          <label class="label-top">Email: <input type="email" name="username" required></label>
          <label class="label-top">Password: <input type="password" name="password" required></label>
          <label class="label-top">Verify: <input type="password" name="password" required></label>
        </fieldset>

        <input class="submitBtn" type="submit" value="Signup">
      </form>
    `;
    this.rootEl.innerHTML = signupEl.innerHTML;
    this.rootEl = document.querySelector(this.config.selectors.workspace);
  }
};
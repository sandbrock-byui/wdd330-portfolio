export default class SessionService {
  clear() {
    localStorage.clear();
  }

  getApiToken() {
    return localStorage.getItem('apiKey');
  }

  getLoggedIn() {
    return !!this.getUserId();
  }

  getUserId() {
    return localStorage.getItem('userId');
  }

  setApiToken(apiKey) {
    localStorage.setItem('apiKey', apiKey);
  }

  setUserId(userId) {
    localStorage.setItem('userId', userId);
  }
}
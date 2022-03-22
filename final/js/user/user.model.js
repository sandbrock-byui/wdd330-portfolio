export default class UserModel {
  constructor(diService) {
    this.config = diService.get('config');
    this.apiService = diService.get('apiService');
    this.sessionService = diService.get('sessionService');
  }

  async login(credentials) {
    const result = await this.apiService.invoke('POST', '/users/login', credentials);
    if (result.success) {
      this.sessionService.setApiToken(result.data.token);
      this.sessionService.setUserId(result.data.userId);
    }
    return result;
  }

  async signup(credentials) {
    const result = await this.apiService.invoke('POST', '/users', credentials);
    return result;
  }

  async update(credentials) {
    const result = await this.apiService.invoke('PUT', '/users', credentials);
    return result;
  }
};
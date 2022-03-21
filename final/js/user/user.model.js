export default class UserModel {
  constructor(diService) {
    this.config = diService.get('config');
    this.apiService = diService.get('apiService');
  }

  async login(credentials) {
    const result = await this.apiService.invoke('POST', '/users/login', credentials);
    if (result.success) {
      this.apiService.setJWT(result.data.token);
    }
    return result;
  }

  async signup(credentials) {
    const result = await this.apiService.invoke('POST', '/users', credentials);
    return result;
  }
};
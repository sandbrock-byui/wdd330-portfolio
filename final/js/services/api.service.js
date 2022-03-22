export default class ApiService {
  constructor(diService) {
    this.diService = diService;
    this.config = diService.get('config');
    this.sessionService = diService.get('sessionService');
  }

  getAppCallbacks() {
    if (typeof this.appCallbacks === 'undefined') {
      this.appCallbacks = this.diService.get('appCallbacks');
    }
    return this.appCallbacks;
  }

  async invoke(method, url, body) {
    const headers = {
      'Content-Type': 'application/json'
    };

    const jwt = this.sessionService.getApiToken();
    if (jwt) {
      headers['Authorization'] = `Bearer ${jwt}`;
    }

    const options = {
      method: method,
      headers: headers
    }

    if (body) {
      options['body'] = JSON.stringify(body);
    }
  
    const result = {
      data: null,
      message: null,
      status: 0,
      success: false
    }
    
    const appCallbacks = this.getAppCallbacks();
    appCallbacks.onloadingshow();
    try {
      const response = await fetch(`${this.config.baseApiUrl}${url}`, options);
      const json = await response.json();

      result.code = response.status;
      
      if (response.ok) {
        result.success = true;
        result.data = json;
      } else {
        result.message = json.message;
        if (result.message === "jwt expired") {
          appCallbacks.onlogout(null);
        }
      }
      return result;
    } catch (e) {
      result.message = 'An error occurred communicating with the server. ' + e.message;
      return result;
    } finally {
      appCallbacks.onloadinghide();
    }
  }
}
export default class ApiService {
  constructor(diService) {
    this.config = diService.get('config');
    this.sessionService = diService.get('sessionService');
  }

  async invoke(method, url, body) {
    const headers = {
      'Content-Type': 'application/json'
    };

    const jwt = this.sessionService.getApiToken();
    if (this.jwt) {
      headers['Authorization'] = `Bearer ${this.jwt}`;
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
    
    try {
      const response = await fetch(`${this.config.baseApiUrl}${url}`, options);
      const json = await response.json();

      result.code = response.status;
      
      if (response.ok) {
        result.success = true;
        result.data = json;
      } else {
        result.message = json.message;
      }
      return result;
    } catch (e) {
      result.message = 'An error occurred communicating with the server. ' + e.message;
      return result;
    }
  }
}
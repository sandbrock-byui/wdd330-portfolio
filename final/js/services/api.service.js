export default class ApiService {
  jwt = null;

  constructor(diService) {
    this.config = diService.get('config');
  }

  async invoke(method, url, body) {
    const headers = {
      'Content-Type': 'application/json'
    };

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
      message: null,
      success: false,
      data: null
    }
    
    try {
      const response = await fetch(`${this.config.baseApiUrl}${url}`, options);
      const json = await response.json();
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

  setJWT(value) {
    this.jwt = value;
  }
}
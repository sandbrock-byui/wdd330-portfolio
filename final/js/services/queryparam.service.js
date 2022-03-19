
export default class QueryParamService {
  static getQueryParams() {
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });
    return params;    
  }
};
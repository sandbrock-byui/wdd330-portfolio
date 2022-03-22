export default class RecipeModel {
  constructor(diService) {
    this.apiService = diService.get('apiService');
  }

  async create(recipe) {
    const result = await this.apiService.invoke('POST', '/recipes', recipe);
    return result;
  }

  async getAll() {
    const result = await this.apiService.invoke('GET', '/recipes', null);
    return result;
  }

  async getById(id) {
    const result = await this.apiService.invoke('GET', `/recipes/${id}`, null);
    return result;
  }

  async update(recipe) {
    const result = await this.apiService.invoke('PUT', '/recipes', recipe);
    return result;
  }
};
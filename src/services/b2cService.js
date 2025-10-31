import apiClient from './api';

export default {
  // Chat with AI
  sendMessage(sessionId, query) {
    return apiClient.post('/b2c/chat', {
      session_id: sessionId,
      query: query
    });
  },

  // Get all products
  getAllProducts(params = {}) {
    return apiClient.get('/b2c/products', { params });
  },

  // Get single product by ID
  getProductById(productId) {
    return apiClient.get(`/b2c/products/${productId}`);
  },

  // Get related products
  getRelatedProducts(productId, limit = 4) {
    return apiClient.get(`/b2c/products/${productId}/related`, {
      params: { limit }
    });
  }
};
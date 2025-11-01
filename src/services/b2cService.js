import apiClient from './api';

export default {
  // Authentication
  register(email, name, password) {
    return apiClient.post('/b2c/auth/register', {
      email,
      name,
      password
    });
  },

  login(email, password) {
    return apiClient.post('/b2c/auth/login', {
      email,
      password
    });
  },

  getCurrentCustomer(token) {
    return apiClient.get('/b2c/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  },

  // Chat with AI
  sendMessage(sessionId, query, customerId = null) {
    return apiClient.post('/b2c/chat', {
      session_id: sessionId,
      query: query,
      customer_id: customerId
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
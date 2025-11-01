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

  // Get chat history by session
  getChatHistoryBySession(sessionId, limit = 50) {
    return apiClient.get(`/b2c/chat-history/session/${sessionId}`, {
      params: { limit }
    });
  },

  // Get chat history by customer (requires auth token)
  getChatHistoryByCustomer(customerId, token, limit = 100) {
    return apiClient.get(`/b2c/chat-history/customer/${customerId}`, {
      params: { limit },
      headers: {
        Authorization: `Bearer ${token}`
      }
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
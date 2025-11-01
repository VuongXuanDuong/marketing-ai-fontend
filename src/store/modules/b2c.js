import b2cService from '@/services/b2cService';
import sessionManager from '@/utils/sessionManager';

const AUTH_TOKEN_KEY = 'fashionai_auth_token';
const CUSTOMER_KEY = 'fashionai_customer';

export default {
  namespaced: true,

  state: {
    messages: [],
    sessionId: null,
    loading: false,
    error: null,
    // Auth state
    customer: JSON.parse(localStorage.getItem(CUSTOMER_KEY) || 'null'),
    authToken: localStorage.getItem(AUTH_TOKEN_KEY),
    isAuthenticated: !!localStorage.getItem(AUTH_TOKEN_KEY)
  },

  mutations: {
    INIT_SESSION(state) {
      state.sessionId = sessionManager.getSessionId();
    },
    ADD_MESSAGE(state, message) {
      state.messages.push(message);
    },
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
    CLEAR_MESSAGES(state) {
      state.messages = [];
    },
    // Auth mutations
    SET_AUTH(state, { token, customer }) {
      state.authToken = token;
      state.customer = customer;
      state.isAuthenticated = true;
      localStorage.setItem(AUTH_TOKEN_KEY, token);
      localStorage.setItem(CUSTOMER_KEY, JSON.stringify(customer));
    },
    CLEAR_AUTH(state) {
      state.authToken = null;
      state.customer = null;
      state.isAuthenticated = false;
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem(CUSTOMER_KEY);
    }
  },

  getters: {
    customerId: (state) => state.customer?.customer_id || null,
    customerName: (state) => state.customer?.name || 'Guest',
    customerEmail: (state) => state.customer?.email || null
  },

  actions: {
    initSession({ commit }) {
      commit('INIT_SESSION');
    },

    async login({ commit }, { email, password }) {
      try {
        const response = await b2cService.login(email, password);
        commit('SET_AUTH', {
          token: response.data.access_token,
          customer: response.data.customer
        });
        return response.data;
      } catch (error) {
        throw error;
      }
    },

    async register({ commit }, { email, name, password }) {
      try {
        const response = await b2cService.register(email, name, password);
        commit('SET_AUTH', {
          token: response.data.access_token,
          customer: response.data.customer
        });
        return response.data;
      } catch (error) {
        throw error;
      }
    },

    async fetchCurrentCustomer({ commit, state }) {
      if (!state.authToken) return null;

      try {
        const response = await b2cService.getCurrentCustomer(state.authToken);
        commit('SET_AUTH', {
          token: state.authToken,
          customer: response.data
        });
        return response.data;
      } catch (error) {
        // Token invalid or expired
        commit('CLEAR_AUTH');
        throw error;
      }
    },

    logout({ commit }) {
      commit('CLEAR_AUTH');
    },

    async sendMessage({ commit, state, getters }, query) {
      // Add user message
      commit('ADD_MESSAGE', {
        role: 'user',
        content: query,
        timestamp: new Date()
      });

      commit('SET_LOADING', true);
      commit('SET_ERROR', null);

      try {
        const customerId = getters.customerId;
        const response = await b2cService.sendMessage(state.sessionId, query, customerId);

        // Add AI message
        commit('ADD_MESSAGE', {
          role: 'ai',
          content: response.data.response_text,
          products: response.data.source_products || [],
          timestamp: new Date()
        });

        return response.data;
      } catch (error) {
        commit('SET_ERROR', error.message);
        commit('ADD_MESSAGE', {
          role: 'ai',
          content: 'Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại.',
          timestamp: new Date(),
          isError: true
        });
        throw error;
      } finally {
        commit('SET_LOADING', false);
      }
    },

    clearChat({ commit }) {
      commit('CLEAR_MESSAGES');
      sessionManager.createNewSession();
      commit('INIT_SESSION');
    }
  }
};
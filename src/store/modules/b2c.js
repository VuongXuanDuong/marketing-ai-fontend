import b2cService from '@/services/b2cService';
import sessionManager from '@/utils/sessionManager';

export default {
  namespaced: true,

  state: {
    messages: [],
    sessionId: null,
    loading: false,
    error: null
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
    }
  },

  actions: {
    initSession({ commit }) {
      commit('INIT_SESSION');
    },

    async sendMessage({ commit, state }, query) {
      // Add user message
      commit('ADD_MESSAGE', {
        role: 'user',
        content: query,
        timestamp: new Date()
      });

      commit('SET_LOADING', true);
      commit('SET_ERROR', null);

      try {
        const response = await b2cService.sendMessage(state.sessionId, query);

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
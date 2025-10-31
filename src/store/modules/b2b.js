import b2bService from '@/services/b2bService';

export default {
  namespaced: true,

  state: {
    segmentedEmails: [],
    generatedContent: '',
    campaignStatus: null,
    loading: false,
    error: null
  },

  mutations: {
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
    SET_SEGMENTED_EMAILS(state, emails) {
      state.segmentedEmails = emails;
    },
    SET_GENERATED_CONTENT(state, content) {
      state.generatedContent = content;
    },
    SET_CAMPAIGN_STATUS(state, status) {
      state.campaignStatus = status;
    }
  },

  actions: {
    async segmentCustomers({ commit }, rules) {
      commit('SET_LOADING', true);
      commit('SET_ERROR', null);

      try {
        const response = await b2bService.segmentCustomers(rules);
        commit('SET_SEGMENTED_EMAILS', response.data.emails);
        return response.data;
      } catch (error) {
        commit('SET_ERROR', error.message);
        throw error;
      } finally {
        commit('SET_LOADING', false);
      }
    },

    async generateContent({ commit }, { productId, targetAudience, tone }) {
      commit('SET_LOADING', true);
      commit('SET_ERROR', null);

      try {
        const response = await b2bService.generateContent(
          productId,
          targetAudience,
          tone
        );
        commit('SET_GENERATED_CONTENT', response.data.generated_content);
        return response.data;
      } catch (error) {
        commit('SET_ERROR', error.message);
        throw error;
      } finally {
        commit('SET_LOADING', false);
      }
    },

    async sendCampaign({ commit }, { emails, subject, content }) {
      commit('SET_LOADING', true);
      commit('SET_ERROR', null);

      try {
        const response = await b2bService.sendEmailCampaign(
          emails,
          subject,
          content
        );
        commit('SET_CAMPAIGN_STATUS', response.data);
        return response.data;
      } catch (error) {
        commit('SET_ERROR', error.message);
        throw error;
      } finally {
        commit('SET_LOADING', false);
      }
    }
  }
};
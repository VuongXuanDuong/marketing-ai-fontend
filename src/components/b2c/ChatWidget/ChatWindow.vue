<template>
  <div class="chat-window" :class="{ 'is-open': isOpen }">
    <div class="chat-header">
      <div class="header-left">
        <h3>FashionAI Assistant</h3>
        <div class="customer-info">
          <span v-if="isAuthenticated" class="customer-name">
            {{ customerName }}
          </span>
          <span v-else class="guest-label">Guest</span>
        </div>
      </div>
      <div class="header-actions">
        <button
          v-if="isAuthenticated"
          @click="handleLogout"
          class="auth-btn"
          title="Đăng xuất"
        >
          Đăng xuất
        </button>
        <button
          v-else
          @click="showAuthModal = true"
          class="auth-btn"
          title="Đăng nhập"
        >
          Đăng nhập
        </button>
        <button @click="$emit('close')" class="close-btn">✕</button>
      </div>
    </div>

    <MessageList :messages="messages" />

    <ChatInput
      @send="handleSend"
      :disabled="loading"
    />

    <CustomerAuth
      v-if="showAuthModal"
      @close="showAuthModal = false"
      @success="handleAuthSuccess"
    />
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue';
import { useStore } from 'vuex';
import MessageList from './MessageList.vue';
import ChatInput from './ChatInput.vue';
import CustomerAuth from '../CustomerAuth.vue';

export default {
  name: 'ChatWindow',
  components: {
    MessageList,
    ChatInput,
    CustomerAuth
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close'],
  setup(props) {
    const store = useStore();
    const showAuthModal = ref(false);

    const messages = computed(() => store.state.b2c.messages);
    const loading = computed(() => store.state.b2c.loading);
    const isAuthenticated = computed(() => store.state.b2c.isAuthenticated);
    const customerName = computed(() => store.getters['b2c/customerName']);

    // Initialize session and load chat history
    const initializeChatSession = async () => {
      await store.dispatch('b2c/initSession');
      await store.dispatch('b2c/loadChatHistory');
    };

    // Load chat history when component mounts
    onMounted(() => {
      initializeChatSession();
    });

    // Reload chat history when authentication status changes
    watch(isAuthenticated, async (newVal, oldVal) => {
      if (newVal !== oldVal) {
        await store.dispatch('b2c/loadChatHistory');
      }
    });

    const handleSend = async (message) => {
      try {
        await store.dispatch('b2c/sendMessage', message);
      } catch (error) {
        console.error('Send message error:', error);
      }
    };

    const handleLogout = () => {
      store.dispatch('b2c/logout');
      // Clear messages and reload empty history
      store.dispatch('b2c/loadChatHistory');
    };

    const handleAuthSuccess = async () => {
      console.log('Authentication successful');
      // Reload chat history after successful login
      await store.dispatch('b2c/loadChatHistory');
    };

    return {
      messages,
      loading,
      isAuthenticated,
      customerName,
      showAuthModal,
      handleSend,
      handleLogout,
      handleAuthSuccess
    };
  }
};
</script>

<style scoped>
.chat-window {
  position: fixed;
  bottom: 80px;
  right: 20px;
  width: 400px;
  height: 600px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  transform: translateY(100vh);
  transition: transform 0.3s ease;
  z-index: 1000;
}

.chat-window.is-open {
  transform: translateY(0);
}

.chat-header {
  background: #3498db;
  color: white;
  padding: 1rem;
  border-radius: 12px 12px 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-left {
  flex: 1;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.chat-header h3 {
  margin: 0;
  font-size: 1.1rem;
}

.customer-info {
  margin-top: 0.25rem;
  font-size: 0.85rem;
  opacity: 0.9;
}

.customer-name {
  font-weight: 500;
}

.guest-label {
  font-style: italic;
  opacity: 0.7;
}

.auth-btn {
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.3s;
}

.auth-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

.close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
}

.close-btn:hover {
  opacity: 0.8;
}

@media (max-width: 768px) {
  .chat-window {
    width: 100%;
    height: 100%;
    bottom: 0;
    right: 0;
    border-radius: 0;
  }
}
</style>
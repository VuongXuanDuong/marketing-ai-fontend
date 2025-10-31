<template>
  <div class="chat-window" :class="{ 'is-open': isOpen }">
    <div class="chat-header">
      <h3>FashionAI Assistant</h3>
      <button @click="$emit('close')" class="close-btn">✕</button>
    </div>

    <MessageList :messages="messages" />

    <ChatInput
      @send="handleSend"
      :disabled="loading"
    />
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import MessageList from './MessageList.vue';
import ChatInput from './ChatInput.vue';

export default {
  name: 'ChatWindow',
  components: {
    MessageList,
    ChatInput
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close'],
  setup() {
    const store = useStore();

    const messages = computed(() => store.state.b2c.messages);
    const loading = computed(() => store.state.b2c.loading);

    // Initialize session on mount
    store.dispatch('b2c/initSession');

    const handleSend = async (message) => {
      try {
        await store.dispatch('b2c/sendMessage', message);
      } catch (error) {
        console.error('Send message error:', error);
      }
    };

    return {
      messages,
      loading,
      handleSend
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

.chat-header h3 {
  margin: 0;
  font-size: 1.1rem;
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
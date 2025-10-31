<template>
  <div class="message-list" ref="messageContainer">
    <div v-if="messages.length === 0" class="empty-state">
      <p>👋 Xin chào! Tôi có thể giúp gì cho bạn?</p>
    </div>

    <MessageItem
      v-for="(message, index) in messages"
      :key="index"
      :message="message"
    />

    <div v-if="loading" class="typing-indicator">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</template>

<script>
import { ref, watch, nextTick, computed } from 'vue';
import { useStore } from 'vuex';
import MessageItem from './MessageItem.vue';

export default {
  name: 'MessageList',
  components: {
    MessageItem
  },
  props: {
    messages: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const store = useStore();
    const messageContainer = ref(null);
    const loading = computed(() => store.state.b2c.loading);

    const scrollToBottom = () => {
      nextTick(() => {
        if (messageContainer.value) {
          messageContainer.value.scrollTop = messageContainer.value.scrollHeight;
        }
      });
    };

    watch(() => props.messages.length, scrollToBottom);
    watch(loading, scrollToBottom);

    return {
      messageContainer,
      loading
    };
  }
};
</script>

<style scoped>
.message-list {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  background: #f8f9fa;
}

.empty-state {
  text-align: center;
  color: #666;
  padding: 2rem;
}

.typing-indicator {
  display: flex;
  gap: 4px;
  padding: 1rem;
  justify-content: flex-start;
}

.typing-indicator span {
  width: 8px;
  height: 8px;
  background: #95a5a6;
  border-radius: 50%;
  animation: typing 1.4s infinite;
}

.typing-indicator span:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-indicator span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes typing {
  0%, 60%, 100% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(-10px);
  }
}
</style>